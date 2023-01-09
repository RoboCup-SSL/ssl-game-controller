export interface Duration {
  seconds: number;
}

function createBaseDuration(): Duration {
  return {seconds: 0};
}

export const Duration = {
  fromJSON(object: any): Duration {
    return {seconds: Number(String(object).replace("s", ""))}
  },

  toJSON(message: Duration): unknown {
    return message.seconds + "s";
  },
};
