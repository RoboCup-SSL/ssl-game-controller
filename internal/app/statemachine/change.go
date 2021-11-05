package statemachine

import (
	"google.golang.org/protobuf/encoding/protojson"
)

func (x *Change) StringJson() string {
	if b, err := protojson.Marshal(x); err != nil {
		return err.Error()
	} else {
		return string(b)
	}
}
