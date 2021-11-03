package sslconn

import (
	"bufio"
	"encoding/base64"
	"encoding/binary"
	"github.com/pkg/errors"
	"google.golang.org/protobuf/encoding/protowire"
	"google.golang.org/protobuf/proto"
	"io"
	"net"
)

// readDataLength reads the data length from message header
// The header is a 4 byte big endian uint32
func readDataLength(reader io.ByteReader) (length uint32, err error) {

	length64, err := binary.ReadUvarint(reader)
	length = uint32(length64)

	return
}

// SendMessage sends a protobuf message to the given connection
func SendMessage(conn net.Conn, message proto.Message) error {

	data, err := proto.Marshal(message)
	if err != nil {
		return err
	}

	size := uint64(len(data))
	data = append(protowire.AppendVarint([]byte{}, size), data...)

	if _, err = conn.Write(data); err != nil {
		return err
	}

	return nil
}

// Receive reads data and the preceding size from the given connection
func Receive(reader *bufio.Reader) ([]byte, error) {

	dataLength, err := readDataLength(reader)
	if err != nil {
		return nil, err
	}

	data := make([]byte, dataLength)
	if _, err = io.ReadFull(reader, data); err != nil {
		return nil, err
	}

	return data, nil
}

// Unmarshal a message, adding the encoded data to the error message on failure
func Unmarshal(data []byte, message proto.Message) error {
	if err := proto.Unmarshal(data, message); err != nil {
		encodedMessage := base64.StdEncoding.EncodeToString(data)
		return errors.Wrapf(err, "Could not unmarshal data: %v", encodedMessage)
	}
	return nil
}

// ReceiveMessage reads a protobuf message and the preceding size from the given connection
func ReceiveMessage(reader *bufio.Reader, message proto.Message) error {

	data, err := Receive(reader)
	if err != nil {
		return err
	}

	return Unmarshal(data, message)
}
