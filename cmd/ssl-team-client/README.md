# ssl-team-client

This folder contains a sample client that connects to the team interface of the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an uvarint containing the message size in bytes, see https://cwiki.apache.org/confluence/display/GEODE/Delimiting+Protobuf+Messages for details.

The .proto files can be found in [../../proto](../../proto).

The default port is `10008` for plain connections and 10108 for TLS encrypted connections. The IP to connect to can be determined using the multicast referee messages.

## Connection sequence
The connection is described in the following sequence diagram:

![sequence diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=IyBodHRwczovL3d3dy53ZWJzZXF1ZW5jZWRpYWdyYW1zLmNvbS8KClRlYW0tPkNvbnRyb2xsZXI6IGVzdGFibGlzaCBUQ1AgY29ubmVjdGlvbgoAGwoAIw5nZW5lcmF0ZSBuZXcgdG9rZQAdDlRlYW06IABYClJlcGx5ICgAJAYgKQBvE1RlYW1SZWdpc3RyYXRpb24gKCB0ZWFtTmFtZSwgWwBdBiwgc2lnbmF0dXJlIF0gKQCBEQwAgUEOdmVyaWZ5AIEGEgARFQBLCQCBHSVvayB8IHJlamVjdCApCgpsb29wCmFsdACBKAUgcmVxdWVzdHMgYSBjaGFuZ2UAgVIXVG8Agg8MAC8FAEozZWxzZSBjAIM9CQByDGRlY2lzAIMwEACDBRBUbwCCbwYAegYATV1uZAplbmQKCg&s=napkin)

Source to generate the diagram: [communication_team.puml](./communication_team.puml)

## Connection stability
Clients should deal with connection losts (reconnect). The game-controller may be restarted due to various reasons like crashes or other technical issues. Teams are not allowed to touch their system to reconnect to the game-controller, except during timeouts.

## Secure connection
The connection can optionally be secured by signing each request using a RSA key.

The private key is used on the client side to sign the complete message, excluding the signature itself. 
The public key must be provided to the game-controller. 
By default, the game-controller searches for public keys in [config/trusted_keys/team](../../config/trusted_keys/team) with the pattern `<teamName>.pub.pem`. The team name is case-sensitive and must be equal to one of the team names that are send via the referee protocol (including spaces, etc.). Each team can only connect once.

The [genKey.sh](../../tools/genKey.sh) script can be used to generate a new pair of public and private key.

The controller sends a token with each reply. It must be included in the next request, when using the signature. The token is required to avoid replay attacks.

If a public key is present for the team name provided during registration, a signature is required. Else, the signature is ignored. The controller reply indicates, if the last request could be verified.

### A note to security
There are currently two ways to secure the connection. Both are optional. And actually, even if you implement both, the connection is not 100% secure. This is, because the game-controller will be accessible by everyone during a tournament. So putting a private key/secret on the game-controller PC is no solution, as we can not keep it private.

If you provide your public key and keep your private key secret, all messages, sent by you, can be verified by the game-controller. So, only you can change a keeper or reply to an advantage choice.
However, messages from the game-controller can not be verified. They might even be dropped. Using TLS makes it a bit harder to manipulate the connection with quite little effort (because most languages have libraries for it), but the server key could still be stolen from the game-controller computer.

You have the choice to either skip the security layers completely and trust the community or to implement one or two of the security layers, just to be sure.
Providing the public key will at least help in avoiding that other teams accidentally connect as a wrong team.

Ideas on how to make the protocol more secure without making it significantly more complex are welcome.

## Sample client
The sample client, that is included in this folder, can be used to test the connection. It can be run with 
```bash
go run cmd/ssl-team-client/main.go
``` 
Pass it the `-h` parameter to get the available options.

By default, it tries to connect as "Test Team", which is also available in the UI. Make sure to select this team for yellow or blue.
