#!/bin/sh

set -e

cd ui
npm install
npm run build
cd ..

go get -v -d ./...
cd cmd/ssl-game-controller
go get -u -v github.com/gobuffalo/packr/packr
packr install
