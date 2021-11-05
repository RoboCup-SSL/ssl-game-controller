package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/sslnet"
	"google.golang.org/protobuf/encoding/prototext"
	"google.golang.org/protobuf/proto"
	"log"
	"math"
	"os"
	"os/signal"
	"syscall"
)

var refereeAddress = flag.String("address", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var fullScreen = flag.Bool("fullScreen", false, "Print the formatted message to the console, clearing the screen during print")
var verbose = flag.Bool("verbose", false, "Verbose output")

var history []state.Referee_Command

func main() {
	flag.Parse()

	server := sslnet.NewMulticastServer(consume)
	server.Verbose = *verbose
	server.Start(*refereeAddress)

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)
	<-signals
	server.Stop()
}

func consume(b []byte) {
	refMsg := state.Referee{}
	if err := proto.Unmarshal(b, &refMsg); err != nil {
		log.Println("Could not unmarshal referee message")
		return
	}
	if len(history) == 0 || *refMsg.Command != history[len(history)-1] {
		history = append(history, *refMsg.Command)
	}

	if *fullScreen {
		// clear screen, move cursor to upper left corner
		fmt.Print("\033[H\033[2J")

		// print last commands
		fmt.Print("Last commands: ")
		n := int(math.Min(float64(len(history)), 5.0))
		for i := 0; i < n; i++ {
			fmt.Print(history[len(history)-1-i])
			if i != n-1 {
				fmt.Print(",")
			}
		}
		fmt.Println()
		fmt.Println()

		// print message formatted with line breaks
		fmt.Print(prototext.MarshalOptions{Multiline: true}.Format(&refMsg))
	} else {
		b, err := json.Marshal(&refMsg)
		if err != nil {
			log.Fatal(err)
		}
		log.Print(string(b))
	}
}
