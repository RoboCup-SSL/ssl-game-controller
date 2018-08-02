package main

import (
	"github.com/g3force/ssl-game-controller/internal/app/controller"
	"net/http"
)

func main() {

	controller.RunRefBox()

	// serve the static resource of UI (for production use only)
	http.Handle("/", http.FileServer(http.Dir(".")))
	// serve the bidirectional web socket
	http.HandleFunc("/ws", controller.WsHandler)
	http.ListenAndServe(":8081", nil)
}
