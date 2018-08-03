package main

import (
	"github.com/g3force/ssl-game-controller/internal/app/controller"
	"net/http"
)

func main() {

	g := controller.NewGameController()
	g.Run()

	// serve the static resource of UI (for production use only)
	http.Handle("/", http.FileServer(http.Dir(".")))
	// serve the bidirectional web socket
	http.HandleFunc("/ws", g.ApiServer.WsHandler)
	http.ListenAndServe(":8081", nil)
}
