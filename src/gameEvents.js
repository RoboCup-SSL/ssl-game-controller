export const gameEventDetails = function(event) {
    for (let key of Object.keys(event)) {
        if (key !== 'origin' && key !== 'type') {
            return event[key];
        }
    }
    return {};
};

export const gameEventByTeam = function(gameEvent) {
    let eventDetails = gameEventDetails(gameEvent);
    if (eventDetails.hasOwnProperty('byTeam')) {
        return eventDetails.byTeam;
    }
    return '';
};

export const gameEventDetailsList = function(gameEvent) {
    let list = [{key: 'Origins', value: gameEvent.origin}];
    let i = 1;
    let eventDetails = gameEventDetails(gameEvent);
    Object.keys(eventDetails).forEach(function (key) {
        if (key !== 'byTeam') {
            list[i++] = {key: key, value: eventDetails[key]};
        }
    });
    return list;
};
