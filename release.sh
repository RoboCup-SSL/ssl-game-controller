#!/usr/bin/env bash

# stop on errors
set -e

echo "Build UI for production"
cd ui
npm run build
cd ..

echo "Build backend and include static UI files with packr into binary"
cd cmd/ssl-game-controller
packr install

if [ -z "${GOPATH}" ]; then
    GOPATH="~/go"
fi
echo "Self-contained binary can be found here: ${GOPATH}/bin/ssl-game-controller"