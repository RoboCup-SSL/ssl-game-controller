package state

import (
	"fmt"
)

func (x *RobotId) PrettyString() string {
	return fmt.Sprintf("%d %s", *x.Id, x.Team.String())
}
