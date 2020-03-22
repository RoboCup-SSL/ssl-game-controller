export const TEAM_UNKNOWN = 0;
export const TEAM_YELLOW = 1;
export const TEAM_BLUE = 2;

export const stages = [
    "Pre-First Half",
    "First Half",
    "Half Time",
    "Pre-Second Half",
    "Second Half",
    "Overtime Break",
    "Pre-Overtime First Half",
    "Overtime First Half",
    "Overtime Half Time",
    "Pre-Overtime Second Half",
    "Overtime Second Half",
    "Shootout Break",
    "Shootout",
    "End of Game",
];

export let getNextStage = function (stage) {
    let i = stages.indexOf(stage);
    if (i >= 0 && i < stages.length - 1) {
        return stages[i + 1];
    }
    return stage;
};

export let canEndGameFromStage = function (stage) {
    return stage === 'Second Half'
        || stage === 'Overtime Second Half'
        || stage === 'Shootout';
};

export let isNonPausedStage = function (state) {
    return state.stage === 'First Half'
        || state.stage === 'Second Half'
        || state.stage === 'Overtime First Half'
        || state.stage === 'Overtime Second Half'
        || state.stage === 'Shootout';
};

export let isPreStage = function (state) {
    return state.stage === 'Pre-First Half'
        || state.stage === 'Pre-Second Half'
        || state.stage === 'Pre-Overtime First Half'
        || state.stage === 'Pre-Overtime Second Half'
        || state.stage === 'Shootout';
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
