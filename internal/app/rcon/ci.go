package rcon

import (
	"bufio"
	"encoding/binary"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"log"
	"net"
	"time"
)

type CiServer struct {
	TimeConsumer CiTimeConsumer
}

type CiTimeConsumer func(time.Time) *state.Referee

func NewCiServer() CiServer {
	return CiServer{}
}

func (s *CiServer) Listen(address string) {
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Print("Failed to listen on ", address)
		return
	}
	log.Print("Listening on ", address)

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Print("Could not accept connection: ", err)
		} else {
			log.Println("CI connection established")
			s.serve(conn)
			log.Println("CI connection closed")
		}
	}
}

func (s *CiServer) serve(conn net.Conn) {
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close CI client connection: %v", err)
		}
	}()

	for {
		reader := bufio.NewReaderSize(conn, 1)
		timestamp, err := binary.ReadVarint(reader)
		if err != nil {
			log.Println("Error reading from CI connection: ", err)
			return
		}

		sec := timestamp / 1e9
		nSec := timestamp - sec*1e9
		refMessage := s.TimeConsumer(time.Unix(sec, nSec))

		err = sslconn.SendMessage(conn, refMessage)
		if err != nil {
			log.Printf("Could not send message: %v", err)
			return
		}
	}
}
