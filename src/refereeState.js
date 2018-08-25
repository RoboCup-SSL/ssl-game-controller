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