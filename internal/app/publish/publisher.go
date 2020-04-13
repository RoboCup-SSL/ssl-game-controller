package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
)

const maxDatagramSize = 8192

// Publisher can publish state and commands to the teams
type Publisher struct {
	address string
	conn    *net.UDPConn
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(address string) (p *Publisher) {
	p = new(Publisher)
	p.address = address

	return
}

func (p *Publisher) connect() bool {
	p.conn = nil

	addr, err := net.ResolveUDPAddr("udp", p.address)
	if err != nil {
		log.Printf("Could not resolve address '%v': %v", p.address, err)
		return false
	}

	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		log.Printf("Could not connect to '%v': %v", addr, err)
		return false
	}

	if err := conn.SetWriteBuffer(maxDatagramSize); err != nil {
		log.Printf("Could not set write buffer to %v.", maxDatagramSize)
	}
	log.Println("Publishing referee messages to", p.address)

	p.conn = conn
	return true
}

func (p *Publisher) disconnect() {
	p.conn = nil
}

func (p *Publisher) SendMessage(refereeMsg *state.Referee) {
	if p.conn == nil && !p.connect() {
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
