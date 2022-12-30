package client

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/pem"
	"google.golang.org/protobuf/proto"
	"log"
	"net"
	"os"
	"strings"
)

// DetectHost reads the network address from a multicast message by joining the given multicast group and waiting for
// some data before reading the source IP and returning it.
func DetectHost(address string) string {
	addr, err := net.ResolveUDPAddr("udp", address)
	if err != nil {
		log.Fatal(err)
	}
	conn, err := net.ListenMulticastUDP("udp", nil, addr)
	if err != nil {
		log.Fatal(err)
	}
	defer func(conn *net.UDPConn) {
		err := conn.Close()
		if err != nil {
			log.Print("Failed to close connection: ", err)
		}
	}(conn)
	_, udpAddr, err := conn.ReadFromUDP([]byte{0})
	if err != nil {
		log.Fatal(err)
	}
	return udpAddr.IP.String()
}

// GetConnectionString extracts the port from the given address and constructs a new connection string with the host
// The resulting format is "host:port".
func GetConnectionString(address string, host string) string {
	parts := strings.Split(address, ":")
	return host + ":" + parts[1]
}

// LoadPrivateKey loads a private RSA key from the given location
func LoadPrivateKey(privateKeyLocation string) *rsa.PrivateKey {
	if privateKeyLocation != "" {
		privateKey := ReadPrivateKey(privateKeyLocation)
		if privateKey != nil {
			log.Print("Found private key")
			return privateKey
		} else {
			log.Print("No private key available")
		}
	}
	return nil
}

// ReadPrivateKey reads a private RSA key from the given location, exiting on errors
func ReadPrivateKey(privateKeyLocation string) *rsa.PrivateKey {
	b, err := os.ReadFile(privateKeyLocation)
	if err != nil {
		log.Fatal("Could not find private key at ", privateKeyLocation)
	}
	p, _ := pem.Decode(b)
	if p.Type != "RSA PRIVATE KEY" {
		log.Fatal("Private key type is wrong: ", p.Type)
	}
	privateKey, err := x509.ParsePKCS1PrivateKey(p.Bytes)
	if err != nil {
		log.Fatal(err)
	}
	return privateKey
}

// Sign creates a signature of the given message with the given key
func Sign(privateKey *rsa.PrivateKey, message proto.Message) []byte {
	messageBytes, err := proto.Marshal(message)
	if err != nil {
		log.Fatal(err)
	}
	hash := sha256.New()
	hash.Write(messageBytes)
	d := hash.Sum(nil)
	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, d)
	if err != nil {
		log.Fatal(err)
	}
	return signature
}
