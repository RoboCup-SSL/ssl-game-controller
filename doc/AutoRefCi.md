# Auto-referee continuous integration (CI)

To ease integration of the ssl-game-controller and the auto-referee implementations, there are separate unicast protocols that avoid the asynchronous communication via multicast and allows for integration with simulators and running at non-realtime speeds.

The default port is `10013`.

## Connection sequence

The connection is described in the following sequence diagram:

![sequence diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=bG9vcAoKU2ltdWxhdG9yIC0-IAADCjogcwATBmUgc3RlcAAZDkF1dG9SZWYgOgACCENpSW5wdXQgeyBTU0xfV3JhcHBlclBha2V0LCBSZWZlcmVlTXNnIH0KCm9wdAoANwgtPiBHQwA7ClRvQ29udHJvbGxlciB7IEdhbWVFdmVudCB9CkdDAGkOAB8KVG8AgQUIeyBSZXBseSB9CmVuZAoAWQwAgUoMAIEoCU91dACBLAZUcmFja2VyAIEsCWNrZXQgfQCCCg4AgSIFAIFbCgAcFwCBIAYAgjgMAFwLAIF5DmVuZAo&s=default)

Source to generate the diagram: [autoRefCi.puml](autoRefCi.puml)

## Protobuf protocol

All protobuf files can be found in [../proto](../proto).
