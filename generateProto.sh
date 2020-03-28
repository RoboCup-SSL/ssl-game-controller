#!/bin/bash

# Fail on errors
set -e
# Print commands
set -x

echo "Update to latest Go protobuf compiler"
go get -u github.com/golang/protobuf/protoc-gen-go

# vision
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_detection.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_geometry.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_wrapper.proto

# game events
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_game_event.proto

# referee message
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_referee.proto

# remote communication
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_game_controller_common.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_game_controller_auto_ref.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_game_controller_team.proto

# internal communication
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_game_controller_state.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_game_controller_change.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_game_controller_api.proto

# generate javascript code
pbjs -t static-module -w es6 -o src/proto.js proto/ssl_game_event.proto proto/ssl_referee.proto proto/ssl_game_controller_change.proto proto/ssl_game_controller_state.proto proto/ssl_game_controller_api.proto
