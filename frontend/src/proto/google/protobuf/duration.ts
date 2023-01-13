export interface Duration {
  seconds: number;
}

export const Duration = {
  fromJSON(object: any): Duration {
    return {seconds: Number(String(object).replace("s", ""))}
  },

  toJSON(message: Duration): unknown {
    return message.seconds + "s";
  },
};
