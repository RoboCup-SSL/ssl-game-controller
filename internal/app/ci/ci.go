package ci

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"log"
	"net"
	"sync"
	"time"
)

type Handler func(time.Time, *tracker.TrackerWrapperPacket) *state.Referee

type Server struct {
	address         string
	listener        net.Listener
	conn            net.Conn
	latestTime      time.Time
	tickChan        chan time.Time
	mutex           sync.Mutex
	TrackerConsumer func(*tracker.TrackerWrapperPacket)
}

func NewServer(address string) *Server {
	return &Server{address: address, tickChan: make(chan time.Time, 1)}
}

func (s *Server) Start() {
	go s.listen(s.address)
}

func (s *Server) Stop() {
	if err := s.listener.Close(); err != nil {
		log.Printf("Could not close listener: %v", err)
	}
}

func (s *Server) listen(address string) {
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Print("Failed to listen on ", address)
		return
	}
	log.Print("Listening on ", address)
	s.listener = listener

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Print("Could not accept connection: ", err)
		} else {
			log.Println("CI connection established")
			s.conn = conn
			s.serve(conn)
			log.Println("CI connection closed")
		}
	}
}

func (s *Server) serve(conn net.Conn) {
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close CI client connection: %v", err)
		}
	}()

	for {
		input := CiInput{}
		if data, err := sslconn.Receive(conn); err != nil {
			log.Println("Could not receive message from CI connection: ", err)
			return
		} else if err := sslconn.Unmarshal(data, &input); err != nil {
			log.Println("Could not unmarshal message: ", err)
			continue
		}

		if input.TrackerPacket != nil {
			s.TrackerConsumer(input.TrackerPacket)
		}

		if input.Timestamp != nil {
			sec := *input.Timestamp / 1e9
			nSec := *input.Timestamp - sec*1e9
			s.mutex.Lock()
			s.latestTime = time.Unix(sec, nSec)
			s.mutex.Unlock()
			select {
			case s.tickChan <- s.latestTime:
			case <-time.After(1 * time.Second):
				log.Printf("tickChan unresponsive! Failed to sent %v", s.latestTime)
			}
		}
	}
}

func (s *Server) SendMessage(refMsg *state.Referee) {
	if s.conn == nil {
		log.Println("Could not send message to CI client: Not connected")
		return
	}
	output := CiOutput{RefereeMsg: refMsg}
	if err := sslconn.SendMessage(s.conn, &output); err != nil {
		log.Printf("Could not send message: %v", err)
		return
	}
}

func (s *Server) Time() time.Time {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	return s.latestTime
}

func (s *Server) TickChanProvider() <-chan time.Time {
	return s.tickChan
}
