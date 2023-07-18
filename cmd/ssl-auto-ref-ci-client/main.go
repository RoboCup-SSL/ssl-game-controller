package main

import (
	"bufio"
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/ci"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/ci/autoref"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/vision"
	"log"
	"net"
	"time"
)

var addressAutoRefCi = flag.String("addressAutoRef", "localhost:10013", "The address of the auto referee CI interface")
var addressGcCi = flag.String("addressGc", "localhost:10009", "The address of the ssl-game-controller CI interface")

var detectionFrame = createSSlDetectionFrame()
var refereeMsg *state.Referee
var ballSpeed = float32(0)
var ballAcc = float32(-0.26)

func main() {
	flag.Parse()

	autoRefConn := connect(*addressAutoRefCi)
	gcConn := connect(*addressGcCi)

	for {
		simulate()
		sendAutoRefCi(autoRefConn, detectionFrame)
		trackerFrame := receiveAutoRefCi(autoRefConn)
		if trackerFrame == nil {
			return
		}
		sendCi(gcConn, trackerFrame)
		refereeMsg = receiveCi(gcConn)
		time.Sleep(10 * time.Millisecond)
	}
}

func simulate() {
	*detectionFrame.RobotsBlue[0].X = 1000
	ballY := detectionFrame.Balls[0].Y
	*ballY += ballSpeed / 100 * 1000
	ballSpeed += ballAcc * 0.01
	if *ballY > 4700 || ballSpeed <= 0 {
		*ballY = 0
		ballSpeed = 3
	}
}

func connect(addr string) (conn net.Conn) {
	conn, err := net.Dial("tcp", addr)
	if err != nil {
		log.Fatal("could not connect to ", addr)
	}
	log.Printf("Connected to %v", addr)
	return
}

func createBall() (ball *vision.SSL_DetectionBall) {
	ball = new(vision.SSL_DetectionBall)
	ball.Confidence = new(float32)
	ball.PixelX = new(float32)
	ball.PixelY = new(float32)
	ball.X = new(float32)
	ball.Y = new(float32)
	*ball.Confidence = 1
	return
}

func createBot() (robot *vision.SSL_DetectionRobot) {
	robot = new(vision.SSL_DetectionRobot)
	robot.Confidence = new(float32)
	robot.RobotId = new(uint32)
	robot.PixelX = new(float32)
	robot.PixelY = new(float32)
	robot.X = new(float32)
	robot.Y = new(float32)
	robot.Orientation = new(float32)
	*robot.Confidence = 1
	return
}

func createSSlDetectionFrame() (p *vision.SSL_DetectionFrame) {
	p = new(vision.SSL_DetectionFrame)
	p.FrameNumber = new(uint32)
	p.TSent = new(float64)
	p.TCapture = new(float64)
	p.CameraId = new(uint32)
	p.Balls = []*vision.SSL_DetectionBall{createBall()}
	p.RobotsBlue = []*vision.SSL_DetectionRobot{createBot()}
	return
}

func sendCi(conn net.Conn, trackerPacket *tracker.TrackerWrapperPacket) {
	timestamp := time.Now().UnixNano()
	*trackerPacket.TrackedFrame.Timestamp = float64(timestamp / 1e9)
	*trackerPacket.TrackedFrame.FrameNumber++
	input := ci.CiInput{Timestamp: &timestamp, TrackerPacket: trackerPacket}
	if err := sslconn.SendMessage(conn, &input); err != nil {
		log.Println("Could not send message: ", err)
	}
}

func receiveCi(conn net.Conn) *state.Referee {
	reader := bufio.NewReaderSize(conn, 1)
	output := ci.CiOutput{}
	if err := sslconn.ReceiveMessage(reader, &output); err != nil {
		log.Println("Could not receive message: ", err)
	}
	return output.RefereeMsg
}

func sendAutoRefCi(conn net.Conn, detectionFrame *vision.SSL_DetectionFrame) {
	timestamp := time.Now().UnixNano()

	*detectionFrame.TSent = float64(timestamp) / 1e9
	*detectionFrame.TCapture = float64(timestamp) / 1e9
	*detectionFrame.FrameNumber++
	input := autoref.AutoRefCiInput{
		Detection:      []*vision.SSL_DetectionFrame{detectionFrame},
		RefereeMessage: refereeMsg,
	}
	if err := sslconn.SendMessage(conn, &input); err != nil {
		log.Println("Could not send message: ", err)
	}
}

func receiveAutoRefCi(conn net.Conn) *tracker.TrackerWrapperPacket {
	reader := bufio.NewReaderSize(conn, 1)
	output := autoref.AutoRefCiOutput{}
	if err := sslconn.ReceiveMessage(reader, &output); err != nil {
		log.Println("Could not receive message: ", err)
	}
	return output.TrackerWrapperPacket
}
