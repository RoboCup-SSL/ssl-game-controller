package main

import (
	"bufio"
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/ci"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/ci/autoref"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/vision"
	"github.com/google/uuid"
	"log"
	"net"
	"time"
)

var addressAutoRefCi = flag.String("addressAutoRef", "localhost:10013", "The address of the auto referee CI interface")
var addressGcCi = flag.String("addressGc", "localhost:10009", "The address of the ssl-game-controller CI interface")
var sendDetectionFrames = flag.Bool("sendDetectionFrames", true, "Send detection frames if true, tracker frames else")

var ballSpeed = float32(0)
var ballAcc = float32(-0.26)

func main() {
	flag.Parse()

	autoRefConn := connect(*addressAutoRefCi)
	gcConn := connect(*addressGcCi)

	var detectionFrame *vision.SSL_DetectionFrame
	var trackerFrame *tracker.TrackerWrapperPacket
	var refereeMsg *state.Referee

	if *sendDetectionFrames {
		detectionFrame = createSSlDetectionFrame()
	} else {
		trackerFrame = createTrackerFrame()
	}

	for {
		if *sendDetectionFrames {
			detectionFrame = simulateDetection(detectionFrame)
		} else {
			trackerFrame.TrackedFrame = simulateTracked(trackerFrame.TrackedFrame)
		}
		sendAutoRefCi(autoRefConn, detectionFrame, trackerFrame, refereeMsg)
		newTrackerFrame := receiveAutoRefCi(autoRefConn)
		if newTrackerFrame == nil {
			return
		}
		sendCi(gcConn, newTrackerFrame)
		refereeMsg = receiveCi(gcConn)
		time.Sleep(10 * time.Millisecond)
	}
}

func simulateDetection(detectionFrame *vision.SSL_DetectionFrame) *vision.SSL_DetectionFrame {
	timestamp := time.Now().UnixNano()

	*detectionFrame.TSent = float64(timestamp) / 1e9
	*detectionFrame.TCapture = float64(timestamp) / 1e9
	*detectionFrame.FrameNumber++

	ballY := detectionFrame.Balls[0].Y
	*ballY += ballSpeed / 100 * 1000
	ballSpeed += ballAcc * 0.01
	if *ballY > 4700 || ballSpeed <= 0 {
		*ballY = 0
		ballSpeed = 3
	}

	return detectionFrame
}

func simulateTracked(trackedFrame *tracker.TrackedFrame) *tracker.TrackedFrame {
	timestamp := time.Now().UnixNano()

	*trackedFrame.Timestamp = float64(timestamp) / 1e9
	*trackedFrame.FrameNumber++

	ballY := trackedFrame.Balls[0].Pos.Y
	*ballY += ballSpeed / 100
	ballSpeed += ballAcc * 0.01
	if *ballY > 4.7 || ballSpeed <= 0 {
		*ballY = 0
		ballSpeed = 3
	}
	*trackedFrame.Balls[0].Vel.Y = ballSpeed

	return trackedFrame
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
	*robot.X = 1000
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

func createTrackerFrame() (p *tracker.TrackerWrapperPacket) {
	p = new(tracker.TrackerWrapperPacket)
	p.Uuid = new(string)
	*p.Uuid = uuid.NewString()
	p.TrackedFrame = new(tracker.TrackedFrame)
	p.TrackedFrame.FrameNumber = new(uint32)
	p.TrackedFrame.Timestamp = new(float64)
	p.TrackedFrame.Balls = append(p.TrackedFrame.Balls,
		&tracker.TrackedBall{
			Pos: &geom.Vector3{
				X: new(float32),
				Y: new(float32),
				Z: new(float32),
			},
			Vel: &geom.Vector3{
				X: new(float32),
				Y: new(float32),
				Z: new(float32),
			},
		})
	p.TrackedFrame.Robots = append(p.TrackedFrame.Robots,
		&tracker.TrackedRobot{
			RobotId: &state.RobotId{
				Id:   new(uint32),
				Team: new(state.Team),
			},
			Pos: &geom.Vector2{
				X: new(float32),
				Y: new(float32),
			},
			Orientation: new(float32),
		})

	*p.TrackedFrame.Robots[0].RobotId.Team = state.Team_BLUE
	*p.TrackedFrame.Robots[0].Pos.X = 1
	return
}

func sendCi(conn net.Conn, trackerPacket *tracker.TrackerWrapperPacket) {
	timestamp := time.Now().UnixNano()
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

func sendAutoRefCi(
	conn net.Conn,
	detectionFrame *vision.SSL_DetectionFrame,
	trackerFrame *tracker.TrackerWrapperPacket,
	refereeMsg *state.Referee,
) {
	var detections []*vision.SSL_DetectionFrame
	if detectionFrame != nil {
		detections = append(detections, detectionFrame)
	}
	input := autoref.AutoRefCiInput{
		Detection:            detections,
		TrackerWrapperPacket: trackerFrame,
		RefereeMessage:       refereeMsg,
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
