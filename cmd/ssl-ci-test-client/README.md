# ssl-ci-test-client

This folder contains a sample client that connects to the CI interface of the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an uvarint containing the message size in bytes, see https://cwiki.apache.org/confluence/display/GEODE/Delimiting+Protobuf+Messages for details.

The protobuf format can be found in [../../proto/ssl_gc_ci.proto](../../proto/ssl_gc_ci.proto).

The default port is `10009`.

## Sample client
The sample client, that is included in this folder, can be used to test the connection. It can be run with 
```bash
go run cmd/ssl-ci-test-client/main.go
``` 
Pass it the `-h` parameter to get the available options.
