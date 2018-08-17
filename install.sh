#!/bin/sh

set -e

# UI
npm install
npm run build

# backend
go get -v -d ./...
cd cmd/ssl-game-controller
go get -u -v github.com/gobuffalo/packr/packr
packr install
