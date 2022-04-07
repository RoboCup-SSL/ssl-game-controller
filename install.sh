#!/bin/sh

set -e

# UI
yarn install
yarn build

# backend
go install -v ./cmd/ssl-game-controller
