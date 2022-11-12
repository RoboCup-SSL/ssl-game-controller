# ssl-team-client

This folder contains a sample client that connects to the team interface of the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an uvarint containing the message size in bytes, see https://cwiki.apache.org/confluence/display/GEODE/Delimiting+Protobuf+Messages for details.

The .proto files can be found in [../../proto](../../proto).

The default port is `10008`. The IP to connect to can be determined using the multicast referee messages.

## Connection sequence
The connection is described in the following sequence diagram:

![sequence diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=IyBodHRwczovL3d3dy53ZWJzZXF1ZW5jZWRpYWdyYW1zLmNvbS8KClRlYW0tPkNvbnRyb2xsZXI6IGVzdGFibGlzaCBUQ1AgY29ubmVjdGlvbgoAGwoAIw5nZW5lcmF0ZSBuZXcgdG9rZQAdDlRlYW06IABYClJlcGx5ICgAJAYgKQBvE1RlYW1SZWdpc3RyYXRpb24gKCB0ZWFtTmFtZSwgWwBdBiwgc2lnbmF0dXJlIF0gKQCBEQwAgUEOdmVyaWZ5AIEGEgARFQBLCQCBHSVvayB8IHJlamVjdCApCgpsb29wCmFsdACBKAUgcmVxdWVzdHMgYSBjaGFuZ2UAgVIXVG8Agg8MAC8FAEozZWxzZSBjAIM9CQByDGRlY2lzAIMwEACDBRBUbwCCbwYAegYATV1uZAplbmQKCg&s=napkin)

Source to generate the diagram: [communication_team.txt](./communication_team.txt)

## Connection stability
Clients should deal with connection loss (reconnect). The game-controller may be restarted due to various reasons like crashes or other technical issues. Teams are not allowed to touch their system to reconnect to the game-controller, except during timeouts.

## Sample client
The sample client, that is included in this folder, can be used to test the connection. It can be run with 
```bash
go run cmd/ssl-team-client/main.go
``` 
Pass it the `-h` parameter to get the available options.

By default, it tries to connect as "Test Team", which is also available in the UI. Make sure to select this team for yellow or blue.
