package ci

import (
	"bufio"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"google.golang.org/protobuf/proto"
	"log"
	"net"
	"sync"
	"time"
)

type Handler func(time.Time, *tracker.TrackerWrapperPacket) *state.Referee

type Server struct {
	address    string
	listener   net.Listener
	conn       net.Conn
	latestTime time.Time
	tickChan   chan time.Time
	mutex      sync.Mutex
	gcEngine   *engine.Engine
	running    bool
}

func NewServer(address string) *Server {
	return &Server{address: address, tickChan: make(chan time.Time, 1)}
}

func (s *Server) SetEngine(engine *engine.Engine) {
	s.gcEngine = engine
}

func (s *Server) Start() {
	s.running = true
	go s.listen(s.address)
}

func (s *Server) Stop() {
	s.running = false
	if err := s.listener.Close(); err != nil {
		log.Printf("Could not close listener: %v", err)
	}
	s.listener = nil
}

func (s *Server) listen(address string) {
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Print("Failed to listen on ", address)
		return
	}
	log.Print("Listening on ", address)
	s.listener = listener

	for s.running {
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

	reader := bufio.NewReaderSize(conn, 1)
	for {
		input := CiInput{}
		if data, err := sslconn.Receive(reader); err != nil {
			log.Println("Could not receive message from CI connection: ", err)
			return
		} else if err := sslconn.Unmarshal(data, &input); err != nil {
			log.Println("Could not unmarshal message: ", err)
			continue
		}

		if input.TrackerPacket != nil {
			s.gcEngine.ProcessTrackerFrame(input.TrackerPacket)
		}

		for _, in := range input.ApiInputs {
			if in.Change != nil {
				in.Change.Origin = proto.String("CI")
				s.gcEngine.Enqueue(in.Change)
			}
			if in.ResetMatch != nil && *in.ResetMatch {
				s.gcEngine.ResetMatch()
			}
			if in.ConfigDelta != nil {
				s.gcEngine.UpdateConfig(in.ConfigDelta)
			}
			if in.ContinueAction != nil {
				s.gcEngine.Continue(in.ContinueAction)
			}
		}

		if input.Geometry != nil {
			s.gcEngine.ProcessGeometry(input.Geometry)
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
		} else {
			log.Println("CiInput without timestamp!")
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
