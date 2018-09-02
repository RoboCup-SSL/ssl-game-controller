package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"io"
	"log"
	"net"
)

type AutoRefServer struct {
	Clients        map[string]net.Conn
	ProcessRequest func(refproto.AutoRefToControllerRequest)
}

func NewAutoRefServer() (clientServer AutoRefServer) {
	clientServer.ProcessRequest = func(refproto.AutoRefToControllerRequest) {}
	clientServer.Clients = map[string]net.Conn{}
	return
}

func (s *AutoRefServer) Listen(address string) error {
	listener, err := net.Listen("tcp", address)
	if err != nil {
		return err
	}
	defer listener.Close()
	log.Print("Listening for autoRefs on ", address)

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Print("Could not accept connection: ", err)
		} else {
			go s.handleClientConnection(conn)
		}

	}
}

func (s *AutoRefServer) handleClientConnection(conn net.Conn) {
	registration := refproto.AutoRefRegistration{}
	sslconn.ReceiveMessage(conn, &registration)
	id := registration.Identifier
	if _, exists := s.Clients[id]; exists {
		reject(conn, "Client with given identifier already registered: "+id)
		return
	}
	if len(id) < 1 {
		reject(conn, "No identifier specified")
		return
	}

	accept(conn)
	s.Clients[id] = conn
	defer s.closeConnection(conn, id)
	log.Printf("Client %v connected", id)

	for {
		req := refproto.AutoRefToControllerRequest{}
		if err := sslconn.ReceiveMessage(conn, &req); err != nil {
			if err == io.EOF {
				return
			}
			log.Print(err)
		} else {
			s.ProcessRequest(req)
		}
	}
}

func (s *AutoRefServer) closeConnection(conn net.Conn, id string) {
	conn.Close()
	delete(s.Clients, id)
	log.Printf("Connection to %v closed", id)
}

func reject(conn net.Conn, reason string) {
	log.Print("Reject connection: " + reason)
	reply := refproto.ControllerReply{}
	reply.StatusCode = refproto.ControllerReply_REJECTED
	reply.Reason = reason
	if err := sslconn.SendMessage(conn, &reply); err != nil {
		log.Print("Failed to send reply: ", err)
	}
	conn.Close()
}

func accept(conn net.Conn) {
	reply := refproto.ControllerReply{}
	reply.StatusCode = refproto.ControllerReply_OK
	if err := sslconn.SendMessage(conn, &reply); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}
