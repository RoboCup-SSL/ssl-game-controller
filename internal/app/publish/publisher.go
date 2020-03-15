package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
)

const maxDatagramSize = 8192

// Publisher can publish state and commands to the teams
type Publisher struct {
	address    string
	conn       *net.UDPConn
	queue      chan statemachine.StateChange
	quit       chan int
	messageGen MessageGenerator
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(address string) (p *Publisher) {
	p = new(Publisher)
	p.address = address
	p.queue = make(chan statemachine.StateChange, 10)
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

// Queue returns the queue that listens for new state changes
func (p *Publisher) Queue() chan statemachine.StateChange {
	return p.queue
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
	for {
		select {
		case <-p.quit:
			p.disconnect()
			return
		case change := <-p.queue:
			refereeMessages := p.messageGen.GenerateRefereeMessages(change)
			for _, refereeMsg := range refereeMessages {
				p.sendMessage(refereeMsg)
			}
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
