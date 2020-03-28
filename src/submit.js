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
    submitChange({
        AddGameEvent: {
            gameEvent
        }
    })
};
