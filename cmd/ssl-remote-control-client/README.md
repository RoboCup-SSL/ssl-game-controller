# ssl-remote-control-client

This folder contains a sample client that connects to the remote-control interface of the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an uvarint containing the message size in bytes, see https://cwiki.apache.org/confluence/display/GEODE/Delimiting+Protobuf+Messages for details.

The .proto files can be found in [../../proto](../../proto).

The default port is `10011` for plain connections and 10111 for TLS encrypted connections. The IP to connect to can be determined using the multicast referee messages.

## Connection sequence
The connection is described in the following sequence diagram:

![sequence diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=IyBodHRwczovL3d3dy53ZWJzZXF1ZW5jZWRpYWdyYW1zLmNvbS8KClJlbW90ZUNvbnRyb2wtPgACB2xlcjogZXN0YWJsaXNoIFRDUCBjb25uZWN0aW9uCgAbCgAjDmdlbmVyYXRlIG5ldyB0b2tlAB0OAF4NOiAAYQpSZXBseSAoAC0GICkAeBwAgSINUmVnaXN0cmF0aW9uICggdGVhbSwgWwB0Biwgc2lnbmF0dXJlIF0gKQCBKAwAgVgOdmVyaWZ5AIEdEgARFQBLCQCBKy5vayB8IHJlamVjdCApCgpsb29wAIE8KVRvAIMKCgA6PGVuZAo&s=napkin)

Source to generate the diagram: [communication_remote-control.puml](./communication_remote-control.puml)

## Connection stability
Clients should deal with connection losts (reconnect). The game-controller may be restarted due to various reasons like crashes or other technical issues.

## Secure connection
The connection can optionally be secured by signing each request using a RSA key.

The private key is used on the client side to sign the complete message, excluding the signature itself. 
The public key must be provided to the game-controller. 
By default, the game-controller searches for public keys in [config/trusted_keys/team](../../config/trusted_keys/team) with the pattern `<teamName>.pub.pem`. The team name is case-sensitive and must be equal to one of the team names that are send via the referee protocol (including spaces, etc.). Each team can only connect once.

The [genKey.sh](../../tools/genKey.sh) script can be used to generate a new pair of public and private key.

The controller sends a token with each reply. It must be included in the next request, when using the signature. The token is required to avoid replay attacks.

If a public key is present for the team provided during registration, a signature is required. Else, the signature is ignored. The controller reply indicates, if the last request could be verified.

## Sample client
The sample client, that is included in this folder, can be used to test the connection. It can be run with 
```bash
go run cmd/ssl-remote-control-client/main.go
``` 
Pass it the `-h` parameter to get the available options.

By default, it tries to connect as "YELLOW".
