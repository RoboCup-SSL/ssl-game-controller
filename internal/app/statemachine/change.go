package statemachine

import (
	"google.golang.org/protobuf/encoding/protojson"
)

func (m *Change) StringJson() string {
	if b, err := protojson.Marshal(m); err != nil {
		return err.Error()
	} else {
		return string(b)
	}
}
