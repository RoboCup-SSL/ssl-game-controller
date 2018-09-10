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
    return {x: parseInt(loc.x) / 1000.0, y: parseInt(loc.y) / 1000.0}
};