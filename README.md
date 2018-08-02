![travis build](https://travis-ci.org/g3force/ssl-game-controller.svg?branch=master "travis build status")

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