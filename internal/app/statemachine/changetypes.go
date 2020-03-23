package statemachine

import (
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

type ChangeOrigin string

type Change struct {
	ChangeOrigin ChangeOrigin `json:"changeOrigin,omitempty" yaml:"changeOrigin"`

	NewCommand           *NewCommand           `json:"newCommand,omitempty" yaml:"newCommand"`
	ChangeStage          *ChangeStage          `json:"changeStage,omitempty" yaml:"changeStage"`
	SetBallPlacementPos  *SetBallPlacementPos  `json:"setBallPlacementPos,omitempty" yaml:"setBallPlacementPos"`
	AddYellowCard        *AddYellowCard        `json:"addYellowCard,omitempty" yaml:"addYellowCard"`
	AddRedCard           *AddRedCard           `json:"addRedCard,omitempty" yaml:"addRedCard"`
	YellowCardOver       *YellowCardOver       `json:"yellowCardOver,omitempty" yaml:"yellowCardOver"`
	AddGameEvent         *AddGameEvent         `json:"addGameEvent,omitempty" yaml:"addGameEvent"`
	AddProposedGameEvent *AddProposedGameEvent `json:"addProposedGameEvent,omitempty" yaml:"addProposedGameEvent"`
	StartBallPlacement   *StartBallPlacement   `json:"startBallPlacement,omitempty" yaml:"startBallPlacement"`
	Continue             *Continue             `json:"continue,omitempty" yaml:"continue"`
	UpdateConfig         *UpdateConfig         `json:"updateConfig,omitempty" yaml:"updateConfig"`
	UpdateTeamState      *UpdateTeamState      `json:"updateTeamState,omitempty" yaml:"updateTeamState"`
	SwitchColors         *SwitchColors         `json:"switchColors,omitempty" yaml:"switchColors"`
	Revert               *Revert               `json:"revert,omitempty" yaml:"revert"`
}

type NewCommand struct {
	Command    state.RefCommand `json:"command" yaml:"command"`
	CommandFor state.Team       `json:"commandFor" yaml:"commandFor"`
}

type ChangeStage struct {
	NewStage state.Referee_Stage `json:"newStage" yaml:"newStage"`
}

type SetBallPlacementPos struct {
	Pos state.Location `json:"pos" yaml:"pos"`
}

type AddYellowCard struct {
	ForTeam           state.Team       `json:"forTeam" yaml:"forTeam"`
	CausedByGameEvent *state.GameEvent `json:"causedByGameEvent,omitempty" yaml:"causedByGameEvent"`
}

type AddRedCard struct {
	ForTeam           state.Team       `json:"forTeam" yaml:"forTeam"`
	CausedByGameEvent *state.GameEvent `json:"causedByGameEvent,omitempty" yaml:"causedByGameEvent"`
}

type YellowCardOver struct {
}

type AddGameEvent struct {
	GameEvent state.GameEvent `json:"gameEvent" yaml:"gameEvent"`
}

type AddProposedGameEvent struct {
	GameEvent state.ProposedGameEvent `json:"gameEvent" yaml:"gameEvent"`
}

type StartBallPlacement struct {
}

type Continue struct {
}

type UpdateConfig struct {
	Division          *config.Division                                `json:"division,omitempty" yaml:"division"`
	FirstKickoffTeam  *state.Team                                     `json:"firstKickoffTeam,omitempty" yaml:"firstKickoffTeam"`
	AutoContinue      *bool                                           `json:"autoContinue,omitempty" yaml:"autoContinue"`
	GameEventBehavior map[state.GameEventType]state.GameEventBehavior `json:"gameEventBehavior,omitempty" yaml:"gameEventBehavior"`
}

type UpdateTeamState struct {
	ForTeam state.Team `json:"forTeam"`

	TeamName              *string `json:"teamName,omitempty" yaml:"teamName"`
	Goals                 *int    `json:"goals,omitempty" yaml:"goals"`
	Goalkeeper            *int    `json:"goalkeeper,omitempty" yaml:"goalkeeper"`
	TimeoutsLeft          *int    `json:"timeoutsLeft,omitempty" yaml:"timeoutsLeft"`
	TimeoutTimeLeft       *string `json:"timeoutTimeLeft,omitempty" yaml:"timeoutTimeLeft"`
	OnPositiveHalf        *bool   `json:"onPositiveHalf,omitempty" yaml:"onPositiveHalf"`
	BallPlacementFailures *int    `json:"ballPlacementFailures,omitempty" yaml:"ballPlacementFailures"`
	CanPlaceBall          *bool   `json:"canPlaceBall,omitempty" yaml:"canPlaceBall"`
	BotSubstitutionIntend *bool   `json:"botSubstitutionIntend,omitempty" yaml:"botSubstitutionIntend"`

	YellowCards       map[int]state.YellowCard `json:"yellowCards,omitempty" yaml:"yellowCards"`
	YellowCardsRemove *int                     `json:"yellowCardsRemove,omitempty" yaml:"yellowCardsRemove"`
	RedCards          map[int]state.RedCard    `json:"redCards,omitempty" yaml:"redCards"`
	RedCardsRemove    *int                     `json:"yellowCardsRemove,omitempty" yaml:"yellowCardsRemove"`
}

type SwitchColors struct {
}

type Revert struct {
	StateId int `json:"stateId" yaml:"stateId"`
}

// String converts the change into a json string
func (c Change) String() string {
	bytes, e := json.Marshal(c)
	if e != nil {
		return e.Error()
	}
	return string(bytes)
}
