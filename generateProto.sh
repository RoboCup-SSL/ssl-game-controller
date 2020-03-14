#!/bin/bash

# Fail on errors
set -e

# Update to latest protobuf compiler
go get -u github.com/golang/protobuf/protoc-gen-go

# vision
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_vision_detection.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_vision_geometry.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_vision_wrapper.proto

# game events
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_game_event.proto

# referee message
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_referee.proto

# remote communication
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_game_controller_common.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_game_controller_auto_ref.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out=$GOPATH/src proto/ssl_game_controller_team.proto
