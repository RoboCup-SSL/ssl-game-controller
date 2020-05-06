package statemachine

import "github.com/golang/protobuf/jsonpb"

func (m *Change) StringJson() string {
	marshaler := jsonpb.Marshaler{}
	if str, err := marshaler.MarshalToString(m); err != nil {
		return err.Error()
	} else {
		return str
	}
}
