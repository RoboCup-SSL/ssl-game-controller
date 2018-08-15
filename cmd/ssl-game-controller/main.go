package main

import (
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/controller"
	"github.com/RoboCup-SSL/ssl-vision-client/pkg/vision"
	"github.com/gobuffalo/packr"
	"log"
	"net/http"
)

var address = flag.String("address", "localhost:8081", "The address on which the UI and API is served, default: localhost:8081")
var visionAddress = flag.String("visionAddress", "224.5.23.2:10006", "The multicast address of ssl-vision, default: 224.5.23.2:10006")

func main() {
	flag.Parse()

	setupGameController()
	setupVisionClient()
	setupUi()

	err := http.ListenAndServe(*address, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func setupGameController() {
	gameController := controller.NewGameController()
	gameController.Run()
	// serve the bidirectional web socket
	http.HandleFunc("/api/control", gameController.ApiServer.WsHandler)
}

func setupVisionClient() {
	receiver := vision.NewReceiver()
	publisher := vision.NewPublisher()
	publisher.PackageProvider = receiver.ToPackage
	http.HandleFunc("/api/vision", publisher.Handler)
	go receiver.Receive(*visionAddress)
}

func setupUi() {
	box := packr.NewBox("../../ui/dist")
	http.Handle("/", http.FileServer(box))
	if box.Has("index.html") {
		log.Printf("UI is available at http://%v", *address)
	} else {
		log.Print("Backend-only version started. Run the UI separately or get a binary that has the UI included")
	}
}
