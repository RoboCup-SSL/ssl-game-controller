/* eslint-disable */

/** A vector with two dimensions */
export interface Vector2 {
  x?: number;
  y?: number;
}

/** A vector with three dimensions */
export interface Vector3 {
  x?: number;
  y?: number;
  z?: number;
}

export const Vector2 = {
  fromJSON(object: any): Vector2 {
    return { x: isSet(object.x) ? Number(object.x) : 0, y: isSet(object.y) ? Number(object.y) : 0 };
  },

  toJSON(message: Vector2): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },
};

export const Vector3 = {
  fromJSON(object: any): Vector3 {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
    };
  },

  toJSON(message: Vector3): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
