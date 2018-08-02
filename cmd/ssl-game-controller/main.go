package main

import (
	"github.com/g3force/ssl-game-controller/internal/app/ssl-game-controller"
	"net/http"
)

func main() {

	ssl_game_controller.RunRefBox()

	// serve the static resource of UI (for production use only)
	http.Handle("/", http.FileServer(http.Dir(".")))
	// serve the bidirectional web socket
	http.HandleFunc("/ws", ssl_game_controller.WsHandler)
	http.ListenAndServe(":8081", nil)
}
