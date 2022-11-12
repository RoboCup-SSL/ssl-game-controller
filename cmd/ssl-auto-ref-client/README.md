# ssl-auto-ref-client

This folder contains a sample client that connects to the autoRef interface of the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an uvarint containing the message size in bytes, see https://cwiki.apache.org/confluence/display/GEODE/Delimiting+Protobuf+Messages for details.

The .proto files can be found in [../../proto](../../proto).

The default port is `10007`. The IP to connect to can be determined using the multicast referee messages.

## Connection Sequence
The connection is described in the following sequence diagram:

![sequence diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=QXV0b1JlZi0-Q29udHJvbGxlcjogZXN0YWJsaXNoIFRDUCBjb25uZWN0aW9uCgAbCgAjDmdlbmVyYXRlIG5ldyB0b2tlAB0OAF4HOiAAWwpSZXBseSAoACcGICkKAHMVAIEWB1JlZ2lzdHJhdGlvbiAoIGlkZW50aWZpZXIsIFsAaAYsIHNpZ25hdHVyZSBdICkAgRwMAIFMDnZlcmlmeQCBERIAERUASwkAgSUob2sgfCByZWplY3QgKQoKbG9vcCAAgT0dVG8AggYMcXVlc3QANjZlbmQKCg&s=napkin)

Source to generate the diagram: [communication_autoRef.txt](./communication_autoRef.txt)

## Connection stability
Clients should deal with connection losts (reconnect). The game-controller may be restarted due to various reasons like crashes or other technical issues. AutoRefs should reconnect automatically after a connection lost without human interaction.

## Sample client
The sample client, that is included in this folder, can be used to test the connection. It can be run with 
```bash
go run cmd/ssl-auto-ref-client/main.go
``` 
Pass it the `-h` parameter to get the available options.
