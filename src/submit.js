import {vueApp} from "./main";

export const submitChange = function (change) {
    change.origin = "UI";
    vueApp.$socket.sendObj({change});
};

export const submitNewCommand = function (type, forTeam) {
    submitChange({
        newCommandChange: {
            command: {
                type,
                forTeam
            }
        }
    })
};

export const submitGameEvent = function (gameEvent) {
    gameEvent.origin = ["UI"];
    submitChange({
        addGameEventChange: {
            gameEvent
        }
    })
};

export const resetMatch = function () {
    vueApp.$socket.sendObj({resetMatch: true});
};

export const submitConfigUpdate = function (configDelta) {
    vueApp.$socket.sendObj({configDelta});
};

export const setAutoContinue = function (enabled) {
    vueApp.$socket.sendObj({autoContinue: enabled});
};
