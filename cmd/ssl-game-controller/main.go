package main

import (
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/gc"
	"github.com/gobuffalo/packr"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
)

var address = flag.String("address", "localhost:8081", "The address on which the UI and API is served")
var ciAddress = flag.String("ciAddress", "", "The address on which the CI connection is served")
var visionAddress = flag.String("visionAddress", "", "The address (ip+port) from which vision packages are received")
var trackerAddress = flag.String("trackerAddress", "", "The address (ip+port) from which tracker packages are received")
var publishAddress = flag.String("publishAddress", "", "The address (ip+port) to which referee command should be sent")
var timeAcquisitionMode = flag.String("timeAcquisitionMode", "", "The time acquisitionMode to use (system, ci, vision)")
var skipInterfaces = flag.String("skipInterfaces", "", "Comma separated list of interface names to ignore when receiving multicast packets")
var verbose = flag.Bool("verbose", false, "Verbose output")

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
	if trackerAddress != nil && *trackerAddress != "" {
		cfg.Network.TrackerAddress = *trackerAddress
	}
	if publishAddress != nil && *publishAddress != "" {
		cfg.Network.PublishAddress = *publishAddress
	}
	if timeAcquisitionMode != nil && *timeAcquisitionMode != "" {
		cfg.TimeAcquisitionMode = config.TimeAcquisitionMode(*timeAcquisitionMode)
	}
	if skipInterfaces != nil && *skipInterfaces != "" {
		cfg.Network.SkipInterfaces = parseSkipInterfaces()
	}
	if ciAddress != nil && *ciAddress != "" {
		cfg.Server.Ci.Address = *ciAddress
	}

	gameController := gc.NewGameController(cfg)
	gameController.SetVerbose(*verbose)
	gameController.Start()

	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-sigs
		gameController.Stop()
		os.Exit(0)
	}()

	// serve the bidirectional web socket
	http.HandleFunc("/api/control", gameController.ApiServer().WsHandler)
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

func parseSkipInterfaces() []string {
	return strings.Split(*skipInterfaces, ",")
}
