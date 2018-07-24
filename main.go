package main

import (
	"net/http"
)

var refBoxState *RefBoxState

func main() {

	refBox := NewRefBox()
	refBoxState = refBox.State
	refBox.Run()

	// serve the static resource of UI (for production use only)
	http.Handle("/", http.FileServer(http.Dir(".")))
	// serve the bidirectional web socket
	http.HandleFunc("/ws", wsHandler)
	http.ListenAndServe(":8081", nil)
}
