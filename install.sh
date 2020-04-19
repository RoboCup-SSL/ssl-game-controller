#!/bin/sh

set -e

# UI
yarn install
yarn build

# backend
go get -v -d ./...
cd cmd/ssl-game-controller
packr install
