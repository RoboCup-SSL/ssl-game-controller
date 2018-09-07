# ssl-team-client

This folder contains a sample client that connects to the team interface of the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an unsigned big-endian 32bit integer containing the message size in bytes.

The .proto files can be found [here](../../pkg/refproto).

## Connection Sequence
The connection is described in the following sequence diagram:

![sequence diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=IyBodHRwczovL3d3dy53ZWJzZXF1ZW5jZWRpYWdyYW1zLmNvbS8KClRlYW0tPkNvbnRyb2xsZXI6IGVzdGFibGlzaCBUQ1AgY29ubmVjdGlvbgoAGwoAIw5nZW5lcmF0ZSBuZXcgdG9rZQAdDlRlYW06IABYClJlcGx5ICgAJAYgKQBvE1RlYW1SZWdpc3RyYXRpb24gKCB0ZWFtTmFtZSwgWwBdBiwgc2lnbmF0dXJlIF0gKQCBEQwAgUEOdmVyaWZ5AIEGEgARFQBLCQCBHSVvayB8IHJlamVjdCApCgpsb29wCmFsdACBKAUgcmVxdWVzdHMgYSBjaGFuZ2UAgVIXVG8Agg8MAC8FAEozZWxzZSBjAIM9CQByDGRlY2lzAIMwEACDBRBUbwCCbwYAegYAgQAqZW5kCmVuZAoK&s=napkin)

Source to generate the diagram: [communication_team.txt](./communication_team.txt)

## Secure Connection
The connection can optionally be secured by signing each request using a RSA key.

The private key is used on the client side to sign the complete message, excluding the signature itself. 
The public key must be provided to the game-controller. 
By default, the game-controller searches for public keys in [config/trusted_keys/team](../../config/trusted_keys/team) with the pattern `<teamName>.pub.pem`. The team name is case-sensitive and must be equal to one of the team names that are send via the referee protocol (including spaces, etc.). Each team can only connect once.

The [genKey.sh](../../tools/genKey.sh) script can be used to generate a new pair of public and private key.

The controller sends a token with each reply. It must be included in the next request, when using the signature. The token is required to avoid replay attacks.

If a public key is present for the team name provided during registration, a signature is required. Else, the signature is ignored. The controller reply indicates, if the last request could be verified.

## Sample client
The sample client, that is included in this folder, can be used to test the connection. It can be run with 
```bash
go run cmd/ssl-team-client/main.go
``` 
Pass it the `-h` parameter to get the available options.

By default, it tries to connect as "Test Team", which is also available in the UI. Make sure to select this team for yellow or blue.