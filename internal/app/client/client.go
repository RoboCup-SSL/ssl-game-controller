package client

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/pem"
	"github.com/golang/protobuf/proto"
	"io/ioutil"
	"log"
	"net"
	"strings"
)

func DetectHost(address string) string {
	addr, err := net.ResolveUDPAddr("udp", address)
	if err != nil {
		log.Fatal(err)
	}
	conn, err := net.ListenMulticastUDP("udp", nil, addr)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	_, udpAddr, err := conn.ReadFromUDP([]byte{0})
	if err != nil {
		log.Fatal(err)
	}
	return udpAddr.IP.String()
}

func SetHost(address string, host string) string {
	parts := strings.Split(address, ":")
	return host + ":" + parts[1]
}

func LoadPrivateKey(privateKeyLocation string) {
	if privateKeyLocation != "" {
		privateKey := ReadPrivateKey(privateKeyLocation)
		if privateKey != nil {
			log.Print("Found private key")
		} else {
			log.Print("No private key available")
		}
	}
}

func ReadPrivateKey(privateKeyLocation string) *rsa.PrivateKey {
	b, err := ioutil.ReadFile(privateKeyLocation)
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
