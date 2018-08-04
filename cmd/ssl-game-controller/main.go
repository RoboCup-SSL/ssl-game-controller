package main

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/controller"
	"github.com/gobuffalo/packr"
	"net/http"
)

func main() {

	g := controller.NewGameController()
	g.Run()

	box := packr.NewBox("../../ui/dist")
	http.Handle("/", http.FileServer(box))

	// serve the bidirectional web socket
	http.HandleFunc("/ws", g.ApiServer.WsHandler)
	http.ListenAndServe(":8081", nil)
}
