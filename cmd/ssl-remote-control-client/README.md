# ssl-remote-control-client

This folder contains a sample client that connects to the remote-control interface of the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an uvarint containing the message size in bytes, see https://cwiki.apache.org/confluence/display/GEODE/Delimiting+Protobuf+Messages for details.

The .proto files can be found in [../../proto](../../proto).

The default port is `10011`. The IP to connect to can be determined using the multicast referee messages.

## Connection sequence
The connection is described in the following sequence diagram:

![sequence diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=IyBodHRwczovL3d3dy53ZWJzZXF1ZW5jZWRpYWdyYW1zLmNvbS8KClJlbW90ZUNvbnRyb2wtPgACB2xlcjogZXN0YWJsaXNoIFRDUCBjb25uZWN0aW9uCgAbCgAjDmdlbmVyYXRlIG5ldyB0b2tlAB0OAF4NOiAAYQpSZXBseSAoAC0GICkAeBwAgSINUmVnaXN0cmF0aW9uICggdGVhbSwgWwB0Biwgc2lnbmF0dXJlIF0gKQCBKAwAgVgOdmVyaWZ5AIEdEgARFQBLCQCBKy5vayB8IHJlamVjdCApCgpsb29wAIE8KVRvAIMKCgA6PGVuZAo&s=napkin)

Source to generate the diagram: [communication_remote-control.txt](./communication_remote-control.txt)

## Connection stability
Clients should deal with connection losts (reconnect). The game-controller may be restarted due to various reasons like crashes or other technical issues.

## Sample client
The sample client, that is included in this folder, can be used to test the connection. It can be run with 
```bash
go run cmd/ssl-remote-control-client/main.go
``` 
Pass it the `-h` parameter to get the available options.

By default, it tries to connect as "YELLOW".
