[![CircleCI](https://circleci.com/gh/RoboCup-SSL/ssl-game-controller/tree/master.svg?style=svg)](https://circleci.com/gh/RoboCup-SSL/ssl-game-controller/tree/master)
[![Go Report Card](https://goreportcard.com/badge/github.com/RoboCup-SSL/ssl-game-controller?style=flat-square)](https://goreportcard.com/report/github.com/RoboCup-SSL/ssl-game-controller)
[![Go Doc](https://img.shields.io/badge/godoc-reference-blue.svg?style=flat-square)](https://godoc.org/github.com/RoboCup-SSL/ssl-game-controller)
[![Release](https://img.shields.io/github/release/RoboCup-SSL/ssl-game-controller.svg?style=flat-square)](https://github.com/RoboCup-SSL/ssl-game-controller/releases/latest)
[![Coverage](https://img.shields.io/badge/coverage-report-blue.svg)](https://circleci.com/api/v1.1/project/github/RoboCup-SSL/ssl-game-controller/latest/artifacts/0/coverage?branch=master)

# ssl-game-controller

The [ssl-refbox](https://github.com/RoboCup-SSL/ssl-refbox) replacement that was introduced at RoboCup 2019.

![Screenshot of Interface](./doc/screenshot_interface.png)

## Usage
If you just want to use this app, simply download the latest [release binary](https://github.com/RoboCup-SSL/ssl-game-controller/releases/latest). The binary is self-contained. No dependencies are required.

The controller will generate a default config file to [config/ssl-game-controller.yaml](config/ssl-game-controller.yaml) on the first start. Afterwards, you can change all settings there.

### Runtime Requirements
 * No software dependencies (except for development, see below)
 * 64bit Linux, Windows, OSX (build your 32bit binaries yourself...)
 * Display Resolution of 1920x1080 is recommended
 * A reasonable Web-Browser (mostly tested on Chrome)
 * (optional) To view the field, you need the [ssl-vision-client](https://github.com/RoboCup-SSL/ssl-vision-client)

### Reference Clients
There are some reference clients:
 * [ssl-ref-client](./cmd/ssl-ref-client): A client that receives referee messages
 * [ssl-auto-ref-client](./cmd/ssl-auto-ref-client/README.md): A client that connects to the controller as an autoRef
 * [ssl-team-client](./cmd/ssl-team-client/README.md): A client that connects to the controller as a team
 
### Comparison to ssl-refbox
The ssl-game-controller replaces the ssl-refbox. With the introduction of automatic referees, there was demand for several new features. To accommodate these, the ssl-refbox has been rewritten to take advantage of modern technologies.

The referee message, that is send to the teams, has no breaking changes. Teams do not need to change their systems. Additional data will be send with the referee messages though. To read those changes, teams can update their `.proto` files from this repository to take advantage of it.

Teams will also have the possibility to connect to a new interface, where they can change their goalkeeper number.

List of new features:
 * Modern, scalable Web-UI
 * More control of the state (change almost all values)
 * Automatically save and restore state 
 * State history with undo button
 * Includes state that was previously located in all autoRefs
 * New Game Event concept for better interaction with multiple autoRefs
 * Game protocol that documents all changes in the state
 * New interfaces for autoRefs and teams
 * A graphical client can be integrated
 
### FAQ
#### How to start a new game?
* Go to Settings (top left button)
* Start new game
* Select team names
* Switch sides, if necessary (button)
* Select division, if necessary (button switch)
* Set goalkeeper ids
* Choose which team will start with kickoff
* divB: set ball placement capability

#### How to end a game?
* Stop the game
* Make sure you are in the second half, extra second half or in shootout
* An 'End of Game' button should show up on the top

Purpose: Notify team AI about end of game and log it in log files.

#### How to give a goal?
If an autoRef has sent a 'possible goal', this event can be accepted on the right.

To add a goal manually:   
* New Event (on the top) 
* Select Goal 
* Insert parameters
* Add

#### How to correct the current state of a team?
Most of the state can be changed with the edit buttons. Either in the settings modal, or in the team overview.
This should only be used in case of misbehavior! Goals, yellow cards, etc. should be given through the respective events ('New event' button) or in the manual view.

#### How to revert a change?
The game control allows reverting certain actions like game events or stage changes. For these actions, a revert button will show up in the protocol table.
The button reverts this line and all following.

#### How to disable certain game events?
Go to 'Configure Behaviors' in the settings modal and select the game event.  
A game event can be set to be:
* Always accepted
* Only accepted when there is a majority between all connected autoRefs (if only one autoRef is connected, it will always get a majority)
* Ignored (logged as an ignored event in the table)

#### How does the continue button work?
Based on the current game events, the next command will be determined.
This command is sent, when the continue button is pressed.
The button shows the command that it will trigger.

#### How can I see if my team is connected?
Active connections to teams are shown as an icon in the team overview.

#### The controller crashes on start. What can I do?
Try deleting the `state-store.json.stream` file in the working directory. It may got corrupted.

## Integration into your own framework
The game-controller can easily be integrated into your own AI framework, if you do not want to implement your own controller for testing purposes.

Download the release binary from the Github release and run it from inside your framework. Then, attach to the WebSocket API that is used by the UI as well. 
The API is defined in [internal/app/controller/events.go](internal/app/controller/events.go).

If you don't want to run the controller in real time, you can change the time acquisition mode in the `ssl-game-controller.yaml` file:

1. `system` (default): Use system time
1. `vision`: Receive messages from ssl-vision and use the timestamps from these messages as the time source. This is mostly useful, when you produce your own ssl-vision frames from simulation. 
1. `ci`: Connect your software directly with TCP. You can send the current timestamp [ns] and will receive the resulting referee message. This also avoids the use of multicast. This is especially useful, if you run integration tests on your build server in parallel. For details, see: [internal/app/rcon/ciServer.go](internal/app/rcon/ciServer.go)

### Examples
 * Integration of the binary: https://github.com/TIGERs-Mannheim/AutoReferee/blob/master/modules/moduli-referee/src/main/java/edu/tigers/sumatra/referee/SslGameControllerProcess.java
 * WebSocket API in Java: https://github.com/TIGERs-Mannheim/AutoReferee/blob/master/modules/moduli-referee/src/main/java/edu/tigers/sumatra/referee/control

## Development

### Requirements
You need to install following dependencies first: 
 * Go >= 1.10
 * Node
 * Yarn

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
yarn install
```

### Run
Run the backend:
```bash
go run cmd/ssl-game-controller/main.go
```

Run the UI:
```bash
# compile and hot-reload
yarn serve
```
Or use the provided IntelliJ run configurations.

### Build self-contained release binary
First, build the UI resources
```bash
# compile and minify UI
yarn build
```
Then build the backend with `packr`
```bash
# get packr
go get github.com/gobuffalo/packr/packr
# install the binary
cd cmd/ssl-game-controller
packr install
```
