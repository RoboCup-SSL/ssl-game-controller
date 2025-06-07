# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Building and Running

```bash
# Build all binaries and frontend
make install

# Run the game controller
go run cmd/ssl-game-controller/main.go

# Run with hot-reload development mode  
make dev

# Build frontend only
cd frontend && npm run build

# Run frontend development server
cd frontend && npm run dev
```

### Testing and Quality

```bash
# Run all Go tests
make test

# Run frontend linting
cd frontend && npm run lint

# Run frontend type checking
cd frontend && npm run type-check
```

### Protocol Buffer Generation

```bash
# Regenerate protobuf code after modifying .proto files
make proto
```

### Docker

```bash
# Build Docker images for game controller and ref client
make docker

# Run complete test environment with autoRefs
docker compose up
```

## Architecture Overview

This is the SSL Game Controller for RoboCup Small Size League - a Go backend with Vue.js frontend that manages robot
soccer matches.

### Core Components

**Game Engine** (`internal/app/engine/`): Central state machine that processes all game state changes through a
queue-based system. Maintains current match state and coordinates with various processors for rule enforcement.

**State Machine** (`internal/app/statemachine/`): Translates change requests into new game states. Handles all game
transitions including commands, stages, cards, and game events.

**State Store** (`internal/app/store/`): Append-only persistent storage for all state changes, enabling replay and
revert functionality.

**Communication Layers**:

- Frontend communicates via WebSocket API (`/api/control`) using protobuf messages
- External clients connect via TCP with protobuf protocols for teams, autorefs, remote control, and CI integration
- UDP multicast publishes referee messages to all match participants

### Key Protocols

**Client Types** (all in `proto/rcon/`):

- `ssl_gc_rcon_team.proto`: Team communication (timeouts, substitutions, advantage choice)
- `ssl_gc_rcon_autoref.proto`: Automated referee game event proposals
- `ssl_gc_rcon_remotecontrol.proto`: Manual referee control
- `ssl_gc_ci.proto`: CI integration for testing

**Core Data** (in `proto/state/`):

- `ssl_gc_state.proto`: Complete game state representation
- `ssl_gc_game_event.proto`: 80+ types of game events and violations
- `ssl_gc_referee_message.proto`: Standard SSL referee message format

### Frontend Structure

**Technology**: Vue.js 3 + TypeScript + Quasar UI framework
**State Management**: Pinia stores in `frontend/src/store/`
**Components**: Organized by feature in `frontend/src/components/`

- `control/`: Manual game control buttons
- `match/`: Live match display and event management
- `team/`: Team-specific settings and information
- `game-events/`: Game event input forms and displays

### Adding New Teams

For new teams, add the team name to `defaultTeams` in `internal/app/engine/config.go` and submit a pull request.

### Development Modes

**System Mode** (default): Uses system time
**Vision Mode**: Uses ssl-vision timestamps for simulation integration  
**CI Mode**: Full control via TCP for automated testing - recommended for simulator integration

CI mode enables:

- No multicast network traffic (set `network.publish-address` to empty)
- Controlled data flow and timing
- Direct ssl-vision tracking data input
- Integration with test frameworks

### External Dependencies

- **ssl-vision**: Provides field geometry (required)
- **Tracker source**: Ball/robot positions for advanced rule checking (TIGERs AutoRef or ER-Force AutoRef)

Without tracker source, the following features are disabled:

- Ball placement progress checking
- Robot count validation
- Game continuation readiness
- No progress detection
- Goalkeeper change validation
