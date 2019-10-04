package main

import (
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/controller"
	"github.com/gobuffalo/packr"
	"log"
	"net/http"
)

var address = flag.String("address", "localhost:8081", "The address on which the UI and API is served")
var visionAddress = flag.String("visionAddress", "", "The address (ip+port) from which vision packages are received")
var publishAddress = flag.String("publishAddress", "", "The address (ip+port) to which referee command should be sent")
var timeAcquisitionMode = flag.String("timeAcquisitionMode", "", "The time acquisitionMode to use (system, ci, vision)")

const configFileName = "config/ssl-game-controller.yaml"

func main() {
	flag.Parse()

	setupGameController()
	setupUi()

	err := http.ListenAndServe(*address, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func setupGameController() {
	cfg := config.LoadConfig(configFileName)

	if visionAddress != nil && *visionAddress != "" {
		cfg.Network.VisionAddress = *visionAddress
	}
	if publishAddress != nil && *publishAddress != "" {
		cfg.Network.PublishAddress = *publishAddress
	}
	if timeAcquisitionMode != nil && *timeAcquisitionMode != "" {
		cfg.TimeAcquisitionMode = config.TimeAcquisitionMode(*timeAcquisitionMode)
	}

	gameController := controller.NewGameController(cfg)
	gameController.Run()
	// serve the bidirectional web socket
	http.HandleFunc("/api/control", gameController.ApiServer.WsHandler)
}

func setupUi() {
	box := packr.NewBox("../../dist")
	http.Handle("/", http.FileServer(box))
	if box.Has("index.html") {
		log.Printf("UI is available at http://%v", *address)
	} else {
		log.Print("Backend-only version started. Run the UI separately or get a binary that has the UI included")
	}
}
