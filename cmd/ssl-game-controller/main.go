package main

import (
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/controller"
	"github.com/gobuffalo/packr"
	"log"
	"net/http"
)

var address = flag.String("address", "localhost:8081", "The address on which the UI and API is served")

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
	gameController := controller.NewGameController()
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
