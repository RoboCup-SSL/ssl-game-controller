export const TEAM_UNKNOWN = 0;
export const TEAM_YELLOW = 1;
export const TEAM_BLUE = 2;

export const Referee_NORMAL_FIRST_HALF_PRE = 0;
export const Referee_NORMAL_FIRST_HALF = 1;
export const Referee_NORMAL_HALF_TIME = 2;
export const Referee_NORMAL_SECOND_HALF_PRE = 3;
export const Referee_NORMAL_SECOND_HALF = 4;
export const Referee_EXTRA_TIME_BREAK = 5;
export const Referee_EXTRA_FIRST_HALF_PRE = 6;
export const Referee_EXTRA_FIRST_HALF = 7;
export const Referee_EXTRA_HALF_TIME = 8;
export const Referee_EXTRA_SECOND_HALF_PRE = 9;
export const Referee_EXTRA_SECOND_HALF = 10;
export const Referee_PENALTY_SHOOTOUT_BREAK = 11;
export const Referee_PENALTY_SHOOTOUT = 12;
export const Referee_POST_GAME = 13;

export const GameEventType_UNKNOWN_GAME_EVENT_TYPE = 0;
export const GameEventType_BALL_LEFT_FIELD_TOUCH_LINE = 6;
export const GameEventType_BALL_LEFT_FIELD_GOAL_LINE = 7;
export const GameEventType_AIMLESS_KICK = 11;
export const GameEventType_POSSIBLE_GOAL = 39;
export const GameEventType_NO_PROGRESS_IN_GAME = 2;
export const GameEventType_ATTACKER_DOUBLE_TOUCHED_BALL = 14;
export const GameEventType_BOUNDARY_CROSSING = 41;
export const GameEventType_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA = 19;
export const GameEventType_DEFENDER_IN_DEFENSE_AREA = 31;
export const GameEventType_KEEPER_HELD_BALL = 13;
export const GameEventType_BOT_DRIBBLED_BALL_TOO_FAR = 17;
export const GameEventType_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA = 15;
export const GameEventType_BOT_KICKED_BALL_TOO_FAST = 18;
export const GameEventType_BOT_CRASH_UNIQUE = 22;
export const GameEventType_BOT_CRASH_DRAWN = 21;
export const GameEventType_DEFENDER_TOO_CLOSE_TO_KICK_POINT = 29;
export const GameEventType_BOT_TOO_FAST_IN_STOP = 28;
export const GameEventType_BOT_INTERFERED_PLACEMENT = 20;
export const GameEventType_GOAL = 8;
export const GameEventType_INVALID_GOAL = 42;
export const GameEventType_PLACEMENT_FAILED = 3;
export const GameEventType_PLACEMENT_SUCCEEDED = 5;
export const GameEventType_MULTIPLE_CARDS = 32;
export const GameEventType_MULTIPLE_FOULS = 34;
export const GameEventType_BOT_SUBSTITUTION = 37;
export const GameEventType_UNSPORTING_BEHAVIOR_MINOR = 35;
export const GameEventType_UNSPORTING_BEHAVIOR_MAJOR = 36;
export const GameEventType_BOT_PUSHED_BOT = 24;
export const GameEventType_BOT_HELD_BALL_DELIBERATELY = 26;
export const GameEventType_BOT_TIPPED_OVER = 27;


export let getNextStage = function (stage) {
    if (stage < Referee_POST_GAME) {
        return stage + 1;
    }
    return stage;
};

export let canEndGameFromStage = function (stage) {
    return stage === Referee_NORMAL_SECOND_HALF
        || stage === Referee_EXTRA_SECOND_HALF
        || stage === Referee_PENALTY_SHOOTOUT;
};

export let isNonPausedStage = function (state) {
    return state.stage === Referee_NORMAL_FIRST_HALF
        || state.stage === Referee_NORMAL_SECOND_HALF
        || state.stage === Referee_EXTRA_FIRST_HALF
        || state.stage === Referee_EXTRA_SECOND_HALF
        || state.stage === Referee_PENALTY_SHOOTOUT;
};

export let isPausedStage = function (state) {
    return state.stage === Referee_NORMAL_HALF_TIME
        || state.stage === Referee_EXTRA_TIME_BREAK
        || state.stage === Referee_EXTRA_HALF_TIME
        || state.stage === Referee_PENALTY_SHOOTOUT_BREAK;
};

export let isPreStage = function (state) {
    return state.stage === Referee_NORMAL_FIRST_HALF_PRE
        || state.stage === Referee_NORMAL_SECOND_HALF_PRE
        || state.stage === Referee_EXTRA_FIRST_HALF_PRE
        || state.stage === Referee_EXTRA_SECOND_HALF_PRE
        || state.stage === Referee_PENALTY_SHOOTOUT;
};

export let convertStringLocation = function (loc) {
    if (loc.x === null && loc.y === null) {
        return null;
    }
    if (loc.x === null || loc.x === "") {
        loc.x = "0";
    }
    if (loc.y === null || loc.y === "") {
        loc.y = "0";
    }
    return {x: parseFloat(loc.x), y: parseFloat(loc.y)}
};
