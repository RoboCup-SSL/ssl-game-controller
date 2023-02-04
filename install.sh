#!/usr/bin/env bash

set -euo pipefail

# frontend
(
  cd frontend
  npm install
  npm run build
)

# backend
go install -v ./cmd/ssl-game-controller
