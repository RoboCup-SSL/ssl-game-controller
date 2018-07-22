package main

import (
	"net/http"
)

func main() {
	// serve the static resource of UI (for production use only)
	http.Handle("/", http.FileServer(http.Dir(".")))
	// serve the bidirectional web socket
	http.HandleFunc("/ws", wsHandler)
	http.ListenAndServe(":8081", nil)
}
