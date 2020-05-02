import {vueApp} from "./main";

export const submitChange = function (change) {
    change.origin = "UI";
    vueApp.$socket.sendObj({change});
};

export const submitNewCommand = function (type, forTeam) {
    submitChange({
        newCommand: {
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
        addGameEvent: {
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
