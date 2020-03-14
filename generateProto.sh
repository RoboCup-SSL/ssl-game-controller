#!/bin/bash

# Fail on errors
set -e

# Update to latest protobuf compiler
go get -u github.com/golang/protobuf/protoc-gen-go

protoc -I"./proto/vision" \
  --go_out=import_path="vision:./internal/app/vision" \
  ./proto/vision/*.proto

protoc -I"./proto/refproto" \
  --go_out=import_path="refproto:./internal/app/refproto" \
  ./proto/refproto/*.proto
