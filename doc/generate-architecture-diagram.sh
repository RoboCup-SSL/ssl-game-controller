#!/usr/bin/env bash
set -euo pipefail

readonly SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
readonly package_suffix="github.com/RoboCup-SSL/ssl-game-controller/internal/app"

cd "${SCRIPT_DIR}/../internal/app"

function generate_uml() {

  echo "@startuml"

  for f in **; do
    if [[ -d "$f" ]]; then
      echo "node \"$f\" {"
      echo "}"
    fi
  done

  echo ""

  for f in **; do
    if [[ -d "$f" ]]; then
      grep -ohP "$package_suffix/\K.+(?=\")" "$f"/*.go | sort | uniq | sed "s~^\(.*\)~\"$f\" --> \"\\1\"~" || true
    fi
  done

  echo "@enduml"
}

generate_uml > "${SCRIPT_DIR}/architecture.puml"
