package frontend

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist
var content embed.FS

func HandleUi() {
	dist, err := fs.Sub(content, "dist")
	if err != nil {
		panic(err)
	}
	http.Handle("/", http.FileServer(http.FS(dist)))
}
