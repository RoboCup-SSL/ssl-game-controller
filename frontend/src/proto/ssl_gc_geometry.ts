/* eslint-disable */

/** A vector with two dimensions */
export interface Vector2 {
  x?: number | undefined;
  y?: number | undefined;
}

/** A vector with three dimensions */
export interface Vector3 {
  x?: number | undefined;
  y?: number | undefined;
  z?: number | undefined;
}

export const Vector2 = {
  fromJSON(object: any): Vector2 {
    return {
      x: isSet(object.x) ? globalThis.Number(object.x) : undefined,
      y: isSet(object.y) ? globalThis.Number(object.y) : undefined,
    };
  },

  toJSON(message: Vector2): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = message.y;
    }
    return obj;
  },
};

export const Vector3 = {
  fromJSON(object: any): Vector3 {
    return {
      x: isSet(object.x) ? globalThis.Number(object.x) : undefined,
      y: isSet(object.y) ? globalThis.Number(object.y) : undefined,
      z: isSet(object.z) ? globalThis.Number(object.z) : undefined,
    };
  },

  toJSON(message: Vector3): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = message.y;
    }
    if (message.z !== undefined && message.z !== 0) {
      obj.z = message.z;
    }
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
