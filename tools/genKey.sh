#!/usr/bin/env bash

set -e

name=$1
if [[ -z "${name}" ]]; then
    echo "Specify a name for the key"
    exit 1
fi

privateName="${name}.key.pem"
publicName="${name}.pub.pem"

# Generate an RSA private key, of size 2048
openssl genrsa -out "${privateName}" 2048

# Extract the public key from the key pair
openssl rsa -in "${privateName}" -outform PEM -pubout -out "${publicName}"
