#!/bin/bash

# Fail on errors
set -e
# Print commands
set -x

# install latest protoc-gen-go
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

# common GC
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_common.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_geometry.proto

# vision
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_detection.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_geometry.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_wrapper.proto

# tracked vision
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_detection_tracked.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_vision_wrapper_tracked.proto

# game events
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_game_event.proto

# referee message
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_referee_message.proto

# remote communication
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_rcon.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_rcon_autoref.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_rcon_team.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_rcon_remotecontrol.proto

# internal communication
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_state.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_change.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_api.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_engine.proto
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_engine_config.proto

# continuous integration communication
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/ssl_gc_ci.proto

# generate javascript code
pbjs -t static-module -w es6 -o src/proto.js \
  proto/ssl_gc_common.proto \
  proto/ssl_gc_geometry.proto \
  proto/ssl_gc_game_event.proto \
  proto/ssl_gc_referee_message.proto \
  proto/ssl_gc_change.proto \
  proto/ssl_gc_state.proto \
  proto/ssl_gc_api.proto \
  proto/ssl_gc_engine.proto
