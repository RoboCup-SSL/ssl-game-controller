![travis build](https://travis-ci.org/g3force/ssl-game-controller.svg?branch=master "travis build status")
[![Go Report Card](https://goreportcard.com/badge/github.com/g3force/ssl-game-controller?style=flat-square)](https://goreportcard.com/report/github.com/g3force/ssl-game-controller)
[![Go Doc](https://img.shields.io/badge/godoc-reference-blue.svg?style=flat-square)](http://godoc.org/github.com/g3force/ssl-game-controller)
[![Release](https://img.shields.io/github/release/golang-standards/project-layout.svg?style=flat-square)](https://github.com/g3force/ssl-game-controller/releases/latest)

# ssl-game-controller

The ssl-refbox that will be introduced at RoboCup 2019

## Project setup

### Requirements
You need to install Go and setup the GOPATH first.

### Development
Run the backend:
```bash
cd cmd/ssl-game-controller
go install
cd ../..
ssl-game-controller
```
Or use the provided IntelliJ run configuration.

Then, run the [UI](ui/README.md).

### Production / Release
Will be different, but yet to be setup ;)