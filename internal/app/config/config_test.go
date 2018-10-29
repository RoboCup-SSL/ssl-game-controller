package config

import (
	"reflect"
	"testing"
)

func Test_LoadConfig(t *testing.T) {
	defConfig := DefaultControllerConfig()
	loadedConfig, err := LoadControllerConfig("testdata/config.yaml")

	if err != nil {
		t.Fatal(err)
	}

	if !reflect.DeepEqual(defConfig, loadedConfig) {
		t.Fatalf("Configs are not equal:\ndefault:\n%v\nloaded:\n%v", defConfig, loadedConfig)
	}
}
