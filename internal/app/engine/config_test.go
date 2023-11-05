package engine

import (
	"regexp"
	"sort"
	"strings"
	"testing"
)

func TestConfig_DefaultTeams(t *testing.T) {
	var teams []string
	var teamMap = make(map[string]bool)
	m1 := regexp.MustCompile(`[^a-z]`)

	for _, team := range defaultTeams {
		simplifiedName := m1.ReplaceAllString(strings.ToLower(team), "")
		teams = append(teams, simplifiedName)
		teamMap[simplifiedName] = true
	}

	teamsSorted := append([]string(nil), teams...)
	sort.Strings(teamsSorted)

	if !sort.StringsAreSorted(teams) {
		t.Errorf("Default teams are not sorted: \n%v\n%v", teams, teamsSorted)
	}

	if len(teams) != len(teamMap) {
		t.Errorf("Default teams contains duplicates: %v", teamsSorted)
	}
}
