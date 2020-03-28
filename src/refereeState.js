export const TEAM_UNKNOWN = 'UNKNOWN';
export const TEAM_YELLOW = 'YELLOW';
export const TEAM_BLUE = 'BLUE';

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
