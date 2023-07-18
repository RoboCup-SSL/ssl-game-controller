# ssl-auto-ref-ci-client

This folder contains a sample client that connects to the CI interface of an autoRef and the game-controller.

## Protocol
The communication is established with a bidirectional TCP connection. Messages are encoded with [Protocol Buffers](https://developers.google.com/protocol-buffers/). Each message is preceded by an uvarint containing the message size in bytes, see https://cwiki.apache.org/confluence/display/GEODE/Delimiting+Protobuf+Messages for details.

The protobuf format can be found in [../../proto/ssl_autoref_ci.proto](../../proto/ssl_autoref_ci.proto).

The default port is `10013`.

## Sample client

The sample client, that is included in this folder, can be used to test the connection. It can be run with

```shell
go run cmd/ssl-auto-ref-ci-client/main.go
``` 

Pass it the `-h` parameter to get the available options.

## Test with TIGERs AutoRef

```shell
# Run GC in CI mode
ssl-game-controller -timeAcquisitionMode ci

# Run autoRef in active CI mode (headless)
docker run --net host -ti tigersmannheim/auto-referee -c -a -hl

# Alternatively: Run autoRef in active CI mode with UI (Linux only)
docker run --net host -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix -ti tigersmannheim/auto-referee-vnc -c -a

# Run test client
go run cmd/ssl-auto-ref-ci-client/main.go

# Send a FORCE_START via GC-UI and check if ball_left_field is detected
```
