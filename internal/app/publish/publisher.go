package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

// Publisher can publish state and commands to the teams
type Publisher struct {
	address    string
	gcEngine   *engine.Engine
	conn       *net.UDPConn
	quit       chan int
	messageGen MessageGenerator
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(gcEngine *engine.Engine, address string) (p *Publisher) {
	p = new(Publisher)
	p.address = address
	p.gcEngine = gcEngine
	p.quit = make(chan int)

	return
}

// Start starts a new goroutine that listens for state changes on the queue and publishes
func (p *Publisher) Start() {
	p.connect()
	go p.publish()
}

// Stop stops listening on state changes
func (p *Publisher) Stop() {
	p.quit <- 0
}

func (p *Publisher) connect() {
	p.conn = nil

	addr, err := net.ResolveUDPAddr("udp", p.address)
	if err != nil {
		log.Printf("Could not resolve address '%v': %v", p.address, err)
		return
	}

	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		log.Printf("Could not connect to '%v': %v", addr, err)
		return
	}

	if err := conn.SetWriteBuffer(maxDatagramSize); err != nil {
		log.Printf("Could not set write buffer to %v.", maxDatagramSize)
	}
	log.Println("Publishing referee messages to", p.address)

	p.conn = conn
	return
}

func (p *Publisher) disconnect() {
	p.conn = nil
}

func (p *Publisher) publish() {
	hook := make(chan statemachine.StateChange)
	p.gcEngine.RegisterHook(hook)
	defer func() {
		p.gcEngine.UnregisterHook(hook)
		close(hook)
	}()

	for {
		select {
		case <-p.quit:
			p.disconnect()
			return
		case change := <-hook:
			refereeMessages := p.messageGen.GenerateRefereeMessages(change)
			for _, refereeMsg := range refereeMessages {
				p.sendMessage(refereeMsg)
			}
		case <-time.After(25 * time.Millisecond):
			refMsg := p.messageGen.StateToRefereeMessage(p.gcEngine.CurrentState())
			p.sendMessage(refMsg)
		}
	}
}

func (p *Publisher) sendMessage(refereeMsg *state.Referee) {
	if p.conn == nil {
		go p.connect()
		return
	}

	bytes, err := proto.Marshal(refereeMsg)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", refereeMsg, err)
		return
	}
	_, err = p.conn.Write(bytes)
	if err != nil {
		log.Printf("Could not write message: %v", err)
		p.disconnect()
	}
}
