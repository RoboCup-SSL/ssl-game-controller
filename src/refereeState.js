import {Referee} from "./proto";

export const TEAM_UNKNOWN = 'UNKNOWN';
export const TEAM_YELLOW = 'YELLOW';
export const TEAM_BLUE = 'BLUE';

export const stageNames = {
    'NORMAL_FIRST_HALF_PRE': 'Pre-First Half',
    'NORMAL_FIRST_HALF': 'First Half',
    'NORMAL_HALF_TIME': 'Half Time',
    'NORMAL_SECOND_HALF_PRE': 'Pre-Second Half',
    'NORMAL_SECOND_HALF': 'Second Half',
    'EXTRA_TIME_BREAK': 'Overtime Break',
    'EXTRA_FIRST_HALF_PRE': 'Pre-Overtime First Half',
    'EXTRA_FIRST_HALF': 'Overtime First Half',
    'EXTRA_HALF_TIME': 'Overtime Half Time',
    'EXTRA_SECOND_HALF_PRE': 'Pre-Overtime Second Half',
    'EXTRA_SECOND_HALF': 'Overtime Second Half',
    'PENALTY_SHOOTOUT_BREAK': 'Shootout Break',
    'PENALTY_SHOOTOUT': 'Shootout',
    'POST_GAME': 'End of Game',
};

export let getNextStage = function (stage) {
    let curStage = Referee.Stage[stage];
    if (curStage < Referee.Stage.POST_GAME) {
        return Referee.Stage.__proto__[curStage + 1];
    }
    return stage;
};

export let canEndGameFromStage = function (stage) {
    return stage === 'NORMAL_SECOND_HALF'
        || stage === 'EXTRA_SECOND_HALF'
        || stage === 'PENALTY_SHOOTOUT';
};

export let isNonPausedStage = function (state) {
    return state.stage === 'NORMAL_FIRST_HALF'
        || state.stage === 'NORMAL_SECOND_HALF'
        || state.stage === 'EXTRA_FIRST_HALF'
        || state.stage === 'EXTRA_SECOND_HALF'
        || state.stage === 'PENALTY_SHOOTOUT';
};

export let isPausedStage = function (state) {
    return state.stage === 'NORMAL_HALF_TIME'
        || state.stage === 'EXTRA_TIME_BREAK'
        || state.stage === 'EXTRA_HALF_TIME'
        || state.stage === 'PENALTY_SHOOTOUT_BREAK';
};

export let isPreStage = function (state) {
    return state.stage === 'NORMAL_FIRST_HALF_PRE'
        || state.stage === 'NORMAL_SECOND_HALF_PRE'
        || state.stage === 'EXTRA_FIRST_HALF_PRE'
        || state.stage === 'EXTRA_SECOND_HALF_PRE'
        || state.stage === 'PENALTY_SHOOTOUT';
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
