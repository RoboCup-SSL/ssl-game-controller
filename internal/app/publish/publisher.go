package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/proto"
	"log"
	"net"
)

const maxDatagramSize = 8192

// Publisher can publish state and commands to the teams
type Publisher struct {
	address string
	nif     string
	conns   []*net.UDPConn
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(address, nif string) (p *Publisher) {
	p = new(Publisher)
	p.address = address
	p.nif = nif
	p.conns = []*net.UDPConn{}
	return
}

func (p *Publisher) connect() bool {
	p.disconnect()

	addr, err := net.ResolveUDPAddr("udp", p.address)
	if err != nil {
		log.Printf("Could not resolve address '%v': %v", p.address, err)
		return false
	}

	iaddrs, err := net.InterfaceAddrs()
	for _, iaddr := range iaddrs {
		ip := iaddr.(*net.IPNet).IP
		if ip.To4() == nil {
			continue
		}
		if p.nif != "" && ip.String() != p.nif {
			continue
		}
		laddr := &net.UDPAddr{
			IP: ip,
		}
		conn, err := net.DialUDP("udp", laddr, addr)
		if err != nil {
			log.Printf("Could not connect to '%v': %v", addr, err)
			continue
		}

		if err := conn.SetWriteBuffer(maxDatagramSize); err != nil {
			log.Printf("Could not set write buffer to %v.", maxDatagramSize)
		}
		log.Printf("Publishing referee messages to %s at %s", conn.RemoteAddr(), conn.LocalAddr())

		p.conns = append(p.conns, conn)
	}
	return true
}

func (p *Publisher) disconnect() {
	for _, conn := range p.conns {
		if err := conn.Close(); err != nil {
			log.Println("Failed to close referee connection:", err)
		}
	}

	p.conns = []*net.UDPConn{}
}

func (p *Publisher) SendMessage(refereeMsg *state.Referee) {
	if len(p.conns) == 0 && !p.connect() {
		return
	}

	bytes, err := marshalRefereeMessage(refereeMsg)
	for _, conn := range p.conns {
		_, err = conn.Write(bytes)
		if err != nil {
			log.Println("Could not write referee message:", err)
			p.disconnect()
		}
	}
}

func marshalRefereeMessage(refereeMsg *state.Referee) ([]byte, error) {
	bytes, err := proto.Marshal(refereeMsg)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", refereeMsg, err)
		return nil, err
	}

	if len(bytes) > maxDatagramSize {
		log.Printf("Referee message is too large (%d bytes) to send in one packet. Shortening message.", len(bytes))

		shortenedRefereeMsg := proto.Clone(refereeMsg).(*state.Referee)
		shortenedRefereeMsg.GameEvents = []*state.GameEvent{}
		shortenedRefereeMsg.GameEventProposals = []*state.GameEventProposalGroup{}

		bytes, err = proto.Marshal(shortenedRefereeMsg)
		if err != nil {
			log.Printf("Could not marshal referee message: %v\nError: %v", shortenedRefereeMsg, err)
			return nil, err
		}

		return bytes, nil
	}

	return bytes, nil
}
