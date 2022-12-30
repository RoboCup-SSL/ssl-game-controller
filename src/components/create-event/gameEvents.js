export const matchProceedingEvents = [
    {
        name: 'No progress in game',
        component: 'NoProgressInGame',
        type: 'auto'
    },
    {
        name: 'Attacker double touched ball',
        component: 'AttackerDoubleTouchedBall',
        type: 'auto'
    },
    {
        name: 'Placement failed',
        component: 'PlacementFailed',
        type: 'auto'
    },
    {
        name: 'Placement succeeded',
        component: 'PlacementSucceeded',
        type: 'auto'
    },
    {
        name: 'Penalty kick failed',
        component: 'PenaltyKickFailed',
        type: 'auto'
    },
];
export const ballLeftFieldEvents = [
    {
        name: 'via touch line',
        component: 'BallLeftFieldTouchLine',
        type: 'auto'
    },
    {
        name: 'via goal line',
        component: 'BallLeftFieldGoalLine',
        type: 'auto'
    },
    {
        name: 'Ball was kicked aimlessly',
        component: 'AimlessKick',
        type: 'auto'
    },
    {
        name: 'Possible Goal (autoRef detection)',
        component: 'PossibleGoal',
        type: 'auto'
    },
    {
        name: 'Goal (valid goal, approved by referee)',
        component: 'Goal',
        type: 'manual'
    }
];
export const foulEvents = [
    {
        name: 'Attacker was too close to defense area during free kick',
        component: 'AttackerTooCloseToDefenseArea',
        type: 'auto'
    },
    {
        name: 'Defender touched ball in defense area',
        component: 'DefenderInDefenseArea',
        type: 'auto'
    },
    {
        name: 'Bot kicked ball over the boundary',
        component: 'BoundaryCrossing',
        type: 'auto'
    },
    {
        name: 'Keeper held the ball too long',
        component: 'KeeperHeldBall',
        type: 'auto'
    },
    {
        name: 'Ball was dribbled too far',
        component: 'BotDribbledBallTooFar',
        type: 'auto'
    },
    {
        name: 'Attacker was in opponent defense area while touching the ball',
        component: 'AttackerTouchedBallInDefenseArea',
        type: 'auto'
    },
    {
        name: 'Ball was kicked too fast',
        component: 'BotKickedBallTooFast',
        type: 'auto'
    },
    {
        name: 'Two bots crashed with similar speeds',
        component: 'BotCrashDrawn',
        type: 'auto'
    },
    {
        name: 'Bot crashed into another bot',
        component: 'BotCrashUnique',
        type: 'auto'
    },
    {
        name: 'Defender was too close to kick point',
        component: 'DefenderTooCloseToKickPoint',
        type: 'auto'
    },
    {
        name: 'Robot too fast during stop',
        component: 'BotTooFastInStop',
        type: 'auto'
    },
    {
        name: 'Opponent bot interfered ball placement procedure',
        component: 'BotInterferedPlacement',
        type: 'auto'
    },
    {
        name: 'One bot pushed another one',
        component: 'BotPushedBot',
        type: 'manual'
    },
    {
        name: 'Bot held ball deliberately',
        component: 'BotHeldBallDeliberately',
        type: 'manual'
    },
    {
        name: 'A bot tipped over',
        component: 'BotTippedOver',
        type: 'manual'
    },
];

export const unsportingBehaviorEvents = [
    {
        name: 'Minor unsporting behavior',
        component: 'UnsportingBehaviorMinor',
        type: 'manual'
    },
    {
        name: 'Major unsporting behavior',
        component: 'UnsportingBehaviorMajor',
        type: 'manual'
    },
];
