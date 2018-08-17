#!/bin/sh
go get -u github.com/golang/protobuf/protoc-gen-go

protoc --go_out=import_path=refproto:. *.proto