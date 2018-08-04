package main

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/controller"
	"github.com/gobuffalo/packr"
	"log"
	"net/http"
)

func main() {

	g := controller.NewGameController()
	g.Run()

	box := packr.NewBox("../../ui/dist")
	http.Handle("/", http.FileServer(box))

	if box.Has("index.html") {
		log.Print("UI is available at http://localhost:8081")
	} else {
		log.Print("Backend-only version started. Run the UI separately or get a binary that has the UI included")
	}

	// serve the bidirectional web socket
	http.HandleFunc("/ws", g.ApiServer.WsHandler)
	http.ListenAndServe(":8081", nil)
}
