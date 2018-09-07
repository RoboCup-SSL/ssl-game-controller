[![CircleCI](https://circleci.com/gh/RoboCup-SSL/ssl-game-controller/tree/master.svg?style=svg)](https://circleci.com/gh/RoboCup-SSL/ssl-game-controller/tree/master)
[![Go Report Card](https://goreportcard.com/badge/github.com/RoboCup-SSL/ssl-game-controller?style=flat-square)](https://goreportcard.com/report/github.com/RoboCup-SSL/ssl-game-controller)
[![Go Doc](https://img.shields.io/badge/godoc-reference-blue.svg?style=flat-square)](https://godoc.org/github.com/RoboCup-SSL/ssl-game-controller/internal/app/controller)
[![Release](https://img.shields.io/github/release/RoboCup-SSL/ssl-game-controller.svg?style=flat-square)](https://github.com/RoboCup-SSL/ssl-game-controller/releases/latest)

# ssl-game-controller

The [ssl-refbox](https://github.com/RoboCup-SSL/ssl-refbox) replacement that will be introduced at RoboCup 2019

## Usage
If you just want to use this app, simply download the latest [release binary](https://github.com/RoboCup-SSL/ssl-game-controller/releases/latest). The binary is self-contained. No dependencies are required.

### Reference Clients
There are some reference clients:
 * [ssl-ref-client](./cmd/ssl-ref-client): A client that receives referee messages
 * [ssl-auto-ref-client](./cmd/ssl-auto-ref-client/README.md): A client that connects to the controller as an autoRef
 * [ssl-team-client](./cmd/ssl-team-client/README.md): A client that connects to the controller as a team
 
### Comparison to ssl-refbox
The ssl-game-controller replaces the ssl-refbox. With the introduction of automatic referees, there was demand for several new features. To accommodate these, the ssl-refbox has been rewritten to take advantage of modern technologies.

The referee message, that is send to the teams, has no breaking changes. Teams do not need to change their systems. Additional data will be send with the referee messages though. To read those changes, teams can update their `.proto` files from this repository to take advantage of it.

Teams will also have the possibility to connect to a new interface, where they can change their goalie number during Stoppage. Additionally, there will be an advantage rule, where teams can decide to let the game continue on certain fouls.

List of new features:
 * Modern, scalable Web-UI
 * More control of the state (change almost all values)
 * Automatically save and restore state 
 * State history with undo button
 * Includes state that was previously located in all autoRefs
 * New Game Event concept for better interaction with multiple autoRefs
 * Game Log that documents commands and events
 * New interfaces for autoRefs and teams
 * A graphical client can be integrated
 
## Development

### Requirements
You need to install following dependencies first: 
 * Go >= 1.9
 * NPM

### Prepare
Download and install to [GOPATH](https://github.com/golang/go/wiki/GOPATH):
```bash
go get -u github.com/RoboCup-SSL/ssl-game-controller/...
```
Switch to project root directory
```bash
cd $GOPATH/src/github.com/RoboCup-SSL/ssl-game-controller/
```
Download dependencies for frontend
```bash
npm install
```

### Run
Run the backend:
```bash
go run cmd/ssl-game-controller/main.go
```

Run the UI:
```bash
# compile and hot-reload
npm run serve
```
Or use the provided IntelliJ run configurations.

### Build self-contained release binary
First, build the UI resources
```bash
# compile and minify UI
npm run build
```
Then build the backend with `packr`
```bash
# get packr
go get github.com/gobuffalo/packr/packr
# install the binary
cd cmd/ssl-game-controller
packr install
```