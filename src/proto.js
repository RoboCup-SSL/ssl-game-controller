/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * Team enum.
 * @exports Team
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} YELLOW=1 YELLOW value
 * @property {number} BLUE=2 BLUE value
 */
$root.Team = (function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "YELLOW"] = 1;
    values[valuesById[2] = "BLUE"] = 2;
    return values;
})();

export const RobotId = $root.RobotId = (() => {

    /**
     * Properties of a RobotId.
     * @exports IRobotId
     * @interface IRobotId
     * @property {number|null} [id] RobotId id
     * @property {Team|null} [team] RobotId team
     */

    /**
     * Constructs a new RobotId.
     * @exports RobotId
     * @classdesc Represents a RobotId.
     * @implements IRobotId
     * @constructor
     * @param {IRobotId=} [properties] Properties to set
     */
    function RobotId(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RobotId id.
     * @member {number} id
     * @memberof RobotId
     * @instance
     */
    RobotId.prototype.id = 0;

    /**
     * RobotId team.
     * @member {Team} team
     * @memberof RobotId
     * @instance
     */
    RobotId.prototype.team = 0;

    /**
     * Creates a new RobotId instance using the specified properties.
     * @function create
     * @memberof RobotId
     * @static
     * @param {IRobotId=} [properties] Properties to set
     * @returns {RobotId} RobotId instance
     */
    RobotId.create = function create(properties) {
        return new RobotId(properties);
    };

    /**
     * Encodes the specified RobotId message. Does not implicitly {@link RobotId.verify|verify} messages.
     * @function encode
     * @memberof RobotId
     * @static
     * @param {IRobotId} message RobotId message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotId.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        if (message.team != null && message.hasOwnProperty("team"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.team);
        return writer;
    };

    /**
     * Encodes the specified RobotId message, length delimited. Does not implicitly {@link RobotId.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RobotId
     * @static
     * @param {IRobotId} message RobotId message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotId.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RobotId message from the specified reader or buffer.
     * @function decode
     * @memberof RobotId
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RobotId} RobotId
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotId.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RobotId();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.uint32();
                break;
            case 2:
                message.team = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RobotId message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RobotId
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RobotId} RobotId
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotId.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RobotId message.
     * @function verify
     * @memberof RobotId
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RobotId.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.team != null && message.hasOwnProperty("team"))
            switch (message.team) {
            default:
                return "team: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a RobotId message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RobotId
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RobotId} RobotId
     */
    RobotId.fromObject = function fromObject(object) {
        if (object instanceof $root.RobotId)
            return object;
        let message = new $root.RobotId();
        if (object.id != null)
            message.id = object.id >>> 0;
        switch (object.team) {
        case "UNKNOWN":
        case 0:
            message.team = 0;
            break;
        case "YELLOW":
        case 1:
            message.team = 1;
            break;
        case "BLUE":
        case 2:
            message.team = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a RobotId message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RobotId
     * @static
     * @param {RobotId} message RobotId
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RobotId.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.team = options.enums === String ? "UNKNOWN" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.team != null && message.hasOwnProperty("team"))
            object.team = options.enums === String ? $root.Team[message.team] : message.team;
        return object;
    };

    /**
     * Converts this RobotId to JSON.
     * @function toJSON
     * @memberof RobotId
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RobotId.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RobotId;
})();

export const Vector2 = $root.Vector2 = (() => {

    /**
     * Properties of a Vector2.
     * @exports IVector2
     * @interface IVector2
     * @property {number} x Vector2 x
     * @property {number} y Vector2 y
     */

    /**
     * Constructs a new Vector2.
     * @exports Vector2
     * @classdesc Represents a Vector2.
     * @implements IVector2
     * @constructor
     * @param {IVector2=} [properties] Properties to set
     */
    function Vector2(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Vector2 x.
     * @member {number} x
     * @memberof Vector2
     * @instance
     */
    Vector2.prototype.x = 0;

    /**
     * Vector2 y.
     * @member {number} y
     * @memberof Vector2
     * @instance
     */
    Vector2.prototype.y = 0;

    /**
     * Creates a new Vector2 instance using the specified properties.
     * @function create
     * @memberof Vector2
     * @static
     * @param {IVector2=} [properties] Properties to set
     * @returns {Vector2} Vector2 instance
     */
    Vector2.create = function create(properties) {
        return new Vector2(properties);
    };

    /**
     * Encodes the specified Vector2 message. Does not implicitly {@link Vector2.verify|verify} messages.
     * @function encode
     * @memberof Vector2
     * @static
     * @param {IVector2} message Vector2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector2.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
        writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
        return writer;
    };

    /**
     * Encodes the specified Vector2 message, length delimited. Does not implicitly {@link Vector2.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Vector2
     * @static
     * @param {IVector2} message Vector2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector2.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Vector2 message from the specified reader or buffer.
     * @function decode
     * @memberof Vector2
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Vector2} Vector2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector2.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vector2();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.x = reader.float();
                break;
            case 2:
                message.y = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("x"))
            throw $util.ProtocolError("missing required 'x'", { instance: message });
        if (!message.hasOwnProperty("y"))
            throw $util.ProtocolError("missing required 'y'", { instance: message });
        return message;
    };

    /**
     * Decodes a Vector2 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Vector2
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Vector2} Vector2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector2.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Vector2 message.
     * @function verify
     * @memberof Vector2
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Vector2.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.x !== "number")
            return "x: number expected";
        if (typeof message.y !== "number")
            return "y: number expected";
        return null;
    };

    /**
     * Creates a Vector2 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Vector2
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Vector2} Vector2
     */
    Vector2.fromObject = function fromObject(object) {
        if (object instanceof $root.Vector2)
            return object;
        let message = new $root.Vector2();
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        return message;
    };

    /**
     * Creates a plain object from a Vector2 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Vector2
     * @static
     * @param {Vector2} message Vector2
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Vector2.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        return object;
    };

    /**
     * Converts this Vector2 to JSON.
     * @function toJSON
     * @memberof Vector2
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Vector2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Vector2;
})();

export const Vector3 = $root.Vector3 = (() => {

    /**
     * Properties of a Vector3.
     * @exports IVector3
     * @interface IVector3
     * @property {number} x Vector3 x
     * @property {number} y Vector3 y
     * @property {number} z Vector3 z
     */

    /**
     * Constructs a new Vector3.
     * @exports Vector3
     * @classdesc Represents a Vector3.
     * @implements IVector3
     * @constructor
     * @param {IVector3=} [properties] Properties to set
     */
    function Vector3(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Vector3 x.
     * @member {number} x
     * @memberof Vector3
     * @instance
     */
    Vector3.prototype.x = 0;

    /**
     * Vector3 y.
     * @member {number} y
     * @memberof Vector3
     * @instance
     */
    Vector3.prototype.y = 0;

    /**
     * Vector3 z.
     * @member {number} z
     * @memberof Vector3
     * @instance
     */
    Vector3.prototype.z = 0;

    /**
     * Creates a new Vector3 instance using the specified properties.
     * @function create
     * @memberof Vector3
     * @static
     * @param {IVector3=} [properties] Properties to set
     * @returns {Vector3} Vector3 instance
     */
    Vector3.create = function create(properties) {
        return new Vector3(properties);
    };

    /**
     * Encodes the specified Vector3 message. Does not implicitly {@link Vector3.verify|verify} messages.
     * @function encode
     * @memberof Vector3
     * @static
     * @param {IVector3} message Vector3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector3.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
        writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
        writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
        return writer;
    };

    /**
     * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link Vector3.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Vector3
     * @static
     * @param {IVector3} message Vector3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector3.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Vector3 message from the specified reader or buffer.
     * @function decode
     * @memberof Vector3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Vector3} Vector3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector3.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vector3();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.x = reader.float();
                break;
            case 2:
                message.y = reader.float();
                break;
            case 3:
                message.z = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("x"))
            throw $util.ProtocolError("missing required 'x'", { instance: message });
        if (!message.hasOwnProperty("y"))
            throw $util.ProtocolError("missing required 'y'", { instance: message });
        if (!message.hasOwnProperty("z"))
            throw $util.ProtocolError("missing required 'z'", { instance: message });
        return message;
    };

    /**
     * Decodes a Vector3 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Vector3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Vector3} Vector3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector3.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Vector3 message.
     * @function verify
     * @memberof Vector3
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Vector3.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.x !== "number")
            return "x: number expected";
        if (typeof message.y !== "number")
            return "y: number expected";
        if (typeof message.z !== "number")
            return "z: number expected";
        return null;
    };

    /**
     * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Vector3
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Vector3} Vector3
     */
    Vector3.fromObject = function fromObject(object) {
        if (object instanceof $root.Vector3)
            return object;
        let message = new $root.Vector3();
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        if (object.z != null)
            message.z = Number(object.z);
        return message;
    };

    /**
     * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Vector3
     * @static
     * @param {Vector3} message Vector3
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Vector3.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
            object.z = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        if (message.z != null && message.hasOwnProperty("z"))
            object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
        return object;
    };

    /**
     * Converts this Vector3 to JSON.
     * @function toJSON
     * @memberof Vector3
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Vector3.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Vector3;
})();

export const GameEvent = $root.GameEvent = (() => {

    /**
     * Properties of a GameEvent.
     * @exports IGameEvent
     * @interface IGameEvent
     * @property {GameEvent.Type} type GameEvent type
     * @property {Array.<string>|null} [origin] GameEvent origin
     * @property {GameEvent.IBallLeftField|null} [ballLeftFieldTouchLine] GameEvent ballLeftFieldTouchLine
     * @property {GameEvent.IBallLeftField|null} [ballLeftFieldGoalLine] GameEvent ballLeftFieldGoalLine
     * @property {GameEvent.IAimlessKick|null} [aimlessKick] GameEvent aimlessKick
     * @property {GameEvent.IGoal|null} [possibleGoal] GameEvent possibleGoal
     * @property {GameEvent.INoProgressInGame|null} [noProgressInGame] GameEvent noProgressInGame
     * @property {GameEvent.IAttackerDoubleTouchedBall|null} [attackerDoubleTouchedBall] GameEvent attackerDoubleTouchedBall
     * @property {GameEvent.IAttackerTooCloseToDefenseArea|null} [attackerTooCloseToDefenseArea] GameEvent attackerTooCloseToDefenseArea
     * @property {GameEvent.IDefenderInDefenseArea|null} [defenderInDefenseArea] GameEvent defenderInDefenseArea
     * @property {GameEvent.IBoundaryCrossing|null} [boundaryCrossing] GameEvent boundaryCrossing
     * @property {GameEvent.IKeeperHeldBall|null} [keeperHeldBall] GameEvent keeperHeldBall
     * @property {GameEvent.IBotDribbledBallTooFar|null} [botDribbledBallTooFar] GameEvent botDribbledBallTooFar
     * @property {GameEvent.IAttackerTouchedBallInDefenseArea|null} [attackerTouchedBallInDefenseArea] GameEvent attackerTouchedBallInDefenseArea
     * @property {GameEvent.IBotKickedBallTooFast|null} [botKickedBallTooFast] GameEvent botKickedBallTooFast
     * @property {GameEvent.IBotCrashUnique|null} [botCrashUnique] GameEvent botCrashUnique
     * @property {GameEvent.IBotCrashDrawn|null} [botCrashDrawn] GameEvent botCrashDrawn
     * @property {GameEvent.IDefenderTooCloseToKickPoint|null} [defenderTooCloseToKickPoint] GameEvent defenderTooCloseToKickPoint
     * @property {GameEvent.IBotTooFastInStop|null} [botTooFastInStop] GameEvent botTooFastInStop
     * @property {GameEvent.IBotInterferedPlacement|null} [botInterferedPlacement] GameEvent botInterferedPlacement
     * @property {GameEvent.IGoal|null} [goal] GameEvent goal
     * @property {GameEvent.IGoal|null} [invalidGoal] GameEvent invalidGoal
     * @property {GameEvent.IPlacementFailed|null} [placementFailed] GameEvent placementFailed
     * @property {GameEvent.IPlacementSucceeded|null} [placementSucceeded] GameEvent placementSucceeded
     * @property {GameEvent.IMultipleCards|null} [multipleCards] GameEvent multipleCards
     * @property {GameEvent.IMultipleFouls|null} [multipleFouls] GameEvent multipleFouls
     * @property {GameEvent.IBotSubstitution|null} [botSubstitution] GameEvent botSubstitution
     * @property {GameEvent.ITooManyRobots|null} [tooManyRobots] GameEvent tooManyRobots
     * @property {GameEvent.IUnsportingBehaviorMinor|null} [unsportingBehaviorMinor] GameEvent unsportingBehaviorMinor
     * @property {GameEvent.IUnsportingBehaviorMajor|null} [unsportingBehaviorMajor] GameEvent unsportingBehaviorMajor
     * @property {GameEvent.IBotPushedBot|null} [botPushedBot] GameEvent botPushedBot
     * @property {GameEvent.IBotHeldBallDeliberately|null} [botHeldBallDeliberately] GameEvent botHeldBallDeliberately
     * @property {GameEvent.IBotTippedOver|null} [botTippedOver] GameEvent botTippedOver
     * @property {GameEvent.IPrepared|null} [prepared] GameEvent prepared
     * @property {GameEvent.IIndirectGoal|null} [indirectGoal] GameEvent indirectGoal
     * @property {GameEvent.IChippedGoal|null} [chippedGoal] GameEvent chippedGoal
     * @property {GameEvent.IKickTimeout|null} [kickTimeout] GameEvent kickTimeout
     * @property {GameEvent.IAttackerTouchedOpponentInDefenseArea|null} [attackerTouchedOpponentInDefenseArea] GameEvent attackerTouchedOpponentInDefenseArea
     * @property {GameEvent.IAttackerTouchedOpponentInDefenseArea|null} [attackerTouchedOpponentInDefenseAreaSkipped] GameEvent attackerTouchedOpponentInDefenseAreaSkipped
     * @property {GameEvent.IBotCrashUnique|null} [botCrashUniqueSkipped] GameEvent botCrashUniqueSkipped
     * @property {GameEvent.IBotPushedBot|null} [botPushedBotSkipped] GameEvent botPushedBotSkipped
     * @property {GameEvent.IDefenderInDefenseAreaPartially|null} [defenderInDefenseAreaPartially] GameEvent defenderInDefenseAreaPartially
     * @property {GameEvent.IMultiplePlacementFailures|null} [multiplePlacementFailures] GameEvent multiplePlacementFailures
     */

    /**
     * Constructs a new GameEvent.
     * @exports GameEvent
     * @classdesc Represents a GameEvent.
     * @implements IGameEvent
     * @constructor
     * @param {IGameEvent=} [properties] Properties to set
     */
    function GameEvent(properties) {
        this.origin = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameEvent type.
     * @member {GameEvent.Type} type
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.type = 0;

    /**
     * GameEvent origin.
     * @member {Array.<string>} origin
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.origin = $util.emptyArray;

    /**
     * GameEvent ballLeftFieldTouchLine.
     * @member {GameEvent.IBallLeftField|null|undefined} ballLeftFieldTouchLine
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.ballLeftFieldTouchLine = null;

    /**
     * GameEvent ballLeftFieldGoalLine.
     * @member {GameEvent.IBallLeftField|null|undefined} ballLeftFieldGoalLine
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.ballLeftFieldGoalLine = null;

    /**
     * GameEvent aimlessKick.
     * @member {GameEvent.IAimlessKick|null|undefined} aimlessKick
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.aimlessKick = null;

    /**
     * GameEvent possibleGoal.
     * @member {GameEvent.IGoal|null|undefined} possibleGoal
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.possibleGoal = null;

    /**
     * GameEvent noProgressInGame.
     * @member {GameEvent.INoProgressInGame|null|undefined} noProgressInGame
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.noProgressInGame = null;

    /**
     * GameEvent attackerDoubleTouchedBall.
     * @member {GameEvent.IAttackerDoubleTouchedBall|null|undefined} attackerDoubleTouchedBall
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.attackerDoubleTouchedBall = null;

    /**
     * GameEvent attackerTooCloseToDefenseArea.
     * @member {GameEvent.IAttackerTooCloseToDefenseArea|null|undefined} attackerTooCloseToDefenseArea
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.attackerTooCloseToDefenseArea = null;

    /**
     * GameEvent defenderInDefenseArea.
     * @member {GameEvent.IDefenderInDefenseArea|null|undefined} defenderInDefenseArea
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.defenderInDefenseArea = null;

    /**
     * GameEvent boundaryCrossing.
     * @member {GameEvent.IBoundaryCrossing|null|undefined} boundaryCrossing
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.boundaryCrossing = null;

    /**
     * GameEvent keeperHeldBall.
     * @member {GameEvent.IKeeperHeldBall|null|undefined} keeperHeldBall
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.keeperHeldBall = null;

    /**
     * GameEvent botDribbledBallTooFar.
     * @member {GameEvent.IBotDribbledBallTooFar|null|undefined} botDribbledBallTooFar
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botDribbledBallTooFar = null;

    /**
     * GameEvent attackerTouchedBallInDefenseArea.
     * @member {GameEvent.IAttackerTouchedBallInDefenseArea|null|undefined} attackerTouchedBallInDefenseArea
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.attackerTouchedBallInDefenseArea = null;

    /**
     * GameEvent botKickedBallTooFast.
     * @member {GameEvent.IBotKickedBallTooFast|null|undefined} botKickedBallTooFast
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botKickedBallTooFast = null;

    /**
     * GameEvent botCrashUnique.
     * @member {GameEvent.IBotCrashUnique|null|undefined} botCrashUnique
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botCrashUnique = null;

    /**
     * GameEvent botCrashDrawn.
     * @member {GameEvent.IBotCrashDrawn|null|undefined} botCrashDrawn
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botCrashDrawn = null;

    /**
     * GameEvent defenderTooCloseToKickPoint.
     * @member {GameEvent.IDefenderTooCloseToKickPoint|null|undefined} defenderTooCloseToKickPoint
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.defenderTooCloseToKickPoint = null;

    /**
     * GameEvent botTooFastInStop.
     * @member {GameEvent.IBotTooFastInStop|null|undefined} botTooFastInStop
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botTooFastInStop = null;

    /**
     * GameEvent botInterferedPlacement.
     * @member {GameEvent.IBotInterferedPlacement|null|undefined} botInterferedPlacement
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botInterferedPlacement = null;

    /**
     * GameEvent goal.
     * @member {GameEvent.IGoal|null|undefined} goal
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.goal = null;

    /**
     * GameEvent invalidGoal.
     * @member {GameEvent.IGoal|null|undefined} invalidGoal
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.invalidGoal = null;

    /**
     * GameEvent placementFailed.
     * @member {GameEvent.IPlacementFailed|null|undefined} placementFailed
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.placementFailed = null;

    /**
     * GameEvent placementSucceeded.
     * @member {GameEvent.IPlacementSucceeded|null|undefined} placementSucceeded
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.placementSucceeded = null;

    /**
     * GameEvent multipleCards.
     * @member {GameEvent.IMultipleCards|null|undefined} multipleCards
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.multipleCards = null;

    /**
     * GameEvent multipleFouls.
     * @member {GameEvent.IMultipleFouls|null|undefined} multipleFouls
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.multipleFouls = null;

    /**
     * GameEvent botSubstitution.
     * @member {GameEvent.IBotSubstitution|null|undefined} botSubstitution
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botSubstitution = null;

    /**
     * GameEvent tooManyRobots.
     * @member {GameEvent.ITooManyRobots|null|undefined} tooManyRobots
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.tooManyRobots = null;

    /**
     * GameEvent unsportingBehaviorMinor.
     * @member {GameEvent.IUnsportingBehaviorMinor|null|undefined} unsportingBehaviorMinor
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.unsportingBehaviorMinor = null;

    /**
     * GameEvent unsportingBehaviorMajor.
     * @member {GameEvent.IUnsportingBehaviorMajor|null|undefined} unsportingBehaviorMajor
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.unsportingBehaviorMajor = null;

    /**
     * GameEvent botPushedBot.
     * @member {GameEvent.IBotPushedBot|null|undefined} botPushedBot
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botPushedBot = null;

    /**
     * GameEvent botHeldBallDeliberately.
     * @member {GameEvent.IBotHeldBallDeliberately|null|undefined} botHeldBallDeliberately
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botHeldBallDeliberately = null;

    /**
     * GameEvent botTippedOver.
     * @member {GameEvent.IBotTippedOver|null|undefined} botTippedOver
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botTippedOver = null;

    /**
     * GameEvent prepared.
     * @member {GameEvent.IPrepared|null|undefined} prepared
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.prepared = null;

    /**
     * GameEvent indirectGoal.
     * @member {GameEvent.IIndirectGoal|null|undefined} indirectGoal
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.indirectGoal = null;

    /**
     * GameEvent chippedGoal.
     * @member {GameEvent.IChippedGoal|null|undefined} chippedGoal
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.chippedGoal = null;

    /**
     * GameEvent kickTimeout.
     * @member {GameEvent.IKickTimeout|null|undefined} kickTimeout
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.kickTimeout = null;

    /**
     * GameEvent attackerTouchedOpponentInDefenseArea.
     * @member {GameEvent.IAttackerTouchedOpponentInDefenseArea|null|undefined} attackerTouchedOpponentInDefenseArea
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.attackerTouchedOpponentInDefenseArea = null;

    /**
     * GameEvent attackerTouchedOpponentInDefenseAreaSkipped.
     * @member {GameEvent.IAttackerTouchedOpponentInDefenseArea|null|undefined} attackerTouchedOpponentInDefenseAreaSkipped
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.attackerTouchedOpponentInDefenseAreaSkipped = null;

    /**
     * GameEvent botCrashUniqueSkipped.
     * @member {GameEvent.IBotCrashUnique|null|undefined} botCrashUniqueSkipped
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botCrashUniqueSkipped = null;

    /**
     * GameEvent botPushedBotSkipped.
     * @member {GameEvent.IBotPushedBot|null|undefined} botPushedBotSkipped
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.botPushedBotSkipped = null;

    /**
     * GameEvent defenderInDefenseAreaPartially.
     * @member {GameEvent.IDefenderInDefenseAreaPartially|null|undefined} defenderInDefenseAreaPartially
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.defenderInDefenseAreaPartially = null;

    /**
     * GameEvent multiplePlacementFailures.
     * @member {GameEvent.IMultiplePlacementFailures|null|undefined} multiplePlacementFailures
     * @memberof GameEvent
     * @instance
     */
    GameEvent.prototype.multiplePlacementFailures = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * GameEvent event.
     * @member {"ballLeftFieldTouchLine"|"ballLeftFieldGoalLine"|"aimlessKick"|"possibleGoal"|"noProgressInGame"|"attackerDoubleTouchedBall"|"attackerTooCloseToDefenseArea"|"defenderInDefenseArea"|"boundaryCrossing"|"keeperHeldBall"|"botDribbledBallTooFar"|"attackerTouchedBallInDefenseArea"|"botKickedBallTooFast"|"botCrashUnique"|"botCrashDrawn"|"defenderTooCloseToKickPoint"|"botTooFastInStop"|"botInterferedPlacement"|"goal"|"invalidGoal"|"placementFailed"|"placementSucceeded"|"multipleCards"|"multipleFouls"|"botSubstitution"|"tooManyRobots"|"unsportingBehaviorMinor"|"unsportingBehaviorMajor"|"botPushedBot"|"botHeldBallDeliberately"|"botTippedOver"|"prepared"|"indirectGoal"|"chippedGoal"|"kickTimeout"|"attackerTouchedOpponentInDefenseArea"|"attackerTouchedOpponentInDefenseAreaSkipped"|"botCrashUniqueSkipped"|"botPushedBotSkipped"|"defenderInDefenseAreaPartially"|"multiplePlacementFailures"|undefined} event
     * @memberof GameEvent
     * @instance
     */
    Object.defineProperty(GameEvent.prototype, "event", {
        get: $util.oneOfGetter($oneOfFields = ["ballLeftFieldTouchLine", "ballLeftFieldGoalLine", "aimlessKick", "possibleGoal", "noProgressInGame", "attackerDoubleTouchedBall", "attackerTooCloseToDefenseArea", "defenderInDefenseArea", "boundaryCrossing", "keeperHeldBall", "botDribbledBallTooFar", "attackerTouchedBallInDefenseArea", "botKickedBallTooFast", "botCrashUnique", "botCrashDrawn", "defenderTooCloseToKickPoint", "botTooFastInStop", "botInterferedPlacement", "goal", "invalidGoal", "placementFailed", "placementSucceeded", "multipleCards", "multipleFouls", "botSubstitution", "tooManyRobots", "unsportingBehaviorMinor", "unsportingBehaviorMajor", "botPushedBot", "botHeldBallDeliberately", "botTippedOver", "prepared", "indirectGoal", "chippedGoal", "kickTimeout", "attackerTouchedOpponentInDefenseArea", "attackerTouchedOpponentInDefenseAreaSkipped", "botCrashUniqueSkipped", "botPushedBotSkipped", "defenderInDefenseAreaPartially", "multiplePlacementFailures"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new GameEvent instance using the specified properties.
     * @function create
     * @memberof GameEvent
     * @static
     * @param {IGameEvent=} [properties] Properties to set
     * @returns {GameEvent} GameEvent instance
     */
    GameEvent.create = function create(properties) {
        return new GameEvent(properties);
    };

    /**
     * Encodes the specified GameEvent message. Does not implicitly {@link GameEvent.verify|verify} messages.
     * @function encode
     * @memberof GameEvent
     * @static
     * @param {IGameEvent} message GameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameEvent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.prepared != null && message.hasOwnProperty("prepared"))
            $root.GameEvent.Prepared.encode(message.prepared, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.noProgressInGame != null && message.hasOwnProperty("noProgressInGame"))
            $root.GameEvent.NoProgressInGame.encode(message.noProgressInGame, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.placementFailed != null && message.hasOwnProperty("placementFailed"))
            $root.GameEvent.PlacementFailed.encode(message.placementFailed, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.placementSucceeded != null && message.hasOwnProperty("placementSucceeded"))
            $root.GameEvent.PlacementSucceeded.encode(message.placementSucceeded, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.ballLeftFieldTouchLine != null && message.hasOwnProperty("ballLeftFieldTouchLine"))
            $root.GameEvent.BallLeftField.encode(message.ballLeftFieldTouchLine, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.ballLeftFieldGoalLine != null && message.hasOwnProperty("ballLeftFieldGoalLine"))
            $root.GameEvent.BallLeftField.encode(message.ballLeftFieldGoalLine, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.goal != null && message.hasOwnProperty("goal"))
            $root.GameEvent.Goal.encode(message.goal, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.indirectGoal != null && message.hasOwnProperty("indirectGoal"))
            $root.GameEvent.IndirectGoal.encode(message.indirectGoal, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.chippedGoal != null && message.hasOwnProperty("chippedGoal"))
            $root.GameEvent.ChippedGoal.encode(message.chippedGoal, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message.aimlessKick != null && message.hasOwnProperty("aimlessKick"))
            $root.GameEvent.AimlessKick.encode(message.aimlessKick, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.kickTimeout != null && message.hasOwnProperty("kickTimeout"))
            $root.GameEvent.KickTimeout.encode(message.kickTimeout, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
        if (message.keeperHeldBall != null && message.hasOwnProperty("keeperHeldBall"))
            $root.GameEvent.KeeperHeldBall.encode(message.keeperHeldBall, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.attackerDoubleTouchedBall != null && message.hasOwnProperty("attackerDoubleTouchedBall"))
            $root.GameEvent.AttackerDoubleTouchedBall.encode(message.attackerDoubleTouchedBall, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
        if (message.attackerTouchedBallInDefenseArea != null && message.hasOwnProperty("attackerTouchedBallInDefenseArea"))
            $root.GameEvent.AttackerTouchedBallInDefenseArea.encode(message.attackerTouchedBallInDefenseArea, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
        if (message.attackerTouchedOpponentInDefenseArea != null && message.hasOwnProperty("attackerTouchedOpponentInDefenseArea"))
            $root.GameEvent.AttackerTouchedOpponentInDefenseArea.encode(message.attackerTouchedOpponentInDefenseArea, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
        if (message.botDribbledBallTooFar != null && message.hasOwnProperty("botDribbledBallTooFar"))
            $root.GameEvent.BotDribbledBallTooFar.encode(message.botDribbledBallTooFar, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
        if (message.botKickedBallTooFast != null && message.hasOwnProperty("botKickedBallTooFast"))
            $root.GameEvent.BotKickedBallTooFast.encode(message.botKickedBallTooFast, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
        if (message.attackerTooCloseToDefenseArea != null && message.hasOwnProperty("attackerTooCloseToDefenseArea"))
            $root.GameEvent.AttackerTooCloseToDefenseArea.encode(message.attackerTooCloseToDefenseArea, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
        if (message.botInterferedPlacement != null && message.hasOwnProperty("botInterferedPlacement"))
            $root.GameEvent.BotInterferedPlacement.encode(message.botInterferedPlacement, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
        if (message.botCrashDrawn != null && message.hasOwnProperty("botCrashDrawn"))
            $root.GameEvent.BotCrashDrawn.encode(message.botCrashDrawn, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
        if (message.botCrashUnique != null && message.hasOwnProperty("botCrashUnique"))
            $root.GameEvent.BotCrashUnique.encode(message.botCrashUnique, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
        if (message.botCrashUniqueSkipped != null && message.hasOwnProperty("botCrashUniqueSkipped"))
            $root.GameEvent.BotCrashUnique.encode(message.botCrashUniqueSkipped, writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
        if (message.botPushedBot != null && message.hasOwnProperty("botPushedBot"))
            $root.GameEvent.BotPushedBot.encode(message.botPushedBot, writer.uint32(/* id 24, wireType 2 =*/194).fork()).ldelim();
        if (message.botPushedBotSkipped != null && message.hasOwnProperty("botPushedBotSkipped"))
            $root.GameEvent.BotPushedBot.encode(message.botPushedBotSkipped, writer.uint32(/* id 25, wireType 2 =*/202).fork()).ldelim();
        if (message.botHeldBallDeliberately != null && message.hasOwnProperty("botHeldBallDeliberately"))
            $root.GameEvent.BotHeldBallDeliberately.encode(message.botHeldBallDeliberately, writer.uint32(/* id 26, wireType 2 =*/210).fork()).ldelim();
        if (message.botTippedOver != null && message.hasOwnProperty("botTippedOver"))
            $root.GameEvent.BotTippedOver.encode(message.botTippedOver, writer.uint32(/* id 27, wireType 2 =*/218).fork()).ldelim();
        if (message.botTooFastInStop != null && message.hasOwnProperty("botTooFastInStop"))
            $root.GameEvent.BotTooFastInStop.encode(message.botTooFastInStop, writer.uint32(/* id 28, wireType 2 =*/226).fork()).ldelim();
        if (message.defenderTooCloseToKickPoint != null && message.hasOwnProperty("defenderTooCloseToKickPoint"))
            $root.GameEvent.DefenderTooCloseToKickPoint.encode(message.defenderTooCloseToKickPoint, writer.uint32(/* id 29, wireType 2 =*/234).fork()).ldelim();
        if (message.defenderInDefenseAreaPartially != null && message.hasOwnProperty("defenderInDefenseAreaPartially"))
            $root.GameEvent.DefenderInDefenseAreaPartially.encode(message.defenderInDefenseAreaPartially, writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
        if (message.defenderInDefenseArea != null && message.hasOwnProperty("defenderInDefenseArea"))
            $root.GameEvent.DefenderInDefenseArea.encode(message.defenderInDefenseArea, writer.uint32(/* id 31, wireType 2 =*/250).fork()).ldelim();
        if (message.multipleCards != null && message.hasOwnProperty("multipleCards"))
            $root.GameEvent.MultipleCards.encode(message.multipleCards, writer.uint32(/* id 32, wireType 2 =*/258).fork()).ldelim();
        if (message.multiplePlacementFailures != null && message.hasOwnProperty("multiplePlacementFailures"))
            $root.GameEvent.MultiplePlacementFailures.encode(message.multiplePlacementFailures, writer.uint32(/* id 33, wireType 2 =*/266).fork()).ldelim();
        if (message.multipleFouls != null && message.hasOwnProperty("multipleFouls"))
            $root.GameEvent.MultipleFouls.encode(message.multipleFouls, writer.uint32(/* id 34, wireType 2 =*/274).fork()).ldelim();
        if (message.unsportingBehaviorMinor != null && message.hasOwnProperty("unsportingBehaviorMinor"))
            $root.GameEvent.UnsportingBehaviorMinor.encode(message.unsportingBehaviorMinor, writer.uint32(/* id 35, wireType 2 =*/282).fork()).ldelim();
        if (message.unsportingBehaviorMajor != null && message.hasOwnProperty("unsportingBehaviorMajor"))
            $root.GameEvent.UnsportingBehaviorMajor.encode(message.unsportingBehaviorMajor, writer.uint32(/* id 36, wireType 2 =*/290).fork()).ldelim();
        if (message.botSubstitution != null && message.hasOwnProperty("botSubstitution"))
            $root.GameEvent.BotSubstitution.encode(message.botSubstitution, writer.uint32(/* id 37, wireType 2 =*/298).fork()).ldelim();
        if (message.tooManyRobots != null && message.hasOwnProperty("tooManyRobots"))
            $root.GameEvent.TooManyRobots.encode(message.tooManyRobots, writer.uint32(/* id 38, wireType 2 =*/306).fork()).ldelim();
        if (message.possibleGoal != null && message.hasOwnProperty("possibleGoal"))
            $root.GameEvent.Goal.encode(message.possibleGoal, writer.uint32(/* id 39, wireType 2 =*/314).fork()).ldelim();
        writer.uint32(/* id 40, wireType 0 =*/320).int32(message.type);
        if (message.origin != null && message.origin.length)
            for (let i = 0; i < message.origin.length; ++i)
                writer.uint32(/* id 41, wireType 2 =*/330).string(message.origin[i]);
        if (message.attackerTouchedOpponentInDefenseAreaSkipped != null && message.hasOwnProperty("attackerTouchedOpponentInDefenseAreaSkipped"))
            $root.GameEvent.AttackerTouchedOpponentInDefenseArea.encode(message.attackerTouchedOpponentInDefenseAreaSkipped, writer.uint32(/* id 42, wireType 2 =*/338).fork()).ldelim();
        if (message.boundaryCrossing != null && message.hasOwnProperty("boundaryCrossing"))
            $root.GameEvent.BoundaryCrossing.encode(message.boundaryCrossing, writer.uint32(/* id 43, wireType 2 =*/346).fork()).ldelim();
        if (message.invalidGoal != null && message.hasOwnProperty("invalidGoal"))
            $root.GameEvent.Goal.encode(message.invalidGoal, writer.uint32(/* id 44, wireType 2 =*/354).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link GameEvent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameEvent
     * @static
     * @param {IGameEvent} message GameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameEvent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameEvent message from the specified reader or buffer.
     * @function decode
     * @memberof GameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameEvent} GameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameEvent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 40:
                message.type = reader.int32();
                break;
            case 41:
                if (!(message.origin && message.origin.length))
                    message.origin = [];
                message.origin.push(reader.string());
                break;
            case 6:
                message.ballLeftFieldTouchLine = $root.GameEvent.BallLeftField.decode(reader, reader.uint32());
                break;
            case 7:
                message.ballLeftFieldGoalLine = $root.GameEvent.BallLeftField.decode(reader, reader.uint32());
                break;
            case 11:
                message.aimlessKick = $root.GameEvent.AimlessKick.decode(reader, reader.uint32());
                break;
            case 39:
                message.possibleGoal = $root.GameEvent.Goal.decode(reader, reader.uint32());
                break;
            case 2:
                message.noProgressInGame = $root.GameEvent.NoProgressInGame.decode(reader, reader.uint32());
                break;
            case 14:
                message.attackerDoubleTouchedBall = $root.GameEvent.AttackerDoubleTouchedBall.decode(reader, reader.uint32());
                break;
            case 19:
                message.attackerTooCloseToDefenseArea = $root.GameEvent.AttackerTooCloseToDefenseArea.decode(reader, reader.uint32());
                break;
            case 31:
                message.defenderInDefenseArea = $root.GameEvent.DefenderInDefenseArea.decode(reader, reader.uint32());
                break;
            case 43:
                message.boundaryCrossing = $root.GameEvent.BoundaryCrossing.decode(reader, reader.uint32());
                break;
            case 13:
                message.keeperHeldBall = $root.GameEvent.KeeperHeldBall.decode(reader, reader.uint32());
                break;
            case 17:
                message.botDribbledBallTooFar = $root.GameEvent.BotDribbledBallTooFar.decode(reader, reader.uint32());
                break;
            case 15:
                message.attackerTouchedBallInDefenseArea = $root.GameEvent.AttackerTouchedBallInDefenseArea.decode(reader, reader.uint32());
                break;
            case 18:
                message.botKickedBallTooFast = $root.GameEvent.BotKickedBallTooFast.decode(reader, reader.uint32());
                break;
            case 22:
                message.botCrashUnique = $root.GameEvent.BotCrashUnique.decode(reader, reader.uint32());
                break;
            case 21:
                message.botCrashDrawn = $root.GameEvent.BotCrashDrawn.decode(reader, reader.uint32());
                break;
            case 29:
                message.defenderTooCloseToKickPoint = $root.GameEvent.DefenderTooCloseToKickPoint.decode(reader, reader.uint32());
                break;
            case 28:
                message.botTooFastInStop = $root.GameEvent.BotTooFastInStop.decode(reader, reader.uint32());
                break;
            case 20:
                message.botInterferedPlacement = $root.GameEvent.BotInterferedPlacement.decode(reader, reader.uint32());
                break;
            case 8:
                message.goal = $root.GameEvent.Goal.decode(reader, reader.uint32());
                break;
            case 44:
                message.invalidGoal = $root.GameEvent.Goal.decode(reader, reader.uint32());
                break;
            case 3:
                message.placementFailed = $root.GameEvent.PlacementFailed.decode(reader, reader.uint32());
                break;
            case 5:
                message.placementSucceeded = $root.GameEvent.PlacementSucceeded.decode(reader, reader.uint32());
                break;
            case 32:
                message.multipleCards = $root.GameEvent.MultipleCards.decode(reader, reader.uint32());
                break;
            case 34:
                message.multipleFouls = $root.GameEvent.MultipleFouls.decode(reader, reader.uint32());
                break;
            case 37:
                message.botSubstitution = $root.GameEvent.BotSubstitution.decode(reader, reader.uint32());
                break;
            case 38:
                message.tooManyRobots = $root.GameEvent.TooManyRobots.decode(reader, reader.uint32());
                break;
            case 35:
                message.unsportingBehaviorMinor = $root.GameEvent.UnsportingBehaviorMinor.decode(reader, reader.uint32());
                break;
            case 36:
                message.unsportingBehaviorMajor = $root.GameEvent.UnsportingBehaviorMajor.decode(reader, reader.uint32());
                break;
            case 24:
                message.botPushedBot = $root.GameEvent.BotPushedBot.decode(reader, reader.uint32());
                break;
            case 26:
                message.botHeldBallDeliberately = $root.GameEvent.BotHeldBallDeliberately.decode(reader, reader.uint32());
                break;
            case 27:
                message.botTippedOver = $root.GameEvent.BotTippedOver.decode(reader, reader.uint32());
                break;
            case 1:
                message.prepared = $root.GameEvent.Prepared.decode(reader, reader.uint32());
                break;
            case 9:
                message.indirectGoal = $root.GameEvent.IndirectGoal.decode(reader, reader.uint32());
                break;
            case 10:
                message.chippedGoal = $root.GameEvent.ChippedGoal.decode(reader, reader.uint32());
                break;
            case 12:
                message.kickTimeout = $root.GameEvent.KickTimeout.decode(reader, reader.uint32());
                break;
            case 16:
                message.attackerTouchedOpponentInDefenseArea = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.decode(reader, reader.uint32());
                break;
            case 42:
                message.attackerTouchedOpponentInDefenseAreaSkipped = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.decode(reader, reader.uint32());
                break;
            case 23:
                message.botCrashUniqueSkipped = $root.GameEvent.BotCrashUnique.decode(reader, reader.uint32());
                break;
            case 25:
                message.botPushedBotSkipped = $root.GameEvent.BotPushedBot.decode(reader, reader.uint32());
                break;
            case 30:
                message.defenderInDefenseAreaPartially = $root.GameEvent.DefenderInDefenseAreaPartially.decode(reader, reader.uint32());
                break;
            case 33:
                message.multiplePlacementFailures = $root.GameEvent.MultiplePlacementFailures.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("type"))
            throw $util.ProtocolError("missing required 'type'", { instance: message });
        return message;
    };

    /**
     * Decodes a GameEvent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameEvent} GameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameEvent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameEvent message.
     * @function verify
     * @memberof GameEvent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameEvent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        switch (message.type) {
        default:
            return "type: enum value expected";
        case 0:
        case 6:
        case 7:
        case 11:
        case 39:
        case 2:
        case 14:
        case 19:
        case 31:
        case 41:
        case 13:
        case 17:
        case 15:
        case 18:
        case 22:
        case 21:
        case 29:
        case 28:
        case 20:
        case 8:
        case 42:
        case 3:
        case 5:
        case 32:
        case 34:
        case 37:
        case 38:
        case 35:
        case 36:
        case 24:
        case 26:
        case 27:
        case 1:
        case 9:
        case 10:
        case 12:
        case 16:
        case 40:
        case 23:
        case 25:
        case 30:
        case 33:
            break;
        }
        if (message.origin != null && message.hasOwnProperty("origin")) {
            if (!Array.isArray(message.origin))
                return "origin: array expected";
            for (let i = 0; i < message.origin.length; ++i)
                if (!$util.isString(message.origin[i]))
                    return "origin: string[] expected";
        }
        if (message.ballLeftFieldTouchLine != null && message.hasOwnProperty("ballLeftFieldTouchLine")) {
            properties.event = 1;
            {
                let error = $root.GameEvent.BallLeftField.verify(message.ballLeftFieldTouchLine);
                if (error)
                    return "ballLeftFieldTouchLine." + error;
            }
        }
        if (message.ballLeftFieldGoalLine != null && message.hasOwnProperty("ballLeftFieldGoalLine")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BallLeftField.verify(message.ballLeftFieldGoalLine);
                if (error)
                    return "ballLeftFieldGoalLine." + error;
            }
        }
        if (message.aimlessKick != null && message.hasOwnProperty("aimlessKick")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.AimlessKick.verify(message.aimlessKick);
                if (error)
                    return "aimlessKick." + error;
            }
        }
        if (message.possibleGoal != null && message.hasOwnProperty("possibleGoal")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.Goal.verify(message.possibleGoal);
                if (error)
                    return "possibleGoal." + error;
            }
        }
        if (message.noProgressInGame != null && message.hasOwnProperty("noProgressInGame")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.NoProgressInGame.verify(message.noProgressInGame);
                if (error)
                    return "noProgressInGame." + error;
            }
        }
        if (message.attackerDoubleTouchedBall != null && message.hasOwnProperty("attackerDoubleTouchedBall")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.AttackerDoubleTouchedBall.verify(message.attackerDoubleTouchedBall);
                if (error)
                    return "attackerDoubleTouchedBall." + error;
            }
        }
        if (message.attackerTooCloseToDefenseArea != null && message.hasOwnProperty("attackerTooCloseToDefenseArea")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.AttackerTooCloseToDefenseArea.verify(message.attackerTooCloseToDefenseArea);
                if (error)
                    return "attackerTooCloseToDefenseArea." + error;
            }
        }
        if (message.defenderInDefenseArea != null && message.hasOwnProperty("defenderInDefenseArea")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.DefenderInDefenseArea.verify(message.defenderInDefenseArea);
                if (error)
                    return "defenderInDefenseArea." + error;
            }
        }
        if (message.boundaryCrossing != null && message.hasOwnProperty("boundaryCrossing")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BoundaryCrossing.verify(message.boundaryCrossing);
                if (error)
                    return "boundaryCrossing." + error;
            }
        }
        if (message.keeperHeldBall != null && message.hasOwnProperty("keeperHeldBall")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.KeeperHeldBall.verify(message.keeperHeldBall);
                if (error)
                    return "keeperHeldBall." + error;
            }
        }
        if (message.botDribbledBallTooFar != null && message.hasOwnProperty("botDribbledBallTooFar")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotDribbledBallTooFar.verify(message.botDribbledBallTooFar);
                if (error)
                    return "botDribbledBallTooFar." + error;
            }
        }
        if (message.attackerTouchedBallInDefenseArea != null && message.hasOwnProperty("attackerTouchedBallInDefenseArea")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.AttackerTouchedBallInDefenseArea.verify(message.attackerTouchedBallInDefenseArea);
                if (error)
                    return "attackerTouchedBallInDefenseArea." + error;
            }
        }
        if (message.botKickedBallTooFast != null && message.hasOwnProperty("botKickedBallTooFast")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotKickedBallTooFast.verify(message.botKickedBallTooFast);
                if (error)
                    return "botKickedBallTooFast." + error;
            }
        }
        if (message.botCrashUnique != null && message.hasOwnProperty("botCrashUnique")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotCrashUnique.verify(message.botCrashUnique);
                if (error)
                    return "botCrashUnique." + error;
            }
        }
        if (message.botCrashDrawn != null && message.hasOwnProperty("botCrashDrawn")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotCrashDrawn.verify(message.botCrashDrawn);
                if (error)
                    return "botCrashDrawn." + error;
            }
        }
        if (message.defenderTooCloseToKickPoint != null && message.hasOwnProperty("defenderTooCloseToKickPoint")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.DefenderTooCloseToKickPoint.verify(message.defenderTooCloseToKickPoint);
                if (error)
                    return "defenderTooCloseToKickPoint." + error;
            }
        }
        if (message.botTooFastInStop != null && message.hasOwnProperty("botTooFastInStop")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotTooFastInStop.verify(message.botTooFastInStop);
                if (error)
                    return "botTooFastInStop." + error;
            }
        }
        if (message.botInterferedPlacement != null && message.hasOwnProperty("botInterferedPlacement")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotInterferedPlacement.verify(message.botInterferedPlacement);
                if (error)
                    return "botInterferedPlacement." + error;
            }
        }
        if (message.goal != null && message.hasOwnProperty("goal")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.Goal.verify(message.goal);
                if (error)
                    return "goal." + error;
            }
        }
        if (message.invalidGoal != null && message.hasOwnProperty("invalidGoal")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.Goal.verify(message.invalidGoal);
                if (error)
                    return "invalidGoal." + error;
            }
        }
        if (message.placementFailed != null && message.hasOwnProperty("placementFailed")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.PlacementFailed.verify(message.placementFailed);
                if (error)
                    return "placementFailed." + error;
            }
        }
        if (message.placementSucceeded != null && message.hasOwnProperty("placementSucceeded")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.PlacementSucceeded.verify(message.placementSucceeded);
                if (error)
                    return "placementSucceeded." + error;
            }
        }
        if (message.multipleCards != null && message.hasOwnProperty("multipleCards")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.MultipleCards.verify(message.multipleCards);
                if (error)
                    return "multipleCards." + error;
            }
        }
        if (message.multipleFouls != null && message.hasOwnProperty("multipleFouls")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.MultipleFouls.verify(message.multipleFouls);
                if (error)
                    return "multipleFouls." + error;
            }
        }
        if (message.botSubstitution != null && message.hasOwnProperty("botSubstitution")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotSubstitution.verify(message.botSubstitution);
                if (error)
                    return "botSubstitution." + error;
            }
        }
        if (message.tooManyRobots != null && message.hasOwnProperty("tooManyRobots")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.TooManyRobots.verify(message.tooManyRobots);
                if (error)
                    return "tooManyRobots." + error;
            }
        }
        if (message.unsportingBehaviorMinor != null && message.hasOwnProperty("unsportingBehaviorMinor")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.UnsportingBehaviorMinor.verify(message.unsportingBehaviorMinor);
                if (error)
                    return "unsportingBehaviorMinor." + error;
            }
        }
        if (message.unsportingBehaviorMajor != null && message.hasOwnProperty("unsportingBehaviorMajor")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.UnsportingBehaviorMajor.verify(message.unsportingBehaviorMajor);
                if (error)
                    return "unsportingBehaviorMajor." + error;
            }
        }
        if (message.botPushedBot != null && message.hasOwnProperty("botPushedBot")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotPushedBot.verify(message.botPushedBot);
                if (error)
                    return "botPushedBot." + error;
            }
        }
        if (message.botHeldBallDeliberately != null && message.hasOwnProperty("botHeldBallDeliberately")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotHeldBallDeliberately.verify(message.botHeldBallDeliberately);
                if (error)
                    return "botHeldBallDeliberately." + error;
            }
        }
        if (message.botTippedOver != null && message.hasOwnProperty("botTippedOver")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotTippedOver.verify(message.botTippedOver);
                if (error)
                    return "botTippedOver." + error;
            }
        }
        if (message.prepared != null && message.hasOwnProperty("prepared")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.Prepared.verify(message.prepared);
                if (error)
                    return "prepared." + error;
            }
        }
        if (message.indirectGoal != null && message.hasOwnProperty("indirectGoal")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.IndirectGoal.verify(message.indirectGoal);
                if (error)
                    return "indirectGoal." + error;
            }
        }
        if (message.chippedGoal != null && message.hasOwnProperty("chippedGoal")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.ChippedGoal.verify(message.chippedGoal);
                if (error)
                    return "chippedGoal." + error;
            }
        }
        if (message.kickTimeout != null && message.hasOwnProperty("kickTimeout")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.KickTimeout.verify(message.kickTimeout);
                if (error)
                    return "kickTimeout." + error;
            }
        }
        if (message.attackerTouchedOpponentInDefenseArea != null && message.hasOwnProperty("attackerTouchedOpponentInDefenseArea")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.verify(message.attackerTouchedOpponentInDefenseArea);
                if (error)
                    return "attackerTouchedOpponentInDefenseArea." + error;
            }
        }
        if (message.attackerTouchedOpponentInDefenseAreaSkipped != null && message.hasOwnProperty("attackerTouchedOpponentInDefenseAreaSkipped")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.verify(message.attackerTouchedOpponentInDefenseAreaSkipped);
                if (error)
                    return "attackerTouchedOpponentInDefenseAreaSkipped." + error;
            }
        }
        if (message.botCrashUniqueSkipped != null && message.hasOwnProperty("botCrashUniqueSkipped")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotCrashUnique.verify(message.botCrashUniqueSkipped);
                if (error)
                    return "botCrashUniqueSkipped." + error;
            }
        }
        if (message.botPushedBotSkipped != null && message.hasOwnProperty("botPushedBotSkipped")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.BotPushedBot.verify(message.botPushedBotSkipped);
                if (error)
                    return "botPushedBotSkipped." + error;
            }
        }
        if (message.defenderInDefenseAreaPartially != null && message.hasOwnProperty("defenderInDefenseAreaPartially")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.DefenderInDefenseAreaPartially.verify(message.defenderInDefenseAreaPartially);
                if (error)
                    return "defenderInDefenseAreaPartially." + error;
            }
        }
        if (message.multiplePlacementFailures != null && message.hasOwnProperty("multiplePlacementFailures")) {
            if (properties.event === 1)
                return "event: multiple values";
            properties.event = 1;
            {
                let error = $root.GameEvent.MultiplePlacementFailures.verify(message.multiplePlacementFailures);
                if (error)
                    return "multiplePlacementFailures." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameEvent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameEvent} GameEvent
     */
    GameEvent.fromObject = function fromObject(object) {
        if (object instanceof $root.GameEvent)
            return object;
        let message = new $root.GameEvent();
        switch (object.type) {
        case "UNKNOWN_GAME_EVENT_TYPE":
        case 0:
            message.type = 0;
            break;
        case "BALL_LEFT_FIELD_TOUCH_LINE":
        case 6:
            message.type = 6;
            break;
        case "BALL_LEFT_FIELD_GOAL_LINE":
        case 7:
            message.type = 7;
            break;
        case "AIMLESS_KICK":
        case 11:
            message.type = 11;
            break;
        case "POSSIBLE_GOAL":
        case 39:
            message.type = 39;
            break;
        case "NO_PROGRESS_IN_GAME":
        case 2:
            message.type = 2;
            break;
        case "ATTACKER_DOUBLE_TOUCHED_BALL":
        case 14:
            message.type = 14;
            break;
        case "ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA":
        case 19:
            message.type = 19;
            break;
        case "DEFENDER_IN_DEFENSE_AREA":
        case 31:
            message.type = 31;
            break;
        case "BOUNDARY_CROSSING":
        case 41:
            message.type = 41;
            break;
        case "KEEPER_HELD_BALL":
        case 13:
            message.type = 13;
            break;
        case "BOT_DRIBBLED_BALL_TOO_FAR":
        case 17:
            message.type = 17;
            break;
        case "ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA":
        case 15:
            message.type = 15;
            break;
        case "BOT_KICKED_BALL_TOO_FAST":
        case 18:
            message.type = 18;
            break;
        case "BOT_CRASH_UNIQUE":
        case 22:
            message.type = 22;
            break;
        case "BOT_CRASH_DRAWN":
        case 21:
            message.type = 21;
            break;
        case "DEFENDER_TOO_CLOSE_TO_KICK_POINT":
        case 29:
            message.type = 29;
            break;
        case "BOT_TOO_FAST_IN_STOP":
        case 28:
            message.type = 28;
            break;
        case "BOT_INTERFERED_PLACEMENT":
        case 20:
            message.type = 20;
            break;
        case "GOAL":
        case 8:
            message.type = 8;
            break;
        case "INVALID_GOAL":
        case 42:
            message.type = 42;
            break;
        case "PLACEMENT_FAILED":
        case 3:
            message.type = 3;
            break;
        case "PLACEMENT_SUCCEEDED":
        case 5:
            message.type = 5;
            break;
        case "MULTIPLE_CARDS":
        case 32:
            message.type = 32;
            break;
        case "MULTIPLE_FOULS":
        case 34:
            message.type = 34;
            break;
        case "BOT_SUBSTITUTION":
        case 37:
            message.type = 37;
            break;
        case "TOO_MANY_ROBOTS":
        case 38:
            message.type = 38;
            break;
        case "UNSPORTING_BEHAVIOR_MINOR":
        case 35:
            message.type = 35;
            break;
        case "UNSPORTING_BEHAVIOR_MAJOR":
        case 36:
            message.type = 36;
            break;
        case "BOT_PUSHED_BOT":
        case 24:
            message.type = 24;
            break;
        case "BOT_HELD_BALL_DELIBERATELY":
        case 26:
            message.type = 26;
            break;
        case "BOT_TIPPED_OVER":
        case 27:
            message.type = 27;
            break;
        case "PREPARED":
        case 1:
            message.type = 1;
            break;
        case "INDIRECT_GOAL":
        case 9:
            message.type = 9;
            break;
        case "CHIPPED_GOAL":
        case 10:
            message.type = 10;
            break;
        case "KICK_TIMEOUT":
        case 12:
            message.type = 12;
            break;
        case "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA":
        case 16:
            message.type = 16;
            break;
        case "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED":
        case 40:
            message.type = 40;
            break;
        case "BOT_CRASH_UNIQUE_SKIPPED":
        case 23:
            message.type = 23;
            break;
        case "BOT_PUSHED_BOT_SKIPPED":
        case 25:
            message.type = 25;
            break;
        case "DEFENDER_IN_DEFENSE_AREA_PARTIALLY":
        case 30:
            message.type = 30;
            break;
        case "MULTIPLE_PLACEMENT_FAILURES":
        case 33:
            message.type = 33;
            break;
        }
        if (object.origin) {
            if (!Array.isArray(object.origin))
                throw TypeError(".GameEvent.origin: array expected");
            message.origin = [];
            for (let i = 0; i < object.origin.length; ++i)
                message.origin[i] = String(object.origin[i]);
        }
        if (object.ballLeftFieldTouchLine != null) {
            if (typeof object.ballLeftFieldTouchLine !== "object")
                throw TypeError(".GameEvent.ballLeftFieldTouchLine: object expected");
            message.ballLeftFieldTouchLine = $root.GameEvent.BallLeftField.fromObject(object.ballLeftFieldTouchLine);
        }
        if (object.ballLeftFieldGoalLine != null) {
            if (typeof object.ballLeftFieldGoalLine !== "object")
                throw TypeError(".GameEvent.ballLeftFieldGoalLine: object expected");
            message.ballLeftFieldGoalLine = $root.GameEvent.BallLeftField.fromObject(object.ballLeftFieldGoalLine);
        }
        if (object.aimlessKick != null) {
            if (typeof object.aimlessKick !== "object")
                throw TypeError(".GameEvent.aimlessKick: object expected");
            message.aimlessKick = $root.GameEvent.AimlessKick.fromObject(object.aimlessKick);
        }
        if (object.possibleGoal != null) {
            if (typeof object.possibleGoal !== "object")
                throw TypeError(".GameEvent.possibleGoal: object expected");
            message.possibleGoal = $root.GameEvent.Goal.fromObject(object.possibleGoal);
        }
        if (object.noProgressInGame != null) {
            if (typeof object.noProgressInGame !== "object")
                throw TypeError(".GameEvent.noProgressInGame: object expected");
            message.noProgressInGame = $root.GameEvent.NoProgressInGame.fromObject(object.noProgressInGame);
        }
        if (object.attackerDoubleTouchedBall != null) {
            if (typeof object.attackerDoubleTouchedBall !== "object")
                throw TypeError(".GameEvent.attackerDoubleTouchedBall: object expected");
            message.attackerDoubleTouchedBall = $root.GameEvent.AttackerDoubleTouchedBall.fromObject(object.attackerDoubleTouchedBall);
        }
        if (object.attackerTooCloseToDefenseArea != null) {
            if (typeof object.attackerTooCloseToDefenseArea !== "object")
                throw TypeError(".GameEvent.attackerTooCloseToDefenseArea: object expected");
            message.attackerTooCloseToDefenseArea = $root.GameEvent.AttackerTooCloseToDefenseArea.fromObject(object.attackerTooCloseToDefenseArea);
        }
        if (object.defenderInDefenseArea != null) {
            if (typeof object.defenderInDefenseArea !== "object")
                throw TypeError(".GameEvent.defenderInDefenseArea: object expected");
            message.defenderInDefenseArea = $root.GameEvent.DefenderInDefenseArea.fromObject(object.defenderInDefenseArea);
        }
        if (object.boundaryCrossing != null) {
            if (typeof object.boundaryCrossing !== "object")
                throw TypeError(".GameEvent.boundaryCrossing: object expected");
            message.boundaryCrossing = $root.GameEvent.BoundaryCrossing.fromObject(object.boundaryCrossing);
        }
        if (object.keeperHeldBall != null) {
            if (typeof object.keeperHeldBall !== "object")
                throw TypeError(".GameEvent.keeperHeldBall: object expected");
            message.keeperHeldBall = $root.GameEvent.KeeperHeldBall.fromObject(object.keeperHeldBall);
        }
        if (object.botDribbledBallTooFar != null) {
            if (typeof object.botDribbledBallTooFar !== "object")
                throw TypeError(".GameEvent.botDribbledBallTooFar: object expected");
            message.botDribbledBallTooFar = $root.GameEvent.BotDribbledBallTooFar.fromObject(object.botDribbledBallTooFar);
        }
        if (object.attackerTouchedBallInDefenseArea != null) {
            if (typeof object.attackerTouchedBallInDefenseArea !== "object")
                throw TypeError(".GameEvent.attackerTouchedBallInDefenseArea: object expected");
            message.attackerTouchedBallInDefenseArea = $root.GameEvent.AttackerTouchedBallInDefenseArea.fromObject(object.attackerTouchedBallInDefenseArea);
        }
        if (object.botKickedBallTooFast != null) {
            if (typeof object.botKickedBallTooFast !== "object")
                throw TypeError(".GameEvent.botKickedBallTooFast: object expected");
            message.botKickedBallTooFast = $root.GameEvent.BotKickedBallTooFast.fromObject(object.botKickedBallTooFast);
        }
        if (object.botCrashUnique != null) {
            if (typeof object.botCrashUnique !== "object")
                throw TypeError(".GameEvent.botCrashUnique: object expected");
            message.botCrashUnique = $root.GameEvent.BotCrashUnique.fromObject(object.botCrashUnique);
        }
        if (object.botCrashDrawn != null) {
            if (typeof object.botCrashDrawn !== "object")
                throw TypeError(".GameEvent.botCrashDrawn: object expected");
            message.botCrashDrawn = $root.GameEvent.BotCrashDrawn.fromObject(object.botCrashDrawn);
        }
        if (object.defenderTooCloseToKickPoint != null) {
            if (typeof object.defenderTooCloseToKickPoint !== "object")
                throw TypeError(".GameEvent.defenderTooCloseToKickPoint: object expected");
            message.defenderTooCloseToKickPoint = $root.GameEvent.DefenderTooCloseToKickPoint.fromObject(object.defenderTooCloseToKickPoint);
        }
        if (object.botTooFastInStop != null) {
            if (typeof object.botTooFastInStop !== "object")
                throw TypeError(".GameEvent.botTooFastInStop: object expected");
            message.botTooFastInStop = $root.GameEvent.BotTooFastInStop.fromObject(object.botTooFastInStop);
        }
        if (object.botInterferedPlacement != null) {
            if (typeof object.botInterferedPlacement !== "object")
                throw TypeError(".GameEvent.botInterferedPlacement: object expected");
            message.botInterferedPlacement = $root.GameEvent.BotInterferedPlacement.fromObject(object.botInterferedPlacement);
        }
        if (object.goal != null) {
            if (typeof object.goal !== "object")
                throw TypeError(".GameEvent.goal: object expected");
            message.goal = $root.GameEvent.Goal.fromObject(object.goal);
        }
        if (object.invalidGoal != null) {
            if (typeof object.invalidGoal !== "object")
                throw TypeError(".GameEvent.invalidGoal: object expected");
            message.invalidGoal = $root.GameEvent.Goal.fromObject(object.invalidGoal);
        }
        if (object.placementFailed != null) {
            if (typeof object.placementFailed !== "object")
                throw TypeError(".GameEvent.placementFailed: object expected");
            message.placementFailed = $root.GameEvent.PlacementFailed.fromObject(object.placementFailed);
        }
        if (object.placementSucceeded != null) {
            if (typeof object.placementSucceeded !== "object")
                throw TypeError(".GameEvent.placementSucceeded: object expected");
            message.placementSucceeded = $root.GameEvent.PlacementSucceeded.fromObject(object.placementSucceeded);
        }
        if (object.multipleCards != null) {
            if (typeof object.multipleCards !== "object")
                throw TypeError(".GameEvent.multipleCards: object expected");
            message.multipleCards = $root.GameEvent.MultipleCards.fromObject(object.multipleCards);
        }
        if (object.multipleFouls != null) {
            if (typeof object.multipleFouls !== "object")
                throw TypeError(".GameEvent.multipleFouls: object expected");
            message.multipleFouls = $root.GameEvent.MultipleFouls.fromObject(object.multipleFouls);
        }
        if (object.botSubstitution != null) {
            if (typeof object.botSubstitution !== "object")
                throw TypeError(".GameEvent.botSubstitution: object expected");
            message.botSubstitution = $root.GameEvent.BotSubstitution.fromObject(object.botSubstitution);
        }
        if (object.tooManyRobots != null) {
            if (typeof object.tooManyRobots !== "object")
                throw TypeError(".GameEvent.tooManyRobots: object expected");
            message.tooManyRobots = $root.GameEvent.TooManyRobots.fromObject(object.tooManyRobots);
        }
        if (object.unsportingBehaviorMinor != null) {
            if (typeof object.unsportingBehaviorMinor !== "object")
                throw TypeError(".GameEvent.unsportingBehaviorMinor: object expected");
            message.unsportingBehaviorMinor = $root.GameEvent.UnsportingBehaviorMinor.fromObject(object.unsportingBehaviorMinor);
        }
        if (object.unsportingBehaviorMajor != null) {
            if (typeof object.unsportingBehaviorMajor !== "object")
                throw TypeError(".GameEvent.unsportingBehaviorMajor: object expected");
            message.unsportingBehaviorMajor = $root.GameEvent.UnsportingBehaviorMajor.fromObject(object.unsportingBehaviorMajor);
        }
        if (object.botPushedBot != null) {
            if (typeof object.botPushedBot !== "object")
                throw TypeError(".GameEvent.botPushedBot: object expected");
            message.botPushedBot = $root.GameEvent.BotPushedBot.fromObject(object.botPushedBot);
        }
        if (object.botHeldBallDeliberately != null) {
            if (typeof object.botHeldBallDeliberately !== "object")
                throw TypeError(".GameEvent.botHeldBallDeliberately: object expected");
            message.botHeldBallDeliberately = $root.GameEvent.BotHeldBallDeliberately.fromObject(object.botHeldBallDeliberately);
        }
        if (object.botTippedOver != null) {
            if (typeof object.botTippedOver !== "object")
                throw TypeError(".GameEvent.botTippedOver: object expected");
            message.botTippedOver = $root.GameEvent.BotTippedOver.fromObject(object.botTippedOver);
        }
        if (object.prepared != null) {
            if (typeof object.prepared !== "object")
                throw TypeError(".GameEvent.prepared: object expected");
            message.prepared = $root.GameEvent.Prepared.fromObject(object.prepared);
        }
        if (object.indirectGoal != null) {
            if (typeof object.indirectGoal !== "object")
                throw TypeError(".GameEvent.indirectGoal: object expected");
            message.indirectGoal = $root.GameEvent.IndirectGoal.fromObject(object.indirectGoal);
        }
        if (object.chippedGoal != null) {
            if (typeof object.chippedGoal !== "object")
                throw TypeError(".GameEvent.chippedGoal: object expected");
            message.chippedGoal = $root.GameEvent.ChippedGoal.fromObject(object.chippedGoal);
        }
        if (object.kickTimeout != null) {
            if (typeof object.kickTimeout !== "object")
                throw TypeError(".GameEvent.kickTimeout: object expected");
            message.kickTimeout = $root.GameEvent.KickTimeout.fromObject(object.kickTimeout);
        }
        if (object.attackerTouchedOpponentInDefenseArea != null) {
            if (typeof object.attackerTouchedOpponentInDefenseArea !== "object")
                throw TypeError(".GameEvent.attackerTouchedOpponentInDefenseArea: object expected");
            message.attackerTouchedOpponentInDefenseArea = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.fromObject(object.attackerTouchedOpponentInDefenseArea);
        }
        if (object.attackerTouchedOpponentInDefenseAreaSkipped != null) {
            if (typeof object.attackerTouchedOpponentInDefenseAreaSkipped !== "object")
                throw TypeError(".GameEvent.attackerTouchedOpponentInDefenseAreaSkipped: object expected");
            message.attackerTouchedOpponentInDefenseAreaSkipped = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.fromObject(object.attackerTouchedOpponentInDefenseAreaSkipped);
        }
        if (object.botCrashUniqueSkipped != null) {
            if (typeof object.botCrashUniqueSkipped !== "object")
                throw TypeError(".GameEvent.botCrashUniqueSkipped: object expected");
            message.botCrashUniqueSkipped = $root.GameEvent.BotCrashUnique.fromObject(object.botCrashUniqueSkipped);
        }
        if (object.botPushedBotSkipped != null) {
            if (typeof object.botPushedBotSkipped !== "object")
                throw TypeError(".GameEvent.botPushedBotSkipped: object expected");
            message.botPushedBotSkipped = $root.GameEvent.BotPushedBot.fromObject(object.botPushedBotSkipped);
        }
        if (object.defenderInDefenseAreaPartially != null) {
            if (typeof object.defenderInDefenseAreaPartially !== "object")
                throw TypeError(".GameEvent.defenderInDefenseAreaPartially: object expected");
            message.defenderInDefenseAreaPartially = $root.GameEvent.DefenderInDefenseAreaPartially.fromObject(object.defenderInDefenseAreaPartially);
        }
        if (object.multiplePlacementFailures != null) {
            if (typeof object.multiplePlacementFailures !== "object")
                throw TypeError(".GameEvent.multiplePlacementFailures: object expected");
            message.multiplePlacementFailures = $root.GameEvent.MultiplePlacementFailures.fromObject(object.multiplePlacementFailures);
        }
        return message;
    };

    /**
     * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameEvent
     * @static
     * @param {GameEvent} message GameEvent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameEvent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.origin = [];
        if (options.defaults)
            object.type = options.enums === String ? "UNKNOWN_GAME_EVENT_TYPE" : 0;
        if (message.prepared != null && message.hasOwnProperty("prepared")) {
            object.prepared = $root.GameEvent.Prepared.toObject(message.prepared, options);
            if (options.oneofs)
                object.event = "prepared";
        }
        if (message.noProgressInGame != null && message.hasOwnProperty("noProgressInGame")) {
            object.noProgressInGame = $root.GameEvent.NoProgressInGame.toObject(message.noProgressInGame, options);
            if (options.oneofs)
                object.event = "noProgressInGame";
        }
        if (message.placementFailed != null && message.hasOwnProperty("placementFailed")) {
            object.placementFailed = $root.GameEvent.PlacementFailed.toObject(message.placementFailed, options);
            if (options.oneofs)
                object.event = "placementFailed";
        }
        if (message.placementSucceeded != null && message.hasOwnProperty("placementSucceeded")) {
            object.placementSucceeded = $root.GameEvent.PlacementSucceeded.toObject(message.placementSucceeded, options);
            if (options.oneofs)
                object.event = "placementSucceeded";
        }
        if (message.ballLeftFieldTouchLine != null && message.hasOwnProperty("ballLeftFieldTouchLine")) {
            object.ballLeftFieldTouchLine = $root.GameEvent.BallLeftField.toObject(message.ballLeftFieldTouchLine, options);
            if (options.oneofs)
                object.event = "ballLeftFieldTouchLine";
        }
        if (message.ballLeftFieldGoalLine != null && message.hasOwnProperty("ballLeftFieldGoalLine")) {
            object.ballLeftFieldGoalLine = $root.GameEvent.BallLeftField.toObject(message.ballLeftFieldGoalLine, options);
            if (options.oneofs)
                object.event = "ballLeftFieldGoalLine";
        }
        if (message.goal != null && message.hasOwnProperty("goal")) {
            object.goal = $root.GameEvent.Goal.toObject(message.goal, options);
            if (options.oneofs)
                object.event = "goal";
        }
        if (message.indirectGoal != null && message.hasOwnProperty("indirectGoal")) {
            object.indirectGoal = $root.GameEvent.IndirectGoal.toObject(message.indirectGoal, options);
            if (options.oneofs)
                object.event = "indirectGoal";
        }
        if (message.chippedGoal != null && message.hasOwnProperty("chippedGoal")) {
            object.chippedGoal = $root.GameEvent.ChippedGoal.toObject(message.chippedGoal, options);
            if (options.oneofs)
                object.event = "chippedGoal";
        }
        if (message.aimlessKick != null && message.hasOwnProperty("aimlessKick")) {
            object.aimlessKick = $root.GameEvent.AimlessKick.toObject(message.aimlessKick, options);
            if (options.oneofs)
                object.event = "aimlessKick";
        }
        if (message.kickTimeout != null && message.hasOwnProperty("kickTimeout")) {
            object.kickTimeout = $root.GameEvent.KickTimeout.toObject(message.kickTimeout, options);
            if (options.oneofs)
                object.event = "kickTimeout";
        }
        if (message.keeperHeldBall != null && message.hasOwnProperty("keeperHeldBall")) {
            object.keeperHeldBall = $root.GameEvent.KeeperHeldBall.toObject(message.keeperHeldBall, options);
            if (options.oneofs)
                object.event = "keeperHeldBall";
        }
        if (message.attackerDoubleTouchedBall != null && message.hasOwnProperty("attackerDoubleTouchedBall")) {
            object.attackerDoubleTouchedBall = $root.GameEvent.AttackerDoubleTouchedBall.toObject(message.attackerDoubleTouchedBall, options);
            if (options.oneofs)
                object.event = "attackerDoubleTouchedBall";
        }
        if (message.attackerTouchedBallInDefenseArea != null && message.hasOwnProperty("attackerTouchedBallInDefenseArea")) {
            object.attackerTouchedBallInDefenseArea = $root.GameEvent.AttackerTouchedBallInDefenseArea.toObject(message.attackerTouchedBallInDefenseArea, options);
            if (options.oneofs)
                object.event = "attackerTouchedBallInDefenseArea";
        }
        if (message.attackerTouchedOpponentInDefenseArea != null && message.hasOwnProperty("attackerTouchedOpponentInDefenseArea")) {
            object.attackerTouchedOpponentInDefenseArea = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.toObject(message.attackerTouchedOpponentInDefenseArea, options);
            if (options.oneofs)
                object.event = "attackerTouchedOpponentInDefenseArea";
        }
        if (message.botDribbledBallTooFar != null && message.hasOwnProperty("botDribbledBallTooFar")) {
            object.botDribbledBallTooFar = $root.GameEvent.BotDribbledBallTooFar.toObject(message.botDribbledBallTooFar, options);
            if (options.oneofs)
                object.event = "botDribbledBallTooFar";
        }
        if (message.botKickedBallTooFast != null && message.hasOwnProperty("botKickedBallTooFast")) {
            object.botKickedBallTooFast = $root.GameEvent.BotKickedBallTooFast.toObject(message.botKickedBallTooFast, options);
            if (options.oneofs)
                object.event = "botKickedBallTooFast";
        }
        if (message.attackerTooCloseToDefenseArea != null && message.hasOwnProperty("attackerTooCloseToDefenseArea")) {
            object.attackerTooCloseToDefenseArea = $root.GameEvent.AttackerTooCloseToDefenseArea.toObject(message.attackerTooCloseToDefenseArea, options);
            if (options.oneofs)
                object.event = "attackerTooCloseToDefenseArea";
        }
        if (message.botInterferedPlacement != null && message.hasOwnProperty("botInterferedPlacement")) {
            object.botInterferedPlacement = $root.GameEvent.BotInterferedPlacement.toObject(message.botInterferedPlacement, options);
            if (options.oneofs)
                object.event = "botInterferedPlacement";
        }
        if (message.botCrashDrawn != null && message.hasOwnProperty("botCrashDrawn")) {
            object.botCrashDrawn = $root.GameEvent.BotCrashDrawn.toObject(message.botCrashDrawn, options);
            if (options.oneofs)
                object.event = "botCrashDrawn";
        }
        if (message.botCrashUnique != null && message.hasOwnProperty("botCrashUnique")) {
            object.botCrashUnique = $root.GameEvent.BotCrashUnique.toObject(message.botCrashUnique, options);
            if (options.oneofs)
                object.event = "botCrashUnique";
        }
        if (message.botCrashUniqueSkipped != null && message.hasOwnProperty("botCrashUniqueSkipped")) {
            object.botCrashUniqueSkipped = $root.GameEvent.BotCrashUnique.toObject(message.botCrashUniqueSkipped, options);
            if (options.oneofs)
                object.event = "botCrashUniqueSkipped";
        }
        if (message.botPushedBot != null && message.hasOwnProperty("botPushedBot")) {
            object.botPushedBot = $root.GameEvent.BotPushedBot.toObject(message.botPushedBot, options);
            if (options.oneofs)
                object.event = "botPushedBot";
        }
        if (message.botPushedBotSkipped != null && message.hasOwnProperty("botPushedBotSkipped")) {
            object.botPushedBotSkipped = $root.GameEvent.BotPushedBot.toObject(message.botPushedBotSkipped, options);
            if (options.oneofs)
                object.event = "botPushedBotSkipped";
        }
        if (message.botHeldBallDeliberately != null && message.hasOwnProperty("botHeldBallDeliberately")) {
            object.botHeldBallDeliberately = $root.GameEvent.BotHeldBallDeliberately.toObject(message.botHeldBallDeliberately, options);
            if (options.oneofs)
                object.event = "botHeldBallDeliberately";
        }
        if (message.botTippedOver != null && message.hasOwnProperty("botTippedOver")) {
            object.botTippedOver = $root.GameEvent.BotTippedOver.toObject(message.botTippedOver, options);
            if (options.oneofs)
                object.event = "botTippedOver";
        }
        if (message.botTooFastInStop != null && message.hasOwnProperty("botTooFastInStop")) {
            object.botTooFastInStop = $root.GameEvent.BotTooFastInStop.toObject(message.botTooFastInStop, options);
            if (options.oneofs)
                object.event = "botTooFastInStop";
        }
        if (message.defenderTooCloseToKickPoint != null && message.hasOwnProperty("defenderTooCloseToKickPoint")) {
            object.defenderTooCloseToKickPoint = $root.GameEvent.DefenderTooCloseToKickPoint.toObject(message.defenderTooCloseToKickPoint, options);
            if (options.oneofs)
                object.event = "defenderTooCloseToKickPoint";
        }
        if (message.defenderInDefenseAreaPartially != null && message.hasOwnProperty("defenderInDefenseAreaPartially")) {
            object.defenderInDefenseAreaPartially = $root.GameEvent.DefenderInDefenseAreaPartially.toObject(message.defenderInDefenseAreaPartially, options);
            if (options.oneofs)
                object.event = "defenderInDefenseAreaPartially";
        }
        if (message.defenderInDefenseArea != null && message.hasOwnProperty("defenderInDefenseArea")) {
            object.defenderInDefenseArea = $root.GameEvent.DefenderInDefenseArea.toObject(message.defenderInDefenseArea, options);
            if (options.oneofs)
                object.event = "defenderInDefenseArea";
        }
        if (message.multipleCards != null && message.hasOwnProperty("multipleCards")) {
            object.multipleCards = $root.GameEvent.MultipleCards.toObject(message.multipleCards, options);
            if (options.oneofs)
                object.event = "multipleCards";
        }
        if (message.multiplePlacementFailures != null && message.hasOwnProperty("multiplePlacementFailures")) {
            object.multiplePlacementFailures = $root.GameEvent.MultiplePlacementFailures.toObject(message.multiplePlacementFailures, options);
            if (options.oneofs)
                object.event = "multiplePlacementFailures";
        }
        if (message.multipleFouls != null && message.hasOwnProperty("multipleFouls")) {
            object.multipleFouls = $root.GameEvent.MultipleFouls.toObject(message.multipleFouls, options);
            if (options.oneofs)
                object.event = "multipleFouls";
        }
        if (message.unsportingBehaviorMinor != null && message.hasOwnProperty("unsportingBehaviorMinor")) {
            object.unsportingBehaviorMinor = $root.GameEvent.UnsportingBehaviorMinor.toObject(message.unsportingBehaviorMinor, options);
            if (options.oneofs)
                object.event = "unsportingBehaviorMinor";
        }
        if (message.unsportingBehaviorMajor != null && message.hasOwnProperty("unsportingBehaviorMajor")) {
            object.unsportingBehaviorMajor = $root.GameEvent.UnsportingBehaviorMajor.toObject(message.unsportingBehaviorMajor, options);
            if (options.oneofs)
                object.event = "unsportingBehaviorMajor";
        }
        if (message.botSubstitution != null && message.hasOwnProperty("botSubstitution")) {
            object.botSubstitution = $root.GameEvent.BotSubstitution.toObject(message.botSubstitution, options);
            if (options.oneofs)
                object.event = "botSubstitution";
        }
        if (message.tooManyRobots != null && message.hasOwnProperty("tooManyRobots")) {
            object.tooManyRobots = $root.GameEvent.TooManyRobots.toObject(message.tooManyRobots, options);
            if (options.oneofs)
                object.event = "tooManyRobots";
        }
        if (message.possibleGoal != null && message.hasOwnProperty("possibleGoal")) {
            object.possibleGoal = $root.GameEvent.Goal.toObject(message.possibleGoal, options);
            if (options.oneofs)
                object.event = "possibleGoal";
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.GameEvent.Type[message.type] : message.type;
        if (message.origin && message.origin.length) {
            object.origin = [];
            for (let j = 0; j < message.origin.length; ++j)
                object.origin[j] = message.origin[j];
        }
        if (message.attackerTouchedOpponentInDefenseAreaSkipped != null && message.hasOwnProperty("attackerTouchedOpponentInDefenseAreaSkipped")) {
            object.attackerTouchedOpponentInDefenseAreaSkipped = $root.GameEvent.AttackerTouchedOpponentInDefenseArea.toObject(message.attackerTouchedOpponentInDefenseAreaSkipped, options);
            if (options.oneofs)
                object.event = "attackerTouchedOpponentInDefenseAreaSkipped";
        }
        if (message.boundaryCrossing != null && message.hasOwnProperty("boundaryCrossing")) {
            object.boundaryCrossing = $root.GameEvent.BoundaryCrossing.toObject(message.boundaryCrossing, options);
            if (options.oneofs)
                object.event = "boundaryCrossing";
        }
        if (message.invalidGoal != null && message.hasOwnProperty("invalidGoal")) {
            object.invalidGoal = $root.GameEvent.Goal.toObject(message.invalidGoal, options);
            if (options.oneofs)
                object.event = "invalidGoal";
        }
        return object;
    };

    /**
     * Converts this GameEvent to JSON.
     * @function toJSON
     * @memberof GameEvent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameEvent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    GameEvent.BallLeftField = (function() {

        /**
         * Properties of a BallLeftField.
         * @memberof GameEvent
         * @interface IBallLeftField
         * @property {Team} byTeam BallLeftField byTeam
         * @property {number|null} [byBot] BallLeftField byBot
         * @property {IVector2|null} [location] BallLeftField location
         */

        /**
         * Constructs a new BallLeftField.
         * @memberof GameEvent
         * @classdesc Represents a BallLeftField.
         * @implements IBallLeftField
         * @constructor
         * @param {GameEvent.IBallLeftField=} [properties] Properties to set
         */
        function BallLeftField(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BallLeftField byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BallLeftField
         * @instance
         */
        BallLeftField.prototype.byTeam = 0;

        /**
         * BallLeftField byBot.
         * @member {number} byBot
         * @memberof GameEvent.BallLeftField
         * @instance
         */
        BallLeftField.prototype.byBot = 0;

        /**
         * BallLeftField location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BallLeftField
         * @instance
         */
        BallLeftField.prototype.location = null;

        /**
         * Creates a new BallLeftField instance using the specified properties.
         * @function create
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {GameEvent.IBallLeftField=} [properties] Properties to set
         * @returns {GameEvent.BallLeftField} BallLeftField instance
         */
        BallLeftField.create = function create(properties) {
            return new BallLeftField(properties);
        };

        /**
         * Encodes the specified BallLeftField message. Does not implicitly {@link GameEvent.BallLeftField.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {GameEvent.IBallLeftField} message BallLeftField message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BallLeftField.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BallLeftField message, length delimited. Does not implicitly {@link GameEvent.BallLeftField.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {GameEvent.IBallLeftField} message BallLeftField message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BallLeftField.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BallLeftField message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BallLeftField} BallLeftField
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BallLeftField.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BallLeftField();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BallLeftField message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BallLeftField} BallLeftField
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BallLeftField.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BallLeftField message.
         * @function verify
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BallLeftField.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            return null;
        };

        /**
         * Creates a BallLeftField message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BallLeftField} BallLeftField
         */
        BallLeftField.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BallLeftField)
                return object;
            let message = new $root.GameEvent.BallLeftField();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BallLeftField.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            return message;
        };

        /**
         * Creates a plain object from a BallLeftField message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BallLeftField
         * @static
         * @param {GameEvent.BallLeftField} message BallLeftField
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BallLeftField.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            return object;
        };

        /**
         * Converts this BallLeftField to JSON.
         * @function toJSON
         * @memberof GameEvent.BallLeftField
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BallLeftField.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BallLeftField;
    })();

    GameEvent.AimlessKick = (function() {

        /**
         * Properties of an AimlessKick.
         * @memberof GameEvent
         * @interface IAimlessKick
         * @property {Team} byTeam AimlessKick byTeam
         * @property {number|null} [byBot] AimlessKick byBot
         * @property {IVector2|null} [location] AimlessKick location
         * @property {IVector2|null} [kickLocation] AimlessKick kickLocation
         */

        /**
         * Constructs a new AimlessKick.
         * @memberof GameEvent
         * @classdesc Represents an AimlessKick.
         * @implements IAimlessKick
         * @constructor
         * @param {GameEvent.IAimlessKick=} [properties] Properties to set
         */
        function AimlessKick(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AimlessKick byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.AimlessKick
         * @instance
         */
        AimlessKick.prototype.byTeam = 0;

        /**
         * AimlessKick byBot.
         * @member {number} byBot
         * @memberof GameEvent.AimlessKick
         * @instance
         */
        AimlessKick.prototype.byBot = 0;

        /**
         * AimlessKick location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.AimlessKick
         * @instance
         */
        AimlessKick.prototype.location = null;

        /**
         * AimlessKick kickLocation.
         * @member {IVector2|null|undefined} kickLocation
         * @memberof GameEvent.AimlessKick
         * @instance
         */
        AimlessKick.prototype.kickLocation = null;

        /**
         * Creates a new AimlessKick instance using the specified properties.
         * @function create
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {GameEvent.IAimlessKick=} [properties] Properties to set
         * @returns {GameEvent.AimlessKick} AimlessKick instance
         */
        AimlessKick.create = function create(properties) {
            return new AimlessKick(properties);
        };

        /**
         * Encodes the specified AimlessKick message. Does not implicitly {@link GameEvent.AimlessKick.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {GameEvent.IAimlessKick} message AimlessKick message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AimlessKick.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                $root.Vector2.encode(message.kickLocation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AimlessKick message, length delimited. Does not implicitly {@link GameEvent.AimlessKick.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {GameEvent.IAimlessKick} message AimlessKick message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AimlessKick.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AimlessKick message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.AimlessKick} AimlessKick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AimlessKick.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.AimlessKick();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.kickLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes an AimlessKick message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.AimlessKick} AimlessKick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AimlessKick.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AimlessKick message.
         * @function verify
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AimlessKick.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation")) {
                let error = $root.Vector2.verify(message.kickLocation);
                if (error)
                    return "kickLocation." + error;
            }
            return null;
        };

        /**
         * Creates an AimlessKick message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.AimlessKick} AimlessKick
         */
        AimlessKick.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.AimlessKick)
                return object;
            let message = new $root.GameEvent.AimlessKick();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.AimlessKick.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.kickLocation != null) {
                if (typeof object.kickLocation !== "object")
                    throw TypeError(".GameEvent.AimlessKick.kickLocation: object expected");
                message.kickLocation = $root.Vector2.fromObject(object.kickLocation);
            }
            return message;
        };

        /**
         * Creates a plain object from an AimlessKick message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.AimlessKick
         * @static
         * @param {GameEvent.AimlessKick} message AimlessKick
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AimlessKick.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.kickLocation = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                object.kickLocation = $root.Vector2.toObject(message.kickLocation, options);
            return object;
        };

        /**
         * Converts this AimlessKick to JSON.
         * @function toJSON
         * @memberof GameEvent.AimlessKick
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AimlessKick.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AimlessKick;
    })();

    GameEvent.Goal = (function() {

        /**
         * Properties of a Goal.
         * @memberof GameEvent
         * @interface IGoal
         * @property {Team} byTeam Goal byTeam
         * @property {Team|null} [kickingTeam] Goal kickingTeam
         * @property {number|null} [kickingBot] Goal kickingBot
         * @property {IVector2|null} [location] Goal location
         * @property {IVector2|null} [kickLocation] Goal kickLocation
         * @property {number|null} [kickSpeed] Goal kickSpeed
         * @property {number|null} [maxBallHeight] Goal maxBallHeight
         */

        /**
         * Constructs a new Goal.
         * @memberof GameEvent
         * @classdesc Represents a Goal.
         * @implements IGoal
         * @constructor
         * @param {GameEvent.IGoal=} [properties] Properties to set
         */
        function Goal(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Goal byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.Goal
         * @instance
         */
        Goal.prototype.byTeam = 0;

        /**
         * Goal kickingTeam.
         * @member {Team} kickingTeam
         * @memberof GameEvent.Goal
         * @instance
         */
        Goal.prototype.kickingTeam = 0;

        /**
         * Goal kickingBot.
         * @member {number} kickingBot
         * @memberof GameEvent.Goal
         * @instance
         */
        Goal.prototype.kickingBot = 0;

        /**
         * Goal location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.Goal
         * @instance
         */
        Goal.prototype.location = null;

        /**
         * Goal kickLocation.
         * @member {IVector2|null|undefined} kickLocation
         * @memberof GameEvent.Goal
         * @instance
         */
        Goal.prototype.kickLocation = null;

        /**
         * Goal kickSpeed.
         * @member {number} kickSpeed
         * @memberof GameEvent.Goal
         * @instance
         */
        Goal.prototype.kickSpeed = 0;

        /**
         * Goal maxBallHeight.
         * @member {number} maxBallHeight
         * @memberof GameEvent.Goal
         * @instance
         */
        Goal.prototype.maxBallHeight = 0;

        /**
         * Creates a new Goal instance using the specified properties.
         * @function create
         * @memberof GameEvent.Goal
         * @static
         * @param {GameEvent.IGoal=} [properties] Properties to set
         * @returns {GameEvent.Goal} Goal instance
         */
        Goal.create = function create(properties) {
            return new Goal(properties);
        };

        /**
         * Encodes the specified Goal message. Does not implicitly {@link GameEvent.Goal.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.Goal
         * @static
         * @param {GameEvent.IGoal} message Goal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Goal.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.kickingBot != null && message.hasOwnProperty("kickingBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.kickingBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                $root.Vector2.encode(message.kickLocation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.kickSpeed != null && message.hasOwnProperty("kickSpeed"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.kickSpeed);
            if (message.kickingTeam != null && message.hasOwnProperty("kickingTeam"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.kickingTeam);
            if (message.maxBallHeight != null && message.hasOwnProperty("maxBallHeight"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.maxBallHeight);
            return writer;
        };

        /**
         * Encodes the specified Goal message, length delimited. Does not implicitly {@link GameEvent.Goal.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.Goal
         * @static
         * @param {GameEvent.IGoal} message Goal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Goal.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Goal message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.Goal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.Goal} Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Goal.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.Goal();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 6:
                    message.kickingTeam = reader.int32();
                    break;
                case 2:
                    message.kickingBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.kickLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.kickSpeed = reader.float();
                    break;
                case 7:
                    message.maxBallHeight = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a Goal message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.Goal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.Goal} Goal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Goal.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Goal message.
         * @function verify
         * @memberof GameEvent.Goal
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Goal.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.kickingTeam != null && message.hasOwnProperty("kickingTeam"))
                switch (message.kickingTeam) {
                default:
                    return "kickingTeam: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.kickingBot != null && message.hasOwnProperty("kickingBot"))
                if (!$util.isInteger(message.kickingBot))
                    return "kickingBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation")) {
                let error = $root.Vector2.verify(message.kickLocation);
                if (error)
                    return "kickLocation." + error;
            }
            if (message.kickSpeed != null && message.hasOwnProperty("kickSpeed"))
                if (typeof message.kickSpeed !== "number")
                    return "kickSpeed: number expected";
            if (message.maxBallHeight != null && message.hasOwnProperty("maxBallHeight"))
                if (typeof message.maxBallHeight !== "number")
                    return "maxBallHeight: number expected";
            return null;
        };

        /**
         * Creates a Goal message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.Goal
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.Goal} Goal
         */
        Goal.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.Goal)
                return object;
            let message = new $root.GameEvent.Goal();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            switch (object.kickingTeam) {
            case "UNKNOWN":
            case 0:
                message.kickingTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.kickingTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.kickingTeam = 2;
                break;
            }
            if (object.kickingBot != null)
                message.kickingBot = object.kickingBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.Goal.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.kickLocation != null) {
                if (typeof object.kickLocation !== "object")
                    throw TypeError(".GameEvent.Goal.kickLocation: object expected");
                message.kickLocation = $root.Vector2.fromObject(object.kickLocation);
            }
            if (object.kickSpeed != null)
                message.kickSpeed = Number(object.kickSpeed);
            if (object.maxBallHeight != null)
                message.maxBallHeight = Number(object.maxBallHeight);
            return message;
        };

        /**
         * Creates a plain object from a Goal message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.Goal
         * @static
         * @param {GameEvent.Goal} message Goal
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Goal.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.kickingBot = 0;
                object.location = null;
                object.kickLocation = null;
                object.kickSpeed = 0;
                object.kickingTeam = options.enums === String ? "UNKNOWN" : 0;
                object.maxBallHeight = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.kickingBot != null && message.hasOwnProperty("kickingBot"))
                object.kickingBot = message.kickingBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                object.kickLocation = $root.Vector2.toObject(message.kickLocation, options);
            if (message.kickSpeed != null && message.hasOwnProperty("kickSpeed"))
                object.kickSpeed = options.json && !isFinite(message.kickSpeed) ? String(message.kickSpeed) : message.kickSpeed;
            if (message.kickingTeam != null && message.hasOwnProperty("kickingTeam"))
                object.kickingTeam = options.enums === String ? $root.Team[message.kickingTeam] : message.kickingTeam;
            if (message.maxBallHeight != null && message.hasOwnProperty("maxBallHeight"))
                object.maxBallHeight = options.json && !isFinite(message.maxBallHeight) ? String(message.maxBallHeight) : message.maxBallHeight;
            return object;
        };

        /**
         * Converts this Goal to JSON.
         * @function toJSON
         * @memberof GameEvent.Goal
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Goal.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Goal;
    })();

    GameEvent.IndirectGoal = (function() {

        /**
         * Properties of an IndirectGoal.
         * @memberof GameEvent
         * @interface IIndirectGoal
         * @property {Team} byTeam IndirectGoal byTeam
         * @property {number|null} [byBot] IndirectGoal byBot
         * @property {IVector2|null} [location] IndirectGoal location
         * @property {IVector2|null} [kickLocation] IndirectGoal kickLocation
         */

        /**
         * Constructs a new IndirectGoal.
         * @memberof GameEvent
         * @classdesc Represents an IndirectGoal.
         * @implements IIndirectGoal
         * @constructor
         * @param {GameEvent.IIndirectGoal=} [properties] Properties to set
         */
        function IndirectGoal(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IndirectGoal byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.IndirectGoal
         * @instance
         */
        IndirectGoal.prototype.byTeam = 0;

        /**
         * IndirectGoal byBot.
         * @member {number} byBot
         * @memberof GameEvent.IndirectGoal
         * @instance
         */
        IndirectGoal.prototype.byBot = 0;

        /**
         * IndirectGoal location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.IndirectGoal
         * @instance
         */
        IndirectGoal.prototype.location = null;

        /**
         * IndirectGoal kickLocation.
         * @member {IVector2|null|undefined} kickLocation
         * @memberof GameEvent.IndirectGoal
         * @instance
         */
        IndirectGoal.prototype.kickLocation = null;

        /**
         * Creates a new IndirectGoal instance using the specified properties.
         * @function create
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {GameEvent.IIndirectGoal=} [properties] Properties to set
         * @returns {GameEvent.IndirectGoal} IndirectGoal instance
         */
        IndirectGoal.create = function create(properties) {
            return new IndirectGoal(properties);
        };

        /**
         * Encodes the specified IndirectGoal message. Does not implicitly {@link GameEvent.IndirectGoal.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {GameEvent.IIndirectGoal} message IndirectGoal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IndirectGoal.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                $root.Vector2.encode(message.kickLocation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified IndirectGoal message, length delimited. Does not implicitly {@link GameEvent.IndirectGoal.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {GameEvent.IIndirectGoal} message IndirectGoal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IndirectGoal.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an IndirectGoal message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.IndirectGoal} IndirectGoal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IndirectGoal.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.IndirectGoal();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.kickLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes an IndirectGoal message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.IndirectGoal} IndirectGoal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IndirectGoal.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an IndirectGoal message.
         * @function verify
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        IndirectGoal.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation")) {
                let error = $root.Vector2.verify(message.kickLocation);
                if (error)
                    return "kickLocation." + error;
            }
            return null;
        };

        /**
         * Creates an IndirectGoal message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.IndirectGoal} IndirectGoal
         */
        IndirectGoal.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.IndirectGoal)
                return object;
            let message = new $root.GameEvent.IndirectGoal();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.IndirectGoal.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.kickLocation != null) {
                if (typeof object.kickLocation !== "object")
                    throw TypeError(".GameEvent.IndirectGoal.kickLocation: object expected");
                message.kickLocation = $root.Vector2.fromObject(object.kickLocation);
            }
            return message;
        };

        /**
         * Creates a plain object from an IndirectGoal message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.IndirectGoal
         * @static
         * @param {GameEvent.IndirectGoal} message IndirectGoal
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        IndirectGoal.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.kickLocation = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                object.kickLocation = $root.Vector2.toObject(message.kickLocation, options);
            return object;
        };

        /**
         * Converts this IndirectGoal to JSON.
         * @function toJSON
         * @memberof GameEvent.IndirectGoal
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        IndirectGoal.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return IndirectGoal;
    })();

    GameEvent.ChippedGoal = (function() {

        /**
         * Properties of a ChippedGoal.
         * @memberof GameEvent
         * @interface IChippedGoal
         * @property {Team} byTeam ChippedGoal byTeam
         * @property {number|null} [byBot] ChippedGoal byBot
         * @property {IVector2|null} [location] ChippedGoal location
         * @property {IVector2|null} [kickLocation] ChippedGoal kickLocation
         * @property {number|null} [maxBallHeight] ChippedGoal maxBallHeight
         */

        /**
         * Constructs a new ChippedGoal.
         * @memberof GameEvent
         * @classdesc Represents a ChippedGoal.
         * @implements IChippedGoal
         * @constructor
         * @param {GameEvent.IChippedGoal=} [properties] Properties to set
         */
        function ChippedGoal(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChippedGoal byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.ChippedGoal
         * @instance
         */
        ChippedGoal.prototype.byTeam = 0;

        /**
         * ChippedGoal byBot.
         * @member {number} byBot
         * @memberof GameEvent.ChippedGoal
         * @instance
         */
        ChippedGoal.prototype.byBot = 0;

        /**
         * ChippedGoal location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.ChippedGoal
         * @instance
         */
        ChippedGoal.prototype.location = null;

        /**
         * ChippedGoal kickLocation.
         * @member {IVector2|null|undefined} kickLocation
         * @memberof GameEvent.ChippedGoal
         * @instance
         */
        ChippedGoal.prototype.kickLocation = null;

        /**
         * ChippedGoal maxBallHeight.
         * @member {number} maxBallHeight
         * @memberof GameEvent.ChippedGoal
         * @instance
         */
        ChippedGoal.prototype.maxBallHeight = 0;

        /**
         * Creates a new ChippedGoal instance using the specified properties.
         * @function create
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {GameEvent.IChippedGoal=} [properties] Properties to set
         * @returns {GameEvent.ChippedGoal} ChippedGoal instance
         */
        ChippedGoal.create = function create(properties) {
            return new ChippedGoal(properties);
        };

        /**
         * Encodes the specified ChippedGoal message. Does not implicitly {@link GameEvent.ChippedGoal.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {GameEvent.IChippedGoal} message ChippedGoal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChippedGoal.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                $root.Vector2.encode(message.kickLocation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.maxBallHeight != null && message.hasOwnProperty("maxBallHeight"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.maxBallHeight);
            return writer;
        };

        /**
         * Encodes the specified ChippedGoal message, length delimited. Does not implicitly {@link GameEvent.ChippedGoal.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {GameEvent.IChippedGoal} message ChippedGoal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChippedGoal.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChippedGoal message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.ChippedGoal} ChippedGoal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChippedGoal.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.ChippedGoal();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.kickLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.maxBallHeight = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a ChippedGoal message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.ChippedGoal} ChippedGoal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChippedGoal.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChippedGoal message.
         * @function verify
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChippedGoal.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation")) {
                let error = $root.Vector2.verify(message.kickLocation);
                if (error)
                    return "kickLocation." + error;
            }
            if (message.maxBallHeight != null && message.hasOwnProperty("maxBallHeight"))
                if (typeof message.maxBallHeight !== "number")
                    return "maxBallHeight: number expected";
            return null;
        };

        /**
         * Creates a ChippedGoal message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.ChippedGoal} ChippedGoal
         */
        ChippedGoal.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.ChippedGoal)
                return object;
            let message = new $root.GameEvent.ChippedGoal();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.ChippedGoal.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.kickLocation != null) {
                if (typeof object.kickLocation !== "object")
                    throw TypeError(".GameEvent.ChippedGoal.kickLocation: object expected");
                message.kickLocation = $root.Vector2.fromObject(object.kickLocation);
            }
            if (object.maxBallHeight != null)
                message.maxBallHeight = Number(object.maxBallHeight);
            return message;
        };

        /**
         * Creates a plain object from a ChippedGoal message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.ChippedGoal
         * @static
         * @param {GameEvent.ChippedGoal} message ChippedGoal
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChippedGoal.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.kickLocation = null;
                object.maxBallHeight = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.kickLocation != null && message.hasOwnProperty("kickLocation"))
                object.kickLocation = $root.Vector2.toObject(message.kickLocation, options);
            if (message.maxBallHeight != null && message.hasOwnProperty("maxBallHeight"))
                object.maxBallHeight = options.json && !isFinite(message.maxBallHeight) ? String(message.maxBallHeight) : message.maxBallHeight;
            return object;
        };

        /**
         * Converts this ChippedGoal to JSON.
         * @function toJSON
         * @memberof GameEvent.ChippedGoal
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChippedGoal.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChippedGoal;
    })();

    GameEvent.BotTooFastInStop = (function() {

        /**
         * Properties of a BotTooFastInStop.
         * @memberof GameEvent
         * @interface IBotTooFastInStop
         * @property {Team} byTeam BotTooFastInStop byTeam
         * @property {number|null} [byBot] BotTooFastInStop byBot
         * @property {IVector2|null} [location] BotTooFastInStop location
         * @property {number|null} [speed] BotTooFastInStop speed
         */

        /**
         * Constructs a new BotTooFastInStop.
         * @memberof GameEvent
         * @classdesc Represents a BotTooFastInStop.
         * @implements IBotTooFastInStop
         * @constructor
         * @param {GameEvent.IBotTooFastInStop=} [properties] Properties to set
         */
        function BotTooFastInStop(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotTooFastInStop byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotTooFastInStop
         * @instance
         */
        BotTooFastInStop.prototype.byTeam = 0;

        /**
         * BotTooFastInStop byBot.
         * @member {number} byBot
         * @memberof GameEvent.BotTooFastInStop
         * @instance
         */
        BotTooFastInStop.prototype.byBot = 0;

        /**
         * BotTooFastInStop location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotTooFastInStop
         * @instance
         */
        BotTooFastInStop.prototype.location = null;

        /**
         * BotTooFastInStop speed.
         * @member {number} speed
         * @memberof GameEvent.BotTooFastInStop
         * @instance
         */
        BotTooFastInStop.prototype.speed = 0;

        /**
         * Creates a new BotTooFastInStop instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {GameEvent.IBotTooFastInStop=} [properties] Properties to set
         * @returns {GameEvent.BotTooFastInStop} BotTooFastInStop instance
         */
        BotTooFastInStop.create = function create(properties) {
            return new BotTooFastInStop(properties);
        };

        /**
         * Encodes the specified BotTooFastInStop message. Does not implicitly {@link GameEvent.BotTooFastInStop.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {GameEvent.IBotTooFastInStop} message BotTooFastInStop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotTooFastInStop.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.speed != null && message.hasOwnProperty("speed"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.speed);
            return writer;
        };

        /**
         * Encodes the specified BotTooFastInStop message, length delimited. Does not implicitly {@link GameEvent.BotTooFastInStop.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {GameEvent.IBotTooFastInStop} message BotTooFastInStop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotTooFastInStop.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotTooFastInStop message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotTooFastInStop} BotTooFastInStop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotTooFastInStop.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotTooFastInStop();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.speed = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotTooFastInStop message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotTooFastInStop} BotTooFastInStop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotTooFastInStop.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotTooFastInStop message.
         * @function verify
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotTooFastInStop.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.speed != null && message.hasOwnProperty("speed"))
                if (typeof message.speed !== "number")
                    return "speed: number expected";
            return null;
        };

        /**
         * Creates a BotTooFastInStop message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotTooFastInStop} BotTooFastInStop
         */
        BotTooFastInStop.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotTooFastInStop)
                return object;
            let message = new $root.GameEvent.BotTooFastInStop();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotTooFastInStop.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.speed != null)
                message.speed = Number(object.speed);
            return message;
        };

        /**
         * Creates a plain object from a BotTooFastInStop message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotTooFastInStop
         * @static
         * @param {GameEvent.BotTooFastInStop} message BotTooFastInStop
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotTooFastInStop.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.speed = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.speed != null && message.hasOwnProperty("speed"))
                object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
            return object;
        };

        /**
         * Converts this BotTooFastInStop to JSON.
         * @function toJSON
         * @memberof GameEvent.BotTooFastInStop
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotTooFastInStop.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotTooFastInStop;
    })();

    GameEvent.DefenderTooCloseToKickPoint = (function() {

        /**
         * Properties of a DefenderTooCloseToKickPoint.
         * @memberof GameEvent
         * @interface IDefenderTooCloseToKickPoint
         * @property {Team} byTeam DefenderTooCloseToKickPoint byTeam
         * @property {number|null} [byBot] DefenderTooCloseToKickPoint byBot
         * @property {IVector2|null} [location] DefenderTooCloseToKickPoint location
         * @property {number|null} [distance] DefenderTooCloseToKickPoint distance
         */

        /**
         * Constructs a new DefenderTooCloseToKickPoint.
         * @memberof GameEvent
         * @classdesc Represents a DefenderTooCloseToKickPoint.
         * @implements IDefenderTooCloseToKickPoint
         * @constructor
         * @param {GameEvent.IDefenderTooCloseToKickPoint=} [properties] Properties to set
         */
        function DefenderTooCloseToKickPoint(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DefenderTooCloseToKickPoint byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @instance
         */
        DefenderTooCloseToKickPoint.prototype.byTeam = 0;

        /**
         * DefenderTooCloseToKickPoint byBot.
         * @member {number} byBot
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @instance
         */
        DefenderTooCloseToKickPoint.prototype.byBot = 0;

        /**
         * DefenderTooCloseToKickPoint location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @instance
         */
        DefenderTooCloseToKickPoint.prototype.location = null;

        /**
         * DefenderTooCloseToKickPoint distance.
         * @member {number} distance
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @instance
         */
        DefenderTooCloseToKickPoint.prototype.distance = 0;

        /**
         * Creates a new DefenderTooCloseToKickPoint instance using the specified properties.
         * @function create
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {GameEvent.IDefenderTooCloseToKickPoint=} [properties] Properties to set
         * @returns {GameEvent.DefenderTooCloseToKickPoint} DefenderTooCloseToKickPoint instance
         */
        DefenderTooCloseToKickPoint.create = function create(properties) {
            return new DefenderTooCloseToKickPoint(properties);
        };

        /**
         * Encodes the specified DefenderTooCloseToKickPoint message. Does not implicitly {@link GameEvent.DefenderTooCloseToKickPoint.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {GameEvent.IDefenderTooCloseToKickPoint} message DefenderTooCloseToKickPoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DefenderTooCloseToKickPoint.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.distance != null && message.hasOwnProperty("distance"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.distance);
            return writer;
        };

        /**
         * Encodes the specified DefenderTooCloseToKickPoint message, length delimited. Does not implicitly {@link GameEvent.DefenderTooCloseToKickPoint.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {GameEvent.IDefenderTooCloseToKickPoint} message DefenderTooCloseToKickPoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DefenderTooCloseToKickPoint.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DefenderTooCloseToKickPoint message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.DefenderTooCloseToKickPoint} DefenderTooCloseToKickPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DefenderTooCloseToKickPoint.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.DefenderTooCloseToKickPoint();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.distance = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a DefenderTooCloseToKickPoint message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.DefenderTooCloseToKickPoint} DefenderTooCloseToKickPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DefenderTooCloseToKickPoint.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DefenderTooCloseToKickPoint message.
         * @function verify
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DefenderTooCloseToKickPoint.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.distance != null && message.hasOwnProperty("distance"))
                if (typeof message.distance !== "number")
                    return "distance: number expected";
            return null;
        };

        /**
         * Creates a DefenderTooCloseToKickPoint message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.DefenderTooCloseToKickPoint} DefenderTooCloseToKickPoint
         */
        DefenderTooCloseToKickPoint.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.DefenderTooCloseToKickPoint)
                return object;
            let message = new $root.GameEvent.DefenderTooCloseToKickPoint();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.DefenderTooCloseToKickPoint.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.distance != null)
                message.distance = Number(object.distance);
            return message;
        };

        /**
         * Creates a plain object from a DefenderTooCloseToKickPoint message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @static
         * @param {GameEvent.DefenderTooCloseToKickPoint} message DefenderTooCloseToKickPoint
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DefenderTooCloseToKickPoint.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.distance = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.distance != null && message.hasOwnProperty("distance"))
                object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
            return object;
        };

        /**
         * Converts this DefenderTooCloseToKickPoint to JSON.
         * @function toJSON
         * @memberof GameEvent.DefenderTooCloseToKickPoint
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DefenderTooCloseToKickPoint.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DefenderTooCloseToKickPoint;
    })();

    GameEvent.BotCrashDrawn = (function() {

        /**
         * Properties of a BotCrashDrawn.
         * @memberof GameEvent
         * @interface IBotCrashDrawn
         * @property {number|null} [botYellow] BotCrashDrawn botYellow
         * @property {number|null} [botBlue] BotCrashDrawn botBlue
         * @property {IVector2|null} [location] BotCrashDrawn location
         * @property {number|null} [crashSpeed] BotCrashDrawn crashSpeed
         * @property {number|null} [speedDiff] BotCrashDrawn speedDiff
         * @property {number|null} [crashAngle] BotCrashDrawn crashAngle
         */

        /**
         * Constructs a new BotCrashDrawn.
         * @memberof GameEvent
         * @classdesc Represents a BotCrashDrawn.
         * @implements IBotCrashDrawn
         * @constructor
         * @param {GameEvent.IBotCrashDrawn=} [properties] Properties to set
         */
        function BotCrashDrawn(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotCrashDrawn botYellow.
         * @member {number} botYellow
         * @memberof GameEvent.BotCrashDrawn
         * @instance
         */
        BotCrashDrawn.prototype.botYellow = 0;

        /**
         * BotCrashDrawn botBlue.
         * @member {number} botBlue
         * @memberof GameEvent.BotCrashDrawn
         * @instance
         */
        BotCrashDrawn.prototype.botBlue = 0;

        /**
         * BotCrashDrawn location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotCrashDrawn
         * @instance
         */
        BotCrashDrawn.prototype.location = null;

        /**
         * BotCrashDrawn crashSpeed.
         * @member {number} crashSpeed
         * @memberof GameEvent.BotCrashDrawn
         * @instance
         */
        BotCrashDrawn.prototype.crashSpeed = 0;

        /**
         * BotCrashDrawn speedDiff.
         * @member {number} speedDiff
         * @memberof GameEvent.BotCrashDrawn
         * @instance
         */
        BotCrashDrawn.prototype.speedDiff = 0;

        /**
         * BotCrashDrawn crashAngle.
         * @member {number} crashAngle
         * @memberof GameEvent.BotCrashDrawn
         * @instance
         */
        BotCrashDrawn.prototype.crashAngle = 0;

        /**
         * Creates a new BotCrashDrawn instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {GameEvent.IBotCrashDrawn=} [properties] Properties to set
         * @returns {GameEvent.BotCrashDrawn} BotCrashDrawn instance
         */
        BotCrashDrawn.create = function create(properties) {
            return new BotCrashDrawn(properties);
        };

        /**
         * Encodes the specified BotCrashDrawn message. Does not implicitly {@link GameEvent.BotCrashDrawn.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {GameEvent.IBotCrashDrawn} message BotCrashDrawn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotCrashDrawn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.botYellow != null && message.hasOwnProperty("botYellow"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.botYellow);
            if (message.botBlue != null && message.hasOwnProperty("botBlue"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.botBlue);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.crashSpeed != null && message.hasOwnProperty("crashSpeed"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.crashSpeed);
            if (message.speedDiff != null && message.hasOwnProperty("speedDiff"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.speedDiff);
            if (message.crashAngle != null && message.hasOwnProperty("crashAngle"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.crashAngle);
            return writer;
        };

        /**
         * Encodes the specified BotCrashDrawn message, length delimited. Does not implicitly {@link GameEvent.BotCrashDrawn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {GameEvent.IBotCrashDrawn} message BotCrashDrawn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotCrashDrawn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotCrashDrawn message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotCrashDrawn} BotCrashDrawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotCrashDrawn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotCrashDrawn();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.botYellow = reader.uint32();
                    break;
                case 2:
                    message.botBlue = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.crashSpeed = reader.float();
                    break;
                case 5:
                    message.speedDiff = reader.float();
                    break;
                case 6:
                    message.crashAngle = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BotCrashDrawn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotCrashDrawn} BotCrashDrawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotCrashDrawn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotCrashDrawn message.
         * @function verify
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotCrashDrawn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.botYellow != null && message.hasOwnProperty("botYellow"))
                if (!$util.isInteger(message.botYellow))
                    return "botYellow: integer expected";
            if (message.botBlue != null && message.hasOwnProperty("botBlue"))
                if (!$util.isInteger(message.botBlue))
                    return "botBlue: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.crashSpeed != null && message.hasOwnProperty("crashSpeed"))
                if (typeof message.crashSpeed !== "number")
                    return "crashSpeed: number expected";
            if (message.speedDiff != null && message.hasOwnProperty("speedDiff"))
                if (typeof message.speedDiff !== "number")
                    return "speedDiff: number expected";
            if (message.crashAngle != null && message.hasOwnProperty("crashAngle"))
                if (typeof message.crashAngle !== "number")
                    return "crashAngle: number expected";
            return null;
        };

        /**
         * Creates a BotCrashDrawn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotCrashDrawn} BotCrashDrawn
         */
        BotCrashDrawn.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotCrashDrawn)
                return object;
            let message = new $root.GameEvent.BotCrashDrawn();
            if (object.botYellow != null)
                message.botYellow = object.botYellow >>> 0;
            if (object.botBlue != null)
                message.botBlue = object.botBlue >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotCrashDrawn.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.crashSpeed != null)
                message.crashSpeed = Number(object.crashSpeed);
            if (object.speedDiff != null)
                message.speedDiff = Number(object.speedDiff);
            if (object.crashAngle != null)
                message.crashAngle = Number(object.crashAngle);
            return message;
        };

        /**
         * Creates a plain object from a BotCrashDrawn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotCrashDrawn
         * @static
         * @param {GameEvent.BotCrashDrawn} message BotCrashDrawn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotCrashDrawn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.botYellow = 0;
                object.botBlue = 0;
                object.location = null;
                object.crashSpeed = 0;
                object.speedDiff = 0;
                object.crashAngle = 0;
            }
            if (message.botYellow != null && message.hasOwnProperty("botYellow"))
                object.botYellow = message.botYellow;
            if (message.botBlue != null && message.hasOwnProperty("botBlue"))
                object.botBlue = message.botBlue;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.crashSpeed != null && message.hasOwnProperty("crashSpeed"))
                object.crashSpeed = options.json && !isFinite(message.crashSpeed) ? String(message.crashSpeed) : message.crashSpeed;
            if (message.speedDiff != null && message.hasOwnProperty("speedDiff"))
                object.speedDiff = options.json && !isFinite(message.speedDiff) ? String(message.speedDiff) : message.speedDiff;
            if (message.crashAngle != null && message.hasOwnProperty("crashAngle"))
                object.crashAngle = options.json && !isFinite(message.crashAngle) ? String(message.crashAngle) : message.crashAngle;
            return object;
        };

        /**
         * Converts this BotCrashDrawn to JSON.
         * @function toJSON
         * @memberof GameEvent.BotCrashDrawn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotCrashDrawn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotCrashDrawn;
    })();

    GameEvent.BotCrashUnique = (function() {

        /**
         * Properties of a BotCrashUnique.
         * @memberof GameEvent
         * @interface IBotCrashUnique
         * @property {Team} byTeam BotCrashUnique byTeam
         * @property {number|null} [violator] BotCrashUnique violator
         * @property {number|null} [victim] BotCrashUnique victim
         * @property {IVector2|null} [location] BotCrashUnique location
         * @property {number|null} [crashSpeed] BotCrashUnique crashSpeed
         * @property {number|null} [speedDiff] BotCrashUnique speedDiff
         * @property {number|null} [crashAngle] BotCrashUnique crashAngle
         */

        /**
         * Constructs a new BotCrashUnique.
         * @memberof GameEvent
         * @classdesc Represents a BotCrashUnique.
         * @implements IBotCrashUnique
         * @constructor
         * @param {GameEvent.IBotCrashUnique=} [properties] Properties to set
         */
        function BotCrashUnique(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotCrashUnique byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotCrashUnique
         * @instance
         */
        BotCrashUnique.prototype.byTeam = 0;

        /**
         * BotCrashUnique violator.
         * @member {number} violator
         * @memberof GameEvent.BotCrashUnique
         * @instance
         */
        BotCrashUnique.prototype.violator = 0;

        /**
         * BotCrashUnique victim.
         * @member {number} victim
         * @memberof GameEvent.BotCrashUnique
         * @instance
         */
        BotCrashUnique.prototype.victim = 0;

        /**
         * BotCrashUnique location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotCrashUnique
         * @instance
         */
        BotCrashUnique.prototype.location = null;

        /**
         * BotCrashUnique crashSpeed.
         * @member {number} crashSpeed
         * @memberof GameEvent.BotCrashUnique
         * @instance
         */
        BotCrashUnique.prototype.crashSpeed = 0;

        /**
         * BotCrashUnique speedDiff.
         * @member {number} speedDiff
         * @memberof GameEvent.BotCrashUnique
         * @instance
         */
        BotCrashUnique.prototype.speedDiff = 0;

        /**
         * BotCrashUnique crashAngle.
         * @member {number} crashAngle
         * @memberof GameEvent.BotCrashUnique
         * @instance
         */
        BotCrashUnique.prototype.crashAngle = 0;

        /**
         * Creates a new BotCrashUnique instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {GameEvent.IBotCrashUnique=} [properties] Properties to set
         * @returns {GameEvent.BotCrashUnique} BotCrashUnique instance
         */
        BotCrashUnique.create = function create(properties) {
            return new BotCrashUnique(properties);
        };

        /**
         * Encodes the specified BotCrashUnique message. Does not implicitly {@link GameEvent.BotCrashUnique.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {GameEvent.IBotCrashUnique} message BotCrashUnique message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotCrashUnique.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.violator != null && message.hasOwnProperty("violator"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.violator);
            if (message.victim != null && message.hasOwnProperty("victim"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.victim);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.crashSpeed != null && message.hasOwnProperty("crashSpeed"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.crashSpeed);
            if (message.speedDiff != null && message.hasOwnProperty("speedDiff"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.speedDiff);
            if (message.crashAngle != null && message.hasOwnProperty("crashAngle"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.crashAngle);
            return writer;
        };

        /**
         * Encodes the specified BotCrashUnique message, length delimited. Does not implicitly {@link GameEvent.BotCrashUnique.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {GameEvent.IBotCrashUnique} message BotCrashUnique message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotCrashUnique.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotCrashUnique message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotCrashUnique} BotCrashUnique
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotCrashUnique.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotCrashUnique();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.violator = reader.uint32();
                    break;
                case 3:
                    message.victim = reader.uint32();
                    break;
                case 4:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.crashSpeed = reader.float();
                    break;
                case 6:
                    message.speedDiff = reader.float();
                    break;
                case 7:
                    message.crashAngle = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotCrashUnique message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotCrashUnique} BotCrashUnique
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotCrashUnique.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotCrashUnique message.
         * @function verify
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotCrashUnique.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.violator != null && message.hasOwnProperty("violator"))
                if (!$util.isInteger(message.violator))
                    return "violator: integer expected";
            if (message.victim != null && message.hasOwnProperty("victim"))
                if (!$util.isInteger(message.victim))
                    return "victim: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.crashSpeed != null && message.hasOwnProperty("crashSpeed"))
                if (typeof message.crashSpeed !== "number")
                    return "crashSpeed: number expected";
            if (message.speedDiff != null && message.hasOwnProperty("speedDiff"))
                if (typeof message.speedDiff !== "number")
                    return "speedDiff: number expected";
            if (message.crashAngle != null && message.hasOwnProperty("crashAngle"))
                if (typeof message.crashAngle !== "number")
                    return "crashAngle: number expected";
            return null;
        };

        /**
         * Creates a BotCrashUnique message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotCrashUnique} BotCrashUnique
         */
        BotCrashUnique.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotCrashUnique)
                return object;
            let message = new $root.GameEvent.BotCrashUnique();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.violator != null)
                message.violator = object.violator >>> 0;
            if (object.victim != null)
                message.victim = object.victim >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotCrashUnique.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.crashSpeed != null)
                message.crashSpeed = Number(object.crashSpeed);
            if (object.speedDiff != null)
                message.speedDiff = Number(object.speedDiff);
            if (object.crashAngle != null)
                message.crashAngle = Number(object.crashAngle);
            return message;
        };

        /**
         * Creates a plain object from a BotCrashUnique message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotCrashUnique
         * @static
         * @param {GameEvent.BotCrashUnique} message BotCrashUnique
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotCrashUnique.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.violator = 0;
                object.victim = 0;
                object.location = null;
                object.crashSpeed = 0;
                object.speedDiff = 0;
                object.crashAngle = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.violator != null && message.hasOwnProperty("violator"))
                object.violator = message.violator;
            if (message.victim != null && message.hasOwnProperty("victim"))
                object.victim = message.victim;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.crashSpeed != null && message.hasOwnProperty("crashSpeed"))
                object.crashSpeed = options.json && !isFinite(message.crashSpeed) ? String(message.crashSpeed) : message.crashSpeed;
            if (message.speedDiff != null && message.hasOwnProperty("speedDiff"))
                object.speedDiff = options.json && !isFinite(message.speedDiff) ? String(message.speedDiff) : message.speedDiff;
            if (message.crashAngle != null && message.hasOwnProperty("crashAngle"))
                object.crashAngle = options.json && !isFinite(message.crashAngle) ? String(message.crashAngle) : message.crashAngle;
            return object;
        };

        /**
         * Converts this BotCrashUnique to JSON.
         * @function toJSON
         * @memberof GameEvent.BotCrashUnique
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotCrashUnique.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotCrashUnique;
    })();

    GameEvent.BotPushedBot = (function() {

        /**
         * Properties of a BotPushedBot.
         * @memberof GameEvent
         * @interface IBotPushedBot
         * @property {Team} byTeam BotPushedBot byTeam
         * @property {number|null} [violator] BotPushedBot violator
         * @property {number|null} [victim] BotPushedBot victim
         * @property {IVector2|null} [location] BotPushedBot location
         * @property {number|null} [pushedDistance] BotPushedBot pushedDistance
         */

        /**
         * Constructs a new BotPushedBot.
         * @memberof GameEvent
         * @classdesc Represents a BotPushedBot.
         * @implements IBotPushedBot
         * @constructor
         * @param {GameEvent.IBotPushedBot=} [properties] Properties to set
         */
        function BotPushedBot(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotPushedBot byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotPushedBot
         * @instance
         */
        BotPushedBot.prototype.byTeam = 0;

        /**
         * BotPushedBot violator.
         * @member {number} violator
         * @memberof GameEvent.BotPushedBot
         * @instance
         */
        BotPushedBot.prototype.violator = 0;

        /**
         * BotPushedBot victim.
         * @member {number} victim
         * @memberof GameEvent.BotPushedBot
         * @instance
         */
        BotPushedBot.prototype.victim = 0;

        /**
         * BotPushedBot location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotPushedBot
         * @instance
         */
        BotPushedBot.prototype.location = null;

        /**
         * BotPushedBot pushedDistance.
         * @member {number} pushedDistance
         * @memberof GameEvent.BotPushedBot
         * @instance
         */
        BotPushedBot.prototype.pushedDistance = 0;

        /**
         * Creates a new BotPushedBot instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {GameEvent.IBotPushedBot=} [properties] Properties to set
         * @returns {GameEvent.BotPushedBot} BotPushedBot instance
         */
        BotPushedBot.create = function create(properties) {
            return new BotPushedBot(properties);
        };

        /**
         * Encodes the specified BotPushedBot message. Does not implicitly {@link GameEvent.BotPushedBot.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {GameEvent.IBotPushedBot} message BotPushedBot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotPushedBot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.violator != null && message.hasOwnProperty("violator"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.violator);
            if (message.victim != null && message.hasOwnProperty("victim"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.victim);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.pushedDistance != null && message.hasOwnProperty("pushedDistance"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.pushedDistance);
            return writer;
        };

        /**
         * Encodes the specified BotPushedBot message, length delimited. Does not implicitly {@link GameEvent.BotPushedBot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {GameEvent.IBotPushedBot} message BotPushedBot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotPushedBot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotPushedBot message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotPushedBot} BotPushedBot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotPushedBot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotPushedBot();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.violator = reader.uint32();
                    break;
                case 3:
                    message.victim = reader.uint32();
                    break;
                case 4:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.pushedDistance = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotPushedBot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotPushedBot} BotPushedBot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotPushedBot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotPushedBot message.
         * @function verify
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotPushedBot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.violator != null && message.hasOwnProperty("violator"))
                if (!$util.isInteger(message.violator))
                    return "violator: integer expected";
            if (message.victim != null && message.hasOwnProperty("victim"))
                if (!$util.isInteger(message.victim))
                    return "victim: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.pushedDistance != null && message.hasOwnProperty("pushedDistance"))
                if (typeof message.pushedDistance !== "number")
                    return "pushedDistance: number expected";
            return null;
        };

        /**
         * Creates a BotPushedBot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotPushedBot} BotPushedBot
         */
        BotPushedBot.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotPushedBot)
                return object;
            let message = new $root.GameEvent.BotPushedBot();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.violator != null)
                message.violator = object.violator >>> 0;
            if (object.victim != null)
                message.victim = object.victim >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotPushedBot.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.pushedDistance != null)
                message.pushedDistance = Number(object.pushedDistance);
            return message;
        };

        /**
         * Creates a plain object from a BotPushedBot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotPushedBot
         * @static
         * @param {GameEvent.BotPushedBot} message BotPushedBot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotPushedBot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.violator = 0;
                object.victim = 0;
                object.location = null;
                object.pushedDistance = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.violator != null && message.hasOwnProperty("violator"))
                object.violator = message.violator;
            if (message.victim != null && message.hasOwnProperty("victim"))
                object.victim = message.victim;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.pushedDistance != null && message.hasOwnProperty("pushedDistance"))
                object.pushedDistance = options.json && !isFinite(message.pushedDistance) ? String(message.pushedDistance) : message.pushedDistance;
            return object;
        };

        /**
         * Converts this BotPushedBot to JSON.
         * @function toJSON
         * @memberof GameEvent.BotPushedBot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotPushedBot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotPushedBot;
    })();

    GameEvent.BotTippedOver = (function() {

        /**
         * Properties of a BotTippedOver.
         * @memberof GameEvent
         * @interface IBotTippedOver
         * @property {Team} byTeam BotTippedOver byTeam
         * @property {number|null} [byBot] BotTippedOver byBot
         * @property {IVector2|null} [location] BotTippedOver location
         * @property {IVector2|null} [ballLocation] BotTippedOver ballLocation
         */

        /**
         * Constructs a new BotTippedOver.
         * @memberof GameEvent
         * @classdesc Represents a BotTippedOver.
         * @implements IBotTippedOver
         * @constructor
         * @param {GameEvent.IBotTippedOver=} [properties] Properties to set
         */
        function BotTippedOver(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotTippedOver byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotTippedOver
         * @instance
         */
        BotTippedOver.prototype.byTeam = 0;

        /**
         * BotTippedOver byBot.
         * @member {number} byBot
         * @memberof GameEvent.BotTippedOver
         * @instance
         */
        BotTippedOver.prototype.byBot = 0;

        /**
         * BotTippedOver location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotTippedOver
         * @instance
         */
        BotTippedOver.prototype.location = null;

        /**
         * BotTippedOver ballLocation.
         * @member {IVector2|null|undefined} ballLocation
         * @memberof GameEvent.BotTippedOver
         * @instance
         */
        BotTippedOver.prototype.ballLocation = null;

        /**
         * Creates a new BotTippedOver instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {GameEvent.IBotTippedOver=} [properties] Properties to set
         * @returns {GameEvent.BotTippedOver} BotTippedOver instance
         */
        BotTippedOver.create = function create(properties) {
            return new BotTippedOver(properties);
        };

        /**
         * Encodes the specified BotTippedOver message. Does not implicitly {@link GameEvent.BotTippedOver.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {GameEvent.IBotTippedOver} message BotTippedOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotTippedOver.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                $root.Vector2.encode(message.ballLocation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BotTippedOver message, length delimited. Does not implicitly {@link GameEvent.BotTippedOver.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {GameEvent.IBotTippedOver} message BotTippedOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotTippedOver.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotTippedOver message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotTippedOver} BotTippedOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotTippedOver.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotTippedOver();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.ballLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotTippedOver message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotTippedOver} BotTippedOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotTippedOver.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotTippedOver message.
         * @function verify
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotTippedOver.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation")) {
                let error = $root.Vector2.verify(message.ballLocation);
                if (error)
                    return "ballLocation." + error;
            }
            return null;
        };

        /**
         * Creates a BotTippedOver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotTippedOver} BotTippedOver
         */
        BotTippedOver.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotTippedOver)
                return object;
            let message = new $root.GameEvent.BotTippedOver();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotTippedOver.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.ballLocation != null) {
                if (typeof object.ballLocation !== "object")
                    throw TypeError(".GameEvent.BotTippedOver.ballLocation: object expected");
                message.ballLocation = $root.Vector2.fromObject(object.ballLocation);
            }
            return message;
        };

        /**
         * Creates a plain object from a BotTippedOver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotTippedOver
         * @static
         * @param {GameEvent.BotTippedOver} message BotTippedOver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotTippedOver.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.ballLocation = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                object.ballLocation = $root.Vector2.toObject(message.ballLocation, options);
            return object;
        };

        /**
         * Converts this BotTippedOver to JSON.
         * @function toJSON
         * @memberof GameEvent.BotTippedOver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotTippedOver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotTippedOver;
    })();

    GameEvent.DefenderInDefenseArea = (function() {

        /**
         * Properties of a DefenderInDefenseArea.
         * @memberof GameEvent
         * @interface IDefenderInDefenseArea
         * @property {Team} byTeam DefenderInDefenseArea byTeam
         * @property {number|null} [byBot] DefenderInDefenseArea byBot
         * @property {IVector2|null} [location] DefenderInDefenseArea location
         * @property {number|null} [distance] DefenderInDefenseArea distance
         */

        /**
         * Constructs a new DefenderInDefenseArea.
         * @memberof GameEvent
         * @classdesc Represents a DefenderInDefenseArea.
         * @implements IDefenderInDefenseArea
         * @constructor
         * @param {GameEvent.IDefenderInDefenseArea=} [properties] Properties to set
         */
        function DefenderInDefenseArea(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DefenderInDefenseArea byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.DefenderInDefenseArea
         * @instance
         */
        DefenderInDefenseArea.prototype.byTeam = 0;

        /**
         * DefenderInDefenseArea byBot.
         * @member {number} byBot
         * @memberof GameEvent.DefenderInDefenseArea
         * @instance
         */
        DefenderInDefenseArea.prototype.byBot = 0;

        /**
         * DefenderInDefenseArea location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.DefenderInDefenseArea
         * @instance
         */
        DefenderInDefenseArea.prototype.location = null;

        /**
         * DefenderInDefenseArea distance.
         * @member {number} distance
         * @memberof GameEvent.DefenderInDefenseArea
         * @instance
         */
        DefenderInDefenseArea.prototype.distance = 0;

        /**
         * Creates a new DefenderInDefenseArea instance using the specified properties.
         * @function create
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {GameEvent.IDefenderInDefenseArea=} [properties] Properties to set
         * @returns {GameEvent.DefenderInDefenseArea} DefenderInDefenseArea instance
         */
        DefenderInDefenseArea.create = function create(properties) {
            return new DefenderInDefenseArea(properties);
        };

        /**
         * Encodes the specified DefenderInDefenseArea message. Does not implicitly {@link GameEvent.DefenderInDefenseArea.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {GameEvent.IDefenderInDefenseArea} message DefenderInDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DefenderInDefenseArea.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.distance != null && message.hasOwnProperty("distance"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.distance);
            return writer;
        };

        /**
         * Encodes the specified DefenderInDefenseArea message, length delimited. Does not implicitly {@link GameEvent.DefenderInDefenseArea.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {GameEvent.IDefenderInDefenseArea} message DefenderInDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DefenderInDefenseArea.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DefenderInDefenseArea message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.DefenderInDefenseArea} DefenderInDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DefenderInDefenseArea.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.DefenderInDefenseArea();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.distance = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a DefenderInDefenseArea message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.DefenderInDefenseArea} DefenderInDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DefenderInDefenseArea.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DefenderInDefenseArea message.
         * @function verify
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DefenderInDefenseArea.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.distance != null && message.hasOwnProperty("distance"))
                if (typeof message.distance !== "number")
                    return "distance: number expected";
            return null;
        };

        /**
         * Creates a DefenderInDefenseArea message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.DefenderInDefenseArea} DefenderInDefenseArea
         */
        DefenderInDefenseArea.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.DefenderInDefenseArea)
                return object;
            let message = new $root.GameEvent.DefenderInDefenseArea();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.DefenderInDefenseArea.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.distance != null)
                message.distance = Number(object.distance);
            return message;
        };

        /**
         * Creates a plain object from a DefenderInDefenseArea message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.DefenderInDefenseArea
         * @static
         * @param {GameEvent.DefenderInDefenseArea} message DefenderInDefenseArea
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DefenderInDefenseArea.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.distance = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.distance != null && message.hasOwnProperty("distance"))
                object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
            return object;
        };

        /**
         * Converts this DefenderInDefenseArea to JSON.
         * @function toJSON
         * @memberof GameEvent.DefenderInDefenseArea
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DefenderInDefenseArea.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DefenderInDefenseArea;
    })();

    GameEvent.DefenderInDefenseAreaPartially = (function() {

        /**
         * Properties of a DefenderInDefenseAreaPartially.
         * @memberof GameEvent
         * @interface IDefenderInDefenseAreaPartially
         * @property {Team} byTeam DefenderInDefenseAreaPartially byTeam
         * @property {number|null} [byBot] DefenderInDefenseAreaPartially byBot
         * @property {IVector2|null} [location] DefenderInDefenseAreaPartially location
         * @property {number|null} [distance] DefenderInDefenseAreaPartially distance
         * @property {IVector2|null} [ballLocation] DefenderInDefenseAreaPartially ballLocation
         */

        /**
         * Constructs a new DefenderInDefenseAreaPartially.
         * @memberof GameEvent
         * @classdesc Represents a DefenderInDefenseAreaPartially.
         * @implements IDefenderInDefenseAreaPartially
         * @constructor
         * @param {GameEvent.IDefenderInDefenseAreaPartially=} [properties] Properties to set
         */
        function DefenderInDefenseAreaPartially(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DefenderInDefenseAreaPartially byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @instance
         */
        DefenderInDefenseAreaPartially.prototype.byTeam = 0;

        /**
         * DefenderInDefenseAreaPartially byBot.
         * @member {number} byBot
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @instance
         */
        DefenderInDefenseAreaPartially.prototype.byBot = 0;

        /**
         * DefenderInDefenseAreaPartially location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @instance
         */
        DefenderInDefenseAreaPartially.prototype.location = null;

        /**
         * DefenderInDefenseAreaPartially distance.
         * @member {number} distance
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @instance
         */
        DefenderInDefenseAreaPartially.prototype.distance = 0;

        /**
         * DefenderInDefenseAreaPartially ballLocation.
         * @member {IVector2|null|undefined} ballLocation
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @instance
         */
        DefenderInDefenseAreaPartially.prototype.ballLocation = null;

        /**
         * Creates a new DefenderInDefenseAreaPartially instance using the specified properties.
         * @function create
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {GameEvent.IDefenderInDefenseAreaPartially=} [properties] Properties to set
         * @returns {GameEvent.DefenderInDefenseAreaPartially} DefenderInDefenseAreaPartially instance
         */
        DefenderInDefenseAreaPartially.create = function create(properties) {
            return new DefenderInDefenseAreaPartially(properties);
        };

        /**
         * Encodes the specified DefenderInDefenseAreaPartially message. Does not implicitly {@link GameEvent.DefenderInDefenseAreaPartially.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {GameEvent.IDefenderInDefenseAreaPartially} message DefenderInDefenseAreaPartially message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DefenderInDefenseAreaPartially.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.distance != null && message.hasOwnProperty("distance"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.distance);
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                $root.Vector2.encode(message.ballLocation, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DefenderInDefenseAreaPartially message, length delimited. Does not implicitly {@link GameEvent.DefenderInDefenseAreaPartially.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {GameEvent.IDefenderInDefenseAreaPartially} message DefenderInDefenseAreaPartially message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DefenderInDefenseAreaPartially.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DefenderInDefenseAreaPartially message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.DefenderInDefenseAreaPartially} DefenderInDefenseAreaPartially
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DefenderInDefenseAreaPartially.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.DefenderInDefenseAreaPartially();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.distance = reader.float();
                    break;
                case 5:
                    message.ballLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a DefenderInDefenseAreaPartially message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.DefenderInDefenseAreaPartially} DefenderInDefenseAreaPartially
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DefenderInDefenseAreaPartially.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DefenderInDefenseAreaPartially message.
         * @function verify
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DefenderInDefenseAreaPartially.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.distance != null && message.hasOwnProperty("distance"))
                if (typeof message.distance !== "number")
                    return "distance: number expected";
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation")) {
                let error = $root.Vector2.verify(message.ballLocation);
                if (error)
                    return "ballLocation." + error;
            }
            return null;
        };

        /**
         * Creates a DefenderInDefenseAreaPartially message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.DefenderInDefenseAreaPartially} DefenderInDefenseAreaPartially
         */
        DefenderInDefenseAreaPartially.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.DefenderInDefenseAreaPartially)
                return object;
            let message = new $root.GameEvent.DefenderInDefenseAreaPartially();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.DefenderInDefenseAreaPartially.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.distance != null)
                message.distance = Number(object.distance);
            if (object.ballLocation != null) {
                if (typeof object.ballLocation !== "object")
                    throw TypeError(".GameEvent.DefenderInDefenseAreaPartially.ballLocation: object expected");
                message.ballLocation = $root.Vector2.fromObject(object.ballLocation);
            }
            return message;
        };

        /**
         * Creates a plain object from a DefenderInDefenseAreaPartially message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @static
         * @param {GameEvent.DefenderInDefenseAreaPartially} message DefenderInDefenseAreaPartially
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DefenderInDefenseAreaPartially.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.distance = 0;
                object.ballLocation = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.distance != null && message.hasOwnProperty("distance"))
                object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                object.ballLocation = $root.Vector2.toObject(message.ballLocation, options);
            return object;
        };

        /**
         * Converts this DefenderInDefenseAreaPartially to JSON.
         * @function toJSON
         * @memberof GameEvent.DefenderInDefenseAreaPartially
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DefenderInDefenseAreaPartially.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DefenderInDefenseAreaPartially;
    })();

    GameEvent.AttackerTouchedBallInDefenseArea = (function() {

        /**
         * Properties of an AttackerTouchedBallInDefenseArea.
         * @memberof GameEvent
         * @interface IAttackerTouchedBallInDefenseArea
         * @property {Team} byTeam AttackerTouchedBallInDefenseArea byTeam
         * @property {number|null} [byBot] AttackerTouchedBallInDefenseArea byBot
         * @property {IVector2|null} [location] AttackerTouchedBallInDefenseArea location
         * @property {number|null} [distance] AttackerTouchedBallInDefenseArea distance
         */

        /**
         * Constructs a new AttackerTouchedBallInDefenseArea.
         * @memberof GameEvent
         * @classdesc Represents an AttackerTouchedBallInDefenseArea.
         * @implements IAttackerTouchedBallInDefenseArea
         * @constructor
         * @param {GameEvent.IAttackerTouchedBallInDefenseArea=} [properties] Properties to set
         */
        function AttackerTouchedBallInDefenseArea(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AttackerTouchedBallInDefenseArea byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @instance
         */
        AttackerTouchedBallInDefenseArea.prototype.byTeam = 0;

        /**
         * AttackerTouchedBallInDefenseArea byBot.
         * @member {number} byBot
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @instance
         */
        AttackerTouchedBallInDefenseArea.prototype.byBot = 0;

        /**
         * AttackerTouchedBallInDefenseArea location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @instance
         */
        AttackerTouchedBallInDefenseArea.prototype.location = null;

        /**
         * AttackerTouchedBallInDefenseArea distance.
         * @member {number} distance
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @instance
         */
        AttackerTouchedBallInDefenseArea.prototype.distance = 0;

        /**
         * Creates a new AttackerTouchedBallInDefenseArea instance using the specified properties.
         * @function create
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {GameEvent.IAttackerTouchedBallInDefenseArea=} [properties] Properties to set
         * @returns {GameEvent.AttackerTouchedBallInDefenseArea} AttackerTouchedBallInDefenseArea instance
         */
        AttackerTouchedBallInDefenseArea.create = function create(properties) {
            return new AttackerTouchedBallInDefenseArea(properties);
        };

        /**
         * Encodes the specified AttackerTouchedBallInDefenseArea message. Does not implicitly {@link GameEvent.AttackerTouchedBallInDefenseArea.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {GameEvent.IAttackerTouchedBallInDefenseArea} message AttackerTouchedBallInDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerTouchedBallInDefenseArea.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.distance != null && message.hasOwnProperty("distance"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.distance);
            return writer;
        };

        /**
         * Encodes the specified AttackerTouchedBallInDefenseArea message, length delimited. Does not implicitly {@link GameEvent.AttackerTouchedBallInDefenseArea.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {GameEvent.IAttackerTouchedBallInDefenseArea} message AttackerTouchedBallInDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerTouchedBallInDefenseArea.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AttackerTouchedBallInDefenseArea message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.AttackerTouchedBallInDefenseArea} AttackerTouchedBallInDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerTouchedBallInDefenseArea.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.AttackerTouchedBallInDefenseArea();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.distance = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes an AttackerTouchedBallInDefenseArea message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.AttackerTouchedBallInDefenseArea} AttackerTouchedBallInDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerTouchedBallInDefenseArea.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AttackerTouchedBallInDefenseArea message.
         * @function verify
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AttackerTouchedBallInDefenseArea.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.distance != null && message.hasOwnProperty("distance"))
                if (typeof message.distance !== "number")
                    return "distance: number expected";
            return null;
        };

        /**
         * Creates an AttackerTouchedBallInDefenseArea message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.AttackerTouchedBallInDefenseArea} AttackerTouchedBallInDefenseArea
         */
        AttackerTouchedBallInDefenseArea.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.AttackerTouchedBallInDefenseArea)
                return object;
            let message = new $root.GameEvent.AttackerTouchedBallInDefenseArea();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.AttackerTouchedBallInDefenseArea.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.distance != null)
                message.distance = Number(object.distance);
            return message;
        };

        /**
         * Creates a plain object from an AttackerTouchedBallInDefenseArea message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @static
         * @param {GameEvent.AttackerTouchedBallInDefenseArea} message AttackerTouchedBallInDefenseArea
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AttackerTouchedBallInDefenseArea.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.distance = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.distance != null && message.hasOwnProperty("distance"))
                object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
            return object;
        };

        /**
         * Converts this AttackerTouchedBallInDefenseArea to JSON.
         * @function toJSON
         * @memberof GameEvent.AttackerTouchedBallInDefenseArea
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AttackerTouchedBallInDefenseArea.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AttackerTouchedBallInDefenseArea;
    })();

    GameEvent.BotKickedBallTooFast = (function() {

        /**
         * Properties of a BotKickedBallTooFast.
         * @memberof GameEvent
         * @interface IBotKickedBallTooFast
         * @property {Team} byTeam BotKickedBallTooFast byTeam
         * @property {number|null} [byBot] BotKickedBallTooFast byBot
         * @property {IVector2|null} [location] BotKickedBallTooFast location
         * @property {number|null} [initialBallSpeed] BotKickedBallTooFast initialBallSpeed
         * @property {boolean|null} [chipped] BotKickedBallTooFast chipped
         */

        /**
         * Constructs a new BotKickedBallTooFast.
         * @memberof GameEvent
         * @classdesc Represents a BotKickedBallTooFast.
         * @implements IBotKickedBallTooFast
         * @constructor
         * @param {GameEvent.IBotKickedBallTooFast=} [properties] Properties to set
         */
        function BotKickedBallTooFast(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotKickedBallTooFast byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotKickedBallTooFast
         * @instance
         */
        BotKickedBallTooFast.prototype.byTeam = 0;

        /**
         * BotKickedBallTooFast byBot.
         * @member {number} byBot
         * @memberof GameEvent.BotKickedBallTooFast
         * @instance
         */
        BotKickedBallTooFast.prototype.byBot = 0;

        /**
         * BotKickedBallTooFast location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotKickedBallTooFast
         * @instance
         */
        BotKickedBallTooFast.prototype.location = null;

        /**
         * BotKickedBallTooFast initialBallSpeed.
         * @member {number} initialBallSpeed
         * @memberof GameEvent.BotKickedBallTooFast
         * @instance
         */
        BotKickedBallTooFast.prototype.initialBallSpeed = 0;

        /**
         * BotKickedBallTooFast chipped.
         * @member {boolean} chipped
         * @memberof GameEvent.BotKickedBallTooFast
         * @instance
         */
        BotKickedBallTooFast.prototype.chipped = false;

        /**
         * Creates a new BotKickedBallTooFast instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {GameEvent.IBotKickedBallTooFast=} [properties] Properties to set
         * @returns {GameEvent.BotKickedBallTooFast} BotKickedBallTooFast instance
         */
        BotKickedBallTooFast.create = function create(properties) {
            return new BotKickedBallTooFast(properties);
        };

        /**
         * Encodes the specified BotKickedBallTooFast message. Does not implicitly {@link GameEvent.BotKickedBallTooFast.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {GameEvent.IBotKickedBallTooFast} message BotKickedBallTooFast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotKickedBallTooFast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.initialBallSpeed != null && message.hasOwnProperty("initialBallSpeed"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.initialBallSpeed);
            if (message.chipped != null && message.hasOwnProperty("chipped"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.chipped);
            return writer;
        };

        /**
         * Encodes the specified BotKickedBallTooFast message, length delimited. Does not implicitly {@link GameEvent.BotKickedBallTooFast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {GameEvent.IBotKickedBallTooFast} message BotKickedBallTooFast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotKickedBallTooFast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotKickedBallTooFast message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotKickedBallTooFast} BotKickedBallTooFast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotKickedBallTooFast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotKickedBallTooFast();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.initialBallSpeed = reader.float();
                    break;
                case 5:
                    message.chipped = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotKickedBallTooFast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotKickedBallTooFast} BotKickedBallTooFast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotKickedBallTooFast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotKickedBallTooFast message.
         * @function verify
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotKickedBallTooFast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.initialBallSpeed != null && message.hasOwnProperty("initialBallSpeed"))
                if (typeof message.initialBallSpeed !== "number")
                    return "initialBallSpeed: number expected";
            if (message.chipped != null && message.hasOwnProperty("chipped"))
                if (typeof message.chipped !== "boolean")
                    return "chipped: boolean expected";
            return null;
        };

        /**
         * Creates a BotKickedBallTooFast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotKickedBallTooFast} BotKickedBallTooFast
         */
        BotKickedBallTooFast.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotKickedBallTooFast)
                return object;
            let message = new $root.GameEvent.BotKickedBallTooFast();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotKickedBallTooFast.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.initialBallSpeed != null)
                message.initialBallSpeed = Number(object.initialBallSpeed);
            if (object.chipped != null)
                message.chipped = Boolean(object.chipped);
            return message;
        };

        /**
         * Creates a plain object from a BotKickedBallTooFast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotKickedBallTooFast
         * @static
         * @param {GameEvent.BotKickedBallTooFast} message BotKickedBallTooFast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotKickedBallTooFast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.initialBallSpeed = 0;
                object.chipped = false;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.initialBallSpeed != null && message.hasOwnProperty("initialBallSpeed"))
                object.initialBallSpeed = options.json && !isFinite(message.initialBallSpeed) ? String(message.initialBallSpeed) : message.initialBallSpeed;
            if (message.chipped != null && message.hasOwnProperty("chipped"))
                object.chipped = message.chipped;
            return object;
        };

        /**
         * Converts this BotKickedBallTooFast to JSON.
         * @function toJSON
         * @memberof GameEvent.BotKickedBallTooFast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotKickedBallTooFast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotKickedBallTooFast;
    })();

    GameEvent.BotDribbledBallTooFar = (function() {

        /**
         * Properties of a BotDribbledBallTooFar.
         * @memberof GameEvent
         * @interface IBotDribbledBallTooFar
         * @property {Team} byTeam BotDribbledBallTooFar byTeam
         * @property {number|null} [byBot] BotDribbledBallTooFar byBot
         * @property {IVector2|null} [start] BotDribbledBallTooFar start
         * @property {IVector2|null} [end] BotDribbledBallTooFar end
         */

        /**
         * Constructs a new BotDribbledBallTooFar.
         * @memberof GameEvent
         * @classdesc Represents a BotDribbledBallTooFar.
         * @implements IBotDribbledBallTooFar
         * @constructor
         * @param {GameEvent.IBotDribbledBallTooFar=} [properties] Properties to set
         */
        function BotDribbledBallTooFar(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotDribbledBallTooFar byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotDribbledBallTooFar
         * @instance
         */
        BotDribbledBallTooFar.prototype.byTeam = 0;

        /**
         * BotDribbledBallTooFar byBot.
         * @member {number} byBot
         * @memberof GameEvent.BotDribbledBallTooFar
         * @instance
         */
        BotDribbledBallTooFar.prototype.byBot = 0;

        /**
         * BotDribbledBallTooFar start.
         * @member {IVector2|null|undefined} start
         * @memberof GameEvent.BotDribbledBallTooFar
         * @instance
         */
        BotDribbledBallTooFar.prototype.start = null;

        /**
         * BotDribbledBallTooFar end.
         * @member {IVector2|null|undefined} end
         * @memberof GameEvent.BotDribbledBallTooFar
         * @instance
         */
        BotDribbledBallTooFar.prototype.end = null;

        /**
         * Creates a new BotDribbledBallTooFar instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {GameEvent.IBotDribbledBallTooFar=} [properties] Properties to set
         * @returns {GameEvent.BotDribbledBallTooFar} BotDribbledBallTooFar instance
         */
        BotDribbledBallTooFar.create = function create(properties) {
            return new BotDribbledBallTooFar(properties);
        };

        /**
         * Encodes the specified BotDribbledBallTooFar message. Does not implicitly {@link GameEvent.BotDribbledBallTooFar.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {GameEvent.IBotDribbledBallTooFar} message BotDribbledBallTooFar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotDribbledBallTooFar.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.start != null && message.hasOwnProperty("start"))
                $root.Vector2.encode(message.start, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.end != null && message.hasOwnProperty("end"))
                $root.Vector2.encode(message.end, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BotDribbledBallTooFar message, length delimited. Does not implicitly {@link GameEvent.BotDribbledBallTooFar.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {GameEvent.IBotDribbledBallTooFar} message BotDribbledBallTooFar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotDribbledBallTooFar.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotDribbledBallTooFar message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotDribbledBallTooFar} BotDribbledBallTooFar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotDribbledBallTooFar.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotDribbledBallTooFar();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.start = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.end = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotDribbledBallTooFar message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotDribbledBallTooFar} BotDribbledBallTooFar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotDribbledBallTooFar.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotDribbledBallTooFar message.
         * @function verify
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotDribbledBallTooFar.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.start != null && message.hasOwnProperty("start")) {
                let error = $root.Vector2.verify(message.start);
                if (error)
                    return "start." + error;
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                let error = $root.Vector2.verify(message.end);
                if (error)
                    return "end." + error;
            }
            return null;
        };

        /**
         * Creates a BotDribbledBallTooFar message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotDribbledBallTooFar} BotDribbledBallTooFar
         */
        BotDribbledBallTooFar.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotDribbledBallTooFar)
                return object;
            let message = new $root.GameEvent.BotDribbledBallTooFar();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.start != null) {
                if (typeof object.start !== "object")
                    throw TypeError(".GameEvent.BotDribbledBallTooFar.start: object expected");
                message.start = $root.Vector2.fromObject(object.start);
            }
            if (object.end != null) {
                if (typeof object.end !== "object")
                    throw TypeError(".GameEvent.BotDribbledBallTooFar.end: object expected");
                message.end = $root.Vector2.fromObject(object.end);
            }
            return message;
        };

        /**
         * Creates a plain object from a BotDribbledBallTooFar message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotDribbledBallTooFar
         * @static
         * @param {GameEvent.BotDribbledBallTooFar} message BotDribbledBallTooFar
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotDribbledBallTooFar.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.start = null;
                object.end = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.start != null && message.hasOwnProperty("start"))
                object.start = $root.Vector2.toObject(message.start, options);
            if (message.end != null && message.hasOwnProperty("end"))
                object.end = $root.Vector2.toObject(message.end, options);
            return object;
        };

        /**
         * Converts this BotDribbledBallTooFar to JSON.
         * @function toJSON
         * @memberof GameEvent.BotDribbledBallTooFar
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotDribbledBallTooFar.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotDribbledBallTooFar;
    })();

    GameEvent.AttackerTouchedOpponentInDefenseArea = (function() {

        /**
         * Properties of an AttackerTouchedOpponentInDefenseArea.
         * @memberof GameEvent
         * @interface IAttackerTouchedOpponentInDefenseArea
         * @property {Team} byTeam AttackerTouchedOpponentInDefenseArea byTeam
         * @property {number|null} [byBot] AttackerTouchedOpponentInDefenseArea byBot
         * @property {number|null} [victim] AttackerTouchedOpponentInDefenseArea victim
         * @property {IVector2|null} [location] AttackerTouchedOpponentInDefenseArea location
         */

        /**
         * Constructs a new AttackerTouchedOpponentInDefenseArea.
         * @memberof GameEvent
         * @classdesc Represents an AttackerTouchedOpponentInDefenseArea.
         * @implements IAttackerTouchedOpponentInDefenseArea
         * @constructor
         * @param {GameEvent.IAttackerTouchedOpponentInDefenseArea=} [properties] Properties to set
         */
        function AttackerTouchedOpponentInDefenseArea(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AttackerTouchedOpponentInDefenseArea byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @instance
         */
        AttackerTouchedOpponentInDefenseArea.prototype.byTeam = 0;

        /**
         * AttackerTouchedOpponentInDefenseArea byBot.
         * @member {number} byBot
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @instance
         */
        AttackerTouchedOpponentInDefenseArea.prototype.byBot = 0;

        /**
         * AttackerTouchedOpponentInDefenseArea victim.
         * @member {number} victim
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @instance
         */
        AttackerTouchedOpponentInDefenseArea.prototype.victim = 0;

        /**
         * AttackerTouchedOpponentInDefenseArea location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @instance
         */
        AttackerTouchedOpponentInDefenseArea.prototype.location = null;

        /**
         * Creates a new AttackerTouchedOpponentInDefenseArea instance using the specified properties.
         * @function create
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {GameEvent.IAttackerTouchedOpponentInDefenseArea=} [properties] Properties to set
         * @returns {GameEvent.AttackerTouchedOpponentInDefenseArea} AttackerTouchedOpponentInDefenseArea instance
         */
        AttackerTouchedOpponentInDefenseArea.create = function create(properties) {
            return new AttackerTouchedOpponentInDefenseArea(properties);
        };

        /**
         * Encodes the specified AttackerTouchedOpponentInDefenseArea message. Does not implicitly {@link GameEvent.AttackerTouchedOpponentInDefenseArea.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {GameEvent.IAttackerTouchedOpponentInDefenseArea} message AttackerTouchedOpponentInDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerTouchedOpponentInDefenseArea.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.victim != null && message.hasOwnProperty("victim"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.victim);
            return writer;
        };

        /**
         * Encodes the specified AttackerTouchedOpponentInDefenseArea message, length delimited. Does not implicitly {@link GameEvent.AttackerTouchedOpponentInDefenseArea.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {GameEvent.IAttackerTouchedOpponentInDefenseArea} message AttackerTouchedOpponentInDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerTouchedOpponentInDefenseArea.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AttackerTouchedOpponentInDefenseArea message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.AttackerTouchedOpponentInDefenseArea} AttackerTouchedOpponentInDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerTouchedOpponentInDefenseArea.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.AttackerTouchedOpponentInDefenseArea();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 4:
                    message.victim = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes an AttackerTouchedOpponentInDefenseArea message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.AttackerTouchedOpponentInDefenseArea} AttackerTouchedOpponentInDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerTouchedOpponentInDefenseArea.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AttackerTouchedOpponentInDefenseArea message.
         * @function verify
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AttackerTouchedOpponentInDefenseArea.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.victim != null && message.hasOwnProperty("victim"))
                if (!$util.isInteger(message.victim))
                    return "victim: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            return null;
        };

        /**
         * Creates an AttackerTouchedOpponentInDefenseArea message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.AttackerTouchedOpponentInDefenseArea} AttackerTouchedOpponentInDefenseArea
         */
        AttackerTouchedOpponentInDefenseArea.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.AttackerTouchedOpponentInDefenseArea)
                return object;
            let message = new $root.GameEvent.AttackerTouchedOpponentInDefenseArea();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.victim != null)
                message.victim = object.victim >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.AttackerTouchedOpponentInDefenseArea.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            return message;
        };

        /**
         * Creates a plain object from an AttackerTouchedOpponentInDefenseArea message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @static
         * @param {GameEvent.AttackerTouchedOpponentInDefenseArea} message AttackerTouchedOpponentInDefenseArea
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AttackerTouchedOpponentInDefenseArea.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.victim = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.victim != null && message.hasOwnProperty("victim"))
                object.victim = message.victim;
            return object;
        };

        /**
         * Converts this AttackerTouchedOpponentInDefenseArea to JSON.
         * @function toJSON
         * @memberof GameEvent.AttackerTouchedOpponentInDefenseArea
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AttackerTouchedOpponentInDefenseArea.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AttackerTouchedOpponentInDefenseArea;
    })();

    GameEvent.AttackerDoubleTouchedBall = (function() {

        /**
         * Properties of an AttackerDoubleTouchedBall.
         * @memberof GameEvent
         * @interface IAttackerDoubleTouchedBall
         * @property {Team} byTeam AttackerDoubleTouchedBall byTeam
         * @property {number|null} [byBot] AttackerDoubleTouchedBall byBot
         * @property {IVector2|null} [location] AttackerDoubleTouchedBall location
         */

        /**
         * Constructs a new AttackerDoubleTouchedBall.
         * @memberof GameEvent
         * @classdesc Represents an AttackerDoubleTouchedBall.
         * @implements IAttackerDoubleTouchedBall
         * @constructor
         * @param {GameEvent.IAttackerDoubleTouchedBall=} [properties] Properties to set
         */
        function AttackerDoubleTouchedBall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AttackerDoubleTouchedBall byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @instance
         */
        AttackerDoubleTouchedBall.prototype.byTeam = 0;

        /**
         * AttackerDoubleTouchedBall byBot.
         * @member {number} byBot
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @instance
         */
        AttackerDoubleTouchedBall.prototype.byBot = 0;

        /**
         * AttackerDoubleTouchedBall location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @instance
         */
        AttackerDoubleTouchedBall.prototype.location = null;

        /**
         * Creates a new AttackerDoubleTouchedBall instance using the specified properties.
         * @function create
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {GameEvent.IAttackerDoubleTouchedBall=} [properties] Properties to set
         * @returns {GameEvent.AttackerDoubleTouchedBall} AttackerDoubleTouchedBall instance
         */
        AttackerDoubleTouchedBall.create = function create(properties) {
            return new AttackerDoubleTouchedBall(properties);
        };

        /**
         * Encodes the specified AttackerDoubleTouchedBall message. Does not implicitly {@link GameEvent.AttackerDoubleTouchedBall.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {GameEvent.IAttackerDoubleTouchedBall} message AttackerDoubleTouchedBall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerDoubleTouchedBall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AttackerDoubleTouchedBall message, length delimited. Does not implicitly {@link GameEvent.AttackerDoubleTouchedBall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {GameEvent.IAttackerDoubleTouchedBall} message AttackerDoubleTouchedBall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerDoubleTouchedBall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AttackerDoubleTouchedBall message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.AttackerDoubleTouchedBall} AttackerDoubleTouchedBall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerDoubleTouchedBall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.AttackerDoubleTouchedBall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes an AttackerDoubleTouchedBall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.AttackerDoubleTouchedBall} AttackerDoubleTouchedBall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerDoubleTouchedBall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AttackerDoubleTouchedBall message.
         * @function verify
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AttackerDoubleTouchedBall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            return null;
        };

        /**
         * Creates an AttackerDoubleTouchedBall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.AttackerDoubleTouchedBall} AttackerDoubleTouchedBall
         */
        AttackerDoubleTouchedBall.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.AttackerDoubleTouchedBall)
                return object;
            let message = new $root.GameEvent.AttackerDoubleTouchedBall();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.AttackerDoubleTouchedBall.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            return message;
        };

        /**
         * Creates a plain object from an AttackerDoubleTouchedBall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @static
         * @param {GameEvent.AttackerDoubleTouchedBall} message AttackerDoubleTouchedBall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AttackerDoubleTouchedBall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            return object;
        };

        /**
         * Converts this AttackerDoubleTouchedBall to JSON.
         * @function toJSON
         * @memberof GameEvent.AttackerDoubleTouchedBall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AttackerDoubleTouchedBall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AttackerDoubleTouchedBall;
    })();

    GameEvent.AttackerTooCloseToDefenseArea = (function() {

        /**
         * Properties of an AttackerTooCloseToDefenseArea.
         * @memberof GameEvent
         * @interface IAttackerTooCloseToDefenseArea
         * @property {Team} byTeam AttackerTooCloseToDefenseArea byTeam
         * @property {number|null} [byBot] AttackerTooCloseToDefenseArea byBot
         * @property {IVector2|null} [location] AttackerTooCloseToDefenseArea location
         * @property {number|null} [distance] AttackerTooCloseToDefenseArea distance
         * @property {IVector2|null} [ballLocation] AttackerTooCloseToDefenseArea ballLocation
         */

        /**
         * Constructs a new AttackerTooCloseToDefenseArea.
         * @memberof GameEvent
         * @classdesc Represents an AttackerTooCloseToDefenseArea.
         * @implements IAttackerTooCloseToDefenseArea
         * @constructor
         * @param {GameEvent.IAttackerTooCloseToDefenseArea=} [properties] Properties to set
         */
        function AttackerTooCloseToDefenseArea(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AttackerTooCloseToDefenseArea byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @instance
         */
        AttackerTooCloseToDefenseArea.prototype.byTeam = 0;

        /**
         * AttackerTooCloseToDefenseArea byBot.
         * @member {number} byBot
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @instance
         */
        AttackerTooCloseToDefenseArea.prototype.byBot = 0;

        /**
         * AttackerTooCloseToDefenseArea location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @instance
         */
        AttackerTooCloseToDefenseArea.prototype.location = null;

        /**
         * AttackerTooCloseToDefenseArea distance.
         * @member {number} distance
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @instance
         */
        AttackerTooCloseToDefenseArea.prototype.distance = 0;

        /**
         * AttackerTooCloseToDefenseArea ballLocation.
         * @member {IVector2|null|undefined} ballLocation
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @instance
         */
        AttackerTooCloseToDefenseArea.prototype.ballLocation = null;

        /**
         * Creates a new AttackerTooCloseToDefenseArea instance using the specified properties.
         * @function create
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {GameEvent.IAttackerTooCloseToDefenseArea=} [properties] Properties to set
         * @returns {GameEvent.AttackerTooCloseToDefenseArea} AttackerTooCloseToDefenseArea instance
         */
        AttackerTooCloseToDefenseArea.create = function create(properties) {
            return new AttackerTooCloseToDefenseArea(properties);
        };

        /**
         * Encodes the specified AttackerTooCloseToDefenseArea message. Does not implicitly {@link GameEvent.AttackerTooCloseToDefenseArea.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {GameEvent.IAttackerTooCloseToDefenseArea} message AttackerTooCloseToDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerTooCloseToDefenseArea.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.distance != null && message.hasOwnProperty("distance"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.distance);
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                $root.Vector2.encode(message.ballLocation, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AttackerTooCloseToDefenseArea message, length delimited. Does not implicitly {@link GameEvent.AttackerTooCloseToDefenseArea.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {GameEvent.IAttackerTooCloseToDefenseArea} message AttackerTooCloseToDefenseArea message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackerTooCloseToDefenseArea.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AttackerTooCloseToDefenseArea message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.AttackerTooCloseToDefenseArea} AttackerTooCloseToDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerTooCloseToDefenseArea.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.AttackerTooCloseToDefenseArea();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.distance = reader.float();
                    break;
                case 5:
                    message.ballLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes an AttackerTooCloseToDefenseArea message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.AttackerTooCloseToDefenseArea} AttackerTooCloseToDefenseArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackerTooCloseToDefenseArea.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AttackerTooCloseToDefenseArea message.
         * @function verify
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AttackerTooCloseToDefenseArea.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.distance != null && message.hasOwnProperty("distance"))
                if (typeof message.distance !== "number")
                    return "distance: number expected";
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation")) {
                let error = $root.Vector2.verify(message.ballLocation);
                if (error)
                    return "ballLocation." + error;
            }
            return null;
        };

        /**
         * Creates an AttackerTooCloseToDefenseArea message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.AttackerTooCloseToDefenseArea} AttackerTooCloseToDefenseArea
         */
        AttackerTooCloseToDefenseArea.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.AttackerTooCloseToDefenseArea)
                return object;
            let message = new $root.GameEvent.AttackerTooCloseToDefenseArea();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.AttackerTooCloseToDefenseArea.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.distance != null)
                message.distance = Number(object.distance);
            if (object.ballLocation != null) {
                if (typeof object.ballLocation !== "object")
                    throw TypeError(".GameEvent.AttackerTooCloseToDefenseArea.ballLocation: object expected");
                message.ballLocation = $root.Vector2.fromObject(object.ballLocation);
            }
            return message;
        };

        /**
         * Creates a plain object from an AttackerTooCloseToDefenseArea message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @static
         * @param {GameEvent.AttackerTooCloseToDefenseArea} message AttackerTooCloseToDefenseArea
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AttackerTooCloseToDefenseArea.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.distance = 0;
                object.ballLocation = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.distance != null && message.hasOwnProperty("distance"))
                object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                object.ballLocation = $root.Vector2.toObject(message.ballLocation, options);
            return object;
        };

        /**
         * Converts this AttackerTooCloseToDefenseArea to JSON.
         * @function toJSON
         * @memberof GameEvent.AttackerTooCloseToDefenseArea
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AttackerTooCloseToDefenseArea.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AttackerTooCloseToDefenseArea;
    })();

    GameEvent.BotHeldBallDeliberately = (function() {

        /**
         * Properties of a BotHeldBallDeliberately.
         * @memberof GameEvent
         * @interface IBotHeldBallDeliberately
         * @property {Team} byTeam BotHeldBallDeliberately byTeam
         * @property {number|null} [byBot] BotHeldBallDeliberately byBot
         * @property {IVector2|null} [location] BotHeldBallDeliberately location
         * @property {number|null} [duration] BotHeldBallDeliberately duration
         */

        /**
         * Constructs a new BotHeldBallDeliberately.
         * @memberof GameEvent
         * @classdesc Represents a BotHeldBallDeliberately.
         * @implements IBotHeldBallDeliberately
         * @constructor
         * @param {GameEvent.IBotHeldBallDeliberately=} [properties] Properties to set
         */
        function BotHeldBallDeliberately(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotHeldBallDeliberately byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotHeldBallDeliberately
         * @instance
         */
        BotHeldBallDeliberately.prototype.byTeam = 0;

        /**
         * BotHeldBallDeliberately byBot.
         * @member {number} byBot
         * @memberof GameEvent.BotHeldBallDeliberately
         * @instance
         */
        BotHeldBallDeliberately.prototype.byBot = 0;

        /**
         * BotHeldBallDeliberately location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotHeldBallDeliberately
         * @instance
         */
        BotHeldBallDeliberately.prototype.location = null;

        /**
         * BotHeldBallDeliberately duration.
         * @member {number} duration
         * @memberof GameEvent.BotHeldBallDeliberately
         * @instance
         */
        BotHeldBallDeliberately.prototype.duration = 0;

        /**
         * Creates a new BotHeldBallDeliberately instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {GameEvent.IBotHeldBallDeliberately=} [properties] Properties to set
         * @returns {GameEvent.BotHeldBallDeliberately} BotHeldBallDeliberately instance
         */
        BotHeldBallDeliberately.create = function create(properties) {
            return new BotHeldBallDeliberately(properties);
        };

        /**
         * Encodes the specified BotHeldBallDeliberately message. Does not implicitly {@link GameEvent.BotHeldBallDeliberately.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {GameEvent.IBotHeldBallDeliberately} message BotHeldBallDeliberately message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotHeldBallDeliberately.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.duration != null && message.hasOwnProperty("duration"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.duration);
            return writer;
        };

        /**
         * Encodes the specified BotHeldBallDeliberately message, length delimited. Does not implicitly {@link GameEvent.BotHeldBallDeliberately.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {GameEvent.IBotHeldBallDeliberately} message BotHeldBallDeliberately message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotHeldBallDeliberately.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotHeldBallDeliberately message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotHeldBallDeliberately} BotHeldBallDeliberately
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotHeldBallDeliberately.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotHeldBallDeliberately();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.duration = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotHeldBallDeliberately message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotHeldBallDeliberately} BotHeldBallDeliberately
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotHeldBallDeliberately.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotHeldBallDeliberately message.
         * @function verify
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotHeldBallDeliberately.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.duration != null && message.hasOwnProperty("duration"))
                if (typeof message.duration !== "number")
                    return "duration: number expected";
            return null;
        };

        /**
         * Creates a BotHeldBallDeliberately message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotHeldBallDeliberately} BotHeldBallDeliberately
         */
        BotHeldBallDeliberately.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotHeldBallDeliberately)
                return object;
            let message = new $root.GameEvent.BotHeldBallDeliberately();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotHeldBallDeliberately.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.duration != null)
                message.duration = Number(object.duration);
            return message;
        };

        /**
         * Creates a plain object from a BotHeldBallDeliberately message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotHeldBallDeliberately
         * @static
         * @param {GameEvent.BotHeldBallDeliberately} message BotHeldBallDeliberately
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotHeldBallDeliberately.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
                object.duration = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.duration != null && message.hasOwnProperty("duration"))
                object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
            return object;
        };

        /**
         * Converts this BotHeldBallDeliberately to JSON.
         * @function toJSON
         * @memberof GameEvent.BotHeldBallDeliberately
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotHeldBallDeliberately.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotHeldBallDeliberately;
    })();

    GameEvent.BotInterferedPlacement = (function() {

        /**
         * Properties of a BotInterferedPlacement.
         * @memberof GameEvent
         * @interface IBotInterferedPlacement
         * @property {Team} byTeam BotInterferedPlacement byTeam
         * @property {number|null} [byBot] BotInterferedPlacement byBot
         * @property {IVector2|null} [location] BotInterferedPlacement location
         */

        /**
         * Constructs a new BotInterferedPlacement.
         * @memberof GameEvent
         * @classdesc Represents a BotInterferedPlacement.
         * @implements IBotInterferedPlacement
         * @constructor
         * @param {GameEvent.IBotInterferedPlacement=} [properties] Properties to set
         */
        function BotInterferedPlacement(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotInterferedPlacement byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotInterferedPlacement
         * @instance
         */
        BotInterferedPlacement.prototype.byTeam = 0;

        /**
         * BotInterferedPlacement byBot.
         * @member {number} byBot
         * @memberof GameEvent.BotInterferedPlacement
         * @instance
         */
        BotInterferedPlacement.prototype.byBot = 0;

        /**
         * BotInterferedPlacement location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BotInterferedPlacement
         * @instance
         */
        BotInterferedPlacement.prototype.location = null;

        /**
         * Creates a new BotInterferedPlacement instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {GameEvent.IBotInterferedPlacement=} [properties] Properties to set
         * @returns {GameEvent.BotInterferedPlacement} BotInterferedPlacement instance
         */
        BotInterferedPlacement.create = function create(properties) {
            return new BotInterferedPlacement(properties);
        };

        /**
         * Encodes the specified BotInterferedPlacement message. Does not implicitly {@link GameEvent.BotInterferedPlacement.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {GameEvent.IBotInterferedPlacement} message BotInterferedPlacement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotInterferedPlacement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.byBot);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BotInterferedPlacement message, length delimited. Does not implicitly {@link GameEvent.BotInterferedPlacement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {GameEvent.IBotInterferedPlacement} message BotInterferedPlacement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotInterferedPlacement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotInterferedPlacement message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotInterferedPlacement} BotInterferedPlacement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotInterferedPlacement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotInterferedPlacement();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.byBot = reader.uint32();
                    break;
                case 3:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotInterferedPlacement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotInterferedPlacement} BotInterferedPlacement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotInterferedPlacement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotInterferedPlacement message.
         * @function verify
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotInterferedPlacement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                if (!$util.isInteger(message.byBot))
                    return "byBot: integer expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            return null;
        };

        /**
         * Creates a BotInterferedPlacement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotInterferedPlacement} BotInterferedPlacement
         */
        BotInterferedPlacement.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotInterferedPlacement)
                return object;
            let message = new $root.GameEvent.BotInterferedPlacement();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.byBot != null)
                message.byBot = object.byBot >>> 0;
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BotInterferedPlacement.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            return message;
        };

        /**
         * Creates a plain object from a BotInterferedPlacement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotInterferedPlacement
         * @static
         * @param {GameEvent.BotInterferedPlacement} message BotInterferedPlacement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotInterferedPlacement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.byBot = 0;
                object.location = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.byBot != null && message.hasOwnProperty("byBot"))
                object.byBot = message.byBot;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            return object;
        };

        /**
         * Converts this BotInterferedPlacement to JSON.
         * @function toJSON
         * @memberof GameEvent.BotInterferedPlacement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotInterferedPlacement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotInterferedPlacement;
    })();

    GameEvent.MultipleCards = (function() {

        /**
         * Properties of a MultipleCards.
         * @memberof GameEvent
         * @interface IMultipleCards
         * @property {Team} byTeam MultipleCards byTeam
         */

        /**
         * Constructs a new MultipleCards.
         * @memberof GameEvent
         * @classdesc Represents a MultipleCards.
         * @implements IMultipleCards
         * @constructor
         * @param {GameEvent.IMultipleCards=} [properties] Properties to set
         */
        function MultipleCards(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MultipleCards byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.MultipleCards
         * @instance
         */
        MultipleCards.prototype.byTeam = 0;

        /**
         * Creates a new MultipleCards instance using the specified properties.
         * @function create
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {GameEvent.IMultipleCards=} [properties] Properties to set
         * @returns {GameEvent.MultipleCards} MultipleCards instance
         */
        MultipleCards.create = function create(properties) {
            return new MultipleCards(properties);
        };

        /**
         * Encodes the specified MultipleCards message. Does not implicitly {@link GameEvent.MultipleCards.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {GameEvent.IMultipleCards} message MultipleCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultipleCards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            return writer;
        };

        /**
         * Encodes the specified MultipleCards message, length delimited. Does not implicitly {@link GameEvent.MultipleCards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {GameEvent.IMultipleCards} message MultipleCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultipleCards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MultipleCards message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.MultipleCards} MultipleCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultipleCards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.MultipleCards();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a MultipleCards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.MultipleCards} MultipleCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultipleCards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MultipleCards message.
         * @function verify
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MultipleCards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            return null;
        };

        /**
         * Creates a MultipleCards message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.MultipleCards} MultipleCards
         */
        MultipleCards.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.MultipleCards)
                return object;
            let message = new $root.GameEvent.MultipleCards();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a MultipleCards message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.MultipleCards
         * @static
         * @param {GameEvent.MultipleCards} message MultipleCards
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MultipleCards.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            return object;
        };

        /**
         * Converts this MultipleCards to JSON.
         * @function toJSON
         * @memberof GameEvent.MultipleCards
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MultipleCards.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MultipleCards;
    })();

    GameEvent.MultipleFouls = (function() {

        /**
         * Properties of a MultipleFouls.
         * @memberof GameEvent
         * @interface IMultipleFouls
         * @property {Team} byTeam MultipleFouls byTeam
         */

        /**
         * Constructs a new MultipleFouls.
         * @memberof GameEvent
         * @classdesc Represents a MultipleFouls.
         * @implements IMultipleFouls
         * @constructor
         * @param {GameEvent.IMultipleFouls=} [properties] Properties to set
         */
        function MultipleFouls(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MultipleFouls byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.MultipleFouls
         * @instance
         */
        MultipleFouls.prototype.byTeam = 0;

        /**
         * Creates a new MultipleFouls instance using the specified properties.
         * @function create
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {GameEvent.IMultipleFouls=} [properties] Properties to set
         * @returns {GameEvent.MultipleFouls} MultipleFouls instance
         */
        MultipleFouls.create = function create(properties) {
            return new MultipleFouls(properties);
        };

        /**
         * Encodes the specified MultipleFouls message. Does not implicitly {@link GameEvent.MultipleFouls.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {GameEvent.IMultipleFouls} message MultipleFouls message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultipleFouls.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            return writer;
        };

        /**
         * Encodes the specified MultipleFouls message, length delimited. Does not implicitly {@link GameEvent.MultipleFouls.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {GameEvent.IMultipleFouls} message MultipleFouls message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultipleFouls.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MultipleFouls message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.MultipleFouls} MultipleFouls
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultipleFouls.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.MultipleFouls();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a MultipleFouls message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.MultipleFouls} MultipleFouls
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultipleFouls.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MultipleFouls message.
         * @function verify
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MultipleFouls.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            return null;
        };

        /**
         * Creates a MultipleFouls message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.MultipleFouls} MultipleFouls
         */
        MultipleFouls.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.MultipleFouls)
                return object;
            let message = new $root.GameEvent.MultipleFouls();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a MultipleFouls message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.MultipleFouls
         * @static
         * @param {GameEvent.MultipleFouls} message MultipleFouls
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MultipleFouls.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            return object;
        };

        /**
         * Converts this MultipleFouls to JSON.
         * @function toJSON
         * @memberof GameEvent.MultipleFouls
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MultipleFouls.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MultipleFouls;
    })();

    GameEvent.MultiplePlacementFailures = (function() {

        /**
         * Properties of a MultiplePlacementFailures.
         * @memberof GameEvent
         * @interface IMultiplePlacementFailures
         * @property {Team} byTeam MultiplePlacementFailures byTeam
         */

        /**
         * Constructs a new MultiplePlacementFailures.
         * @memberof GameEvent
         * @classdesc Represents a MultiplePlacementFailures.
         * @implements IMultiplePlacementFailures
         * @constructor
         * @param {GameEvent.IMultiplePlacementFailures=} [properties] Properties to set
         */
        function MultiplePlacementFailures(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MultiplePlacementFailures byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.MultiplePlacementFailures
         * @instance
         */
        MultiplePlacementFailures.prototype.byTeam = 0;

        /**
         * Creates a new MultiplePlacementFailures instance using the specified properties.
         * @function create
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {GameEvent.IMultiplePlacementFailures=} [properties] Properties to set
         * @returns {GameEvent.MultiplePlacementFailures} MultiplePlacementFailures instance
         */
        MultiplePlacementFailures.create = function create(properties) {
            return new MultiplePlacementFailures(properties);
        };

        /**
         * Encodes the specified MultiplePlacementFailures message. Does not implicitly {@link GameEvent.MultiplePlacementFailures.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {GameEvent.IMultiplePlacementFailures} message MultiplePlacementFailures message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultiplePlacementFailures.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            return writer;
        };

        /**
         * Encodes the specified MultiplePlacementFailures message, length delimited. Does not implicitly {@link GameEvent.MultiplePlacementFailures.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {GameEvent.IMultiplePlacementFailures} message MultiplePlacementFailures message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultiplePlacementFailures.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MultiplePlacementFailures message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.MultiplePlacementFailures} MultiplePlacementFailures
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultiplePlacementFailures.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.MultiplePlacementFailures();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a MultiplePlacementFailures message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.MultiplePlacementFailures} MultiplePlacementFailures
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultiplePlacementFailures.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MultiplePlacementFailures message.
         * @function verify
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MultiplePlacementFailures.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            return null;
        };

        /**
         * Creates a MultiplePlacementFailures message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.MultiplePlacementFailures} MultiplePlacementFailures
         */
        MultiplePlacementFailures.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.MultiplePlacementFailures)
                return object;
            let message = new $root.GameEvent.MultiplePlacementFailures();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a MultiplePlacementFailures message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.MultiplePlacementFailures
         * @static
         * @param {GameEvent.MultiplePlacementFailures} message MultiplePlacementFailures
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MultiplePlacementFailures.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            return object;
        };

        /**
         * Converts this MultiplePlacementFailures to JSON.
         * @function toJSON
         * @memberof GameEvent.MultiplePlacementFailures
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MultiplePlacementFailures.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MultiplePlacementFailures;
    })();

    GameEvent.KickTimeout = (function() {

        /**
         * Properties of a KickTimeout.
         * @memberof GameEvent
         * @interface IKickTimeout
         * @property {Team} byTeam KickTimeout byTeam
         * @property {IVector2|null} [location] KickTimeout location
         * @property {number|null} [time] KickTimeout time
         */

        /**
         * Constructs a new KickTimeout.
         * @memberof GameEvent
         * @classdesc Represents a KickTimeout.
         * @implements IKickTimeout
         * @constructor
         * @param {GameEvent.IKickTimeout=} [properties] Properties to set
         */
        function KickTimeout(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KickTimeout byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.KickTimeout
         * @instance
         */
        KickTimeout.prototype.byTeam = 0;

        /**
         * KickTimeout location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.KickTimeout
         * @instance
         */
        KickTimeout.prototype.location = null;

        /**
         * KickTimeout time.
         * @member {number} time
         * @memberof GameEvent.KickTimeout
         * @instance
         */
        KickTimeout.prototype.time = 0;

        /**
         * Creates a new KickTimeout instance using the specified properties.
         * @function create
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {GameEvent.IKickTimeout=} [properties] Properties to set
         * @returns {GameEvent.KickTimeout} KickTimeout instance
         */
        KickTimeout.create = function create(properties) {
            return new KickTimeout(properties);
        };

        /**
         * Encodes the specified KickTimeout message. Does not implicitly {@link GameEvent.KickTimeout.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {GameEvent.IKickTimeout} message KickTimeout message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickTimeout.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.time);
            return writer;
        };

        /**
         * Encodes the specified KickTimeout message, length delimited. Does not implicitly {@link GameEvent.KickTimeout.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {GameEvent.IKickTimeout} message KickTimeout message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickTimeout.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KickTimeout message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.KickTimeout} KickTimeout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickTimeout.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.KickTimeout();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.time = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a KickTimeout message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.KickTimeout} KickTimeout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickTimeout.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KickTimeout message.
         * @function verify
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KickTimeout.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time !== "number")
                    return "time: number expected";
            return null;
        };

        /**
         * Creates a KickTimeout message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.KickTimeout} KickTimeout
         */
        KickTimeout.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.KickTimeout)
                return object;
            let message = new $root.GameEvent.KickTimeout();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.KickTimeout.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.time != null)
                message.time = Number(object.time);
            return message;
        };

        /**
         * Creates a plain object from a KickTimeout message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.KickTimeout
         * @static
         * @param {GameEvent.KickTimeout} message KickTimeout
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KickTimeout.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.location = null;
                object.time = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
            return object;
        };

        /**
         * Converts this KickTimeout to JSON.
         * @function toJSON
         * @memberof GameEvent.KickTimeout
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KickTimeout.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KickTimeout;
    })();

    GameEvent.NoProgressInGame = (function() {

        /**
         * Properties of a NoProgressInGame.
         * @memberof GameEvent
         * @interface INoProgressInGame
         * @property {IVector2|null} [location] NoProgressInGame location
         * @property {number|null} [time] NoProgressInGame time
         */

        /**
         * Constructs a new NoProgressInGame.
         * @memberof GameEvent
         * @classdesc Represents a NoProgressInGame.
         * @implements INoProgressInGame
         * @constructor
         * @param {GameEvent.INoProgressInGame=} [properties] Properties to set
         */
        function NoProgressInGame(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NoProgressInGame location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.NoProgressInGame
         * @instance
         */
        NoProgressInGame.prototype.location = null;

        /**
         * NoProgressInGame time.
         * @member {number} time
         * @memberof GameEvent.NoProgressInGame
         * @instance
         */
        NoProgressInGame.prototype.time = 0;

        /**
         * Creates a new NoProgressInGame instance using the specified properties.
         * @function create
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {GameEvent.INoProgressInGame=} [properties] Properties to set
         * @returns {GameEvent.NoProgressInGame} NoProgressInGame instance
         */
        NoProgressInGame.create = function create(properties) {
            return new NoProgressInGame(properties);
        };

        /**
         * Encodes the specified NoProgressInGame message. Does not implicitly {@link GameEvent.NoProgressInGame.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {GameEvent.INoProgressInGame} message NoProgressInGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NoProgressInGame.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.time);
            return writer;
        };

        /**
         * Encodes the specified NoProgressInGame message, length delimited. Does not implicitly {@link GameEvent.NoProgressInGame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {GameEvent.INoProgressInGame} message NoProgressInGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NoProgressInGame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NoProgressInGame message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.NoProgressInGame} NoProgressInGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NoProgressInGame.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.NoProgressInGame();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.time = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NoProgressInGame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.NoProgressInGame} NoProgressInGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NoProgressInGame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NoProgressInGame message.
         * @function verify
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NoProgressInGame.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time !== "number")
                    return "time: number expected";
            return null;
        };

        /**
         * Creates a NoProgressInGame message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.NoProgressInGame} NoProgressInGame
         */
        NoProgressInGame.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.NoProgressInGame)
                return object;
            let message = new $root.GameEvent.NoProgressInGame();
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.NoProgressInGame.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.time != null)
                message.time = Number(object.time);
            return message;
        };

        /**
         * Creates a plain object from a NoProgressInGame message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.NoProgressInGame
         * @static
         * @param {GameEvent.NoProgressInGame} message NoProgressInGame
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NoProgressInGame.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.location = null;
                object.time = 0;
            }
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
            return object;
        };

        /**
         * Converts this NoProgressInGame to JSON.
         * @function toJSON
         * @memberof GameEvent.NoProgressInGame
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NoProgressInGame.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NoProgressInGame;
    })();

    GameEvent.PlacementFailed = (function() {

        /**
         * Properties of a PlacementFailed.
         * @memberof GameEvent
         * @interface IPlacementFailed
         * @property {Team} byTeam PlacementFailed byTeam
         * @property {number|null} [remainingDistance] PlacementFailed remainingDistance
         */

        /**
         * Constructs a new PlacementFailed.
         * @memberof GameEvent
         * @classdesc Represents a PlacementFailed.
         * @implements IPlacementFailed
         * @constructor
         * @param {GameEvent.IPlacementFailed=} [properties] Properties to set
         */
        function PlacementFailed(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlacementFailed byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.PlacementFailed
         * @instance
         */
        PlacementFailed.prototype.byTeam = 0;

        /**
         * PlacementFailed remainingDistance.
         * @member {number} remainingDistance
         * @memberof GameEvent.PlacementFailed
         * @instance
         */
        PlacementFailed.prototype.remainingDistance = 0;

        /**
         * Creates a new PlacementFailed instance using the specified properties.
         * @function create
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {GameEvent.IPlacementFailed=} [properties] Properties to set
         * @returns {GameEvent.PlacementFailed} PlacementFailed instance
         */
        PlacementFailed.create = function create(properties) {
            return new PlacementFailed(properties);
        };

        /**
         * Encodes the specified PlacementFailed message. Does not implicitly {@link GameEvent.PlacementFailed.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {GameEvent.IPlacementFailed} message PlacementFailed message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlacementFailed.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.remainingDistance != null && message.hasOwnProperty("remainingDistance"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.remainingDistance);
            return writer;
        };

        /**
         * Encodes the specified PlacementFailed message, length delimited. Does not implicitly {@link GameEvent.PlacementFailed.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {GameEvent.IPlacementFailed} message PlacementFailed message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlacementFailed.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlacementFailed message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.PlacementFailed} PlacementFailed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlacementFailed.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.PlacementFailed();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.remainingDistance = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a PlacementFailed message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.PlacementFailed} PlacementFailed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlacementFailed.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlacementFailed message.
         * @function verify
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlacementFailed.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.remainingDistance != null && message.hasOwnProperty("remainingDistance"))
                if (typeof message.remainingDistance !== "number")
                    return "remainingDistance: number expected";
            return null;
        };

        /**
         * Creates a PlacementFailed message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.PlacementFailed} PlacementFailed
         */
        PlacementFailed.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.PlacementFailed)
                return object;
            let message = new $root.GameEvent.PlacementFailed();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.remainingDistance != null)
                message.remainingDistance = Number(object.remainingDistance);
            return message;
        };

        /**
         * Creates a plain object from a PlacementFailed message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.PlacementFailed
         * @static
         * @param {GameEvent.PlacementFailed} message PlacementFailed
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlacementFailed.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.remainingDistance = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.remainingDistance != null && message.hasOwnProperty("remainingDistance"))
                object.remainingDistance = options.json && !isFinite(message.remainingDistance) ? String(message.remainingDistance) : message.remainingDistance;
            return object;
        };

        /**
         * Converts this PlacementFailed to JSON.
         * @function toJSON
         * @memberof GameEvent.PlacementFailed
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlacementFailed.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlacementFailed;
    })();

    GameEvent.UnsportingBehaviorMinor = (function() {

        /**
         * Properties of an UnsportingBehaviorMinor.
         * @memberof GameEvent
         * @interface IUnsportingBehaviorMinor
         * @property {Team} byTeam UnsportingBehaviorMinor byTeam
         * @property {string} reason UnsportingBehaviorMinor reason
         */

        /**
         * Constructs a new UnsportingBehaviorMinor.
         * @memberof GameEvent
         * @classdesc Represents an UnsportingBehaviorMinor.
         * @implements IUnsportingBehaviorMinor
         * @constructor
         * @param {GameEvent.IUnsportingBehaviorMinor=} [properties] Properties to set
         */
        function UnsportingBehaviorMinor(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnsportingBehaviorMinor byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @instance
         */
        UnsportingBehaviorMinor.prototype.byTeam = 0;

        /**
         * UnsportingBehaviorMinor reason.
         * @member {string} reason
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @instance
         */
        UnsportingBehaviorMinor.prototype.reason = "";

        /**
         * Creates a new UnsportingBehaviorMinor instance using the specified properties.
         * @function create
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {GameEvent.IUnsportingBehaviorMinor=} [properties] Properties to set
         * @returns {GameEvent.UnsportingBehaviorMinor} UnsportingBehaviorMinor instance
         */
        UnsportingBehaviorMinor.create = function create(properties) {
            return new UnsportingBehaviorMinor(properties);
        };

        /**
         * Encodes the specified UnsportingBehaviorMinor message. Does not implicitly {@link GameEvent.UnsportingBehaviorMinor.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {GameEvent.IUnsportingBehaviorMinor} message UnsportingBehaviorMinor message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnsportingBehaviorMinor.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
            return writer;
        };

        /**
         * Encodes the specified UnsportingBehaviorMinor message, length delimited. Does not implicitly {@link GameEvent.UnsportingBehaviorMinor.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {GameEvent.IUnsportingBehaviorMinor} message UnsportingBehaviorMinor message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnsportingBehaviorMinor.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UnsportingBehaviorMinor message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.UnsportingBehaviorMinor} UnsportingBehaviorMinor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnsportingBehaviorMinor.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.UnsportingBehaviorMinor();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.reason = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            if (!message.hasOwnProperty("reason"))
                throw $util.ProtocolError("missing required 'reason'", { instance: message });
            return message;
        };

        /**
         * Decodes an UnsportingBehaviorMinor message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.UnsportingBehaviorMinor} UnsportingBehaviorMinor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnsportingBehaviorMinor.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnsportingBehaviorMinor message.
         * @function verify
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnsportingBehaviorMinor.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (!$util.isString(message.reason))
                return "reason: string expected";
            return null;
        };

        /**
         * Creates an UnsportingBehaviorMinor message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.UnsportingBehaviorMinor} UnsportingBehaviorMinor
         */
        UnsportingBehaviorMinor.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.UnsportingBehaviorMinor)
                return object;
            let message = new $root.GameEvent.UnsportingBehaviorMinor();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.reason != null)
                message.reason = String(object.reason);
            return message;
        };

        /**
         * Creates a plain object from an UnsportingBehaviorMinor message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @static
         * @param {GameEvent.UnsportingBehaviorMinor} message UnsportingBehaviorMinor
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnsportingBehaviorMinor.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.reason = "";
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            return object;
        };

        /**
         * Converts this UnsportingBehaviorMinor to JSON.
         * @function toJSON
         * @memberof GameEvent.UnsportingBehaviorMinor
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnsportingBehaviorMinor.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UnsportingBehaviorMinor;
    })();

    GameEvent.UnsportingBehaviorMajor = (function() {

        /**
         * Properties of an UnsportingBehaviorMajor.
         * @memberof GameEvent
         * @interface IUnsportingBehaviorMajor
         * @property {Team} byTeam UnsportingBehaviorMajor byTeam
         * @property {string} reason UnsportingBehaviorMajor reason
         */

        /**
         * Constructs a new UnsportingBehaviorMajor.
         * @memberof GameEvent
         * @classdesc Represents an UnsportingBehaviorMajor.
         * @implements IUnsportingBehaviorMajor
         * @constructor
         * @param {GameEvent.IUnsportingBehaviorMajor=} [properties] Properties to set
         */
        function UnsportingBehaviorMajor(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnsportingBehaviorMajor byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @instance
         */
        UnsportingBehaviorMajor.prototype.byTeam = 0;

        /**
         * UnsportingBehaviorMajor reason.
         * @member {string} reason
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @instance
         */
        UnsportingBehaviorMajor.prototype.reason = "";

        /**
         * Creates a new UnsportingBehaviorMajor instance using the specified properties.
         * @function create
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {GameEvent.IUnsportingBehaviorMajor=} [properties] Properties to set
         * @returns {GameEvent.UnsportingBehaviorMajor} UnsportingBehaviorMajor instance
         */
        UnsportingBehaviorMajor.create = function create(properties) {
            return new UnsportingBehaviorMajor(properties);
        };

        /**
         * Encodes the specified UnsportingBehaviorMajor message. Does not implicitly {@link GameEvent.UnsportingBehaviorMajor.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {GameEvent.IUnsportingBehaviorMajor} message UnsportingBehaviorMajor message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnsportingBehaviorMajor.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
            return writer;
        };

        /**
         * Encodes the specified UnsportingBehaviorMajor message, length delimited. Does not implicitly {@link GameEvent.UnsportingBehaviorMajor.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {GameEvent.IUnsportingBehaviorMajor} message UnsportingBehaviorMajor message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnsportingBehaviorMajor.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UnsportingBehaviorMajor message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.UnsportingBehaviorMajor} UnsportingBehaviorMajor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnsportingBehaviorMajor.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.UnsportingBehaviorMajor();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.reason = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            if (!message.hasOwnProperty("reason"))
                throw $util.ProtocolError("missing required 'reason'", { instance: message });
            return message;
        };

        /**
         * Decodes an UnsportingBehaviorMajor message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.UnsportingBehaviorMajor} UnsportingBehaviorMajor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnsportingBehaviorMajor.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnsportingBehaviorMajor message.
         * @function verify
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnsportingBehaviorMajor.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (!$util.isString(message.reason))
                return "reason: string expected";
            return null;
        };

        /**
         * Creates an UnsportingBehaviorMajor message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.UnsportingBehaviorMajor} UnsportingBehaviorMajor
         */
        UnsportingBehaviorMajor.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.UnsportingBehaviorMajor)
                return object;
            let message = new $root.GameEvent.UnsportingBehaviorMajor();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.reason != null)
                message.reason = String(object.reason);
            return message;
        };

        /**
         * Creates a plain object from an UnsportingBehaviorMajor message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @static
         * @param {GameEvent.UnsportingBehaviorMajor} message UnsportingBehaviorMajor
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnsportingBehaviorMajor.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.reason = "";
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            return object;
        };

        /**
         * Converts this UnsportingBehaviorMajor to JSON.
         * @function toJSON
         * @memberof GameEvent.UnsportingBehaviorMajor
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnsportingBehaviorMajor.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UnsportingBehaviorMajor;
    })();

    GameEvent.KeeperHeldBall = (function() {

        /**
         * Properties of a KeeperHeldBall.
         * @memberof GameEvent
         * @interface IKeeperHeldBall
         * @property {Team} byTeam KeeperHeldBall byTeam
         * @property {IVector2|null} [location] KeeperHeldBall location
         * @property {number|null} [duration] KeeperHeldBall duration
         */

        /**
         * Constructs a new KeeperHeldBall.
         * @memberof GameEvent
         * @classdesc Represents a KeeperHeldBall.
         * @implements IKeeperHeldBall
         * @constructor
         * @param {GameEvent.IKeeperHeldBall=} [properties] Properties to set
         */
        function KeeperHeldBall(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeeperHeldBall byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.KeeperHeldBall
         * @instance
         */
        KeeperHeldBall.prototype.byTeam = 0;

        /**
         * KeeperHeldBall location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.KeeperHeldBall
         * @instance
         */
        KeeperHeldBall.prototype.location = null;

        /**
         * KeeperHeldBall duration.
         * @member {number} duration
         * @memberof GameEvent.KeeperHeldBall
         * @instance
         */
        KeeperHeldBall.prototype.duration = 0;

        /**
         * Creates a new KeeperHeldBall instance using the specified properties.
         * @function create
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {GameEvent.IKeeperHeldBall=} [properties] Properties to set
         * @returns {GameEvent.KeeperHeldBall} KeeperHeldBall instance
         */
        KeeperHeldBall.create = function create(properties) {
            return new KeeperHeldBall(properties);
        };

        /**
         * Encodes the specified KeeperHeldBall message. Does not implicitly {@link GameEvent.KeeperHeldBall.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {GameEvent.IKeeperHeldBall} message KeeperHeldBall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeeperHeldBall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.duration != null && message.hasOwnProperty("duration"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.duration);
            return writer;
        };

        /**
         * Encodes the specified KeeperHeldBall message, length delimited. Does not implicitly {@link GameEvent.KeeperHeldBall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {GameEvent.IKeeperHeldBall} message KeeperHeldBall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeeperHeldBall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KeeperHeldBall message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.KeeperHeldBall} KeeperHeldBall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeeperHeldBall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.KeeperHeldBall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.duration = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a KeeperHeldBall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.KeeperHeldBall} KeeperHeldBall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeeperHeldBall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeeperHeldBall message.
         * @function verify
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeeperHeldBall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.duration != null && message.hasOwnProperty("duration"))
                if (typeof message.duration !== "number")
                    return "duration: number expected";
            return null;
        };

        /**
         * Creates a KeeperHeldBall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.KeeperHeldBall} KeeperHeldBall
         */
        KeeperHeldBall.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.KeeperHeldBall)
                return object;
            let message = new $root.GameEvent.KeeperHeldBall();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.KeeperHeldBall.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            if (object.duration != null)
                message.duration = Number(object.duration);
            return message;
        };

        /**
         * Creates a plain object from a KeeperHeldBall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.KeeperHeldBall
         * @static
         * @param {GameEvent.KeeperHeldBall} message KeeperHeldBall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeeperHeldBall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.location = null;
                object.duration = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            if (message.duration != null && message.hasOwnProperty("duration"))
                object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
            return object;
        };

        /**
         * Converts this KeeperHeldBall to JSON.
         * @function toJSON
         * @memberof GameEvent.KeeperHeldBall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeeperHeldBall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KeeperHeldBall;
    })();

    GameEvent.PlacementSucceeded = (function() {

        /**
         * Properties of a PlacementSucceeded.
         * @memberof GameEvent
         * @interface IPlacementSucceeded
         * @property {Team} byTeam PlacementSucceeded byTeam
         * @property {number|null} [timeTaken] PlacementSucceeded timeTaken
         * @property {number|null} [precision] PlacementSucceeded precision
         * @property {number|null} [distance] PlacementSucceeded distance
         */

        /**
         * Constructs a new PlacementSucceeded.
         * @memberof GameEvent
         * @classdesc Represents a PlacementSucceeded.
         * @implements IPlacementSucceeded
         * @constructor
         * @param {GameEvent.IPlacementSucceeded=} [properties] Properties to set
         */
        function PlacementSucceeded(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlacementSucceeded byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.PlacementSucceeded
         * @instance
         */
        PlacementSucceeded.prototype.byTeam = 0;

        /**
         * PlacementSucceeded timeTaken.
         * @member {number} timeTaken
         * @memberof GameEvent.PlacementSucceeded
         * @instance
         */
        PlacementSucceeded.prototype.timeTaken = 0;

        /**
         * PlacementSucceeded precision.
         * @member {number} precision
         * @memberof GameEvent.PlacementSucceeded
         * @instance
         */
        PlacementSucceeded.prototype.precision = 0;

        /**
         * PlacementSucceeded distance.
         * @member {number} distance
         * @memberof GameEvent.PlacementSucceeded
         * @instance
         */
        PlacementSucceeded.prototype.distance = 0;

        /**
         * Creates a new PlacementSucceeded instance using the specified properties.
         * @function create
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {GameEvent.IPlacementSucceeded=} [properties] Properties to set
         * @returns {GameEvent.PlacementSucceeded} PlacementSucceeded instance
         */
        PlacementSucceeded.create = function create(properties) {
            return new PlacementSucceeded(properties);
        };

        /**
         * Encodes the specified PlacementSucceeded message. Does not implicitly {@link GameEvent.PlacementSucceeded.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {GameEvent.IPlacementSucceeded} message PlacementSucceeded message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlacementSucceeded.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.timeTaken != null && message.hasOwnProperty("timeTaken"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.timeTaken);
            if (message.precision != null && message.hasOwnProperty("precision"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.precision);
            if (message.distance != null && message.hasOwnProperty("distance"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.distance);
            return writer;
        };

        /**
         * Encodes the specified PlacementSucceeded message, length delimited. Does not implicitly {@link GameEvent.PlacementSucceeded.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {GameEvent.IPlacementSucceeded} message PlacementSucceeded message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlacementSucceeded.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlacementSucceeded message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.PlacementSucceeded} PlacementSucceeded
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlacementSucceeded.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.PlacementSucceeded();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.timeTaken = reader.float();
                    break;
                case 3:
                    message.precision = reader.float();
                    break;
                case 4:
                    message.distance = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a PlacementSucceeded message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.PlacementSucceeded} PlacementSucceeded
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlacementSucceeded.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlacementSucceeded message.
         * @function verify
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlacementSucceeded.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.timeTaken != null && message.hasOwnProperty("timeTaken"))
                if (typeof message.timeTaken !== "number")
                    return "timeTaken: number expected";
            if (message.precision != null && message.hasOwnProperty("precision"))
                if (typeof message.precision !== "number")
                    return "precision: number expected";
            if (message.distance != null && message.hasOwnProperty("distance"))
                if (typeof message.distance !== "number")
                    return "distance: number expected";
            return null;
        };

        /**
         * Creates a PlacementSucceeded message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.PlacementSucceeded} PlacementSucceeded
         */
        PlacementSucceeded.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.PlacementSucceeded)
                return object;
            let message = new $root.GameEvent.PlacementSucceeded();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.timeTaken != null)
                message.timeTaken = Number(object.timeTaken);
            if (object.precision != null)
                message.precision = Number(object.precision);
            if (object.distance != null)
                message.distance = Number(object.distance);
            return message;
        };

        /**
         * Creates a plain object from a PlacementSucceeded message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.PlacementSucceeded
         * @static
         * @param {GameEvent.PlacementSucceeded} message PlacementSucceeded
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlacementSucceeded.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.timeTaken = 0;
                object.precision = 0;
                object.distance = 0;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.timeTaken != null && message.hasOwnProperty("timeTaken"))
                object.timeTaken = options.json && !isFinite(message.timeTaken) ? String(message.timeTaken) : message.timeTaken;
            if (message.precision != null && message.hasOwnProperty("precision"))
                object.precision = options.json && !isFinite(message.precision) ? String(message.precision) : message.precision;
            if (message.distance != null && message.hasOwnProperty("distance"))
                object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
            return object;
        };

        /**
         * Converts this PlacementSucceeded to JSON.
         * @function toJSON
         * @memberof GameEvent.PlacementSucceeded
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlacementSucceeded.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlacementSucceeded;
    })();

    GameEvent.Prepared = (function() {

        /**
         * Properties of a Prepared.
         * @memberof GameEvent
         * @interface IPrepared
         * @property {number|null} [timeTaken] Prepared timeTaken
         */

        /**
         * Constructs a new Prepared.
         * @memberof GameEvent
         * @classdesc Represents a Prepared.
         * @implements IPrepared
         * @constructor
         * @param {GameEvent.IPrepared=} [properties] Properties to set
         */
        function Prepared(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Prepared timeTaken.
         * @member {number} timeTaken
         * @memberof GameEvent.Prepared
         * @instance
         */
        Prepared.prototype.timeTaken = 0;

        /**
         * Creates a new Prepared instance using the specified properties.
         * @function create
         * @memberof GameEvent.Prepared
         * @static
         * @param {GameEvent.IPrepared=} [properties] Properties to set
         * @returns {GameEvent.Prepared} Prepared instance
         */
        Prepared.create = function create(properties) {
            return new Prepared(properties);
        };

        /**
         * Encodes the specified Prepared message. Does not implicitly {@link GameEvent.Prepared.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.Prepared
         * @static
         * @param {GameEvent.IPrepared} message Prepared message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Prepared.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timeTaken != null && message.hasOwnProperty("timeTaken"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.timeTaken);
            return writer;
        };

        /**
         * Encodes the specified Prepared message, length delimited. Does not implicitly {@link GameEvent.Prepared.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.Prepared
         * @static
         * @param {GameEvent.IPrepared} message Prepared message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Prepared.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Prepared message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.Prepared
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.Prepared} Prepared
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Prepared.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.Prepared();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.timeTaken = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Prepared message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.Prepared
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.Prepared} Prepared
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Prepared.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Prepared message.
         * @function verify
         * @memberof GameEvent.Prepared
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Prepared.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timeTaken != null && message.hasOwnProperty("timeTaken"))
                if (typeof message.timeTaken !== "number")
                    return "timeTaken: number expected";
            return null;
        };

        /**
         * Creates a Prepared message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.Prepared
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.Prepared} Prepared
         */
        Prepared.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.Prepared)
                return object;
            let message = new $root.GameEvent.Prepared();
            if (object.timeTaken != null)
                message.timeTaken = Number(object.timeTaken);
            return message;
        };

        /**
         * Creates a plain object from a Prepared message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.Prepared
         * @static
         * @param {GameEvent.Prepared} message Prepared
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Prepared.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.timeTaken = 0;
            if (message.timeTaken != null && message.hasOwnProperty("timeTaken"))
                object.timeTaken = options.json && !isFinite(message.timeTaken) ? String(message.timeTaken) : message.timeTaken;
            return object;
        };

        /**
         * Converts this Prepared to JSON.
         * @function toJSON
         * @memberof GameEvent.Prepared
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Prepared.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Prepared;
    })();

    GameEvent.BotSubstitution = (function() {

        /**
         * Properties of a BotSubstitution.
         * @memberof GameEvent
         * @interface IBotSubstitution
         * @property {Team} byTeam BotSubstitution byTeam
         */

        /**
         * Constructs a new BotSubstitution.
         * @memberof GameEvent
         * @classdesc Represents a BotSubstitution.
         * @implements IBotSubstitution
         * @constructor
         * @param {GameEvent.IBotSubstitution=} [properties] Properties to set
         */
        function BotSubstitution(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BotSubstitution byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BotSubstitution
         * @instance
         */
        BotSubstitution.prototype.byTeam = 0;

        /**
         * Creates a new BotSubstitution instance using the specified properties.
         * @function create
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {GameEvent.IBotSubstitution=} [properties] Properties to set
         * @returns {GameEvent.BotSubstitution} BotSubstitution instance
         */
        BotSubstitution.create = function create(properties) {
            return new BotSubstitution(properties);
        };

        /**
         * Encodes the specified BotSubstitution message. Does not implicitly {@link GameEvent.BotSubstitution.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {GameEvent.IBotSubstitution} message BotSubstitution message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotSubstitution.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            return writer;
        };

        /**
         * Encodes the specified BotSubstitution message, length delimited. Does not implicitly {@link GameEvent.BotSubstitution.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {GameEvent.IBotSubstitution} message BotSubstitution message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BotSubstitution.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BotSubstitution message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BotSubstitution} BotSubstitution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotSubstitution.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BotSubstitution();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BotSubstitution message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BotSubstitution} BotSubstitution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BotSubstitution.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BotSubstitution message.
         * @function verify
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BotSubstitution.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            return null;
        };

        /**
         * Creates a BotSubstitution message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BotSubstitution} BotSubstitution
         */
        BotSubstitution.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BotSubstitution)
                return object;
            let message = new $root.GameEvent.BotSubstitution();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a BotSubstitution message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BotSubstitution
         * @static
         * @param {GameEvent.BotSubstitution} message BotSubstitution
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BotSubstitution.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            return object;
        };

        /**
         * Converts this BotSubstitution to JSON.
         * @function toJSON
         * @memberof GameEvent.BotSubstitution
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BotSubstitution.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BotSubstitution;
    })();

    GameEvent.TooManyRobots = (function() {

        /**
         * Properties of a TooManyRobots.
         * @memberof GameEvent
         * @interface ITooManyRobots
         * @property {Team} byTeam TooManyRobots byTeam
         * @property {number|null} [numRobotsAllowed] TooManyRobots numRobotsAllowed
         * @property {number|null} [numRobotsOnField] TooManyRobots numRobotsOnField
         * @property {IVector2|null} [ballLocation] TooManyRobots ballLocation
         */

        /**
         * Constructs a new TooManyRobots.
         * @memberof GameEvent
         * @classdesc Represents a TooManyRobots.
         * @implements ITooManyRobots
         * @constructor
         * @param {GameEvent.ITooManyRobots=} [properties] Properties to set
         */
        function TooManyRobots(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TooManyRobots byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.TooManyRobots
         * @instance
         */
        TooManyRobots.prototype.byTeam = 0;

        /**
         * TooManyRobots numRobotsAllowed.
         * @member {number} numRobotsAllowed
         * @memberof GameEvent.TooManyRobots
         * @instance
         */
        TooManyRobots.prototype.numRobotsAllowed = 0;

        /**
         * TooManyRobots numRobotsOnField.
         * @member {number} numRobotsOnField
         * @memberof GameEvent.TooManyRobots
         * @instance
         */
        TooManyRobots.prototype.numRobotsOnField = 0;

        /**
         * TooManyRobots ballLocation.
         * @member {IVector2|null|undefined} ballLocation
         * @memberof GameEvent.TooManyRobots
         * @instance
         */
        TooManyRobots.prototype.ballLocation = null;

        /**
         * Creates a new TooManyRobots instance using the specified properties.
         * @function create
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {GameEvent.ITooManyRobots=} [properties] Properties to set
         * @returns {GameEvent.TooManyRobots} TooManyRobots instance
         */
        TooManyRobots.create = function create(properties) {
            return new TooManyRobots(properties);
        };

        /**
         * Encodes the specified TooManyRobots message. Does not implicitly {@link GameEvent.TooManyRobots.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {GameEvent.ITooManyRobots} message TooManyRobots message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TooManyRobots.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.numRobotsAllowed != null && message.hasOwnProperty("numRobotsAllowed"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.numRobotsAllowed);
            if (message.numRobotsOnField != null && message.hasOwnProperty("numRobotsOnField"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.numRobotsOnField);
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                $root.Vector2.encode(message.ballLocation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TooManyRobots message, length delimited. Does not implicitly {@link GameEvent.TooManyRobots.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {GameEvent.ITooManyRobots} message TooManyRobots message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TooManyRobots.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TooManyRobots message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.TooManyRobots} TooManyRobots
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TooManyRobots.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.TooManyRobots();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.numRobotsAllowed = reader.int32();
                    break;
                case 3:
                    message.numRobotsOnField = reader.int32();
                    break;
                case 4:
                    message.ballLocation = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a TooManyRobots message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.TooManyRobots} TooManyRobots
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TooManyRobots.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TooManyRobots message.
         * @function verify
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TooManyRobots.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.numRobotsAllowed != null && message.hasOwnProperty("numRobotsAllowed"))
                if (!$util.isInteger(message.numRobotsAllowed))
                    return "numRobotsAllowed: integer expected";
            if (message.numRobotsOnField != null && message.hasOwnProperty("numRobotsOnField"))
                if (!$util.isInteger(message.numRobotsOnField))
                    return "numRobotsOnField: integer expected";
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation")) {
                let error = $root.Vector2.verify(message.ballLocation);
                if (error)
                    return "ballLocation." + error;
            }
            return null;
        };

        /**
         * Creates a TooManyRobots message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.TooManyRobots} TooManyRobots
         */
        TooManyRobots.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.TooManyRobots)
                return object;
            let message = new $root.GameEvent.TooManyRobots();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.numRobotsAllowed != null)
                message.numRobotsAllowed = object.numRobotsAllowed | 0;
            if (object.numRobotsOnField != null)
                message.numRobotsOnField = object.numRobotsOnField | 0;
            if (object.ballLocation != null) {
                if (typeof object.ballLocation !== "object")
                    throw TypeError(".GameEvent.TooManyRobots.ballLocation: object expected");
                message.ballLocation = $root.Vector2.fromObject(object.ballLocation);
            }
            return message;
        };

        /**
         * Creates a plain object from a TooManyRobots message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.TooManyRobots
         * @static
         * @param {GameEvent.TooManyRobots} message TooManyRobots
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TooManyRobots.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.numRobotsAllowed = 0;
                object.numRobotsOnField = 0;
                object.ballLocation = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.numRobotsAllowed != null && message.hasOwnProperty("numRobotsAllowed"))
                object.numRobotsAllowed = message.numRobotsAllowed;
            if (message.numRobotsOnField != null && message.hasOwnProperty("numRobotsOnField"))
                object.numRobotsOnField = message.numRobotsOnField;
            if (message.ballLocation != null && message.hasOwnProperty("ballLocation"))
                object.ballLocation = $root.Vector2.toObject(message.ballLocation, options);
            return object;
        };

        /**
         * Converts this TooManyRobots to JSON.
         * @function toJSON
         * @memberof GameEvent.TooManyRobots
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TooManyRobots.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TooManyRobots;
    })();

    GameEvent.BoundaryCrossing = (function() {

        /**
         * Properties of a BoundaryCrossing.
         * @memberof GameEvent
         * @interface IBoundaryCrossing
         * @property {Team} byTeam BoundaryCrossing byTeam
         * @property {IVector2|null} [location] BoundaryCrossing location
         */

        /**
         * Constructs a new BoundaryCrossing.
         * @memberof GameEvent
         * @classdesc Represents a BoundaryCrossing.
         * @implements IBoundaryCrossing
         * @constructor
         * @param {GameEvent.IBoundaryCrossing=} [properties] Properties to set
         */
        function BoundaryCrossing(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BoundaryCrossing byTeam.
         * @member {Team} byTeam
         * @memberof GameEvent.BoundaryCrossing
         * @instance
         */
        BoundaryCrossing.prototype.byTeam = 0;

        /**
         * BoundaryCrossing location.
         * @member {IVector2|null|undefined} location
         * @memberof GameEvent.BoundaryCrossing
         * @instance
         */
        BoundaryCrossing.prototype.location = null;

        /**
         * Creates a new BoundaryCrossing instance using the specified properties.
         * @function create
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {GameEvent.IBoundaryCrossing=} [properties] Properties to set
         * @returns {GameEvent.BoundaryCrossing} BoundaryCrossing instance
         */
        BoundaryCrossing.create = function create(properties) {
            return new BoundaryCrossing(properties);
        };

        /**
         * Encodes the specified BoundaryCrossing message. Does not implicitly {@link GameEvent.BoundaryCrossing.verify|verify} messages.
         * @function encode
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {GameEvent.IBoundaryCrossing} message BoundaryCrossing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoundaryCrossing.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.byTeam);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.Vector2.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BoundaryCrossing message, length delimited. Does not implicitly {@link GameEvent.BoundaryCrossing.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {GameEvent.IBoundaryCrossing} message BoundaryCrossing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoundaryCrossing.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoundaryCrossing message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent.BoundaryCrossing} BoundaryCrossing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoundaryCrossing.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent.BoundaryCrossing();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.byTeam = reader.int32();
                    break;
                case 2:
                    message.location = $root.Vector2.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("byTeam"))
                throw $util.ProtocolError("missing required 'byTeam'", { instance: message });
            return message;
        };

        /**
         * Decodes a BoundaryCrossing message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent.BoundaryCrossing} BoundaryCrossing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoundaryCrossing.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoundaryCrossing message.
         * @function verify
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoundaryCrossing.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.byTeam) {
            default:
                return "byTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
            if (message.location != null && message.hasOwnProperty("location")) {
                let error = $root.Vector2.verify(message.location);
                if (error)
                    return "location." + error;
            }
            return null;
        };

        /**
         * Creates a BoundaryCrossing message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent.BoundaryCrossing} BoundaryCrossing
         */
        BoundaryCrossing.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent.BoundaryCrossing)
                return object;
            let message = new $root.GameEvent.BoundaryCrossing();
            switch (object.byTeam) {
            case "UNKNOWN":
            case 0:
                message.byTeam = 0;
                break;
            case "YELLOW":
            case 1:
                message.byTeam = 1;
                break;
            case "BLUE":
            case 2:
                message.byTeam = 2;
                break;
            }
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".GameEvent.BoundaryCrossing.location: object expected");
                message.location = $root.Vector2.fromObject(object.location);
            }
            return message;
        };

        /**
         * Creates a plain object from a BoundaryCrossing message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent.BoundaryCrossing
         * @static
         * @param {GameEvent.BoundaryCrossing} message BoundaryCrossing
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoundaryCrossing.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.byTeam = options.enums === String ? "UNKNOWN" : 0;
                object.location = null;
            }
            if (message.byTeam != null && message.hasOwnProperty("byTeam"))
                object.byTeam = options.enums === String ? $root.Team[message.byTeam] : message.byTeam;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.Vector2.toObject(message.location, options);
            return object;
        };

        /**
         * Converts this BoundaryCrossing to JSON.
         * @function toJSON
         * @memberof GameEvent.BoundaryCrossing
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoundaryCrossing.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BoundaryCrossing;
    })();

    /**
     * Type enum.
     * @name GameEvent.Type
     * @enum {string}
     * @property {number} UNKNOWN_GAME_EVENT_TYPE=0 UNKNOWN_GAME_EVENT_TYPE value
     * @property {number} BALL_LEFT_FIELD_TOUCH_LINE=6 BALL_LEFT_FIELD_TOUCH_LINE value
     * @property {number} BALL_LEFT_FIELD_GOAL_LINE=7 BALL_LEFT_FIELD_GOAL_LINE value
     * @property {number} AIMLESS_KICK=11 AIMLESS_KICK value
     * @property {number} POSSIBLE_GOAL=39 POSSIBLE_GOAL value
     * @property {number} NO_PROGRESS_IN_GAME=2 NO_PROGRESS_IN_GAME value
     * @property {number} ATTACKER_DOUBLE_TOUCHED_BALL=14 ATTACKER_DOUBLE_TOUCHED_BALL value
     * @property {number} ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA=19 ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA value
     * @property {number} DEFENDER_IN_DEFENSE_AREA=31 DEFENDER_IN_DEFENSE_AREA value
     * @property {number} BOUNDARY_CROSSING=41 BOUNDARY_CROSSING value
     * @property {number} KEEPER_HELD_BALL=13 KEEPER_HELD_BALL value
     * @property {number} BOT_DRIBBLED_BALL_TOO_FAR=17 BOT_DRIBBLED_BALL_TOO_FAR value
     * @property {number} ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA=15 ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA value
     * @property {number} BOT_KICKED_BALL_TOO_FAST=18 BOT_KICKED_BALL_TOO_FAST value
     * @property {number} BOT_CRASH_UNIQUE=22 BOT_CRASH_UNIQUE value
     * @property {number} BOT_CRASH_DRAWN=21 BOT_CRASH_DRAWN value
     * @property {number} DEFENDER_TOO_CLOSE_TO_KICK_POINT=29 DEFENDER_TOO_CLOSE_TO_KICK_POINT value
     * @property {number} BOT_TOO_FAST_IN_STOP=28 BOT_TOO_FAST_IN_STOP value
     * @property {number} BOT_INTERFERED_PLACEMENT=20 BOT_INTERFERED_PLACEMENT value
     * @property {number} GOAL=8 GOAL value
     * @property {number} INVALID_GOAL=42 INVALID_GOAL value
     * @property {number} PLACEMENT_FAILED=3 PLACEMENT_FAILED value
     * @property {number} PLACEMENT_SUCCEEDED=5 PLACEMENT_SUCCEEDED value
     * @property {number} MULTIPLE_CARDS=32 MULTIPLE_CARDS value
     * @property {number} MULTIPLE_FOULS=34 MULTIPLE_FOULS value
     * @property {number} BOT_SUBSTITUTION=37 BOT_SUBSTITUTION value
     * @property {number} TOO_MANY_ROBOTS=38 TOO_MANY_ROBOTS value
     * @property {number} UNSPORTING_BEHAVIOR_MINOR=35 UNSPORTING_BEHAVIOR_MINOR value
     * @property {number} UNSPORTING_BEHAVIOR_MAJOR=36 UNSPORTING_BEHAVIOR_MAJOR value
     * @property {number} BOT_PUSHED_BOT=24 BOT_PUSHED_BOT value
     * @property {number} BOT_HELD_BALL_DELIBERATELY=26 BOT_HELD_BALL_DELIBERATELY value
     * @property {number} BOT_TIPPED_OVER=27 BOT_TIPPED_OVER value
     * @property {number} PREPARED=1 PREPARED value
     * @property {number} INDIRECT_GOAL=9 INDIRECT_GOAL value
     * @property {number} CHIPPED_GOAL=10 CHIPPED_GOAL value
     * @property {number} KICK_TIMEOUT=12 KICK_TIMEOUT value
     * @property {number} ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA=16 ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA value
     * @property {number} ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED=40 ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED value
     * @property {number} BOT_CRASH_UNIQUE_SKIPPED=23 BOT_CRASH_UNIQUE_SKIPPED value
     * @property {number} BOT_PUSHED_BOT_SKIPPED=25 BOT_PUSHED_BOT_SKIPPED value
     * @property {number} DEFENDER_IN_DEFENSE_AREA_PARTIALLY=30 DEFENDER_IN_DEFENSE_AREA_PARTIALLY value
     * @property {number} MULTIPLE_PLACEMENT_FAILURES=33 MULTIPLE_PLACEMENT_FAILURES value
     */
    GameEvent.Type = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_GAME_EVENT_TYPE"] = 0;
        values[valuesById[6] = "BALL_LEFT_FIELD_TOUCH_LINE"] = 6;
        values[valuesById[7] = "BALL_LEFT_FIELD_GOAL_LINE"] = 7;
        values[valuesById[11] = "AIMLESS_KICK"] = 11;
        values[valuesById[39] = "POSSIBLE_GOAL"] = 39;
        values[valuesById[2] = "NO_PROGRESS_IN_GAME"] = 2;
        values[valuesById[14] = "ATTACKER_DOUBLE_TOUCHED_BALL"] = 14;
        values[valuesById[19] = "ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA"] = 19;
        values[valuesById[31] = "DEFENDER_IN_DEFENSE_AREA"] = 31;
        values[valuesById[41] = "BOUNDARY_CROSSING"] = 41;
        values[valuesById[13] = "KEEPER_HELD_BALL"] = 13;
        values[valuesById[17] = "BOT_DRIBBLED_BALL_TOO_FAR"] = 17;
        values[valuesById[15] = "ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA"] = 15;
        values[valuesById[18] = "BOT_KICKED_BALL_TOO_FAST"] = 18;
        values[valuesById[22] = "BOT_CRASH_UNIQUE"] = 22;
        values[valuesById[21] = "BOT_CRASH_DRAWN"] = 21;
        values[valuesById[29] = "DEFENDER_TOO_CLOSE_TO_KICK_POINT"] = 29;
        values[valuesById[28] = "BOT_TOO_FAST_IN_STOP"] = 28;
        values[valuesById[20] = "BOT_INTERFERED_PLACEMENT"] = 20;
        values[valuesById[8] = "GOAL"] = 8;
        values[valuesById[42] = "INVALID_GOAL"] = 42;
        values[valuesById[3] = "PLACEMENT_FAILED"] = 3;
        values[valuesById[5] = "PLACEMENT_SUCCEEDED"] = 5;
        values[valuesById[32] = "MULTIPLE_CARDS"] = 32;
        values[valuesById[34] = "MULTIPLE_FOULS"] = 34;
        values[valuesById[37] = "BOT_SUBSTITUTION"] = 37;
        values[valuesById[38] = "TOO_MANY_ROBOTS"] = 38;
        values[valuesById[35] = "UNSPORTING_BEHAVIOR_MINOR"] = 35;
        values[valuesById[36] = "UNSPORTING_BEHAVIOR_MAJOR"] = 36;
        values[valuesById[24] = "BOT_PUSHED_BOT"] = 24;
        values[valuesById[26] = "BOT_HELD_BALL_DELIBERATELY"] = 26;
        values[valuesById[27] = "BOT_TIPPED_OVER"] = 27;
        values[valuesById[1] = "PREPARED"] = 1;
        values[valuesById[9] = "INDIRECT_GOAL"] = 9;
        values[valuesById[10] = "CHIPPED_GOAL"] = 10;
        values[valuesById[12] = "KICK_TIMEOUT"] = 12;
        values[valuesById[16] = "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA"] = 16;
        values[valuesById[40] = "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED"] = 40;
        values[valuesById[23] = "BOT_CRASH_UNIQUE_SKIPPED"] = 23;
        values[valuesById[25] = "BOT_PUSHED_BOT_SKIPPED"] = 25;
        values[valuesById[30] = "DEFENDER_IN_DEFENSE_AREA_PARTIALLY"] = 30;
        values[valuesById[33] = "MULTIPLE_PLACEMENT_FAILURES"] = 33;
        return values;
    })();

    return GameEvent;
})();

export const Referee = $root.Referee = (() => {

    /**
     * Properties of a Referee.
     * @exports IReferee
     * @interface IReferee
     * @property {number|Long} packetTimestamp Referee packetTimestamp
     * @property {Referee.Stage} stage Referee stage
     * @property {number|null} [stageTimeLeft] Referee stageTimeLeft
     * @property {Referee.Command} command Referee command
     * @property {number} commandCounter Referee commandCounter
     * @property {number|Long} commandTimestamp Referee commandTimestamp
     * @property {Referee.ITeamInfo} yellow Referee yellow
     * @property {Referee.ITeamInfo} blue Referee blue
     * @property {Referee.IPoint|null} [designatedPosition] Referee designatedPosition
     * @property {boolean|null} [blueTeamOnPositiveHalf] Referee blueTeamOnPositiveHalf
     * @property {Referee.Command|null} [nextCommand] Referee nextCommand
     * @property {Array.<IGameEvent>|null} [gameEvents] Referee gameEvents
     * @property {Array.<IProposedGameEvent>|null} [proposedGameEvents] Referee proposedGameEvents
     * @property {number|null} [currentActionTimeRemaining] Referee currentActionTimeRemaining
     */

    /**
     * Constructs a new Referee.
     * @exports Referee
     * @classdesc Represents a Referee.
     * @implements IReferee
     * @constructor
     * @param {IReferee=} [properties] Properties to set
     */
    function Referee(properties) {
        this.gameEvents = [];
        this.proposedGameEvents = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Referee packetTimestamp.
     * @member {number|Long} packetTimestamp
     * @memberof Referee
     * @instance
     */
    Referee.prototype.packetTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Referee stage.
     * @member {Referee.Stage} stage
     * @memberof Referee
     * @instance
     */
    Referee.prototype.stage = 0;

    /**
     * Referee stageTimeLeft.
     * @member {number} stageTimeLeft
     * @memberof Referee
     * @instance
     */
    Referee.prototype.stageTimeLeft = 0;

    /**
     * Referee command.
     * @member {Referee.Command} command
     * @memberof Referee
     * @instance
     */
    Referee.prototype.command = 0;

    /**
     * Referee commandCounter.
     * @member {number} commandCounter
     * @memberof Referee
     * @instance
     */
    Referee.prototype.commandCounter = 0;

    /**
     * Referee commandTimestamp.
     * @member {number|Long} commandTimestamp
     * @memberof Referee
     * @instance
     */
    Referee.prototype.commandTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Referee yellow.
     * @member {Referee.ITeamInfo} yellow
     * @memberof Referee
     * @instance
     */
    Referee.prototype.yellow = null;

    /**
     * Referee blue.
     * @member {Referee.ITeamInfo} blue
     * @memberof Referee
     * @instance
     */
    Referee.prototype.blue = null;

    /**
     * Referee designatedPosition.
     * @member {Referee.IPoint|null|undefined} designatedPosition
     * @memberof Referee
     * @instance
     */
    Referee.prototype.designatedPosition = null;

    /**
     * Referee blueTeamOnPositiveHalf.
     * @member {boolean} blueTeamOnPositiveHalf
     * @memberof Referee
     * @instance
     */
    Referee.prototype.blueTeamOnPositiveHalf = false;

    /**
     * Referee nextCommand.
     * @member {Referee.Command} nextCommand
     * @memberof Referee
     * @instance
     */
    Referee.prototype.nextCommand = 0;

    /**
     * Referee gameEvents.
     * @member {Array.<IGameEvent>} gameEvents
     * @memberof Referee
     * @instance
     */
    Referee.prototype.gameEvents = $util.emptyArray;

    /**
     * Referee proposedGameEvents.
     * @member {Array.<IProposedGameEvent>} proposedGameEvents
     * @memberof Referee
     * @instance
     */
    Referee.prototype.proposedGameEvents = $util.emptyArray;

    /**
     * Referee currentActionTimeRemaining.
     * @member {number} currentActionTimeRemaining
     * @memberof Referee
     * @instance
     */
    Referee.prototype.currentActionTimeRemaining = 0;

    /**
     * Creates a new Referee instance using the specified properties.
     * @function create
     * @memberof Referee
     * @static
     * @param {IReferee=} [properties] Properties to set
     * @returns {Referee} Referee instance
     */
    Referee.create = function create(properties) {
        return new Referee(properties);
    };

    /**
     * Encodes the specified Referee message. Does not implicitly {@link Referee.verify|verify} messages.
     * @function encode
     * @memberof Referee
     * @static
     * @param {IReferee} message Referee message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Referee.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.packetTimestamp);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.stage);
        if (message.stageTimeLeft != null && message.hasOwnProperty("stageTimeLeft"))
            writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.stageTimeLeft);
        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.command);
        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.commandCounter);
        writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.commandTimestamp);
        $root.Referee.TeamInfo.encode(message.yellow, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        $root.Referee.TeamInfo.encode(message.blue, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.designatedPosition != null && message.hasOwnProperty("designatedPosition"))
            $root.Referee.Point.encode(message.designatedPosition, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.blueTeamOnPositiveHalf != null && message.hasOwnProperty("blueTeamOnPositiveHalf"))
            writer.uint32(/* id 10, wireType 0 =*/80).bool(message.blueTeamOnPositiveHalf);
        if (message.nextCommand != null && message.hasOwnProperty("nextCommand"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.nextCommand);
        if (message.gameEvents != null && message.gameEvents.length)
            for (let i = 0; i < message.gameEvents.length; ++i)
                $root.GameEvent.encode(message.gameEvents[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.proposedGameEvents != null && message.proposedGameEvents.length)
            for (let i = 0; i < message.proposedGameEvents.length; ++i)
                $root.ProposedGameEvent.encode(message.proposedGameEvents[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
        if (message.currentActionTimeRemaining != null && message.hasOwnProperty("currentActionTimeRemaining"))
            writer.uint32(/* id 15, wireType 0 =*/120).int32(message.currentActionTimeRemaining);
        return writer;
    };

    /**
     * Encodes the specified Referee message, length delimited. Does not implicitly {@link Referee.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Referee
     * @static
     * @param {IReferee} message Referee message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Referee.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Referee message from the specified reader or buffer.
     * @function decode
     * @memberof Referee
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Referee} Referee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Referee.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Referee();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.packetTimestamp = reader.uint64();
                break;
            case 2:
                message.stage = reader.int32();
                break;
            case 3:
                message.stageTimeLeft = reader.sint32();
                break;
            case 4:
                message.command = reader.int32();
                break;
            case 5:
                message.commandCounter = reader.uint32();
                break;
            case 6:
                message.commandTimestamp = reader.uint64();
                break;
            case 7:
                message.yellow = $root.Referee.TeamInfo.decode(reader, reader.uint32());
                break;
            case 8:
                message.blue = $root.Referee.TeamInfo.decode(reader, reader.uint32());
                break;
            case 9:
                message.designatedPosition = $root.Referee.Point.decode(reader, reader.uint32());
                break;
            case 10:
                message.blueTeamOnPositiveHalf = reader.bool();
                break;
            case 12:
                message.nextCommand = reader.int32();
                break;
            case 13:
                if (!(message.gameEvents && message.gameEvents.length))
                    message.gameEvents = [];
                message.gameEvents.push($root.GameEvent.decode(reader, reader.uint32()));
                break;
            case 14:
                if (!(message.proposedGameEvents && message.proposedGameEvents.length))
                    message.proposedGameEvents = [];
                message.proposedGameEvents.push($root.ProposedGameEvent.decode(reader, reader.uint32()));
                break;
            case 15:
                message.currentActionTimeRemaining = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("packetTimestamp"))
            throw $util.ProtocolError("missing required 'packetTimestamp'", { instance: message });
        if (!message.hasOwnProperty("stage"))
            throw $util.ProtocolError("missing required 'stage'", { instance: message });
        if (!message.hasOwnProperty("command"))
            throw $util.ProtocolError("missing required 'command'", { instance: message });
        if (!message.hasOwnProperty("commandCounter"))
            throw $util.ProtocolError("missing required 'commandCounter'", { instance: message });
        if (!message.hasOwnProperty("commandTimestamp"))
            throw $util.ProtocolError("missing required 'commandTimestamp'", { instance: message });
        if (!message.hasOwnProperty("yellow"))
            throw $util.ProtocolError("missing required 'yellow'", { instance: message });
        if (!message.hasOwnProperty("blue"))
            throw $util.ProtocolError("missing required 'blue'", { instance: message });
        return message;
    };

    /**
     * Decodes a Referee message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Referee
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Referee} Referee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Referee.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Referee message.
     * @function verify
     * @memberof Referee
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Referee.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.packetTimestamp) && !(message.packetTimestamp && $util.isInteger(message.packetTimestamp.low) && $util.isInteger(message.packetTimestamp.high)))
            return "packetTimestamp: integer|Long expected";
        switch (message.stage) {
        default:
            return "stage: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
            break;
        }
        if (message.stageTimeLeft != null && message.hasOwnProperty("stageTimeLeft"))
            if (!$util.isInteger(message.stageTimeLeft))
                return "stageTimeLeft: integer expected";
        switch (message.command) {
        default:
            return "command: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            break;
        }
        if (!$util.isInteger(message.commandCounter))
            return "commandCounter: integer expected";
        if (!$util.isInteger(message.commandTimestamp) && !(message.commandTimestamp && $util.isInteger(message.commandTimestamp.low) && $util.isInteger(message.commandTimestamp.high)))
            return "commandTimestamp: integer|Long expected";
        {
            let error = $root.Referee.TeamInfo.verify(message.yellow);
            if (error)
                return "yellow." + error;
        }
        {
            let error = $root.Referee.TeamInfo.verify(message.blue);
            if (error)
                return "blue." + error;
        }
        if (message.designatedPosition != null && message.hasOwnProperty("designatedPosition")) {
            let error = $root.Referee.Point.verify(message.designatedPosition);
            if (error)
                return "designatedPosition." + error;
        }
        if (message.blueTeamOnPositiveHalf != null && message.hasOwnProperty("blueTeamOnPositiveHalf"))
            if (typeof message.blueTeamOnPositiveHalf !== "boolean")
                return "blueTeamOnPositiveHalf: boolean expected";
        if (message.nextCommand != null && message.hasOwnProperty("nextCommand"))
            switch (message.nextCommand) {
            default:
                return "nextCommand: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                break;
            }
        if (message.gameEvents != null && message.hasOwnProperty("gameEvents")) {
            if (!Array.isArray(message.gameEvents))
                return "gameEvents: array expected";
            for (let i = 0; i < message.gameEvents.length; ++i) {
                let error = $root.GameEvent.verify(message.gameEvents[i]);
                if (error)
                    return "gameEvents." + error;
            }
        }
        if (message.proposedGameEvents != null && message.hasOwnProperty("proposedGameEvents")) {
            if (!Array.isArray(message.proposedGameEvents))
                return "proposedGameEvents: array expected";
            for (let i = 0; i < message.proposedGameEvents.length; ++i) {
                let error = $root.ProposedGameEvent.verify(message.proposedGameEvents[i]);
                if (error)
                    return "proposedGameEvents." + error;
            }
        }
        if (message.currentActionTimeRemaining != null && message.hasOwnProperty("currentActionTimeRemaining"))
            if (!$util.isInteger(message.currentActionTimeRemaining))
                return "currentActionTimeRemaining: integer expected";
        return null;
    };

    /**
     * Creates a Referee message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Referee
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Referee} Referee
     */
    Referee.fromObject = function fromObject(object) {
        if (object instanceof $root.Referee)
            return object;
        let message = new $root.Referee();
        if (object.packetTimestamp != null)
            if ($util.Long)
                (message.packetTimestamp = $util.Long.fromValue(object.packetTimestamp)).unsigned = true;
            else if (typeof object.packetTimestamp === "string")
                message.packetTimestamp = parseInt(object.packetTimestamp, 10);
            else if (typeof object.packetTimestamp === "number")
                message.packetTimestamp = object.packetTimestamp;
            else if (typeof object.packetTimestamp === "object")
                message.packetTimestamp = new $util.LongBits(object.packetTimestamp.low >>> 0, object.packetTimestamp.high >>> 0).toNumber(true);
        switch (object.stage) {
        case "NORMAL_FIRST_HALF_PRE":
        case 0:
            message.stage = 0;
            break;
        case "NORMAL_FIRST_HALF":
        case 1:
            message.stage = 1;
            break;
        case "NORMAL_HALF_TIME":
        case 2:
            message.stage = 2;
            break;
        case "NORMAL_SECOND_HALF_PRE":
        case 3:
            message.stage = 3;
            break;
        case "NORMAL_SECOND_HALF":
        case 4:
            message.stage = 4;
            break;
        case "EXTRA_TIME_BREAK":
        case 5:
            message.stage = 5;
            break;
        case "EXTRA_FIRST_HALF_PRE":
        case 6:
            message.stage = 6;
            break;
        case "EXTRA_FIRST_HALF":
        case 7:
            message.stage = 7;
            break;
        case "EXTRA_HALF_TIME":
        case 8:
            message.stage = 8;
            break;
        case "EXTRA_SECOND_HALF_PRE":
        case 9:
            message.stage = 9;
            break;
        case "EXTRA_SECOND_HALF":
        case 10:
            message.stage = 10;
            break;
        case "PENALTY_SHOOTOUT_BREAK":
        case 11:
            message.stage = 11;
            break;
        case "PENALTY_SHOOTOUT":
        case 12:
            message.stage = 12;
            break;
        case "POST_GAME":
        case 13:
            message.stage = 13;
            break;
        }
        if (object.stageTimeLeft != null)
            message.stageTimeLeft = object.stageTimeLeft | 0;
        switch (object.command) {
        case "HALT":
        case 0:
            message.command = 0;
            break;
        case "STOP":
        case 1:
            message.command = 1;
            break;
        case "NORMAL_START":
        case 2:
            message.command = 2;
            break;
        case "FORCE_START":
        case 3:
            message.command = 3;
            break;
        case "PREPARE_KICKOFF_YELLOW":
        case 4:
            message.command = 4;
            break;
        case "PREPARE_KICKOFF_BLUE":
        case 5:
            message.command = 5;
            break;
        case "PREPARE_PENALTY_YELLOW":
        case 6:
            message.command = 6;
            break;
        case "PREPARE_PENALTY_BLUE":
        case 7:
            message.command = 7;
            break;
        case "DIRECT_FREE_YELLOW":
        case 8:
            message.command = 8;
            break;
        case "DIRECT_FREE_BLUE":
        case 9:
            message.command = 9;
            break;
        case "INDIRECT_FREE_YELLOW":
        case 10:
            message.command = 10;
            break;
        case "INDIRECT_FREE_BLUE":
        case 11:
            message.command = 11;
            break;
        case "TIMEOUT_YELLOW":
        case 12:
            message.command = 12;
            break;
        case "TIMEOUT_BLUE":
        case 13:
            message.command = 13;
            break;
        case "GOAL_YELLOW":
        case 14:
            message.command = 14;
            break;
        case "GOAL_BLUE":
        case 15:
            message.command = 15;
            break;
        case "BALL_PLACEMENT_YELLOW":
        case 16:
            message.command = 16;
            break;
        case "BALL_PLACEMENT_BLUE":
        case 17:
            message.command = 17;
            break;
        }
        if (object.commandCounter != null)
            message.commandCounter = object.commandCounter >>> 0;
        if (object.commandTimestamp != null)
            if ($util.Long)
                (message.commandTimestamp = $util.Long.fromValue(object.commandTimestamp)).unsigned = true;
            else if (typeof object.commandTimestamp === "string")
                message.commandTimestamp = parseInt(object.commandTimestamp, 10);
            else if (typeof object.commandTimestamp === "number")
                message.commandTimestamp = object.commandTimestamp;
            else if (typeof object.commandTimestamp === "object")
                message.commandTimestamp = new $util.LongBits(object.commandTimestamp.low >>> 0, object.commandTimestamp.high >>> 0).toNumber(true);
        if (object.yellow != null) {
            if (typeof object.yellow !== "object")
                throw TypeError(".Referee.yellow: object expected");
            message.yellow = $root.Referee.TeamInfo.fromObject(object.yellow);
        }
        if (object.blue != null) {
            if (typeof object.blue !== "object")
                throw TypeError(".Referee.blue: object expected");
            message.blue = $root.Referee.TeamInfo.fromObject(object.blue);
        }
        if (object.designatedPosition != null) {
            if (typeof object.designatedPosition !== "object")
                throw TypeError(".Referee.designatedPosition: object expected");
            message.designatedPosition = $root.Referee.Point.fromObject(object.designatedPosition);
        }
        if (object.blueTeamOnPositiveHalf != null)
            message.blueTeamOnPositiveHalf = Boolean(object.blueTeamOnPositiveHalf);
        switch (object.nextCommand) {
        case "HALT":
        case 0:
            message.nextCommand = 0;
            break;
        case "STOP":
        case 1:
            message.nextCommand = 1;
            break;
        case "NORMAL_START":
        case 2:
            message.nextCommand = 2;
            break;
        case "FORCE_START":
        case 3:
            message.nextCommand = 3;
            break;
        case "PREPARE_KICKOFF_YELLOW":
        case 4:
            message.nextCommand = 4;
            break;
        case "PREPARE_KICKOFF_BLUE":
        case 5:
            message.nextCommand = 5;
            break;
        case "PREPARE_PENALTY_YELLOW":
        case 6:
            message.nextCommand = 6;
            break;
        case "PREPARE_PENALTY_BLUE":
        case 7:
            message.nextCommand = 7;
            break;
        case "DIRECT_FREE_YELLOW":
        case 8:
            message.nextCommand = 8;
            break;
        case "DIRECT_FREE_BLUE":
        case 9:
            message.nextCommand = 9;
            break;
        case "INDIRECT_FREE_YELLOW":
        case 10:
            message.nextCommand = 10;
            break;
        case "INDIRECT_FREE_BLUE":
        case 11:
            message.nextCommand = 11;
            break;
        case "TIMEOUT_YELLOW":
        case 12:
            message.nextCommand = 12;
            break;
        case "TIMEOUT_BLUE":
        case 13:
            message.nextCommand = 13;
            break;
        case "GOAL_YELLOW":
        case 14:
            message.nextCommand = 14;
            break;
        case "GOAL_BLUE":
        case 15:
            message.nextCommand = 15;
            break;
        case "BALL_PLACEMENT_YELLOW":
        case 16:
            message.nextCommand = 16;
            break;
        case "BALL_PLACEMENT_BLUE":
        case 17:
            message.nextCommand = 17;
            break;
        }
        if (object.gameEvents) {
            if (!Array.isArray(object.gameEvents))
                throw TypeError(".Referee.gameEvents: array expected");
            message.gameEvents = [];
            for (let i = 0; i < object.gameEvents.length; ++i) {
                if (typeof object.gameEvents[i] !== "object")
                    throw TypeError(".Referee.gameEvents: object expected");
                message.gameEvents[i] = $root.GameEvent.fromObject(object.gameEvents[i]);
            }
        }
        if (object.proposedGameEvents) {
            if (!Array.isArray(object.proposedGameEvents))
                throw TypeError(".Referee.proposedGameEvents: array expected");
            message.proposedGameEvents = [];
            for (let i = 0; i < object.proposedGameEvents.length; ++i) {
                if (typeof object.proposedGameEvents[i] !== "object")
                    throw TypeError(".Referee.proposedGameEvents: object expected");
                message.proposedGameEvents[i] = $root.ProposedGameEvent.fromObject(object.proposedGameEvents[i]);
            }
        }
        if (object.currentActionTimeRemaining != null)
            message.currentActionTimeRemaining = object.currentActionTimeRemaining | 0;
        return message;
    };

    /**
     * Creates a plain object from a Referee message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Referee
     * @static
     * @param {Referee} message Referee
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Referee.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.gameEvents = [];
            object.proposedGameEvents = [];
        }
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.packetTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.packetTimestamp = options.longs === String ? "0" : 0;
            object.stage = options.enums === String ? "NORMAL_FIRST_HALF_PRE" : 0;
            object.stageTimeLeft = 0;
            object.command = options.enums === String ? "HALT" : 0;
            object.commandCounter = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.commandTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.commandTimestamp = options.longs === String ? "0" : 0;
            object.yellow = null;
            object.blue = null;
            object.designatedPosition = null;
            object.blueTeamOnPositiveHalf = false;
            object.nextCommand = options.enums === String ? "HALT" : 0;
            object.currentActionTimeRemaining = 0;
        }
        if (message.packetTimestamp != null && message.hasOwnProperty("packetTimestamp"))
            if (typeof message.packetTimestamp === "number")
                object.packetTimestamp = options.longs === String ? String(message.packetTimestamp) : message.packetTimestamp;
            else
                object.packetTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.packetTimestamp) : options.longs === Number ? new $util.LongBits(message.packetTimestamp.low >>> 0, message.packetTimestamp.high >>> 0).toNumber(true) : message.packetTimestamp;
        if (message.stage != null && message.hasOwnProperty("stage"))
            object.stage = options.enums === String ? $root.Referee.Stage[message.stage] : message.stage;
        if (message.stageTimeLeft != null && message.hasOwnProperty("stageTimeLeft"))
            object.stageTimeLeft = message.stageTimeLeft;
        if (message.command != null && message.hasOwnProperty("command"))
            object.command = options.enums === String ? $root.Referee.Command[message.command] : message.command;
        if (message.commandCounter != null && message.hasOwnProperty("commandCounter"))
            object.commandCounter = message.commandCounter;
        if (message.commandTimestamp != null && message.hasOwnProperty("commandTimestamp"))
            if (typeof message.commandTimestamp === "number")
                object.commandTimestamp = options.longs === String ? String(message.commandTimestamp) : message.commandTimestamp;
            else
                object.commandTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.commandTimestamp) : options.longs === Number ? new $util.LongBits(message.commandTimestamp.low >>> 0, message.commandTimestamp.high >>> 0).toNumber(true) : message.commandTimestamp;
        if (message.yellow != null && message.hasOwnProperty("yellow"))
            object.yellow = $root.Referee.TeamInfo.toObject(message.yellow, options);
        if (message.blue != null && message.hasOwnProperty("blue"))
            object.blue = $root.Referee.TeamInfo.toObject(message.blue, options);
        if (message.designatedPosition != null && message.hasOwnProperty("designatedPosition"))
            object.designatedPosition = $root.Referee.Point.toObject(message.designatedPosition, options);
        if (message.blueTeamOnPositiveHalf != null && message.hasOwnProperty("blueTeamOnPositiveHalf"))
            object.blueTeamOnPositiveHalf = message.blueTeamOnPositiveHalf;
        if (message.nextCommand != null && message.hasOwnProperty("nextCommand"))
            object.nextCommand = options.enums === String ? $root.Referee.Command[message.nextCommand] : message.nextCommand;
        if (message.gameEvents && message.gameEvents.length) {
            object.gameEvents = [];
            for (let j = 0; j < message.gameEvents.length; ++j)
                object.gameEvents[j] = $root.GameEvent.toObject(message.gameEvents[j], options);
        }
        if (message.proposedGameEvents && message.proposedGameEvents.length) {
            object.proposedGameEvents = [];
            for (let j = 0; j < message.proposedGameEvents.length; ++j)
                object.proposedGameEvents[j] = $root.ProposedGameEvent.toObject(message.proposedGameEvents[j], options);
        }
        if (message.currentActionTimeRemaining != null && message.hasOwnProperty("currentActionTimeRemaining"))
            object.currentActionTimeRemaining = message.currentActionTimeRemaining;
        return object;
    };

    /**
     * Converts this Referee to JSON.
     * @function toJSON
     * @memberof Referee
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Referee.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Stage enum.
     * @name Referee.Stage
     * @enum {string}
     * @property {number} NORMAL_FIRST_HALF_PRE=0 NORMAL_FIRST_HALF_PRE value
     * @property {number} NORMAL_FIRST_HALF=1 NORMAL_FIRST_HALF value
     * @property {number} NORMAL_HALF_TIME=2 NORMAL_HALF_TIME value
     * @property {number} NORMAL_SECOND_HALF_PRE=3 NORMAL_SECOND_HALF_PRE value
     * @property {number} NORMAL_SECOND_HALF=4 NORMAL_SECOND_HALF value
     * @property {number} EXTRA_TIME_BREAK=5 EXTRA_TIME_BREAK value
     * @property {number} EXTRA_FIRST_HALF_PRE=6 EXTRA_FIRST_HALF_PRE value
     * @property {number} EXTRA_FIRST_HALF=7 EXTRA_FIRST_HALF value
     * @property {number} EXTRA_HALF_TIME=8 EXTRA_HALF_TIME value
     * @property {number} EXTRA_SECOND_HALF_PRE=9 EXTRA_SECOND_HALF_PRE value
     * @property {number} EXTRA_SECOND_HALF=10 EXTRA_SECOND_HALF value
     * @property {number} PENALTY_SHOOTOUT_BREAK=11 PENALTY_SHOOTOUT_BREAK value
     * @property {number} PENALTY_SHOOTOUT=12 PENALTY_SHOOTOUT value
     * @property {number} POST_GAME=13 POST_GAME value
     */
    Referee.Stage = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NORMAL_FIRST_HALF_PRE"] = 0;
        values[valuesById[1] = "NORMAL_FIRST_HALF"] = 1;
        values[valuesById[2] = "NORMAL_HALF_TIME"] = 2;
        values[valuesById[3] = "NORMAL_SECOND_HALF_PRE"] = 3;
        values[valuesById[4] = "NORMAL_SECOND_HALF"] = 4;
        values[valuesById[5] = "EXTRA_TIME_BREAK"] = 5;
        values[valuesById[6] = "EXTRA_FIRST_HALF_PRE"] = 6;
        values[valuesById[7] = "EXTRA_FIRST_HALF"] = 7;
        values[valuesById[8] = "EXTRA_HALF_TIME"] = 8;
        values[valuesById[9] = "EXTRA_SECOND_HALF_PRE"] = 9;
        values[valuesById[10] = "EXTRA_SECOND_HALF"] = 10;
        values[valuesById[11] = "PENALTY_SHOOTOUT_BREAK"] = 11;
        values[valuesById[12] = "PENALTY_SHOOTOUT"] = 12;
        values[valuesById[13] = "POST_GAME"] = 13;
        return values;
    })();

    /**
     * Command enum.
     * @name Referee.Command
     * @enum {string}
     * @property {number} HALT=0 HALT value
     * @property {number} STOP=1 STOP value
     * @property {number} NORMAL_START=2 NORMAL_START value
     * @property {number} FORCE_START=3 FORCE_START value
     * @property {number} PREPARE_KICKOFF_YELLOW=4 PREPARE_KICKOFF_YELLOW value
     * @property {number} PREPARE_KICKOFF_BLUE=5 PREPARE_KICKOFF_BLUE value
     * @property {number} PREPARE_PENALTY_YELLOW=6 PREPARE_PENALTY_YELLOW value
     * @property {number} PREPARE_PENALTY_BLUE=7 PREPARE_PENALTY_BLUE value
     * @property {number} DIRECT_FREE_YELLOW=8 DIRECT_FREE_YELLOW value
     * @property {number} DIRECT_FREE_BLUE=9 DIRECT_FREE_BLUE value
     * @property {number} INDIRECT_FREE_YELLOW=10 INDIRECT_FREE_YELLOW value
     * @property {number} INDIRECT_FREE_BLUE=11 INDIRECT_FREE_BLUE value
     * @property {number} TIMEOUT_YELLOW=12 TIMEOUT_YELLOW value
     * @property {number} TIMEOUT_BLUE=13 TIMEOUT_BLUE value
     * @property {number} GOAL_YELLOW=14 GOAL_YELLOW value
     * @property {number} GOAL_BLUE=15 GOAL_BLUE value
     * @property {number} BALL_PLACEMENT_YELLOW=16 BALL_PLACEMENT_YELLOW value
     * @property {number} BALL_PLACEMENT_BLUE=17 BALL_PLACEMENT_BLUE value
     */
    Referee.Command = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "HALT"] = 0;
        values[valuesById[1] = "STOP"] = 1;
        values[valuesById[2] = "NORMAL_START"] = 2;
        values[valuesById[3] = "FORCE_START"] = 3;
        values[valuesById[4] = "PREPARE_KICKOFF_YELLOW"] = 4;
        values[valuesById[5] = "PREPARE_KICKOFF_BLUE"] = 5;
        values[valuesById[6] = "PREPARE_PENALTY_YELLOW"] = 6;
        values[valuesById[7] = "PREPARE_PENALTY_BLUE"] = 7;
        values[valuesById[8] = "DIRECT_FREE_YELLOW"] = 8;
        values[valuesById[9] = "DIRECT_FREE_BLUE"] = 9;
        values[valuesById[10] = "INDIRECT_FREE_YELLOW"] = 10;
        values[valuesById[11] = "INDIRECT_FREE_BLUE"] = 11;
        values[valuesById[12] = "TIMEOUT_YELLOW"] = 12;
        values[valuesById[13] = "TIMEOUT_BLUE"] = 13;
        values[valuesById[14] = "GOAL_YELLOW"] = 14;
        values[valuesById[15] = "GOAL_BLUE"] = 15;
        values[valuesById[16] = "BALL_PLACEMENT_YELLOW"] = 16;
        values[valuesById[17] = "BALL_PLACEMENT_BLUE"] = 17;
        return values;
    })();

    Referee.TeamInfo = (function() {

        /**
         * Properties of a TeamInfo.
         * @memberof Referee
         * @interface ITeamInfo
         * @property {string} name TeamInfo name
         * @property {number} score TeamInfo score
         * @property {number} redCards TeamInfo redCards
         * @property {Array.<number>|null} [yellowCardTimes] TeamInfo yellowCardTimes
         * @property {number} yellowCards TeamInfo yellowCards
         * @property {number} timeouts TeamInfo timeouts
         * @property {number} timeoutTime TeamInfo timeoutTime
         * @property {number} goalkeeper TeamInfo goalkeeper
         * @property {number|null} [foulCounter] TeamInfo foulCounter
         * @property {number|null} [ballPlacementFailures] TeamInfo ballPlacementFailures
         * @property {boolean|null} [canPlaceBall] TeamInfo canPlaceBall
         * @property {number|null} [maxAllowedBots] TeamInfo maxAllowedBots
         * @property {boolean|null} [botSubstitutionIntent] TeamInfo botSubstitutionIntent
         * @property {boolean|null} [ballPlacementFailuresReached] TeamInfo ballPlacementFailuresReached
         */

        /**
         * Constructs a new TeamInfo.
         * @memberof Referee
         * @classdesc Represents a TeamInfo.
         * @implements ITeamInfo
         * @constructor
         * @param {Referee.ITeamInfo=} [properties] Properties to set
         */
        function TeamInfo(properties) {
            this.yellowCardTimes = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TeamInfo name.
         * @member {string} name
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.name = "";

        /**
         * TeamInfo score.
         * @member {number} score
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.score = 0;

        /**
         * TeamInfo redCards.
         * @member {number} redCards
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.redCards = 0;

        /**
         * TeamInfo yellowCardTimes.
         * @member {Array.<number>} yellowCardTimes
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.yellowCardTimes = $util.emptyArray;

        /**
         * TeamInfo yellowCards.
         * @member {number} yellowCards
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.yellowCards = 0;

        /**
         * TeamInfo timeouts.
         * @member {number} timeouts
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.timeouts = 0;

        /**
         * TeamInfo timeoutTime.
         * @member {number} timeoutTime
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.timeoutTime = 0;

        /**
         * TeamInfo goalkeeper.
         * @member {number} goalkeeper
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.goalkeeper = 0;

        /**
         * TeamInfo foulCounter.
         * @member {number} foulCounter
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.foulCounter = 0;

        /**
         * TeamInfo ballPlacementFailures.
         * @member {number} ballPlacementFailures
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.ballPlacementFailures = 0;

        /**
         * TeamInfo canPlaceBall.
         * @member {boolean} canPlaceBall
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.canPlaceBall = false;

        /**
         * TeamInfo maxAllowedBots.
         * @member {number} maxAllowedBots
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.maxAllowedBots = 0;

        /**
         * TeamInfo botSubstitutionIntent.
         * @member {boolean} botSubstitutionIntent
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.botSubstitutionIntent = false;

        /**
         * TeamInfo ballPlacementFailuresReached.
         * @member {boolean} ballPlacementFailuresReached
         * @memberof Referee.TeamInfo
         * @instance
         */
        TeamInfo.prototype.ballPlacementFailuresReached = false;

        /**
         * Creates a new TeamInfo instance using the specified properties.
         * @function create
         * @memberof Referee.TeamInfo
         * @static
         * @param {Referee.ITeamInfo=} [properties] Properties to set
         * @returns {Referee.TeamInfo} TeamInfo instance
         */
        TeamInfo.create = function create(properties) {
            return new TeamInfo(properties);
        };

        /**
         * Encodes the specified TeamInfo message. Does not implicitly {@link Referee.TeamInfo.verify|verify} messages.
         * @function encode
         * @memberof Referee.TeamInfo
         * @static
         * @param {Referee.ITeamInfo} message TeamInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TeamInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.score);
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.redCards);
            if (message.yellowCardTimes != null && message.yellowCardTimes.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.yellowCardTimes.length; ++i)
                    writer.uint32(message.yellowCardTimes[i]);
                writer.ldelim();
            }
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.yellowCards);
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.timeouts);
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.timeoutTime);
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.goalkeeper);
            if (message.foulCounter != null && message.hasOwnProperty("foulCounter"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.foulCounter);
            if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.ballPlacementFailures);
            if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.canPlaceBall);
            if (message.maxAllowedBots != null && message.hasOwnProperty("maxAllowedBots"))
                writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.maxAllowedBots);
            if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
                writer.uint32(/* id 14, wireType 0 =*/112).bool(message.botSubstitutionIntent);
            if (message.ballPlacementFailuresReached != null && message.hasOwnProperty("ballPlacementFailuresReached"))
                writer.uint32(/* id 15, wireType 0 =*/120).bool(message.ballPlacementFailuresReached);
            return writer;
        };

        /**
         * Encodes the specified TeamInfo message, length delimited. Does not implicitly {@link Referee.TeamInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Referee.TeamInfo
         * @static
         * @param {Referee.ITeamInfo} message TeamInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TeamInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TeamInfo message from the specified reader or buffer.
         * @function decode
         * @memberof Referee.TeamInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Referee.TeamInfo} TeamInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TeamInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Referee.TeamInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.score = reader.uint32();
                    break;
                case 3:
                    message.redCards = reader.uint32();
                    break;
                case 4:
                    if (!(message.yellowCardTimes && message.yellowCardTimes.length))
                        message.yellowCardTimes = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.yellowCardTimes.push(reader.uint32());
                    } else
                        message.yellowCardTimes.push(reader.uint32());
                    break;
                case 5:
                    message.yellowCards = reader.uint32();
                    break;
                case 6:
                    message.timeouts = reader.uint32();
                    break;
                case 7:
                    message.timeoutTime = reader.uint32();
                    break;
                case 8:
                    message.goalkeeper = reader.uint32();
                    break;
                case 9:
                    message.foulCounter = reader.uint32();
                    break;
                case 10:
                    message.ballPlacementFailures = reader.uint32();
                    break;
                case 12:
                    message.canPlaceBall = reader.bool();
                    break;
                case 13:
                    message.maxAllowedBots = reader.uint32();
                    break;
                case 14:
                    message.botSubstitutionIntent = reader.bool();
                    break;
                case 15:
                    message.ballPlacementFailuresReached = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("score"))
                throw $util.ProtocolError("missing required 'score'", { instance: message });
            if (!message.hasOwnProperty("redCards"))
                throw $util.ProtocolError("missing required 'redCards'", { instance: message });
            if (!message.hasOwnProperty("yellowCards"))
                throw $util.ProtocolError("missing required 'yellowCards'", { instance: message });
            if (!message.hasOwnProperty("timeouts"))
                throw $util.ProtocolError("missing required 'timeouts'", { instance: message });
            if (!message.hasOwnProperty("timeoutTime"))
                throw $util.ProtocolError("missing required 'timeoutTime'", { instance: message });
            if (!message.hasOwnProperty("goalkeeper"))
                throw $util.ProtocolError("missing required 'goalkeeper'", { instance: message });
            return message;
        };

        /**
         * Decodes a TeamInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Referee.TeamInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Referee.TeamInfo} TeamInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TeamInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TeamInfo message.
         * @function verify
         * @memberof Referee.TeamInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TeamInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isInteger(message.score))
                return "score: integer expected";
            if (!$util.isInteger(message.redCards))
                return "redCards: integer expected";
            if (message.yellowCardTimes != null && message.hasOwnProperty("yellowCardTimes")) {
                if (!Array.isArray(message.yellowCardTimes))
                    return "yellowCardTimes: array expected";
                for (let i = 0; i < message.yellowCardTimes.length; ++i)
                    if (!$util.isInteger(message.yellowCardTimes[i]))
                        return "yellowCardTimes: integer[] expected";
            }
            if (!$util.isInteger(message.yellowCards))
                return "yellowCards: integer expected";
            if (!$util.isInteger(message.timeouts))
                return "timeouts: integer expected";
            if (!$util.isInteger(message.timeoutTime))
                return "timeoutTime: integer expected";
            if (!$util.isInteger(message.goalkeeper))
                return "goalkeeper: integer expected";
            if (message.foulCounter != null && message.hasOwnProperty("foulCounter"))
                if (!$util.isInteger(message.foulCounter))
                    return "foulCounter: integer expected";
            if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
                if (!$util.isInteger(message.ballPlacementFailures))
                    return "ballPlacementFailures: integer expected";
            if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
                if (typeof message.canPlaceBall !== "boolean")
                    return "canPlaceBall: boolean expected";
            if (message.maxAllowedBots != null && message.hasOwnProperty("maxAllowedBots"))
                if (!$util.isInteger(message.maxAllowedBots))
                    return "maxAllowedBots: integer expected";
            if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
                if (typeof message.botSubstitutionIntent !== "boolean")
                    return "botSubstitutionIntent: boolean expected";
            if (message.ballPlacementFailuresReached != null && message.hasOwnProperty("ballPlacementFailuresReached"))
                if (typeof message.ballPlacementFailuresReached !== "boolean")
                    return "ballPlacementFailuresReached: boolean expected";
            return null;
        };

        /**
         * Creates a TeamInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Referee.TeamInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Referee.TeamInfo} TeamInfo
         */
        TeamInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Referee.TeamInfo)
                return object;
            let message = new $root.Referee.TeamInfo();
            if (object.name != null)
                message.name = String(object.name);
            if (object.score != null)
                message.score = object.score >>> 0;
            if (object.redCards != null)
                message.redCards = object.redCards >>> 0;
            if (object.yellowCardTimes) {
                if (!Array.isArray(object.yellowCardTimes))
                    throw TypeError(".Referee.TeamInfo.yellowCardTimes: array expected");
                message.yellowCardTimes = [];
                for (let i = 0; i < object.yellowCardTimes.length; ++i)
                    message.yellowCardTimes[i] = object.yellowCardTimes[i] >>> 0;
            }
            if (object.yellowCards != null)
                message.yellowCards = object.yellowCards >>> 0;
            if (object.timeouts != null)
                message.timeouts = object.timeouts >>> 0;
            if (object.timeoutTime != null)
                message.timeoutTime = object.timeoutTime >>> 0;
            if (object.goalkeeper != null)
                message.goalkeeper = object.goalkeeper >>> 0;
            if (object.foulCounter != null)
                message.foulCounter = object.foulCounter >>> 0;
            if (object.ballPlacementFailures != null)
                message.ballPlacementFailures = object.ballPlacementFailures >>> 0;
            if (object.canPlaceBall != null)
                message.canPlaceBall = Boolean(object.canPlaceBall);
            if (object.maxAllowedBots != null)
                message.maxAllowedBots = object.maxAllowedBots >>> 0;
            if (object.botSubstitutionIntent != null)
                message.botSubstitutionIntent = Boolean(object.botSubstitutionIntent);
            if (object.ballPlacementFailuresReached != null)
                message.ballPlacementFailuresReached = Boolean(object.ballPlacementFailuresReached);
            return message;
        };

        /**
         * Creates a plain object from a TeamInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Referee.TeamInfo
         * @static
         * @param {Referee.TeamInfo} message TeamInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TeamInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.yellowCardTimes = [];
            if (options.defaults) {
                object.name = "";
                object.score = 0;
                object.redCards = 0;
                object.yellowCards = 0;
                object.timeouts = 0;
                object.timeoutTime = 0;
                object.goalkeeper = 0;
                object.foulCounter = 0;
                object.ballPlacementFailures = 0;
                object.canPlaceBall = false;
                object.maxAllowedBots = 0;
                object.botSubstitutionIntent = false;
                object.ballPlacementFailuresReached = false;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            if (message.redCards != null && message.hasOwnProperty("redCards"))
                object.redCards = message.redCards;
            if (message.yellowCardTimes && message.yellowCardTimes.length) {
                object.yellowCardTimes = [];
                for (let j = 0; j < message.yellowCardTimes.length; ++j)
                    object.yellowCardTimes[j] = message.yellowCardTimes[j];
            }
            if (message.yellowCards != null && message.hasOwnProperty("yellowCards"))
                object.yellowCards = message.yellowCards;
            if (message.timeouts != null && message.hasOwnProperty("timeouts"))
                object.timeouts = message.timeouts;
            if (message.timeoutTime != null && message.hasOwnProperty("timeoutTime"))
                object.timeoutTime = message.timeoutTime;
            if (message.goalkeeper != null && message.hasOwnProperty("goalkeeper"))
                object.goalkeeper = message.goalkeeper;
            if (message.foulCounter != null && message.hasOwnProperty("foulCounter"))
                object.foulCounter = message.foulCounter;
            if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
                object.ballPlacementFailures = message.ballPlacementFailures;
            if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
                object.canPlaceBall = message.canPlaceBall;
            if (message.maxAllowedBots != null && message.hasOwnProperty("maxAllowedBots"))
                object.maxAllowedBots = message.maxAllowedBots;
            if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
                object.botSubstitutionIntent = message.botSubstitutionIntent;
            if (message.ballPlacementFailuresReached != null && message.hasOwnProperty("ballPlacementFailuresReached"))
                object.ballPlacementFailuresReached = message.ballPlacementFailuresReached;
            return object;
        };

        /**
         * Converts this TeamInfo to JSON.
         * @function toJSON
         * @memberof Referee.TeamInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TeamInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TeamInfo;
    })();

    Referee.Point = (function() {

        /**
         * Properties of a Point.
         * @memberof Referee
         * @interface IPoint
         * @property {number} x Point x
         * @property {number} y Point y
         */

        /**
         * Constructs a new Point.
         * @memberof Referee
         * @classdesc Represents a Point.
         * @implements IPoint
         * @constructor
         * @param {Referee.IPoint=} [properties] Properties to set
         */
        function Point(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Point x.
         * @member {number} x
         * @memberof Referee.Point
         * @instance
         */
        Point.prototype.x = 0;

        /**
         * Point y.
         * @member {number} y
         * @memberof Referee.Point
         * @instance
         */
        Point.prototype.y = 0;

        /**
         * Creates a new Point instance using the specified properties.
         * @function create
         * @memberof Referee.Point
         * @static
         * @param {Referee.IPoint=} [properties] Properties to set
         * @returns {Referee.Point} Point instance
         */
        Point.create = function create(properties) {
            return new Point(properties);
        };

        /**
         * Encodes the specified Point message. Does not implicitly {@link Referee.Point.verify|verify} messages.
         * @function encode
         * @memberof Referee.Point
         * @static
         * @param {Referee.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            return writer;
        };

        /**
         * Encodes the specified Point message, length delimited. Does not implicitly {@link Referee.Point.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Referee.Point
         * @static
         * @param {Referee.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Point message from the specified reader or buffer.
         * @function decode
         * @memberof Referee.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Referee.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Referee.Point();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.float();
                    break;
                case 2:
                    message.y = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("x"))
                throw $util.ProtocolError("missing required 'x'", { instance: message });
            if (!message.hasOwnProperty("y"))
                throw $util.ProtocolError("missing required 'y'", { instance: message });
            return message;
        };

        /**
         * Decodes a Point message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Referee.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Referee.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Point message.
         * @function verify
         * @memberof Referee.Point
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Point.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (typeof message.x !== "number")
                return "x: number expected";
            if (typeof message.y !== "number")
                return "y: number expected";
            return null;
        };

        /**
         * Creates a Point message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Referee.Point
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Referee.Point} Point
         */
        Point.fromObject = function fromObject(object) {
            if (object instanceof $root.Referee.Point)
                return object;
            let message = new $root.Referee.Point();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            return message;
        };

        /**
         * Creates a plain object from a Point message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Referee.Point
         * @static
         * @param {Referee.Point} message Point
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Point.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            return object;
        };

        /**
         * Converts this Point to JSON.
         * @function toJSON
         * @memberof Referee.Point
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Point.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Point;
    })();

    return Referee;
})();

export const ProposedGameEvent = $root.ProposedGameEvent = (() => {

    /**
     * Properties of a ProposedGameEvent.
     * @exports IProposedGameEvent
     * @interface IProposedGameEvent
     * @property {number|Long} validUntil ProposedGameEvent validUntil
     * @property {string} proposerId ProposedGameEvent proposerId
     * @property {IGameEvent} gameEvent ProposedGameEvent gameEvent
     */

    /**
     * Constructs a new ProposedGameEvent.
     * @exports ProposedGameEvent
     * @classdesc Represents a ProposedGameEvent.
     * @implements IProposedGameEvent
     * @constructor
     * @param {IProposedGameEvent=} [properties] Properties to set
     */
    function ProposedGameEvent(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ProposedGameEvent validUntil.
     * @member {number|Long} validUntil
     * @memberof ProposedGameEvent
     * @instance
     */
    ProposedGameEvent.prototype.validUntil = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * ProposedGameEvent proposerId.
     * @member {string} proposerId
     * @memberof ProposedGameEvent
     * @instance
     */
    ProposedGameEvent.prototype.proposerId = "";

    /**
     * ProposedGameEvent gameEvent.
     * @member {IGameEvent} gameEvent
     * @memberof ProposedGameEvent
     * @instance
     */
    ProposedGameEvent.prototype.gameEvent = null;

    /**
     * Creates a new ProposedGameEvent instance using the specified properties.
     * @function create
     * @memberof ProposedGameEvent
     * @static
     * @param {IProposedGameEvent=} [properties] Properties to set
     * @returns {ProposedGameEvent} ProposedGameEvent instance
     */
    ProposedGameEvent.create = function create(properties) {
        return new ProposedGameEvent(properties);
    };

    /**
     * Encodes the specified ProposedGameEvent message. Does not implicitly {@link ProposedGameEvent.verify|verify} messages.
     * @function encode
     * @memberof ProposedGameEvent
     * @static
     * @param {IProposedGameEvent} message ProposedGameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProposedGameEvent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.validUntil);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.proposerId);
        $root.GameEvent.encode(message.gameEvent, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ProposedGameEvent message, length delimited. Does not implicitly {@link ProposedGameEvent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ProposedGameEvent
     * @static
     * @param {IProposedGameEvent} message ProposedGameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProposedGameEvent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ProposedGameEvent message from the specified reader or buffer.
     * @function decode
     * @memberof ProposedGameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ProposedGameEvent} ProposedGameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProposedGameEvent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ProposedGameEvent();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.validUntil = reader.uint64();
                break;
            case 2:
                message.proposerId = reader.string();
                break;
            case 3:
                message.gameEvent = $root.GameEvent.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("validUntil"))
            throw $util.ProtocolError("missing required 'validUntil'", { instance: message });
        if (!message.hasOwnProperty("proposerId"))
            throw $util.ProtocolError("missing required 'proposerId'", { instance: message });
        if (!message.hasOwnProperty("gameEvent"))
            throw $util.ProtocolError("missing required 'gameEvent'", { instance: message });
        return message;
    };

    /**
     * Decodes a ProposedGameEvent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ProposedGameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ProposedGameEvent} ProposedGameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProposedGameEvent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ProposedGameEvent message.
     * @function verify
     * @memberof ProposedGameEvent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ProposedGameEvent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.validUntil) && !(message.validUntil && $util.isInteger(message.validUntil.low) && $util.isInteger(message.validUntil.high)))
            return "validUntil: integer|Long expected";
        if (!$util.isString(message.proposerId))
            return "proposerId: string expected";
        {
            let error = $root.GameEvent.verify(message.gameEvent);
            if (error)
                return "gameEvent." + error;
        }
        return null;
    };

    /**
     * Creates a ProposedGameEvent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ProposedGameEvent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ProposedGameEvent} ProposedGameEvent
     */
    ProposedGameEvent.fromObject = function fromObject(object) {
        if (object instanceof $root.ProposedGameEvent)
            return object;
        let message = new $root.ProposedGameEvent();
        if (object.validUntil != null)
            if ($util.Long)
                (message.validUntil = $util.Long.fromValue(object.validUntil)).unsigned = true;
            else if (typeof object.validUntil === "string")
                message.validUntil = parseInt(object.validUntil, 10);
            else if (typeof object.validUntil === "number")
                message.validUntil = object.validUntil;
            else if (typeof object.validUntil === "object")
                message.validUntil = new $util.LongBits(object.validUntil.low >>> 0, object.validUntil.high >>> 0).toNumber(true);
        if (object.proposerId != null)
            message.proposerId = String(object.proposerId);
        if (object.gameEvent != null) {
            if (typeof object.gameEvent !== "object")
                throw TypeError(".ProposedGameEvent.gameEvent: object expected");
            message.gameEvent = $root.GameEvent.fromObject(object.gameEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from a ProposedGameEvent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ProposedGameEvent
     * @static
     * @param {ProposedGameEvent} message ProposedGameEvent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ProposedGameEvent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.validUntil = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.validUntil = options.longs === String ? "0" : 0;
            object.proposerId = "";
            object.gameEvent = null;
        }
        if (message.validUntil != null && message.hasOwnProperty("validUntil"))
            if (typeof message.validUntil === "number")
                object.validUntil = options.longs === String ? String(message.validUntil) : message.validUntil;
            else
                object.validUntil = options.longs === String ? $util.Long.prototype.toString.call(message.validUntil) : options.longs === Number ? new $util.LongBits(message.validUntil.low >>> 0, message.validUntil.high >>> 0).toNumber(true) : message.validUntil;
        if (message.proposerId != null && message.hasOwnProperty("proposerId"))
            object.proposerId = message.proposerId;
        if (message.gameEvent != null && message.hasOwnProperty("gameEvent"))
            object.gameEvent = $root.GameEvent.toObject(message.gameEvent, options);
        return object;
    };

    /**
     * Converts this ProposedGameEvent to JSON.
     * @function toJSON
     * @memberof ProposedGameEvent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ProposedGameEvent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ProposedGameEvent;
})();

export const StateChange = $root.StateChange = (() => {

    /**
     * Properties of a StateChange.
     * @exports IStateChange
     * @interface IStateChange
     * @property {number|null} [id] StateChange id
     * @property {IState|null} [statePre] StateChange statePre
     * @property {IState|null} [state] StateChange state
     * @property {IChange|null} [change] StateChange change
     * @property {google.protobuf.ITimestamp|null} [timestamp] StateChange timestamp
     */

    /**
     * Constructs a new StateChange.
     * @exports StateChange
     * @classdesc Represents a StateChange.
     * @implements IStateChange
     * @constructor
     * @param {IStateChange=} [properties] Properties to set
     */
    function StateChange(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * StateChange id.
     * @member {number} id
     * @memberof StateChange
     * @instance
     */
    StateChange.prototype.id = 0;

    /**
     * StateChange statePre.
     * @member {IState|null|undefined} statePre
     * @memberof StateChange
     * @instance
     */
    StateChange.prototype.statePre = null;

    /**
     * StateChange state.
     * @member {IState|null|undefined} state
     * @memberof StateChange
     * @instance
     */
    StateChange.prototype.state = null;

    /**
     * StateChange change.
     * @member {IChange|null|undefined} change
     * @memberof StateChange
     * @instance
     */
    StateChange.prototype.change = null;

    /**
     * StateChange timestamp.
     * @member {google.protobuf.ITimestamp|null|undefined} timestamp
     * @memberof StateChange
     * @instance
     */
    StateChange.prototype.timestamp = null;

    /**
     * Creates a new StateChange instance using the specified properties.
     * @function create
     * @memberof StateChange
     * @static
     * @param {IStateChange=} [properties] Properties to set
     * @returns {StateChange} StateChange instance
     */
    StateChange.create = function create(properties) {
        return new StateChange(properties);
    };

    /**
     * Encodes the specified StateChange message. Does not implicitly {@link StateChange.verify|verify} messages.
     * @function encode
     * @memberof StateChange
     * @static
     * @param {IStateChange} message StateChange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StateChange.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.statePre != null && message.hasOwnProperty("statePre"))
            $root.State.encode(message.statePre, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.state != null && message.hasOwnProperty("state"))
            $root.State.encode(message.state, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.change != null && message.hasOwnProperty("change"))
            $root.Change.encode(message.change, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified StateChange message, length delimited. Does not implicitly {@link StateChange.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StateChange
     * @static
     * @param {IStateChange} message StateChange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StateChange.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StateChange message from the specified reader or buffer.
     * @function decode
     * @memberof StateChange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StateChange} StateChange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StateChange.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.StateChange();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                message.statePre = $root.State.decode(reader, reader.uint32());
                break;
            case 3:
                message.state = $root.State.decode(reader, reader.uint32());
                break;
            case 4:
                message.change = $root.Change.decode(reader, reader.uint32());
                break;
            case 5:
                message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StateChange message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StateChange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StateChange} StateChange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StateChange.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StateChange message.
     * @function verify
     * @memberof StateChange
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StateChange.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.statePre != null && message.hasOwnProperty("statePre")) {
            let error = $root.State.verify(message.statePre);
            if (error)
                return "statePre." + error;
        }
        if (message.state != null && message.hasOwnProperty("state")) {
            let error = $root.State.verify(message.state);
            if (error)
                return "state." + error;
        }
        if (message.change != null && message.hasOwnProperty("change")) {
            let error = $root.Change.verify(message.change);
            if (error)
                return "change." + error;
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
            let error = $root.google.protobuf.Timestamp.verify(message.timestamp);
            if (error)
                return "timestamp." + error;
        }
        return null;
    };

    /**
     * Creates a StateChange message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof StateChange
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {StateChange} StateChange
     */
    StateChange.fromObject = function fromObject(object) {
        if (object instanceof $root.StateChange)
            return object;
        let message = new $root.StateChange();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.statePre != null) {
            if (typeof object.statePre !== "object")
                throw TypeError(".StateChange.statePre: object expected");
            message.statePre = $root.State.fromObject(object.statePre);
        }
        if (object.state != null) {
            if (typeof object.state !== "object")
                throw TypeError(".StateChange.state: object expected");
            message.state = $root.State.fromObject(object.state);
        }
        if (object.change != null) {
            if (typeof object.change !== "object")
                throw TypeError(".StateChange.change: object expected");
            message.change = $root.Change.fromObject(object.change);
        }
        if (object.timestamp != null) {
            if (typeof object.timestamp !== "object")
                throw TypeError(".StateChange.timestamp: object expected");
            message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
        }
        return message;
    };

    /**
     * Creates a plain object from a StateChange message. Also converts values to other types if specified.
     * @function toObject
     * @memberof StateChange
     * @static
     * @param {StateChange} message StateChange
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StateChange.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.statePre = null;
            object.state = null;
            object.change = null;
            object.timestamp = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.statePre != null && message.hasOwnProperty("statePre"))
            object.statePre = $root.State.toObject(message.statePre, options);
        if (message.state != null && message.hasOwnProperty("state"))
            object.state = $root.State.toObject(message.state, options);
        if (message.change != null && message.hasOwnProperty("change"))
            object.change = $root.Change.toObject(message.change, options);
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
        return object;
    };

    /**
     * Converts this StateChange to JSON.
     * @function toJSON
     * @memberof StateChange
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StateChange.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return StateChange;
})();

export const Change = $root.Change = (() => {

    /**
     * Properties of a Change.
     * @exports IChange
     * @interface IChange
     * @property {string|null} [origin] Change origin
     * @property {boolean|null} [revertible] Change revertible
     * @property {INewCommand|null} [newCommand] Change newCommand
     * @property {IChangeStage|null} [changeStage] Change changeStage
     * @property {ISetBallPlacementPos|null} [setBallPlacementPos] Change setBallPlacementPos
     * @property {IAddYellowCard|null} [addYellowCard] Change addYellowCard
     * @property {IAddRedCard|null} [addRedCard] Change addRedCard
     * @property {IYellowCardOver|null} [yellowCardOver] Change yellowCardOver
     * @property {IAddGameEvent|null} [addGameEvent] Change addGameEvent
     * @property {IAddProposedGameEvent|null} [addProposedGameEvent] Change addProposedGameEvent
     * @property {IStartBallPlacement|null} [startBallPlacement] Change startBallPlacement
     * @property {IContinue|null} ["continue"] Change continue
     * @property {IUpdateConfig|null} [updateConfig] Change updateConfig
     * @property {IUpdateTeamState|null} [updateTeamState] Change updateTeamState
     * @property {ISwitchColors|null} [switchColors] Change switchColors
     * @property {IRevert|null} [revert] Change revert
     */

    /**
     * Constructs a new Change.
     * @exports Change
     * @classdesc Represents a Change.
     * @implements IChange
     * @constructor
     * @param {IChange=} [properties] Properties to set
     */
    function Change(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Change origin.
     * @member {string} origin
     * @memberof Change
     * @instance
     */
    Change.prototype.origin = "";

    /**
     * Change revertible.
     * @member {boolean} revertible
     * @memberof Change
     * @instance
     */
    Change.prototype.revertible = false;

    /**
     * Change newCommand.
     * @member {INewCommand|null|undefined} newCommand
     * @memberof Change
     * @instance
     */
    Change.prototype.newCommand = null;

    /**
     * Change changeStage.
     * @member {IChangeStage|null|undefined} changeStage
     * @memberof Change
     * @instance
     */
    Change.prototype.changeStage = null;

    /**
     * Change setBallPlacementPos.
     * @member {ISetBallPlacementPos|null|undefined} setBallPlacementPos
     * @memberof Change
     * @instance
     */
    Change.prototype.setBallPlacementPos = null;

    /**
     * Change addYellowCard.
     * @member {IAddYellowCard|null|undefined} addYellowCard
     * @memberof Change
     * @instance
     */
    Change.prototype.addYellowCard = null;

    /**
     * Change addRedCard.
     * @member {IAddRedCard|null|undefined} addRedCard
     * @memberof Change
     * @instance
     */
    Change.prototype.addRedCard = null;

    /**
     * Change yellowCardOver.
     * @member {IYellowCardOver|null|undefined} yellowCardOver
     * @memberof Change
     * @instance
     */
    Change.prototype.yellowCardOver = null;

    /**
     * Change addGameEvent.
     * @member {IAddGameEvent|null|undefined} addGameEvent
     * @memberof Change
     * @instance
     */
    Change.prototype.addGameEvent = null;

    /**
     * Change addProposedGameEvent.
     * @member {IAddProposedGameEvent|null|undefined} addProposedGameEvent
     * @memberof Change
     * @instance
     */
    Change.prototype.addProposedGameEvent = null;

    /**
     * Change startBallPlacement.
     * @member {IStartBallPlacement|null|undefined} startBallPlacement
     * @memberof Change
     * @instance
     */
    Change.prototype.startBallPlacement = null;

    /**
     * Change continue.
     * @member {IContinue|null|undefined} continue
     * @memberof Change
     * @instance
     */
    Change.prototype["continue"] = null;

    /**
     * Change updateConfig.
     * @member {IUpdateConfig|null|undefined} updateConfig
     * @memberof Change
     * @instance
     */
    Change.prototype.updateConfig = null;

    /**
     * Change updateTeamState.
     * @member {IUpdateTeamState|null|undefined} updateTeamState
     * @memberof Change
     * @instance
     */
    Change.prototype.updateTeamState = null;

    /**
     * Change switchColors.
     * @member {ISwitchColors|null|undefined} switchColors
     * @memberof Change
     * @instance
     */
    Change.prototype.switchColors = null;

    /**
     * Change revert.
     * @member {IRevert|null|undefined} revert
     * @memberof Change
     * @instance
     */
    Change.prototype.revert = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Change change.
     * @member {"newCommand"|"changeStage"|"setBallPlacementPos"|"addYellowCard"|"addRedCard"|"yellowCardOver"|"addGameEvent"|"addProposedGameEvent"|"startBallPlacement"|"continue"|"updateConfig"|"updateTeamState"|"switchColors"|"revert"|undefined} change
     * @memberof Change
     * @instance
     */
    Object.defineProperty(Change.prototype, "change", {
        get: $util.oneOfGetter($oneOfFields = ["newCommand", "changeStage", "setBallPlacementPos", "addYellowCard", "addRedCard", "yellowCardOver", "addGameEvent", "addProposedGameEvent", "startBallPlacement", "continue", "updateConfig", "updateTeamState", "switchColors", "revert"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Change instance using the specified properties.
     * @function create
     * @memberof Change
     * @static
     * @param {IChange=} [properties] Properties to set
     * @returns {Change} Change instance
     */
    Change.create = function create(properties) {
        return new Change(properties);
    };

    /**
     * Encodes the specified Change message. Does not implicitly {@link Change.verify|verify} messages.
     * @function encode
     * @memberof Change
     * @static
     * @param {IChange} message Change message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Change.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.origin != null && message.hasOwnProperty("origin"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.origin);
        if (message.newCommand != null && message.hasOwnProperty("newCommand"))
            $root.NewCommand.encode(message.newCommand, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.changeStage != null && message.hasOwnProperty("changeStage"))
            $root.ChangeStage.encode(message.changeStage, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.setBallPlacementPos != null && message.hasOwnProperty("setBallPlacementPos"))
            $root.SetBallPlacementPos.encode(message.setBallPlacementPos, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.addYellowCard != null && message.hasOwnProperty("addYellowCard"))
            $root.AddYellowCard.encode(message.addYellowCard, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.addRedCard != null && message.hasOwnProperty("addRedCard"))
            $root.AddRedCard.encode(message.addRedCard, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.yellowCardOver != null && message.hasOwnProperty("yellowCardOver"))
            $root.YellowCardOver.encode(message.yellowCardOver, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.addGameEvent != null && message.hasOwnProperty("addGameEvent"))
            $root.AddGameEvent.encode(message.addGameEvent, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.addProposedGameEvent != null && message.hasOwnProperty("addProposedGameEvent"))
            $root.AddProposedGameEvent.encode(message.addProposedGameEvent, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.startBallPlacement != null && message.hasOwnProperty("startBallPlacement"))
            $root.StartBallPlacement.encode(message.startBallPlacement, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message["continue"] != null && message.hasOwnProperty("continue"))
            $root.Continue.encode(message["continue"], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.updateConfig != null && message.hasOwnProperty("updateConfig"))
            $root.UpdateConfig.encode(message.updateConfig, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
        if (message.updateTeamState != null && message.hasOwnProperty("updateTeamState"))
            $root.UpdateTeamState.encode(message.updateTeamState, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.switchColors != null && message.hasOwnProperty("switchColors"))
            $root.SwitchColors.encode(message.switchColors, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
        if (message.revert != null && message.hasOwnProperty("revert"))
            $root.Revert.encode(message.revert, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
        if (message.revertible != null && message.hasOwnProperty("revertible"))
            writer.uint32(/* id 16, wireType 0 =*/128).bool(message.revertible);
        return writer;
    };

    /**
     * Encodes the specified Change message, length delimited. Does not implicitly {@link Change.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Change
     * @static
     * @param {IChange} message Change message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Change.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Change message from the specified reader or buffer.
     * @function decode
     * @memberof Change
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Change} Change
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Change.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Change();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.origin = reader.string();
                break;
            case 16:
                message.revertible = reader.bool();
                break;
            case 2:
                message.newCommand = $root.NewCommand.decode(reader, reader.uint32());
                break;
            case 3:
                message.changeStage = $root.ChangeStage.decode(reader, reader.uint32());
                break;
            case 4:
                message.setBallPlacementPos = $root.SetBallPlacementPos.decode(reader, reader.uint32());
                break;
            case 5:
                message.addYellowCard = $root.AddYellowCard.decode(reader, reader.uint32());
                break;
            case 6:
                message.addRedCard = $root.AddRedCard.decode(reader, reader.uint32());
                break;
            case 7:
                message.yellowCardOver = $root.YellowCardOver.decode(reader, reader.uint32());
                break;
            case 8:
                message.addGameEvent = $root.AddGameEvent.decode(reader, reader.uint32());
                break;
            case 9:
                message.addProposedGameEvent = $root.AddProposedGameEvent.decode(reader, reader.uint32());
                break;
            case 10:
                message.startBallPlacement = $root.StartBallPlacement.decode(reader, reader.uint32());
                break;
            case 11:
                message["continue"] = $root.Continue.decode(reader, reader.uint32());
                break;
            case 12:
                message.updateConfig = $root.UpdateConfig.decode(reader, reader.uint32());
                break;
            case 13:
                message.updateTeamState = $root.UpdateTeamState.decode(reader, reader.uint32());
                break;
            case 14:
                message.switchColors = $root.SwitchColors.decode(reader, reader.uint32());
                break;
            case 15:
                message.revert = $root.Revert.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Change message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Change
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Change} Change
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Change.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Change message.
     * @function verify
     * @memberof Change
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Change.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.origin != null && message.hasOwnProperty("origin"))
            if (!$util.isString(message.origin))
                return "origin: string expected";
        if (message.revertible != null && message.hasOwnProperty("revertible"))
            if (typeof message.revertible !== "boolean")
                return "revertible: boolean expected";
        if (message.newCommand != null && message.hasOwnProperty("newCommand")) {
            properties.change = 1;
            {
                let error = $root.NewCommand.verify(message.newCommand);
                if (error)
                    return "newCommand." + error;
            }
        }
        if (message.changeStage != null && message.hasOwnProperty("changeStage")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.ChangeStage.verify(message.changeStage);
                if (error)
                    return "changeStage." + error;
            }
        }
        if (message.setBallPlacementPos != null && message.hasOwnProperty("setBallPlacementPos")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.SetBallPlacementPos.verify(message.setBallPlacementPos);
                if (error)
                    return "setBallPlacementPos." + error;
            }
        }
        if (message.addYellowCard != null && message.hasOwnProperty("addYellowCard")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.AddYellowCard.verify(message.addYellowCard);
                if (error)
                    return "addYellowCard." + error;
            }
        }
        if (message.addRedCard != null && message.hasOwnProperty("addRedCard")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.AddRedCard.verify(message.addRedCard);
                if (error)
                    return "addRedCard." + error;
            }
        }
        if (message.yellowCardOver != null && message.hasOwnProperty("yellowCardOver")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.YellowCardOver.verify(message.yellowCardOver);
                if (error)
                    return "yellowCardOver." + error;
            }
        }
        if (message.addGameEvent != null && message.hasOwnProperty("addGameEvent")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.AddGameEvent.verify(message.addGameEvent);
                if (error)
                    return "addGameEvent." + error;
            }
        }
        if (message.addProposedGameEvent != null && message.hasOwnProperty("addProposedGameEvent")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.AddProposedGameEvent.verify(message.addProposedGameEvent);
                if (error)
                    return "addProposedGameEvent." + error;
            }
        }
        if (message.startBallPlacement != null && message.hasOwnProperty("startBallPlacement")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.StartBallPlacement.verify(message.startBallPlacement);
                if (error)
                    return "startBallPlacement." + error;
            }
        }
        if (message["continue"] != null && message.hasOwnProperty("continue")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.Continue.verify(message["continue"]);
                if (error)
                    return "continue." + error;
            }
        }
        if (message.updateConfig != null && message.hasOwnProperty("updateConfig")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.UpdateConfig.verify(message.updateConfig);
                if (error)
                    return "updateConfig." + error;
            }
        }
        if (message.updateTeamState != null && message.hasOwnProperty("updateTeamState")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.UpdateTeamState.verify(message.updateTeamState);
                if (error)
                    return "updateTeamState." + error;
            }
        }
        if (message.switchColors != null && message.hasOwnProperty("switchColors")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.SwitchColors.verify(message.switchColors);
                if (error)
                    return "switchColors." + error;
            }
        }
        if (message.revert != null && message.hasOwnProperty("revert")) {
            if (properties.change === 1)
                return "change: multiple values";
            properties.change = 1;
            {
                let error = $root.Revert.verify(message.revert);
                if (error)
                    return "revert." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Change message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Change
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Change} Change
     */
    Change.fromObject = function fromObject(object) {
        if (object instanceof $root.Change)
            return object;
        let message = new $root.Change();
        if (object.origin != null)
            message.origin = String(object.origin);
        if (object.revertible != null)
            message.revertible = Boolean(object.revertible);
        if (object.newCommand != null) {
            if (typeof object.newCommand !== "object")
                throw TypeError(".Change.newCommand: object expected");
            message.newCommand = $root.NewCommand.fromObject(object.newCommand);
        }
        if (object.changeStage != null) {
            if (typeof object.changeStage !== "object")
                throw TypeError(".Change.changeStage: object expected");
            message.changeStage = $root.ChangeStage.fromObject(object.changeStage);
        }
        if (object.setBallPlacementPos != null) {
            if (typeof object.setBallPlacementPos !== "object")
                throw TypeError(".Change.setBallPlacementPos: object expected");
            message.setBallPlacementPos = $root.SetBallPlacementPos.fromObject(object.setBallPlacementPos);
        }
        if (object.addYellowCard != null) {
            if (typeof object.addYellowCard !== "object")
                throw TypeError(".Change.addYellowCard: object expected");
            message.addYellowCard = $root.AddYellowCard.fromObject(object.addYellowCard);
        }
        if (object.addRedCard != null) {
            if (typeof object.addRedCard !== "object")
                throw TypeError(".Change.addRedCard: object expected");
            message.addRedCard = $root.AddRedCard.fromObject(object.addRedCard);
        }
        if (object.yellowCardOver != null) {
            if (typeof object.yellowCardOver !== "object")
                throw TypeError(".Change.yellowCardOver: object expected");
            message.yellowCardOver = $root.YellowCardOver.fromObject(object.yellowCardOver);
        }
        if (object.addGameEvent != null) {
            if (typeof object.addGameEvent !== "object")
                throw TypeError(".Change.addGameEvent: object expected");
            message.addGameEvent = $root.AddGameEvent.fromObject(object.addGameEvent);
        }
        if (object.addProposedGameEvent != null) {
            if (typeof object.addProposedGameEvent !== "object")
                throw TypeError(".Change.addProposedGameEvent: object expected");
            message.addProposedGameEvent = $root.AddProposedGameEvent.fromObject(object.addProposedGameEvent);
        }
        if (object.startBallPlacement != null) {
            if (typeof object.startBallPlacement !== "object")
                throw TypeError(".Change.startBallPlacement: object expected");
            message.startBallPlacement = $root.StartBallPlacement.fromObject(object.startBallPlacement);
        }
        if (object["continue"] != null) {
            if (typeof object["continue"] !== "object")
                throw TypeError(".Change.continue: object expected");
            message["continue"] = $root.Continue.fromObject(object["continue"]);
        }
        if (object.updateConfig != null) {
            if (typeof object.updateConfig !== "object")
                throw TypeError(".Change.updateConfig: object expected");
            message.updateConfig = $root.UpdateConfig.fromObject(object.updateConfig);
        }
        if (object.updateTeamState != null) {
            if (typeof object.updateTeamState !== "object")
                throw TypeError(".Change.updateTeamState: object expected");
            message.updateTeamState = $root.UpdateTeamState.fromObject(object.updateTeamState);
        }
        if (object.switchColors != null) {
            if (typeof object.switchColors !== "object")
                throw TypeError(".Change.switchColors: object expected");
            message.switchColors = $root.SwitchColors.fromObject(object.switchColors);
        }
        if (object.revert != null) {
            if (typeof object.revert !== "object")
                throw TypeError(".Change.revert: object expected");
            message.revert = $root.Revert.fromObject(object.revert);
        }
        return message;
    };

    /**
     * Creates a plain object from a Change message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Change
     * @static
     * @param {Change} message Change
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Change.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.origin = "";
            object.revertible = false;
        }
        if (message.origin != null && message.hasOwnProperty("origin"))
            object.origin = message.origin;
        if (message.newCommand != null && message.hasOwnProperty("newCommand")) {
            object.newCommand = $root.NewCommand.toObject(message.newCommand, options);
            if (options.oneofs)
                object.change = "newCommand";
        }
        if (message.changeStage != null && message.hasOwnProperty("changeStage")) {
            object.changeStage = $root.ChangeStage.toObject(message.changeStage, options);
            if (options.oneofs)
                object.change = "changeStage";
        }
        if (message.setBallPlacementPos != null && message.hasOwnProperty("setBallPlacementPos")) {
            object.setBallPlacementPos = $root.SetBallPlacementPos.toObject(message.setBallPlacementPos, options);
            if (options.oneofs)
                object.change = "setBallPlacementPos";
        }
        if (message.addYellowCard != null && message.hasOwnProperty("addYellowCard")) {
            object.addYellowCard = $root.AddYellowCard.toObject(message.addYellowCard, options);
            if (options.oneofs)
                object.change = "addYellowCard";
        }
        if (message.addRedCard != null && message.hasOwnProperty("addRedCard")) {
            object.addRedCard = $root.AddRedCard.toObject(message.addRedCard, options);
            if (options.oneofs)
                object.change = "addRedCard";
        }
        if (message.yellowCardOver != null && message.hasOwnProperty("yellowCardOver")) {
            object.yellowCardOver = $root.YellowCardOver.toObject(message.yellowCardOver, options);
            if (options.oneofs)
                object.change = "yellowCardOver";
        }
        if (message.addGameEvent != null && message.hasOwnProperty("addGameEvent")) {
            object.addGameEvent = $root.AddGameEvent.toObject(message.addGameEvent, options);
            if (options.oneofs)
                object.change = "addGameEvent";
        }
        if (message.addProposedGameEvent != null && message.hasOwnProperty("addProposedGameEvent")) {
            object.addProposedGameEvent = $root.AddProposedGameEvent.toObject(message.addProposedGameEvent, options);
            if (options.oneofs)
                object.change = "addProposedGameEvent";
        }
        if (message.startBallPlacement != null && message.hasOwnProperty("startBallPlacement")) {
            object.startBallPlacement = $root.StartBallPlacement.toObject(message.startBallPlacement, options);
            if (options.oneofs)
                object.change = "startBallPlacement";
        }
        if (message["continue"] != null && message.hasOwnProperty("continue")) {
            object["continue"] = $root.Continue.toObject(message["continue"], options);
            if (options.oneofs)
                object.change = "continue";
        }
        if (message.updateConfig != null && message.hasOwnProperty("updateConfig")) {
            object.updateConfig = $root.UpdateConfig.toObject(message.updateConfig, options);
            if (options.oneofs)
                object.change = "updateConfig";
        }
        if (message.updateTeamState != null && message.hasOwnProperty("updateTeamState")) {
            object.updateTeamState = $root.UpdateTeamState.toObject(message.updateTeamState, options);
            if (options.oneofs)
                object.change = "updateTeamState";
        }
        if (message.switchColors != null && message.hasOwnProperty("switchColors")) {
            object.switchColors = $root.SwitchColors.toObject(message.switchColors, options);
            if (options.oneofs)
                object.change = "switchColors";
        }
        if (message.revert != null && message.hasOwnProperty("revert")) {
            object.revert = $root.Revert.toObject(message.revert, options);
            if (options.oneofs)
                object.change = "revert";
        }
        if (message.revertible != null && message.hasOwnProperty("revertible"))
            object.revertible = message.revertible;
        return object;
    };

    /**
     * Converts this Change to JSON.
     * @function toJSON
     * @memberof Change
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Change.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Change;
})();

export const NewCommand = $root.NewCommand = (() => {

    /**
     * Properties of a NewCommand.
     * @exports INewCommand
     * @interface INewCommand
     * @property {ICommand|null} [command] NewCommand command
     */

    /**
     * Constructs a new NewCommand.
     * @exports NewCommand
     * @classdesc Represents a NewCommand.
     * @implements INewCommand
     * @constructor
     * @param {INewCommand=} [properties] Properties to set
     */
    function NewCommand(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * NewCommand command.
     * @member {ICommand|null|undefined} command
     * @memberof NewCommand
     * @instance
     */
    NewCommand.prototype.command = null;

    /**
     * Creates a new NewCommand instance using the specified properties.
     * @function create
     * @memberof NewCommand
     * @static
     * @param {INewCommand=} [properties] Properties to set
     * @returns {NewCommand} NewCommand instance
     */
    NewCommand.create = function create(properties) {
        return new NewCommand(properties);
    };

    /**
     * Encodes the specified NewCommand message. Does not implicitly {@link NewCommand.verify|verify} messages.
     * @function encode
     * @memberof NewCommand
     * @static
     * @param {INewCommand} message NewCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NewCommand.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.command != null && message.hasOwnProperty("command"))
            $root.Command.encode(message.command, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified NewCommand message, length delimited. Does not implicitly {@link NewCommand.verify|verify} messages.
     * @function encodeDelimited
     * @memberof NewCommand
     * @static
     * @param {INewCommand} message NewCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NewCommand.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a NewCommand message from the specified reader or buffer.
     * @function decode
     * @memberof NewCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {NewCommand} NewCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NewCommand.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NewCommand();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.command = $root.Command.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a NewCommand message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof NewCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {NewCommand} NewCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NewCommand.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a NewCommand message.
     * @function verify
     * @memberof NewCommand
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    NewCommand.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.command != null && message.hasOwnProperty("command")) {
            let error = $root.Command.verify(message.command);
            if (error)
                return "command." + error;
        }
        return null;
    };

    /**
     * Creates a NewCommand message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof NewCommand
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {NewCommand} NewCommand
     */
    NewCommand.fromObject = function fromObject(object) {
        if (object instanceof $root.NewCommand)
            return object;
        let message = new $root.NewCommand();
        if (object.command != null) {
            if (typeof object.command !== "object")
                throw TypeError(".NewCommand.command: object expected");
            message.command = $root.Command.fromObject(object.command);
        }
        return message;
    };

    /**
     * Creates a plain object from a NewCommand message. Also converts values to other types if specified.
     * @function toObject
     * @memberof NewCommand
     * @static
     * @param {NewCommand} message NewCommand
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    NewCommand.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.command = null;
        if (message.command != null && message.hasOwnProperty("command"))
            object.command = $root.Command.toObject(message.command, options);
        return object;
    };

    /**
     * Converts this NewCommand to JSON.
     * @function toJSON
     * @memberof NewCommand
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    NewCommand.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return NewCommand;
})();

export const ChangeStage = $root.ChangeStage = (() => {

    /**
     * Properties of a ChangeStage.
     * @exports IChangeStage
     * @interface IChangeStage
     * @property {Referee.Stage|null} [newStage] ChangeStage newStage
     */

    /**
     * Constructs a new ChangeStage.
     * @exports ChangeStage
     * @classdesc Represents a ChangeStage.
     * @implements IChangeStage
     * @constructor
     * @param {IChangeStage=} [properties] Properties to set
     */
    function ChangeStage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChangeStage newStage.
     * @member {Referee.Stage} newStage
     * @memberof ChangeStage
     * @instance
     */
    ChangeStage.prototype.newStage = 0;

    /**
     * Creates a new ChangeStage instance using the specified properties.
     * @function create
     * @memberof ChangeStage
     * @static
     * @param {IChangeStage=} [properties] Properties to set
     * @returns {ChangeStage} ChangeStage instance
     */
    ChangeStage.create = function create(properties) {
        return new ChangeStage(properties);
    };

    /**
     * Encodes the specified ChangeStage message. Does not implicitly {@link ChangeStage.verify|verify} messages.
     * @function encode
     * @memberof ChangeStage
     * @static
     * @param {IChangeStage} message ChangeStage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChangeStage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.newStage != null && message.hasOwnProperty("newStage"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.newStage);
        return writer;
    };

    /**
     * Encodes the specified ChangeStage message, length delimited. Does not implicitly {@link ChangeStage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChangeStage
     * @static
     * @param {IChangeStage} message ChangeStage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChangeStage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChangeStage message from the specified reader or buffer.
     * @function decode
     * @memberof ChangeStage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChangeStage} ChangeStage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChangeStage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChangeStage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.newStage = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChangeStage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChangeStage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChangeStage} ChangeStage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChangeStage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChangeStage message.
     * @function verify
     * @memberof ChangeStage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChangeStage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.newStage != null && message.hasOwnProperty("newStage"))
            switch (message.newStage) {
            default:
                return "newStage: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                break;
            }
        return null;
    };

    /**
     * Creates a ChangeStage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChangeStage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChangeStage} ChangeStage
     */
    ChangeStage.fromObject = function fromObject(object) {
        if (object instanceof $root.ChangeStage)
            return object;
        let message = new $root.ChangeStage();
        switch (object.newStage) {
        case "NORMAL_FIRST_HALF_PRE":
        case 0:
            message.newStage = 0;
            break;
        case "NORMAL_FIRST_HALF":
        case 1:
            message.newStage = 1;
            break;
        case "NORMAL_HALF_TIME":
        case 2:
            message.newStage = 2;
            break;
        case "NORMAL_SECOND_HALF_PRE":
        case 3:
            message.newStage = 3;
            break;
        case "NORMAL_SECOND_HALF":
        case 4:
            message.newStage = 4;
            break;
        case "EXTRA_TIME_BREAK":
        case 5:
            message.newStage = 5;
            break;
        case "EXTRA_FIRST_HALF_PRE":
        case 6:
            message.newStage = 6;
            break;
        case "EXTRA_FIRST_HALF":
        case 7:
            message.newStage = 7;
            break;
        case "EXTRA_HALF_TIME":
        case 8:
            message.newStage = 8;
            break;
        case "EXTRA_SECOND_HALF_PRE":
        case 9:
            message.newStage = 9;
            break;
        case "EXTRA_SECOND_HALF":
        case 10:
            message.newStage = 10;
            break;
        case "PENALTY_SHOOTOUT_BREAK":
        case 11:
            message.newStage = 11;
            break;
        case "PENALTY_SHOOTOUT":
        case 12:
            message.newStage = 12;
            break;
        case "POST_GAME":
        case 13:
            message.newStage = 13;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a ChangeStage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChangeStage
     * @static
     * @param {ChangeStage} message ChangeStage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChangeStage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.newStage = options.enums === String ? "NORMAL_FIRST_HALF_PRE" : 0;
        if (message.newStage != null && message.hasOwnProperty("newStage"))
            object.newStage = options.enums === String ? $root.Referee.Stage[message.newStage] : message.newStage;
        return object;
    };

    /**
     * Converts this ChangeStage to JSON.
     * @function toJSON
     * @memberof ChangeStage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChangeStage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChangeStage;
})();

export const SetBallPlacementPos = $root.SetBallPlacementPos = (() => {

    /**
     * Properties of a SetBallPlacementPos.
     * @exports ISetBallPlacementPos
     * @interface ISetBallPlacementPos
     * @property {IVector2|null} [pos] SetBallPlacementPos pos
     */

    /**
     * Constructs a new SetBallPlacementPos.
     * @exports SetBallPlacementPos
     * @classdesc Represents a SetBallPlacementPos.
     * @implements ISetBallPlacementPos
     * @constructor
     * @param {ISetBallPlacementPos=} [properties] Properties to set
     */
    function SetBallPlacementPos(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SetBallPlacementPos pos.
     * @member {IVector2|null|undefined} pos
     * @memberof SetBallPlacementPos
     * @instance
     */
    SetBallPlacementPos.prototype.pos = null;

    /**
     * Creates a new SetBallPlacementPos instance using the specified properties.
     * @function create
     * @memberof SetBallPlacementPos
     * @static
     * @param {ISetBallPlacementPos=} [properties] Properties to set
     * @returns {SetBallPlacementPos} SetBallPlacementPos instance
     */
    SetBallPlacementPos.create = function create(properties) {
        return new SetBallPlacementPos(properties);
    };

    /**
     * Encodes the specified SetBallPlacementPos message. Does not implicitly {@link SetBallPlacementPos.verify|verify} messages.
     * @function encode
     * @memberof SetBallPlacementPos
     * @static
     * @param {ISetBallPlacementPos} message SetBallPlacementPos message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetBallPlacementPos.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pos != null && message.hasOwnProperty("pos"))
            $root.Vector2.encode(message.pos, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SetBallPlacementPos message, length delimited. Does not implicitly {@link SetBallPlacementPos.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SetBallPlacementPos
     * @static
     * @param {ISetBallPlacementPos} message SetBallPlacementPos message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetBallPlacementPos.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SetBallPlacementPos message from the specified reader or buffer.
     * @function decode
     * @memberof SetBallPlacementPos
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SetBallPlacementPos} SetBallPlacementPos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetBallPlacementPos.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SetBallPlacementPos();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pos = $root.Vector2.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SetBallPlacementPos message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SetBallPlacementPos
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SetBallPlacementPos} SetBallPlacementPos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetBallPlacementPos.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SetBallPlacementPos message.
     * @function verify
     * @memberof SetBallPlacementPos
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SetBallPlacementPos.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pos != null && message.hasOwnProperty("pos")) {
            let error = $root.Vector2.verify(message.pos);
            if (error)
                return "pos." + error;
        }
        return null;
    };

    /**
     * Creates a SetBallPlacementPos message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SetBallPlacementPos
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SetBallPlacementPos} SetBallPlacementPos
     */
    SetBallPlacementPos.fromObject = function fromObject(object) {
        if (object instanceof $root.SetBallPlacementPos)
            return object;
        let message = new $root.SetBallPlacementPos();
        if (object.pos != null) {
            if (typeof object.pos !== "object")
                throw TypeError(".SetBallPlacementPos.pos: object expected");
            message.pos = $root.Vector2.fromObject(object.pos);
        }
        return message;
    };

    /**
     * Creates a plain object from a SetBallPlacementPos message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SetBallPlacementPos
     * @static
     * @param {SetBallPlacementPos} message SetBallPlacementPos
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SetBallPlacementPos.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.pos = null;
        if (message.pos != null && message.hasOwnProperty("pos"))
            object.pos = $root.Vector2.toObject(message.pos, options);
        return object;
    };

    /**
     * Converts this SetBallPlacementPos to JSON.
     * @function toJSON
     * @memberof SetBallPlacementPos
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SetBallPlacementPos.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SetBallPlacementPos;
})();

export const AddYellowCard = $root.AddYellowCard = (() => {

    /**
     * Properties of an AddYellowCard.
     * @exports IAddYellowCard
     * @interface IAddYellowCard
     * @property {Team|null} [forTeam] AddYellowCard forTeam
     * @property {IGameEvent|null} [causedByGameEvent] AddYellowCard causedByGameEvent
     */

    /**
     * Constructs a new AddYellowCard.
     * @exports AddYellowCard
     * @classdesc Represents an AddYellowCard.
     * @implements IAddYellowCard
     * @constructor
     * @param {IAddYellowCard=} [properties] Properties to set
     */
    function AddYellowCard(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddYellowCard forTeam.
     * @member {Team} forTeam
     * @memberof AddYellowCard
     * @instance
     */
    AddYellowCard.prototype.forTeam = 0;

    /**
     * AddYellowCard causedByGameEvent.
     * @member {IGameEvent|null|undefined} causedByGameEvent
     * @memberof AddYellowCard
     * @instance
     */
    AddYellowCard.prototype.causedByGameEvent = null;

    /**
     * Creates a new AddYellowCard instance using the specified properties.
     * @function create
     * @memberof AddYellowCard
     * @static
     * @param {IAddYellowCard=} [properties] Properties to set
     * @returns {AddYellowCard} AddYellowCard instance
     */
    AddYellowCard.create = function create(properties) {
        return new AddYellowCard(properties);
    };

    /**
     * Encodes the specified AddYellowCard message. Does not implicitly {@link AddYellowCard.verify|verify} messages.
     * @function encode
     * @memberof AddYellowCard
     * @static
     * @param {IAddYellowCard} message AddYellowCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddYellowCard.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.forTeam);
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            $root.GameEvent.encode(message.causedByGameEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AddYellowCard message, length delimited. Does not implicitly {@link AddYellowCard.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddYellowCard
     * @static
     * @param {IAddYellowCard} message AddYellowCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddYellowCard.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AddYellowCard message from the specified reader or buffer.
     * @function decode
     * @memberof AddYellowCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddYellowCard} AddYellowCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddYellowCard.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AddYellowCard();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.forTeam = reader.int32();
                break;
            case 2:
                message.causedByGameEvent = $root.GameEvent.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AddYellowCard message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddYellowCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddYellowCard} AddYellowCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddYellowCard.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddYellowCard message.
     * @function verify
     * @memberof AddYellowCard
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddYellowCard.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            switch (message.forTeam) {
            default:
                return "forTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent")) {
            let error = $root.GameEvent.verify(message.causedByGameEvent);
            if (error)
                return "causedByGameEvent." + error;
        }
        return null;
    };

    /**
     * Creates an AddYellowCard message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddYellowCard
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddYellowCard} AddYellowCard
     */
    AddYellowCard.fromObject = function fromObject(object) {
        if (object instanceof $root.AddYellowCard)
            return object;
        let message = new $root.AddYellowCard();
        switch (object.forTeam) {
        case "UNKNOWN":
        case 0:
            message.forTeam = 0;
            break;
        case "YELLOW":
        case 1:
            message.forTeam = 1;
            break;
        case "BLUE":
        case 2:
            message.forTeam = 2;
            break;
        }
        if (object.causedByGameEvent != null) {
            if (typeof object.causedByGameEvent !== "object")
                throw TypeError(".AddYellowCard.causedByGameEvent: object expected");
            message.causedByGameEvent = $root.GameEvent.fromObject(object.causedByGameEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from an AddYellowCard message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddYellowCard
     * @static
     * @param {AddYellowCard} message AddYellowCard
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddYellowCard.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.forTeam = options.enums === String ? "UNKNOWN" : 0;
            object.causedByGameEvent = null;
        }
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            object.forTeam = options.enums === String ? $root.Team[message.forTeam] : message.forTeam;
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            object.causedByGameEvent = $root.GameEvent.toObject(message.causedByGameEvent, options);
        return object;
    };

    /**
     * Converts this AddYellowCard to JSON.
     * @function toJSON
     * @memberof AddYellowCard
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddYellowCard.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AddYellowCard;
})();

export const AddRedCard = $root.AddRedCard = (() => {

    /**
     * Properties of an AddRedCard.
     * @exports IAddRedCard
     * @interface IAddRedCard
     * @property {Team|null} [forTeam] AddRedCard forTeam
     * @property {IGameEvent|null} [causedByGameEvent] AddRedCard causedByGameEvent
     */

    /**
     * Constructs a new AddRedCard.
     * @exports AddRedCard
     * @classdesc Represents an AddRedCard.
     * @implements IAddRedCard
     * @constructor
     * @param {IAddRedCard=} [properties] Properties to set
     */
    function AddRedCard(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddRedCard forTeam.
     * @member {Team} forTeam
     * @memberof AddRedCard
     * @instance
     */
    AddRedCard.prototype.forTeam = 0;

    /**
     * AddRedCard causedByGameEvent.
     * @member {IGameEvent|null|undefined} causedByGameEvent
     * @memberof AddRedCard
     * @instance
     */
    AddRedCard.prototype.causedByGameEvent = null;

    /**
     * Creates a new AddRedCard instance using the specified properties.
     * @function create
     * @memberof AddRedCard
     * @static
     * @param {IAddRedCard=} [properties] Properties to set
     * @returns {AddRedCard} AddRedCard instance
     */
    AddRedCard.create = function create(properties) {
        return new AddRedCard(properties);
    };

    /**
     * Encodes the specified AddRedCard message. Does not implicitly {@link AddRedCard.verify|verify} messages.
     * @function encode
     * @memberof AddRedCard
     * @static
     * @param {IAddRedCard} message AddRedCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddRedCard.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.forTeam);
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            $root.GameEvent.encode(message.causedByGameEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AddRedCard message, length delimited. Does not implicitly {@link AddRedCard.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddRedCard
     * @static
     * @param {IAddRedCard} message AddRedCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddRedCard.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AddRedCard message from the specified reader or buffer.
     * @function decode
     * @memberof AddRedCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddRedCard} AddRedCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddRedCard.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AddRedCard();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.forTeam = reader.int32();
                break;
            case 2:
                message.causedByGameEvent = $root.GameEvent.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AddRedCard message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddRedCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddRedCard} AddRedCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddRedCard.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddRedCard message.
     * @function verify
     * @memberof AddRedCard
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddRedCard.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            switch (message.forTeam) {
            default:
                return "forTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent")) {
            let error = $root.GameEvent.verify(message.causedByGameEvent);
            if (error)
                return "causedByGameEvent." + error;
        }
        return null;
    };

    /**
     * Creates an AddRedCard message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddRedCard
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddRedCard} AddRedCard
     */
    AddRedCard.fromObject = function fromObject(object) {
        if (object instanceof $root.AddRedCard)
            return object;
        let message = new $root.AddRedCard();
        switch (object.forTeam) {
        case "UNKNOWN":
        case 0:
            message.forTeam = 0;
            break;
        case "YELLOW":
        case 1:
            message.forTeam = 1;
            break;
        case "BLUE":
        case 2:
            message.forTeam = 2;
            break;
        }
        if (object.causedByGameEvent != null) {
            if (typeof object.causedByGameEvent !== "object")
                throw TypeError(".AddRedCard.causedByGameEvent: object expected");
            message.causedByGameEvent = $root.GameEvent.fromObject(object.causedByGameEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from an AddRedCard message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddRedCard
     * @static
     * @param {AddRedCard} message AddRedCard
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddRedCard.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.forTeam = options.enums === String ? "UNKNOWN" : 0;
            object.causedByGameEvent = null;
        }
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            object.forTeam = options.enums === String ? $root.Team[message.forTeam] : message.forTeam;
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            object.causedByGameEvent = $root.GameEvent.toObject(message.causedByGameEvent, options);
        return object;
    };

    /**
     * Converts this AddRedCard to JSON.
     * @function toJSON
     * @memberof AddRedCard
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddRedCard.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AddRedCard;
})();

export const YellowCardOver = $root.YellowCardOver = (() => {

    /**
     * Properties of a YellowCardOver.
     * @exports IYellowCardOver
     * @interface IYellowCardOver
     * @property {Team|null} [forTeam] YellowCardOver forTeam
     */

    /**
     * Constructs a new YellowCardOver.
     * @exports YellowCardOver
     * @classdesc Represents a YellowCardOver.
     * @implements IYellowCardOver
     * @constructor
     * @param {IYellowCardOver=} [properties] Properties to set
     */
    function YellowCardOver(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * YellowCardOver forTeam.
     * @member {Team} forTeam
     * @memberof YellowCardOver
     * @instance
     */
    YellowCardOver.prototype.forTeam = 0;

    /**
     * Creates a new YellowCardOver instance using the specified properties.
     * @function create
     * @memberof YellowCardOver
     * @static
     * @param {IYellowCardOver=} [properties] Properties to set
     * @returns {YellowCardOver} YellowCardOver instance
     */
    YellowCardOver.create = function create(properties) {
        return new YellowCardOver(properties);
    };

    /**
     * Encodes the specified YellowCardOver message. Does not implicitly {@link YellowCardOver.verify|verify} messages.
     * @function encode
     * @memberof YellowCardOver
     * @static
     * @param {IYellowCardOver} message YellowCardOver message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YellowCardOver.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.forTeam);
        return writer;
    };

    /**
     * Encodes the specified YellowCardOver message, length delimited. Does not implicitly {@link YellowCardOver.verify|verify} messages.
     * @function encodeDelimited
     * @memberof YellowCardOver
     * @static
     * @param {IYellowCardOver} message YellowCardOver message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YellowCardOver.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a YellowCardOver message from the specified reader or buffer.
     * @function decode
     * @memberof YellowCardOver
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {YellowCardOver} YellowCardOver
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YellowCardOver.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.YellowCardOver();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.forTeam = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a YellowCardOver message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof YellowCardOver
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {YellowCardOver} YellowCardOver
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YellowCardOver.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a YellowCardOver message.
     * @function verify
     * @memberof YellowCardOver
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    YellowCardOver.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            switch (message.forTeam) {
            default:
                return "forTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a YellowCardOver message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof YellowCardOver
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {YellowCardOver} YellowCardOver
     */
    YellowCardOver.fromObject = function fromObject(object) {
        if (object instanceof $root.YellowCardOver)
            return object;
        let message = new $root.YellowCardOver();
        switch (object.forTeam) {
        case "UNKNOWN":
        case 0:
            message.forTeam = 0;
            break;
        case "YELLOW":
        case 1:
            message.forTeam = 1;
            break;
        case "BLUE":
        case 2:
            message.forTeam = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a YellowCardOver message. Also converts values to other types if specified.
     * @function toObject
     * @memberof YellowCardOver
     * @static
     * @param {YellowCardOver} message YellowCardOver
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    YellowCardOver.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.forTeam = options.enums === String ? "UNKNOWN" : 0;
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            object.forTeam = options.enums === String ? $root.Team[message.forTeam] : message.forTeam;
        return object;
    };

    /**
     * Converts this YellowCardOver to JSON.
     * @function toJSON
     * @memberof YellowCardOver
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    YellowCardOver.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return YellowCardOver;
})();

export const AddGameEvent = $root.AddGameEvent = (() => {

    /**
     * Properties of an AddGameEvent.
     * @exports IAddGameEvent
     * @interface IAddGameEvent
     * @property {IGameEvent|null} [gameEvent] AddGameEvent gameEvent
     */

    /**
     * Constructs a new AddGameEvent.
     * @exports AddGameEvent
     * @classdesc Represents an AddGameEvent.
     * @implements IAddGameEvent
     * @constructor
     * @param {IAddGameEvent=} [properties] Properties to set
     */
    function AddGameEvent(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddGameEvent gameEvent.
     * @member {IGameEvent|null|undefined} gameEvent
     * @memberof AddGameEvent
     * @instance
     */
    AddGameEvent.prototype.gameEvent = null;

    /**
     * Creates a new AddGameEvent instance using the specified properties.
     * @function create
     * @memberof AddGameEvent
     * @static
     * @param {IAddGameEvent=} [properties] Properties to set
     * @returns {AddGameEvent} AddGameEvent instance
     */
    AddGameEvent.create = function create(properties) {
        return new AddGameEvent(properties);
    };

    /**
     * Encodes the specified AddGameEvent message. Does not implicitly {@link AddGameEvent.verify|verify} messages.
     * @function encode
     * @memberof AddGameEvent
     * @static
     * @param {IAddGameEvent} message AddGameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddGameEvent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.gameEvent != null && message.hasOwnProperty("gameEvent"))
            $root.GameEvent.encode(message.gameEvent, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AddGameEvent message, length delimited. Does not implicitly {@link AddGameEvent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddGameEvent
     * @static
     * @param {IAddGameEvent} message AddGameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddGameEvent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AddGameEvent message from the specified reader or buffer.
     * @function decode
     * @memberof AddGameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddGameEvent} AddGameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddGameEvent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AddGameEvent();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.gameEvent = $root.GameEvent.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AddGameEvent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddGameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddGameEvent} AddGameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddGameEvent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddGameEvent message.
     * @function verify
     * @memberof AddGameEvent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddGameEvent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.gameEvent != null && message.hasOwnProperty("gameEvent")) {
            let error = $root.GameEvent.verify(message.gameEvent);
            if (error)
                return "gameEvent." + error;
        }
        return null;
    };

    /**
     * Creates an AddGameEvent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddGameEvent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddGameEvent} AddGameEvent
     */
    AddGameEvent.fromObject = function fromObject(object) {
        if (object instanceof $root.AddGameEvent)
            return object;
        let message = new $root.AddGameEvent();
        if (object.gameEvent != null) {
            if (typeof object.gameEvent !== "object")
                throw TypeError(".AddGameEvent.gameEvent: object expected");
            message.gameEvent = $root.GameEvent.fromObject(object.gameEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from an AddGameEvent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddGameEvent
     * @static
     * @param {AddGameEvent} message AddGameEvent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddGameEvent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.gameEvent = null;
        if (message.gameEvent != null && message.hasOwnProperty("gameEvent"))
            object.gameEvent = $root.GameEvent.toObject(message.gameEvent, options);
        return object;
    };

    /**
     * Converts this AddGameEvent to JSON.
     * @function toJSON
     * @memberof AddGameEvent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddGameEvent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AddGameEvent;
})();

export const AddProposedGameEvent = $root.AddProposedGameEvent = (() => {

    /**
     * Properties of an AddProposedGameEvent.
     * @exports IAddProposedGameEvent
     * @interface IAddProposedGameEvent
     * @property {IProposedGameEvent|null} [gameEvent] AddProposedGameEvent gameEvent
     */

    /**
     * Constructs a new AddProposedGameEvent.
     * @exports AddProposedGameEvent
     * @classdesc Represents an AddProposedGameEvent.
     * @implements IAddProposedGameEvent
     * @constructor
     * @param {IAddProposedGameEvent=} [properties] Properties to set
     */
    function AddProposedGameEvent(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddProposedGameEvent gameEvent.
     * @member {IProposedGameEvent|null|undefined} gameEvent
     * @memberof AddProposedGameEvent
     * @instance
     */
    AddProposedGameEvent.prototype.gameEvent = null;

    /**
     * Creates a new AddProposedGameEvent instance using the specified properties.
     * @function create
     * @memberof AddProposedGameEvent
     * @static
     * @param {IAddProposedGameEvent=} [properties] Properties to set
     * @returns {AddProposedGameEvent} AddProposedGameEvent instance
     */
    AddProposedGameEvent.create = function create(properties) {
        return new AddProposedGameEvent(properties);
    };

    /**
     * Encodes the specified AddProposedGameEvent message. Does not implicitly {@link AddProposedGameEvent.verify|verify} messages.
     * @function encode
     * @memberof AddProposedGameEvent
     * @static
     * @param {IAddProposedGameEvent} message AddProposedGameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddProposedGameEvent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.gameEvent != null && message.hasOwnProperty("gameEvent"))
            $root.ProposedGameEvent.encode(message.gameEvent, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AddProposedGameEvent message, length delimited. Does not implicitly {@link AddProposedGameEvent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddProposedGameEvent
     * @static
     * @param {IAddProposedGameEvent} message AddProposedGameEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddProposedGameEvent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AddProposedGameEvent message from the specified reader or buffer.
     * @function decode
     * @memberof AddProposedGameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddProposedGameEvent} AddProposedGameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddProposedGameEvent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AddProposedGameEvent();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.gameEvent = $root.ProposedGameEvent.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AddProposedGameEvent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddProposedGameEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddProposedGameEvent} AddProposedGameEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddProposedGameEvent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddProposedGameEvent message.
     * @function verify
     * @memberof AddProposedGameEvent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddProposedGameEvent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.gameEvent != null && message.hasOwnProperty("gameEvent")) {
            let error = $root.ProposedGameEvent.verify(message.gameEvent);
            if (error)
                return "gameEvent." + error;
        }
        return null;
    };

    /**
     * Creates an AddProposedGameEvent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddProposedGameEvent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddProposedGameEvent} AddProposedGameEvent
     */
    AddProposedGameEvent.fromObject = function fromObject(object) {
        if (object instanceof $root.AddProposedGameEvent)
            return object;
        let message = new $root.AddProposedGameEvent();
        if (object.gameEvent != null) {
            if (typeof object.gameEvent !== "object")
                throw TypeError(".AddProposedGameEvent.gameEvent: object expected");
            message.gameEvent = $root.ProposedGameEvent.fromObject(object.gameEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from an AddProposedGameEvent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddProposedGameEvent
     * @static
     * @param {AddProposedGameEvent} message AddProposedGameEvent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddProposedGameEvent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.gameEvent = null;
        if (message.gameEvent != null && message.hasOwnProperty("gameEvent"))
            object.gameEvent = $root.ProposedGameEvent.toObject(message.gameEvent, options);
        return object;
    };

    /**
     * Converts this AddProposedGameEvent to JSON.
     * @function toJSON
     * @memberof AddProposedGameEvent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddProposedGameEvent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AddProposedGameEvent;
})();

export const StartBallPlacement = $root.StartBallPlacement = (() => {

    /**
     * Properties of a StartBallPlacement.
     * @exports IStartBallPlacement
     * @interface IStartBallPlacement
     */

    /**
     * Constructs a new StartBallPlacement.
     * @exports StartBallPlacement
     * @classdesc Represents a StartBallPlacement.
     * @implements IStartBallPlacement
     * @constructor
     * @param {IStartBallPlacement=} [properties] Properties to set
     */
    function StartBallPlacement(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new StartBallPlacement instance using the specified properties.
     * @function create
     * @memberof StartBallPlacement
     * @static
     * @param {IStartBallPlacement=} [properties] Properties to set
     * @returns {StartBallPlacement} StartBallPlacement instance
     */
    StartBallPlacement.create = function create(properties) {
        return new StartBallPlacement(properties);
    };

    /**
     * Encodes the specified StartBallPlacement message. Does not implicitly {@link StartBallPlacement.verify|verify} messages.
     * @function encode
     * @memberof StartBallPlacement
     * @static
     * @param {IStartBallPlacement} message StartBallPlacement message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StartBallPlacement.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified StartBallPlacement message, length delimited. Does not implicitly {@link StartBallPlacement.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StartBallPlacement
     * @static
     * @param {IStartBallPlacement} message StartBallPlacement message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StartBallPlacement.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StartBallPlacement message from the specified reader or buffer.
     * @function decode
     * @memberof StartBallPlacement
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StartBallPlacement} StartBallPlacement
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StartBallPlacement.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.StartBallPlacement();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StartBallPlacement message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StartBallPlacement
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StartBallPlacement} StartBallPlacement
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StartBallPlacement.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StartBallPlacement message.
     * @function verify
     * @memberof StartBallPlacement
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StartBallPlacement.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a StartBallPlacement message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof StartBallPlacement
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {StartBallPlacement} StartBallPlacement
     */
    StartBallPlacement.fromObject = function fromObject(object) {
        if (object instanceof $root.StartBallPlacement)
            return object;
        return new $root.StartBallPlacement();
    };

    /**
     * Creates a plain object from a StartBallPlacement message. Also converts values to other types if specified.
     * @function toObject
     * @memberof StartBallPlacement
     * @static
     * @param {StartBallPlacement} message StartBallPlacement
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StartBallPlacement.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this StartBallPlacement to JSON.
     * @function toJSON
     * @memberof StartBallPlacement
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StartBallPlacement.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return StartBallPlacement;
})();

export const Continue = $root.Continue = (() => {

    /**
     * Properties of a Continue.
     * @exports IContinue
     * @interface IContinue
     */

    /**
     * Constructs a new Continue.
     * @exports Continue
     * @classdesc Represents a Continue.
     * @implements IContinue
     * @constructor
     * @param {IContinue=} [properties] Properties to set
     */
    function Continue(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Continue instance using the specified properties.
     * @function create
     * @memberof Continue
     * @static
     * @param {IContinue=} [properties] Properties to set
     * @returns {Continue} Continue instance
     */
    Continue.create = function create(properties) {
        return new Continue(properties);
    };

    /**
     * Encodes the specified Continue message. Does not implicitly {@link Continue.verify|verify} messages.
     * @function encode
     * @memberof Continue
     * @static
     * @param {IContinue} message Continue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Continue.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Continue message, length delimited. Does not implicitly {@link Continue.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Continue
     * @static
     * @param {IContinue} message Continue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Continue.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Continue message from the specified reader or buffer.
     * @function decode
     * @memberof Continue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Continue} Continue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Continue.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Continue();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Continue message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Continue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Continue} Continue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Continue.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Continue message.
     * @function verify
     * @memberof Continue
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Continue.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Continue message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Continue
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Continue} Continue
     */
    Continue.fromObject = function fromObject(object) {
        if (object instanceof $root.Continue)
            return object;
        return new $root.Continue();
    };

    /**
     * Creates a plain object from a Continue message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Continue
     * @static
     * @param {Continue} message Continue
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Continue.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Continue to JSON.
     * @function toJSON
     * @memberof Continue
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Continue.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Continue;
})();

export const UpdateConfig = $root.UpdateConfig = (() => {

    /**
     * Properties of an UpdateConfig.
     * @exports IUpdateConfig
     * @interface IUpdateConfig
     * @property {State.Division|null} [division] UpdateConfig division
     * @property {Team|null} [firstKickoffTeam] UpdateConfig firstKickoffTeam
     * @property {boolean|null} [autoContinue] UpdateConfig autoContinue
     * @property {Object.<string,State.GameEventBehavior>|null} [gameEventBehavior] UpdateConfig gameEventBehavior
     */

    /**
     * Constructs a new UpdateConfig.
     * @exports UpdateConfig
     * @classdesc Represents an UpdateConfig.
     * @implements IUpdateConfig
     * @constructor
     * @param {IUpdateConfig=} [properties] Properties to set
     */
    function UpdateConfig(properties) {
        this.gameEventBehavior = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdateConfig division.
     * @member {State.Division} division
     * @memberof UpdateConfig
     * @instance
     */
    UpdateConfig.prototype.division = 0;

    /**
     * UpdateConfig firstKickoffTeam.
     * @member {Team} firstKickoffTeam
     * @memberof UpdateConfig
     * @instance
     */
    UpdateConfig.prototype.firstKickoffTeam = 0;

    /**
     * UpdateConfig autoContinue.
     * @member {boolean} autoContinue
     * @memberof UpdateConfig
     * @instance
     */
    UpdateConfig.prototype.autoContinue = false;

    /**
     * UpdateConfig gameEventBehavior.
     * @member {Object.<string,State.GameEventBehavior>} gameEventBehavior
     * @memberof UpdateConfig
     * @instance
     */
    UpdateConfig.prototype.gameEventBehavior = $util.emptyObject;

    /**
     * Creates a new UpdateConfig instance using the specified properties.
     * @function create
     * @memberof UpdateConfig
     * @static
     * @param {IUpdateConfig=} [properties] Properties to set
     * @returns {UpdateConfig} UpdateConfig instance
     */
    UpdateConfig.create = function create(properties) {
        return new UpdateConfig(properties);
    };

    /**
     * Encodes the specified UpdateConfig message. Does not implicitly {@link UpdateConfig.verify|verify} messages.
     * @function encode
     * @memberof UpdateConfig
     * @static
     * @param {IUpdateConfig} message UpdateConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateConfig.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.division != null && message.hasOwnProperty("division"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.division);
        if (message.firstKickoffTeam != null && message.hasOwnProperty("firstKickoffTeam"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.firstKickoffTeam);
        if (message.autoContinue != null && message.hasOwnProperty("autoContinue"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.autoContinue);
        if (message.gameEventBehavior != null && message.hasOwnProperty("gameEventBehavior"))
            for (let keys = Object.keys(message.gameEventBehavior), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.gameEventBehavior[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified UpdateConfig message, length delimited. Does not implicitly {@link UpdateConfig.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdateConfig
     * @static
     * @param {IUpdateConfig} message UpdateConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateConfig.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpdateConfig message from the specified reader or buffer.
     * @function decode
     * @memberof UpdateConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdateConfig} UpdateConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpdateConfig(), key;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.division = reader.int32();
                break;
            case 2:
                message.firstKickoffTeam = reader.int32();
                break;
            case 3:
                message.autoContinue = reader.bool();
                break;
            case 4:
                reader.skip().pos++;
                if (message.gameEventBehavior === $util.emptyObject)
                    message.gameEventBehavior = {};
                key = reader.string();
                reader.pos++;
                message.gameEventBehavior[key] = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UpdateConfig message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdateConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdateConfig} UpdateConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateConfig.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdateConfig message.
     * @function verify
     * @memberof UpdateConfig
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdateConfig.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.division != null && message.hasOwnProperty("division"))
            switch (message.division) {
            default:
                return "division: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.firstKickoffTeam != null && message.hasOwnProperty("firstKickoffTeam"))
            switch (message.firstKickoffTeam) {
            default:
                return "firstKickoffTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.autoContinue != null && message.hasOwnProperty("autoContinue"))
            if (typeof message.autoContinue !== "boolean")
                return "autoContinue: boolean expected";
        if (message.gameEventBehavior != null && message.hasOwnProperty("gameEventBehavior")) {
            if (!$util.isObject(message.gameEventBehavior))
                return "gameEventBehavior: object expected";
            let key = Object.keys(message.gameEventBehavior);
            for (let i = 0; i < key.length; ++i)
                switch (message.gameEventBehavior[key[i]]) {
                default:
                    return "gameEventBehavior: enum value{k:string} expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
        }
        return null;
    };

    /**
     * Creates an UpdateConfig message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdateConfig
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdateConfig} UpdateConfig
     */
    UpdateConfig.fromObject = function fromObject(object) {
        if (object instanceof $root.UpdateConfig)
            return object;
        let message = new $root.UpdateConfig();
        switch (object.division) {
        case "DIV_UNKNOWN":
        case 0:
            message.division = 0;
            break;
        case "DIV_A":
        case 1:
            message.division = 1;
            break;
        case "DIV_B":
        case 2:
            message.division = 2;
            break;
        }
        switch (object.firstKickoffTeam) {
        case "UNKNOWN":
        case 0:
            message.firstKickoffTeam = 0;
            break;
        case "YELLOW":
        case 1:
            message.firstKickoffTeam = 1;
            break;
        case "BLUE":
        case 2:
            message.firstKickoffTeam = 2;
            break;
        }
        if (object.autoContinue != null)
            message.autoContinue = Boolean(object.autoContinue);
        if (object.gameEventBehavior) {
            if (typeof object.gameEventBehavior !== "object")
                throw TypeError(".UpdateConfig.gameEventBehavior: object expected");
            message.gameEventBehavior = {};
            for (let keys = Object.keys(object.gameEventBehavior), i = 0; i < keys.length; ++i)
                switch (object.gameEventBehavior[keys[i]]) {
                case "GAME_EVENT_BEHAVIOR_UNKNOWN":
                case 0:
                    message.gameEventBehavior[keys[i]] = 0;
                    break;
                case "GAME_EVENT_BEHAVIOR_ON":
                case 1:
                    message.gameEventBehavior[keys[i]] = 1;
                    break;
                case "GAME_EVENT_BEHAVIOR_MAJORITY":
                case 2:
                    message.gameEventBehavior[keys[i]] = 2;
                    break;
                case "GAME_EVENT_BEHAVIOR_OFF":
                case 3:
                    message.gameEventBehavior[keys[i]] = 3;
                    break;
                }
        }
        return message;
    };

    /**
     * Creates a plain object from an UpdateConfig message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdateConfig
     * @static
     * @param {UpdateConfig} message UpdateConfig
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpdateConfig.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.objects || options.defaults)
            object.gameEventBehavior = {};
        if (options.defaults) {
            object.division = options.enums === String ? "DIV_UNKNOWN" : 0;
            object.firstKickoffTeam = options.enums === String ? "UNKNOWN" : 0;
            object.autoContinue = false;
        }
        if (message.division != null && message.hasOwnProperty("division"))
            object.division = options.enums === String ? $root.State.Division[message.division] : message.division;
        if (message.firstKickoffTeam != null && message.hasOwnProperty("firstKickoffTeam"))
            object.firstKickoffTeam = options.enums === String ? $root.Team[message.firstKickoffTeam] : message.firstKickoffTeam;
        if (message.autoContinue != null && message.hasOwnProperty("autoContinue"))
            object.autoContinue = message.autoContinue;
        let keys2;
        if (message.gameEventBehavior && (keys2 = Object.keys(message.gameEventBehavior)).length) {
            object.gameEventBehavior = {};
            for (let j = 0; j < keys2.length; ++j)
                object.gameEventBehavior[keys2[j]] = options.enums === String ? $root.State.GameEventBehavior[message.gameEventBehavior[keys2[j]]] : message.gameEventBehavior[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this UpdateConfig to JSON.
     * @function toJSON
     * @memberof UpdateConfig
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdateConfig.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpdateConfig;
})();

export const UpdateTeamState = $root.UpdateTeamState = (() => {

    /**
     * Properties of an UpdateTeamState.
     * @exports IUpdateTeamState
     * @interface IUpdateTeamState
     * @property {Team|null} [forTeam] UpdateTeamState forTeam
     * @property {string|null} [teamName] UpdateTeamState teamName
     * @property {number|null} [goals] UpdateTeamState goals
     * @property {number|null} [goalkeeper] UpdateTeamState goalkeeper
     * @property {number|null} [timeoutsLeft] UpdateTeamState timeoutsLeft
     * @property {string|null} [timeoutTimeLeft] UpdateTeamState timeoutTimeLeft
     * @property {boolean|null} [onPositiveHalf] UpdateTeamState onPositiveHalf
     * @property {number|null} [ballPlacementFailures] UpdateTeamState ballPlacementFailures
     * @property {boolean|null} [canPlaceBall] UpdateTeamState canPlaceBall
     * @property {boolean|null} [botSubstitutionIntent] UpdateTeamState botSubstitutionIntent
     * @property {IYellowCard|null} [yellowCard] UpdateTeamState yellowCard
     * @property {IRedCard|null} [redCard] UpdateTeamState redCard
     * @property {IFoul|null} [foul] UpdateTeamState foul
     * @property {number|null} [removeYellowCard] UpdateTeamState removeYellowCard
     * @property {number|null} [removeRedCard] UpdateTeamState removeRedCard
     * @property {number|null} [removeFoul] UpdateTeamState removeFoul
     */

    /**
     * Constructs a new UpdateTeamState.
     * @exports UpdateTeamState
     * @classdesc Represents an UpdateTeamState.
     * @implements IUpdateTeamState
     * @constructor
     * @param {IUpdateTeamState=} [properties] Properties to set
     */
    function UpdateTeamState(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdateTeamState forTeam.
     * @member {Team} forTeam
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.forTeam = 0;

    /**
     * UpdateTeamState teamName.
     * @member {string} teamName
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.teamName = "";

    /**
     * UpdateTeamState goals.
     * @member {number} goals
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.goals = 0;

    /**
     * UpdateTeamState goalkeeper.
     * @member {number} goalkeeper
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.goalkeeper = 0;

    /**
     * UpdateTeamState timeoutsLeft.
     * @member {number} timeoutsLeft
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.timeoutsLeft = 0;

    /**
     * UpdateTeamState timeoutTimeLeft.
     * @member {string} timeoutTimeLeft
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.timeoutTimeLeft = "";

    /**
     * UpdateTeamState onPositiveHalf.
     * @member {boolean} onPositiveHalf
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.onPositiveHalf = false;

    /**
     * UpdateTeamState ballPlacementFailures.
     * @member {number} ballPlacementFailures
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.ballPlacementFailures = 0;

    /**
     * UpdateTeamState canPlaceBall.
     * @member {boolean} canPlaceBall
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.canPlaceBall = false;

    /**
     * UpdateTeamState botSubstitutionIntent.
     * @member {boolean} botSubstitutionIntent
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.botSubstitutionIntent = false;

    /**
     * UpdateTeamState yellowCard.
     * @member {IYellowCard|null|undefined} yellowCard
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.yellowCard = null;

    /**
     * UpdateTeamState redCard.
     * @member {IRedCard|null|undefined} redCard
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.redCard = null;

    /**
     * UpdateTeamState foul.
     * @member {IFoul|null|undefined} foul
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.foul = null;

    /**
     * UpdateTeamState removeYellowCard.
     * @member {number} removeYellowCard
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.removeYellowCard = 0;

    /**
     * UpdateTeamState removeRedCard.
     * @member {number} removeRedCard
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.removeRedCard = 0;

    /**
     * UpdateTeamState removeFoul.
     * @member {number} removeFoul
     * @memberof UpdateTeamState
     * @instance
     */
    UpdateTeamState.prototype.removeFoul = 0;

    /**
     * Creates a new UpdateTeamState instance using the specified properties.
     * @function create
     * @memberof UpdateTeamState
     * @static
     * @param {IUpdateTeamState=} [properties] Properties to set
     * @returns {UpdateTeamState} UpdateTeamState instance
     */
    UpdateTeamState.create = function create(properties) {
        return new UpdateTeamState(properties);
    };

    /**
     * Encodes the specified UpdateTeamState message. Does not implicitly {@link UpdateTeamState.verify|verify} messages.
     * @function encode
     * @memberof UpdateTeamState
     * @static
     * @param {IUpdateTeamState} message UpdateTeamState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateTeamState.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.forTeam);
        if (message.teamName != null && message.hasOwnProperty("teamName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.teamName);
        if (message.goals != null && message.hasOwnProperty("goals"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.goals);
        if (message.goalkeeper != null && message.hasOwnProperty("goalkeeper"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.goalkeeper);
        if (message.timeoutsLeft != null && message.hasOwnProperty("timeoutsLeft"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.timeoutsLeft);
        if (message.timeoutTimeLeft != null && message.hasOwnProperty("timeoutTimeLeft"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.timeoutTimeLeft);
        if (message.onPositiveHalf != null && message.hasOwnProperty("onPositiveHalf"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.onPositiveHalf);
        if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ballPlacementFailures);
        if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
            writer.uint32(/* id 9, wireType 0 =*/72).bool(message.canPlaceBall);
        if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
            writer.uint32(/* id 10, wireType 0 =*/80).bool(message.botSubstitutionIntent);
        if (message.yellowCard != null && message.hasOwnProperty("yellowCard"))
            $root.YellowCard.encode(message.yellowCard, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.redCard != null && message.hasOwnProperty("redCard"))
            $root.RedCard.encode(message.redCard, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
        if (message.foul != null && message.hasOwnProperty("foul"))
            $root.Foul.encode(message.foul, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.removeYellowCard != null && message.hasOwnProperty("removeYellowCard"))
            writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.removeYellowCard);
        if (message.removeRedCard != null && message.hasOwnProperty("removeRedCard"))
            writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.removeRedCard);
        if (message.removeFoul != null && message.hasOwnProperty("removeFoul"))
            writer.uint32(/* id 16, wireType 0 =*/128).uint32(message.removeFoul);
        return writer;
    };

    /**
     * Encodes the specified UpdateTeamState message, length delimited. Does not implicitly {@link UpdateTeamState.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdateTeamState
     * @static
     * @param {IUpdateTeamState} message UpdateTeamState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateTeamState.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpdateTeamState message from the specified reader or buffer.
     * @function decode
     * @memberof UpdateTeamState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdateTeamState} UpdateTeamState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateTeamState.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpdateTeamState();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.forTeam = reader.int32();
                break;
            case 2:
                message.teamName = reader.string();
                break;
            case 3:
                message.goals = reader.int32();
                break;
            case 4:
                message.goalkeeper = reader.int32();
                break;
            case 5:
                message.timeoutsLeft = reader.int32();
                break;
            case 6:
                message.timeoutTimeLeft = reader.string();
                break;
            case 7:
                message.onPositiveHalf = reader.bool();
                break;
            case 8:
                message.ballPlacementFailures = reader.int32();
                break;
            case 9:
                message.canPlaceBall = reader.bool();
                break;
            case 10:
                message.botSubstitutionIntent = reader.bool();
                break;
            case 11:
                message.yellowCard = $root.YellowCard.decode(reader, reader.uint32());
                break;
            case 12:
                message.redCard = $root.RedCard.decode(reader, reader.uint32());
                break;
            case 13:
                message.foul = $root.Foul.decode(reader, reader.uint32());
                break;
            case 14:
                message.removeYellowCard = reader.uint32();
                break;
            case 15:
                message.removeRedCard = reader.uint32();
                break;
            case 16:
                message.removeFoul = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UpdateTeamState message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdateTeamState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdateTeamState} UpdateTeamState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateTeamState.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdateTeamState message.
     * @function verify
     * @memberof UpdateTeamState
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdateTeamState.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            switch (message.forTeam) {
            default:
                return "forTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.teamName != null && message.hasOwnProperty("teamName"))
            if (!$util.isString(message.teamName))
                return "teamName: string expected";
        if (message.goals != null && message.hasOwnProperty("goals"))
            if (!$util.isInteger(message.goals))
                return "goals: integer expected";
        if (message.goalkeeper != null && message.hasOwnProperty("goalkeeper"))
            if (!$util.isInteger(message.goalkeeper))
                return "goalkeeper: integer expected";
        if (message.timeoutsLeft != null && message.hasOwnProperty("timeoutsLeft"))
            if (!$util.isInteger(message.timeoutsLeft))
                return "timeoutsLeft: integer expected";
        if (message.timeoutTimeLeft != null && message.hasOwnProperty("timeoutTimeLeft"))
            if (!$util.isString(message.timeoutTimeLeft))
                return "timeoutTimeLeft: string expected";
        if (message.onPositiveHalf != null && message.hasOwnProperty("onPositiveHalf"))
            if (typeof message.onPositiveHalf !== "boolean")
                return "onPositiveHalf: boolean expected";
        if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
            if (!$util.isInteger(message.ballPlacementFailures))
                return "ballPlacementFailures: integer expected";
        if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
            if (typeof message.canPlaceBall !== "boolean")
                return "canPlaceBall: boolean expected";
        if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
            if (typeof message.botSubstitutionIntent !== "boolean")
                return "botSubstitutionIntent: boolean expected";
        if (message.yellowCard != null && message.hasOwnProperty("yellowCard")) {
            let error = $root.YellowCard.verify(message.yellowCard);
            if (error)
                return "yellowCard." + error;
        }
        if (message.redCard != null && message.hasOwnProperty("redCard")) {
            let error = $root.RedCard.verify(message.redCard);
            if (error)
                return "redCard." + error;
        }
        if (message.foul != null && message.hasOwnProperty("foul")) {
            let error = $root.Foul.verify(message.foul);
            if (error)
                return "foul." + error;
        }
        if (message.removeYellowCard != null && message.hasOwnProperty("removeYellowCard"))
            if (!$util.isInteger(message.removeYellowCard))
                return "removeYellowCard: integer expected";
        if (message.removeRedCard != null && message.hasOwnProperty("removeRedCard"))
            if (!$util.isInteger(message.removeRedCard))
                return "removeRedCard: integer expected";
        if (message.removeFoul != null && message.hasOwnProperty("removeFoul"))
            if (!$util.isInteger(message.removeFoul))
                return "removeFoul: integer expected";
        return null;
    };

    /**
     * Creates an UpdateTeamState message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdateTeamState
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdateTeamState} UpdateTeamState
     */
    UpdateTeamState.fromObject = function fromObject(object) {
        if (object instanceof $root.UpdateTeamState)
            return object;
        let message = new $root.UpdateTeamState();
        switch (object.forTeam) {
        case "UNKNOWN":
        case 0:
            message.forTeam = 0;
            break;
        case "YELLOW":
        case 1:
            message.forTeam = 1;
            break;
        case "BLUE":
        case 2:
            message.forTeam = 2;
            break;
        }
        if (object.teamName != null)
            message.teamName = String(object.teamName);
        if (object.goals != null)
            message.goals = object.goals | 0;
        if (object.goalkeeper != null)
            message.goalkeeper = object.goalkeeper | 0;
        if (object.timeoutsLeft != null)
            message.timeoutsLeft = object.timeoutsLeft | 0;
        if (object.timeoutTimeLeft != null)
            message.timeoutTimeLeft = String(object.timeoutTimeLeft);
        if (object.onPositiveHalf != null)
            message.onPositiveHalf = Boolean(object.onPositiveHalf);
        if (object.ballPlacementFailures != null)
            message.ballPlacementFailures = object.ballPlacementFailures | 0;
        if (object.canPlaceBall != null)
            message.canPlaceBall = Boolean(object.canPlaceBall);
        if (object.botSubstitutionIntent != null)
            message.botSubstitutionIntent = Boolean(object.botSubstitutionIntent);
        if (object.yellowCard != null) {
            if (typeof object.yellowCard !== "object")
                throw TypeError(".UpdateTeamState.yellowCard: object expected");
            message.yellowCard = $root.YellowCard.fromObject(object.yellowCard);
        }
        if (object.redCard != null) {
            if (typeof object.redCard !== "object")
                throw TypeError(".UpdateTeamState.redCard: object expected");
            message.redCard = $root.RedCard.fromObject(object.redCard);
        }
        if (object.foul != null) {
            if (typeof object.foul !== "object")
                throw TypeError(".UpdateTeamState.foul: object expected");
            message.foul = $root.Foul.fromObject(object.foul);
        }
        if (object.removeYellowCard != null)
            message.removeYellowCard = object.removeYellowCard >>> 0;
        if (object.removeRedCard != null)
            message.removeRedCard = object.removeRedCard >>> 0;
        if (object.removeFoul != null)
            message.removeFoul = object.removeFoul >>> 0;
        return message;
    };

    /**
     * Creates a plain object from an UpdateTeamState message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdateTeamState
     * @static
     * @param {UpdateTeamState} message UpdateTeamState
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpdateTeamState.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.forTeam = options.enums === String ? "UNKNOWN" : 0;
            object.teamName = "";
            object.goals = 0;
            object.goalkeeper = 0;
            object.timeoutsLeft = 0;
            object.timeoutTimeLeft = "";
            object.onPositiveHalf = false;
            object.ballPlacementFailures = 0;
            object.canPlaceBall = false;
            object.botSubstitutionIntent = false;
            object.yellowCard = null;
            object.redCard = null;
            object.foul = null;
            object.removeYellowCard = 0;
            object.removeRedCard = 0;
            object.removeFoul = 0;
        }
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            object.forTeam = options.enums === String ? $root.Team[message.forTeam] : message.forTeam;
        if (message.teamName != null && message.hasOwnProperty("teamName"))
            object.teamName = message.teamName;
        if (message.goals != null && message.hasOwnProperty("goals"))
            object.goals = message.goals;
        if (message.goalkeeper != null && message.hasOwnProperty("goalkeeper"))
            object.goalkeeper = message.goalkeeper;
        if (message.timeoutsLeft != null && message.hasOwnProperty("timeoutsLeft"))
            object.timeoutsLeft = message.timeoutsLeft;
        if (message.timeoutTimeLeft != null && message.hasOwnProperty("timeoutTimeLeft"))
            object.timeoutTimeLeft = message.timeoutTimeLeft;
        if (message.onPositiveHalf != null && message.hasOwnProperty("onPositiveHalf"))
            object.onPositiveHalf = message.onPositiveHalf;
        if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
            object.ballPlacementFailures = message.ballPlacementFailures;
        if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
            object.canPlaceBall = message.canPlaceBall;
        if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
            object.botSubstitutionIntent = message.botSubstitutionIntent;
        if (message.yellowCard != null && message.hasOwnProperty("yellowCard"))
            object.yellowCard = $root.YellowCard.toObject(message.yellowCard, options);
        if (message.redCard != null && message.hasOwnProperty("redCard"))
            object.redCard = $root.RedCard.toObject(message.redCard, options);
        if (message.foul != null && message.hasOwnProperty("foul"))
            object.foul = $root.Foul.toObject(message.foul, options);
        if (message.removeYellowCard != null && message.hasOwnProperty("removeYellowCard"))
            object.removeYellowCard = message.removeYellowCard;
        if (message.removeRedCard != null && message.hasOwnProperty("removeRedCard"))
            object.removeRedCard = message.removeRedCard;
        if (message.removeFoul != null && message.hasOwnProperty("removeFoul"))
            object.removeFoul = message.removeFoul;
        return object;
    };

    /**
     * Converts this UpdateTeamState to JSON.
     * @function toJSON
     * @memberof UpdateTeamState
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdateTeamState.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpdateTeamState;
})();

export const SwitchColors = $root.SwitchColors = (() => {

    /**
     * Properties of a SwitchColors.
     * @exports ISwitchColors
     * @interface ISwitchColors
     */

    /**
     * Constructs a new SwitchColors.
     * @exports SwitchColors
     * @classdesc Represents a SwitchColors.
     * @implements ISwitchColors
     * @constructor
     * @param {ISwitchColors=} [properties] Properties to set
     */
    function SwitchColors(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new SwitchColors instance using the specified properties.
     * @function create
     * @memberof SwitchColors
     * @static
     * @param {ISwitchColors=} [properties] Properties to set
     * @returns {SwitchColors} SwitchColors instance
     */
    SwitchColors.create = function create(properties) {
        return new SwitchColors(properties);
    };

    /**
     * Encodes the specified SwitchColors message. Does not implicitly {@link SwitchColors.verify|verify} messages.
     * @function encode
     * @memberof SwitchColors
     * @static
     * @param {ISwitchColors} message SwitchColors message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SwitchColors.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified SwitchColors message, length delimited. Does not implicitly {@link SwitchColors.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SwitchColors
     * @static
     * @param {ISwitchColors} message SwitchColors message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SwitchColors.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SwitchColors message from the specified reader or buffer.
     * @function decode
     * @memberof SwitchColors
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SwitchColors} SwitchColors
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SwitchColors.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SwitchColors();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SwitchColors message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SwitchColors
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SwitchColors} SwitchColors
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SwitchColors.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SwitchColors message.
     * @function verify
     * @memberof SwitchColors
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SwitchColors.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a SwitchColors message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SwitchColors
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SwitchColors} SwitchColors
     */
    SwitchColors.fromObject = function fromObject(object) {
        if (object instanceof $root.SwitchColors)
            return object;
        return new $root.SwitchColors();
    };

    /**
     * Creates a plain object from a SwitchColors message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SwitchColors
     * @static
     * @param {SwitchColors} message SwitchColors
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SwitchColors.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this SwitchColors to JSON.
     * @function toJSON
     * @memberof SwitchColors
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SwitchColors.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SwitchColors;
})();

export const Revert = $root.Revert = (() => {

    /**
     * Properties of a Revert.
     * @exports IRevert
     * @interface IRevert
     * @property {number|null} [changeId] Revert changeId
     */

    /**
     * Constructs a new Revert.
     * @exports Revert
     * @classdesc Represents a Revert.
     * @implements IRevert
     * @constructor
     * @param {IRevert=} [properties] Properties to set
     */
    function Revert(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Revert changeId.
     * @member {number} changeId
     * @memberof Revert
     * @instance
     */
    Revert.prototype.changeId = 0;

    /**
     * Creates a new Revert instance using the specified properties.
     * @function create
     * @memberof Revert
     * @static
     * @param {IRevert=} [properties] Properties to set
     * @returns {Revert} Revert instance
     */
    Revert.create = function create(properties) {
        return new Revert(properties);
    };

    /**
     * Encodes the specified Revert message. Does not implicitly {@link Revert.verify|verify} messages.
     * @function encode
     * @memberof Revert
     * @static
     * @param {IRevert} message Revert message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Revert.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.changeId != null && message.hasOwnProperty("changeId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.changeId);
        return writer;
    };

    /**
     * Encodes the specified Revert message, length delimited. Does not implicitly {@link Revert.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Revert
     * @static
     * @param {IRevert} message Revert message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Revert.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Revert message from the specified reader or buffer.
     * @function decode
     * @memberof Revert
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Revert} Revert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Revert.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Revert();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.changeId = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Revert message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Revert
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Revert} Revert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Revert.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Revert message.
     * @function verify
     * @memberof Revert
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Revert.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.changeId != null && message.hasOwnProperty("changeId"))
            if (!$util.isInteger(message.changeId))
                return "changeId: integer expected";
        return null;
    };

    /**
     * Creates a Revert message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Revert
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Revert} Revert
     */
    Revert.fromObject = function fromObject(object) {
        if (object instanceof $root.Revert)
            return object;
        let message = new $root.Revert();
        if (object.changeId != null)
            message.changeId = object.changeId | 0;
        return message;
    };

    /**
     * Creates a plain object from a Revert message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Revert
     * @static
     * @param {Revert} message Revert
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Revert.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.changeId = 0;
        if (message.changeId != null && message.hasOwnProperty("changeId"))
            object.changeId = message.changeId;
        return object;
    };

    /**
     * Converts this Revert to JSON.
     * @function toJSON
     * @memberof Revert
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Revert.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Revert;
})();

export const YellowCard = $root.YellowCard = (() => {

    /**
     * Properties of a YellowCard.
     * @exports IYellowCard
     * @interface IYellowCard
     * @property {number|null} [id] YellowCard id
     * @property {IGameEvent|null} [causedByGameEvent] YellowCard causedByGameEvent
     * @property {google.protobuf.IDuration|null} [timeRemaining] YellowCard timeRemaining
     */

    /**
     * Constructs a new YellowCard.
     * @exports YellowCard
     * @classdesc Represents a YellowCard.
     * @implements IYellowCard
     * @constructor
     * @param {IYellowCard=} [properties] Properties to set
     */
    function YellowCard(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * YellowCard id.
     * @member {number} id
     * @memberof YellowCard
     * @instance
     */
    YellowCard.prototype.id = 0;

    /**
     * YellowCard causedByGameEvent.
     * @member {IGameEvent|null|undefined} causedByGameEvent
     * @memberof YellowCard
     * @instance
     */
    YellowCard.prototype.causedByGameEvent = null;

    /**
     * YellowCard timeRemaining.
     * @member {google.protobuf.IDuration|null|undefined} timeRemaining
     * @memberof YellowCard
     * @instance
     */
    YellowCard.prototype.timeRemaining = null;

    /**
     * Creates a new YellowCard instance using the specified properties.
     * @function create
     * @memberof YellowCard
     * @static
     * @param {IYellowCard=} [properties] Properties to set
     * @returns {YellowCard} YellowCard instance
     */
    YellowCard.create = function create(properties) {
        return new YellowCard(properties);
    };

    /**
     * Encodes the specified YellowCard message. Does not implicitly {@link YellowCard.verify|verify} messages.
     * @function encode
     * @memberof YellowCard
     * @static
     * @param {IYellowCard} message YellowCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YellowCard.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            $root.GameEvent.encode(message.causedByGameEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.timeRemaining != null && message.hasOwnProperty("timeRemaining"))
            $root.google.protobuf.Duration.encode(message.timeRemaining, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified YellowCard message, length delimited. Does not implicitly {@link YellowCard.verify|verify} messages.
     * @function encodeDelimited
     * @memberof YellowCard
     * @static
     * @param {IYellowCard} message YellowCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YellowCard.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a YellowCard message from the specified reader or buffer.
     * @function decode
     * @memberof YellowCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {YellowCard} YellowCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YellowCard.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.YellowCard();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.uint32();
                break;
            case 2:
                message.causedByGameEvent = $root.GameEvent.decode(reader, reader.uint32());
                break;
            case 3:
                message.timeRemaining = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a YellowCard message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof YellowCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {YellowCard} YellowCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YellowCard.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a YellowCard message.
     * @function verify
     * @memberof YellowCard
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    YellowCard.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent")) {
            let error = $root.GameEvent.verify(message.causedByGameEvent);
            if (error)
                return "causedByGameEvent." + error;
        }
        if (message.timeRemaining != null && message.hasOwnProperty("timeRemaining")) {
            let error = $root.google.protobuf.Duration.verify(message.timeRemaining);
            if (error)
                return "timeRemaining." + error;
        }
        return null;
    };

    /**
     * Creates a YellowCard message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof YellowCard
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {YellowCard} YellowCard
     */
    YellowCard.fromObject = function fromObject(object) {
        if (object instanceof $root.YellowCard)
            return object;
        let message = new $root.YellowCard();
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.causedByGameEvent != null) {
            if (typeof object.causedByGameEvent !== "object")
                throw TypeError(".YellowCard.causedByGameEvent: object expected");
            message.causedByGameEvent = $root.GameEvent.fromObject(object.causedByGameEvent);
        }
        if (object.timeRemaining != null) {
            if (typeof object.timeRemaining !== "object")
                throw TypeError(".YellowCard.timeRemaining: object expected");
            message.timeRemaining = $root.google.protobuf.Duration.fromObject(object.timeRemaining);
        }
        return message;
    };

    /**
     * Creates a plain object from a YellowCard message. Also converts values to other types if specified.
     * @function toObject
     * @memberof YellowCard
     * @static
     * @param {YellowCard} message YellowCard
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    YellowCard.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.causedByGameEvent = null;
            object.timeRemaining = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            object.causedByGameEvent = $root.GameEvent.toObject(message.causedByGameEvent, options);
        if (message.timeRemaining != null && message.hasOwnProperty("timeRemaining"))
            object.timeRemaining = $root.google.protobuf.Duration.toObject(message.timeRemaining, options);
        return object;
    };

    /**
     * Converts this YellowCard to JSON.
     * @function toJSON
     * @memberof YellowCard
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    YellowCard.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return YellowCard;
})();

export const RedCard = $root.RedCard = (() => {

    /**
     * Properties of a RedCard.
     * @exports IRedCard
     * @interface IRedCard
     * @property {number|null} [id] RedCard id
     * @property {IGameEvent|null} [causedByGameEvent] RedCard causedByGameEvent
     */

    /**
     * Constructs a new RedCard.
     * @exports RedCard
     * @classdesc Represents a RedCard.
     * @implements IRedCard
     * @constructor
     * @param {IRedCard=} [properties] Properties to set
     */
    function RedCard(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RedCard id.
     * @member {number} id
     * @memberof RedCard
     * @instance
     */
    RedCard.prototype.id = 0;

    /**
     * RedCard causedByGameEvent.
     * @member {IGameEvent|null|undefined} causedByGameEvent
     * @memberof RedCard
     * @instance
     */
    RedCard.prototype.causedByGameEvent = null;

    /**
     * Creates a new RedCard instance using the specified properties.
     * @function create
     * @memberof RedCard
     * @static
     * @param {IRedCard=} [properties] Properties to set
     * @returns {RedCard} RedCard instance
     */
    RedCard.create = function create(properties) {
        return new RedCard(properties);
    };

    /**
     * Encodes the specified RedCard message. Does not implicitly {@link RedCard.verify|verify} messages.
     * @function encode
     * @memberof RedCard
     * @static
     * @param {IRedCard} message RedCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RedCard.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            $root.GameEvent.encode(message.causedByGameEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RedCard message, length delimited. Does not implicitly {@link RedCard.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RedCard
     * @static
     * @param {IRedCard} message RedCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RedCard.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RedCard message from the specified reader or buffer.
     * @function decode
     * @memberof RedCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RedCard} RedCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RedCard.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RedCard();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.uint32();
                break;
            case 2:
                message.causedByGameEvent = $root.GameEvent.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RedCard message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RedCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RedCard} RedCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RedCard.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RedCard message.
     * @function verify
     * @memberof RedCard
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RedCard.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent")) {
            let error = $root.GameEvent.verify(message.causedByGameEvent);
            if (error)
                return "causedByGameEvent." + error;
        }
        return null;
    };

    /**
     * Creates a RedCard message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RedCard
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RedCard} RedCard
     */
    RedCard.fromObject = function fromObject(object) {
        if (object instanceof $root.RedCard)
            return object;
        let message = new $root.RedCard();
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.causedByGameEvent != null) {
            if (typeof object.causedByGameEvent !== "object")
                throw TypeError(".RedCard.causedByGameEvent: object expected");
            message.causedByGameEvent = $root.GameEvent.fromObject(object.causedByGameEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from a RedCard message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RedCard
     * @static
     * @param {RedCard} message RedCard
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RedCard.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.causedByGameEvent = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            object.causedByGameEvent = $root.GameEvent.toObject(message.causedByGameEvent, options);
        return object;
    };

    /**
     * Converts this RedCard to JSON.
     * @function toJSON
     * @memberof RedCard
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RedCard.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RedCard;
})();

export const Foul = $root.Foul = (() => {

    /**
     * Properties of a Foul.
     * @exports IFoul
     * @interface IFoul
     * @property {number|null} [id] Foul id
     * @property {IGameEvent|null} [causedByGameEvent] Foul causedByGameEvent
     */

    /**
     * Constructs a new Foul.
     * @exports Foul
     * @classdesc Represents a Foul.
     * @implements IFoul
     * @constructor
     * @param {IFoul=} [properties] Properties to set
     */
    function Foul(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Foul id.
     * @member {number} id
     * @memberof Foul
     * @instance
     */
    Foul.prototype.id = 0;

    /**
     * Foul causedByGameEvent.
     * @member {IGameEvent|null|undefined} causedByGameEvent
     * @memberof Foul
     * @instance
     */
    Foul.prototype.causedByGameEvent = null;

    /**
     * Creates a new Foul instance using the specified properties.
     * @function create
     * @memberof Foul
     * @static
     * @param {IFoul=} [properties] Properties to set
     * @returns {Foul} Foul instance
     */
    Foul.create = function create(properties) {
        return new Foul(properties);
    };

    /**
     * Encodes the specified Foul message. Does not implicitly {@link Foul.verify|verify} messages.
     * @function encode
     * @memberof Foul
     * @static
     * @param {IFoul} message Foul message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Foul.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            $root.GameEvent.encode(message.causedByGameEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Foul message, length delimited. Does not implicitly {@link Foul.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Foul
     * @static
     * @param {IFoul} message Foul message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Foul.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Foul message from the specified reader or buffer.
     * @function decode
     * @memberof Foul
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Foul} Foul
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Foul.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Foul();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.uint32();
                break;
            case 2:
                message.causedByGameEvent = $root.GameEvent.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Foul message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Foul
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Foul} Foul
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Foul.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Foul message.
     * @function verify
     * @memberof Foul
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Foul.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent")) {
            let error = $root.GameEvent.verify(message.causedByGameEvent);
            if (error)
                return "causedByGameEvent." + error;
        }
        return null;
    };

    /**
     * Creates a Foul message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Foul
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Foul} Foul
     */
    Foul.fromObject = function fromObject(object) {
        if (object instanceof $root.Foul)
            return object;
        let message = new $root.Foul();
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.causedByGameEvent != null) {
            if (typeof object.causedByGameEvent !== "object")
                throw TypeError(".Foul.causedByGameEvent: object expected");
            message.causedByGameEvent = $root.GameEvent.fromObject(object.causedByGameEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from a Foul message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Foul
     * @static
     * @param {Foul} message Foul
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Foul.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.causedByGameEvent = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.causedByGameEvent != null && message.hasOwnProperty("causedByGameEvent"))
            object.causedByGameEvent = $root.GameEvent.toObject(message.causedByGameEvent, options);
        return object;
    };

    /**
     * Converts this Foul to JSON.
     * @function toJSON
     * @memberof Foul
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Foul.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Foul;
})();

export const Command = $root.Command = (() => {

    /**
     * Properties of a Command.
     * @exports ICommand
     * @interface ICommand
     * @property {Command.Type} type Command type
     * @property {Team|null} [forTeam] Command forTeam
     */

    /**
     * Constructs a new Command.
     * @exports Command
     * @classdesc Represents a Command.
     * @implements ICommand
     * @constructor
     * @param {ICommand=} [properties] Properties to set
     */
    function Command(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Command type.
     * @member {Command.Type} type
     * @memberof Command
     * @instance
     */
    Command.prototype.type = 0;

    /**
     * Command forTeam.
     * @member {Team} forTeam
     * @memberof Command
     * @instance
     */
    Command.prototype.forTeam = 0;

    /**
     * Creates a new Command instance using the specified properties.
     * @function create
     * @memberof Command
     * @static
     * @param {ICommand=} [properties] Properties to set
     * @returns {Command} Command instance
     */
    Command.create = function create(properties) {
        return new Command(properties);
    };

    /**
     * Encodes the specified Command message. Does not implicitly {@link Command.verify|verify} messages.
     * @function encode
     * @memberof Command
     * @static
     * @param {ICommand} message Command message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Command.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.forTeam);
        return writer;
    };

    /**
     * Encodes the specified Command message, length delimited. Does not implicitly {@link Command.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Command
     * @static
     * @param {ICommand} message Command message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Command.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Command message from the specified reader or buffer.
     * @function decode
     * @memberof Command
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Command} Command
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Command.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Command();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int32();
                break;
            case 2:
                message.forTeam = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("type"))
            throw $util.ProtocolError("missing required 'type'", { instance: message });
        return message;
    };

    /**
     * Decodes a Command message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Command
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Command} Command
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Command.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Command message.
     * @function verify
     * @memberof Command
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Command.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        switch (message.type) {
        default:
            return "type: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            break;
        }
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            switch (message.forTeam) {
            default:
                return "forTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a Command message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Command
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Command} Command
     */
    Command.fromObject = function fromObject(object) {
        if (object instanceof $root.Command)
            return object;
        let message = new $root.Command();
        switch (object.type) {
        case "UNKNOWN":
        case 0:
            message.type = 0;
            break;
        case "HALT":
        case 1:
            message.type = 1;
            break;
        case "STOP":
        case 2:
            message.type = 2;
            break;
        case "NORMAL_START":
        case 3:
            message.type = 3;
            break;
        case "FORCE_START":
        case 4:
            message.type = 4;
            break;
        case "DIRECT":
        case 5:
            message.type = 5;
            break;
        case "INDIRECT":
        case 6:
            message.type = 6;
            break;
        case "KICKOFF":
        case 7:
            message.type = 7;
            break;
        case "PENALTY":
        case 8:
            message.type = 8;
            break;
        case "TIMEOUT":
        case 9:
            message.type = 9;
            break;
        case "BALL_PLACEMENT":
        case 10:
            message.type = 10;
            break;
        }
        switch (object.forTeam) {
        case "UNKNOWN":
        case 0:
            message.forTeam = 0;
            break;
        case "YELLOW":
        case 1:
            message.forTeam = 1;
            break;
        case "BLUE":
        case 2:
            message.forTeam = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Command message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Command
     * @static
     * @param {Command} message Command
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Command.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.type = options.enums === String ? "UNKNOWN" : 0;
            object.forTeam = options.enums === String ? "UNKNOWN" : 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.Command.Type[message.type] : message.type;
        if (message.forTeam != null && message.hasOwnProperty("forTeam"))
            object.forTeam = options.enums === String ? $root.Team[message.forTeam] : message.forTeam;
        return object;
    };

    /**
     * Converts this Command to JSON.
     * @function toJSON
     * @memberof Command
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Command.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Type enum.
     * @name Command.Type
     * @enum {string}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} HALT=1 HALT value
     * @property {number} STOP=2 STOP value
     * @property {number} NORMAL_START=3 NORMAL_START value
     * @property {number} FORCE_START=4 FORCE_START value
     * @property {number} DIRECT=5 DIRECT value
     * @property {number} INDIRECT=6 INDIRECT value
     * @property {number} KICKOFF=7 KICKOFF value
     * @property {number} PENALTY=8 PENALTY value
     * @property {number} TIMEOUT=9 TIMEOUT value
     * @property {number} BALL_PLACEMENT=10 BALL_PLACEMENT value
     */
    Command.Type = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "HALT"] = 1;
        values[valuesById[2] = "STOP"] = 2;
        values[valuesById[3] = "NORMAL_START"] = 3;
        values[valuesById[4] = "FORCE_START"] = 4;
        values[valuesById[5] = "DIRECT"] = 5;
        values[valuesById[6] = "INDIRECT"] = 6;
        values[valuesById[7] = "KICKOFF"] = 7;
        values[valuesById[8] = "PENALTY"] = 8;
        values[valuesById[9] = "TIMEOUT"] = 9;
        values[valuesById[10] = "BALL_PLACEMENT"] = 10;
        return values;
    })();

    return Command;
})();

export const TeamInfo = $root.TeamInfo = (() => {

    /**
     * Properties of a TeamInfo.
     * @exports ITeamInfo
     * @interface ITeamInfo
     * @property {string|null} [name] TeamInfo name
     * @property {number|null} [goals] TeamInfo goals
     * @property {number|null} [goalkeeper] TeamInfo goalkeeper
     * @property {Array.<IYellowCard>|null} [yellowCards] TeamInfo yellowCards
     * @property {Array.<IRedCard>|null} [redCards] TeamInfo redCards
     * @property {number|null} [timeoutsLeft] TeamInfo timeoutsLeft
     * @property {google.protobuf.IDuration|null} [timeoutTimeLeft] TeamInfo timeoutTimeLeft
     * @property {boolean|null} [onPositiveHalf] TeamInfo onPositiveHalf
     * @property {Array.<IFoul>|null} [fouls] TeamInfo fouls
     * @property {number|null} [ballPlacementFailures] TeamInfo ballPlacementFailures
     * @property {boolean|null} [ballPlacementFailuresReached] TeamInfo ballPlacementFailuresReached
     * @property {boolean|null} [canPlaceBall] TeamInfo canPlaceBall
     * @property {number|null} [maxAllowedBots] TeamInfo maxAllowedBots
     * @property {boolean|null} [botSubstitutionIntent] TeamInfo botSubstitutionIntent
     */

    /**
     * Constructs a new TeamInfo.
     * @exports TeamInfo
     * @classdesc Represents a TeamInfo.
     * @implements ITeamInfo
     * @constructor
     * @param {ITeamInfo=} [properties] Properties to set
     */
    function TeamInfo(properties) {
        this.yellowCards = [];
        this.redCards = [];
        this.fouls = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TeamInfo name.
     * @member {string} name
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.name = "";

    /**
     * TeamInfo goals.
     * @member {number} goals
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.goals = 0;

    /**
     * TeamInfo goalkeeper.
     * @member {number} goalkeeper
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.goalkeeper = 0;

    /**
     * TeamInfo yellowCards.
     * @member {Array.<IYellowCard>} yellowCards
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.yellowCards = $util.emptyArray;

    /**
     * TeamInfo redCards.
     * @member {Array.<IRedCard>} redCards
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.redCards = $util.emptyArray;

    /**
     * TeamInfo timeoutsLeft.
     * @member {number} timeoutsLeft
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.timeoutsLeft = 0;

    /**
     * TeamInfo timeoutTimeLeft.
     * @member {google.protobuf.IDuration|null|undefined} timeoutTimeLeft
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.timeoutTimeLeft = null;

    /**
     * TeamInfo onPositiveHalf.
     * @member {boolean} onPositiveHalf
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.onPositiveHalf = false;

    /**
     * TeamInfo fouls.
     * @member {Array.<IFoul>} fouls
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.fouls = $util.emptyArray;

    /**
     * TeamInfo ballPlacementFailures.
     * @member {number} ballPlacementFailures
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.ballPlacementFailures = 0;

    /**
     * TeamInfo ballPlacementFailuresReached.
     * @member {boolean} ballPlacementFailuresReached
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.ballPlacementFailuresReached = false;

    /**
     * TeamInfo canPlaceBall.
     * @member {boolean} canPlaceBall
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.canPlaceBall = false;

    /**
     * TeamInfo maxAllowedBots.
     * @member {number} maxAllowedBots
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.maxAllowedBots = 0;

    /**
     * TeamInfo botSubstitutionIntent.
     * @member {boolean} botSubstitutionIntent
     * @memberof TeamInfo
     * @instance
     */
    TeamInfo.prototype.botSubstitutionIntent = false;

    /**
     * Creates a new TeamInfo instance using the specified properties.
     * @function create
     * @memberof TeamInfo
     * @static
     * @param {ITeamInfo=} [properties] Properties to set
     * @returns {TeamInfo} TeamInfo instance
     */
    TeamInfo.create = function create(properties) {
        return new TeamInfo(properties);
    };

    /**
     * Encodes the specified TeamInfo message. Does not implicitly {@link TeamInfo.verify|verify} messages.
     * @function encode
     * @memberof TeamInfo
     * @static
     * @param {ITeamInfo} message TeamInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TeamInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.goals != null && message.hasOwnProperty("goals"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.goals);
        if (message.goalkeeper != null && message.hasOwnProperty("goalkeeper"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.goalkeeper);
        if (message.yellowCards != null && message.yellowCards.length)
            for (let i = 0; i < message.yellowCards.length; ++i)
                $root.YellowCard.encode(message.yellowCards[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.redCards != null && message.redCards.length)
            for (let i = 0; i < message.redCards.length; ++i)
                $root.RedCard.encode(message.redCards[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.timeoutsLeft != null && message.hasOwnProperty("timeoutsLeft"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.timeoutsLeft);
        if (message.timeoutTimeLeft != null && message.hasOwnProperty("timeoutTimeLeft"))
            $root.google.protobuf.Duration.encode(message.timeoutTimeLeft, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.onPositiveHalf != null && message.hasOwnProperty("onPositiveHalf"))
            writer.uint32(/* id 8, wireType 0 =*/64).bool(message.onPositiveHalf);
        if (message.fouls != null && message.fouls.length)
            for (let i = 0; i < message.fouls.length; ++i)
                $root.Foul.encode(message.fouls[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.ballPlacementFailures);
        if (message.ballPlacementFailuresReached != null && message.hasOwnProperty("ballPlacementFailuresReached"))
            writer.uint32(/* id 11, wireType 0 =*/88).bool(message.ballPlacementFailuresReached);
        if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
            writer.uint32(/* id 12, wireType 0 =*/96).bool(message.canPlaceBall);
        if (message.maxAllowedBots != null && message.hasOwnProperty("maxAllowedBots"))
            writer.uint32(/* id 13, wireType 0 =*/104).int32(message.maxAllowedBots);
        if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
            writer.uint32(/* id 14, wireType 0 =*/112).bool(message.botSubstitutionIntent);
        return writer;
    };

    /**
     * Encodes the specified TeamInfo message, length delimited. Does not implicitly {@link TeamInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TeamInfo
     * @static
     * @param {ITeamInfo} message TeamInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TeamInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TeamInfo message from the specified reader or buffer.
     * @function decode
     * @memberof TeamInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TeamInfo} TeamInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TeamInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TeamInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.goals = reader.int32();
                break;
            case 3:
                message.goalkeeper = reader.int32();
                break;
            case 4:
                if (!(message.yellowCards && message.yellowCards.length))
                    message.yellowCards = [];
                message.yellowCards.push($root.YellowCard.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.redCards && message.redCards.length))
                    message.redCards = [];
                message.redCards.push($root.RedCard.decode(reader, reader.uint32()));
                break;
            case 6:
                message.timeoutsLeft = reader.int32();
                break;
            case 7:
                message.timeoutTimeLeft = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                break;
            case 8:
                message.onPositiveHalf = reader.bool();
                break;
            case 9:
                if (!(message.fouls && message.fouls.length))
                    message.fouls = [];
                message.fouls.push($root.Foul.decode(reader, reader.uint32()));
                break;
            case 10:
                message.ballPlacementFailures = reader.int32();
                break;
            case 11:
                message.ballPlacementFailuresReached = reader.bool();
                break;
            case 12:
                message.canPlaceBall = reader.bool();
                break;
            case 13:
                message.maxAllowedBots = reader.int32();
                break;
            case 14:
                message.botSubstitutionIntent = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TeamInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TeamInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TeamInfo} TeamInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TeamInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TeamInfo message.
     * @function verify
     * @memberof TeamInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TeamInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.goals != null && message.hasOwnProperty("goals"))
            if (!$util.isInteger(message.goals))
                return "goals: integer expected";
        if (message.goalkeeper != null && message.hasOwnProperty("goalkeeper"))
            if (!$util.isInteger(message.goalkeeper))
                return "goalkeeper: integer expected";
        if (message.yellowCards != null && message.hasOwnProperty("yellowCards")) {
            if (!Array.isArray(message.yellowCards))
                return "yellowCards: array expected";
            for (let i = 0; i < message.yellowCards.length; ++i) {
                let error = $root.YellowCard.verify(message.yellowCards[i]);
                if (error)
                    return "yellowCards." + error;
            }
        }
        if (message.redCards != null && message.hasOwnProperty("redCards")) {
            if (!Array.isArray(message.redCards))
                return "redCards: array expected";
            for (let i = 0; i < message.redCards.length; ++i) {
                let error = $root.RedCard.verify(message.redCards[i]);
                if (error)
                    return "redCards." + error;
            }
        }
        if (message.timeoutsLeft != null && message.hasOwnProperty("timeoutsLeft"))
            if (!$util.isInteger(message.timeoutsLeft))
                return "timeoutsLeft: integer expected";
        if (message.timeoutTimeLeft != null && message.hasOwnProperty("timeoutTimeLeft")) {
            let error = $root.google.protobuf.Duration.verify(message.timeoutTimeLeft);
            if (error)
                return "timeoutTimeLeft." + error;
        }
        if (message.onPositiveHalf != null && message.hasOwnProperty("onPositiveHalf"))
            if (typeof message.onPositiveHalf !== "boolean")
                return "onPositiveHalf: boolean expected";
        if (message.fouls != null && message.hasOwnProperty("fouls")) {
            if (!Array.isArray(message.fouls))
                return "fouls: array expected";
            for (let i = 0; i < message.fouls.length; ++i) {
                let error = $root.Foul.verify(message.fouls[i]);
                if (error)
                    return "fouls." + error;
            }
        }
        if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
            if (!$util.isInteger(message.ballPlacementFailures))
                return "ballPlacementFailures: integer expected";
        if (message.ballPlacementFailuresReached != null && message.hasOwnProperty("ballPlacementFailuresReached"))
            if (typeof message.ballPlacementFailuresReached !== "boolean")
                return "ballPlacementFailuresReached: boolean expected";
        if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
            if (typeof message.canPlaceBall !== "boolean")
                return "canPlaceBall: boolean expected";
        if (message.maxAllowedBots != null && message.hasOwnProperty("maxAllowedBots"))
            if (!$util.isInteger(message.maxAllowedBots))
                return "maxAllowedBots: integer expected";
        if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
            if (typeof message.botSubstitutionIntent !== "boolean")
                return "botSubstitutionIntent: boolean expected";
        return null;
    };

    /**
     * Creates a TeamInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TeamInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TeamInfo} TeamInfo
     */
    TeamInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.TeamInfo)
            return object;
        let message = new $root.TeamInfo();
        if (object.name != null)
            message.name = String(object.name);
        if (object.goals != null)
            message.goals = object.goals | 0;
        if (object.goalkeeper != null)
            message.goalkeeper = object.goalkeeper | 0;
        if (object.yellowCards) {
            if (!Array.isArray(object.yellowCards))
                throw TypeError(".TeamInfo.yellowCards: array expected");
            message.yellowCards = [];
            for (let i = 0; i < object.yellowCards.length; ++i) {
                if (typeof object.yellowCards[i] !== "object")
                    throw TypeError(".TeamInfo.yellowCards: object expected");
                message.yellowCards[i] = $root.YellowCard.fromObject(object.yellowCards[i]);
            }
        }
        if (object.redCards) {
            if (!Array.isArray(object.redCards))
                throw TypeError(".TeamInfo.redCards: array expected");
            message.redCards = [];
            for (let i = 0; i < object.redCards.length; ++i) {
                if (typeof object.redCards[i] !== "object")
                    throw TypeError(".TeamInfo.redCards: object expected");
                message.redCards[i] = $root.RedCard.fromObject(object.redCards[i]);
            }
        }
        if (object.timeoutsLeft != null)
            message.timeoutsLeft = object.timeoutsLeft | 0;
        if (object.timeoutTimeLeft != null) {
            if (typeof object.timeoutTimeLeft !== "object")
                throw TypeError(".TeamInfo.timeoutTimeLeft: object expected");
            message.timeoutTimeLeft = $root.google.protobuf.Duration.fromObject(object.timeoutTimeLeft);
        }
        if (object.onPositiveHalf != null)
            message.onPositiveHalf = Boolean(object.onPositiveHalf);
        if (object.fouls) {
            if (!Array.isArray(object.fouls))
                throw TypeError(".TeamInfo.fouls: array expected");
            message.fouls = [];
            for (let i = 0; i < object.fouls.length; ++i) {
                if (typeof object.fouls[i] !== "object")
                    throw TypeError(".TeamInfo.fouls: object expected");
                message.fouls[i] = $root.Foul.fromObject(object.fouls[i]);
            }
        }
        if (object.ballPlacementFailures != null)
            message.ballPlacementFailures = object.ballPlacementFailures | 0;
        if (object.ballPlacementFailuresReached != null)
            message.ballPlacementFailuresReached = Boolean(object.ballPlacementFailuresReached);
        if (object.canPlaceBall != null)
            message.canPlaceBall = Boolean(object.canPlaceBall);
        if (object.maxAllowedBots != null)
            message.maxAllowedBots = object.maxAllowedBots | 0;
        if (object.botSubstitutionIntent != null)
            message.botSubstitutionIntent = Boolean(object.botSubstitutionIntent);
        return message;
    };

    /**
     * Creates a plain object from a TeamInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TeamInfo
     * @static
     * @param {TeamInfo} message TeamInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TeamInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.yellowCards = [];
            object.redCards = [];
            object.fouls = [];
        }
        if (options.defaults) {
            object.name = "";
            object.goals = 0;
            object.goalkeeper = 0;
            object.timeoutsLeft = 0;
            object.timeoutTimeLeft = null;
            object.onPositiveHalf = false;
            object.ballPlacementFailures = 0;
            object.ballPlacementFailuresReached = false;
            object.canPlaceBall = false;
            object.maxAllowedBots = 0;
            object.botSubstitutionIntent = false;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.goals != null && message.hasOwnProperty("goals"))
            object.goals = message.goals;
        if (message.goalkeeper != null && message.hasOwnProperty("goalkeeper"))
            object.goalkeeper = message.goalkeeper;
        if (message.yellowCards && message.yellowCards.length) {
            object.yellowCards = [];
            for (let j = 0; j < message.yellowCards.length; ++j)
                object.yellowCards[j] = $root.YellowCard.toObject(message.yellowCards[j], options);
        }
        if (message.redCards && message.redCards.length) {
            object.redCards = [];
            for (let j = 0; j < message.redCards.length; ++j)
                object.redCards[j] = $root.RedCard.toObject(message.redCards[j], options);
        }
        if (message.timeoutsLeft != null && message.hasOwnProperty("timeoutsLeft"))
            object.timeoutsLeft = message.timeoutsLeft;
        if (message.timeoutTimeLeft != null && message.hasOwnProperty("timeoutTimeLeft"))
            object.timeoutTimeLeft = $root.google.protobuf.Duration.toObject(message.timeoutTimeLeft, options);
        if (message.onPositiveHalf != null && message.hasOwnProperty("onPositiveHalf"))
            object.onPositiveHalf = message.onPositiveHalf;
        if (message.fouls && message.fouls.length) {
            object.fouls = [];
            for (let j = 0; j < message.fouls.length; ++j)
                object.fouls[j] = $root.Foul.toObject(message.fouls[j], options);
        }
        if (message.ballPlacementFailures != null && message.hasOwnProperty("ballPlacementFailures"))
            object.ballPlacementFailures = message.ballPlacementFailures;
        if (message.ballPlacementFailuresReached != null && message.hasOwnProperty("ballPlacementFailuresReached"))
            object.ballPlacementFailuresReached = message.ballPlacementFailuresReached;
        if (message.canPlaceBall != null && message.hasOwnProperty("canPlaceBall"))
            object.canPlaceBall = message.canPlaceBall;
        if (message.maxAllowedBots != null && message.hasOwnProperty("maxAllowedBots"))
            object.maxAllowedBots = message.maxAllowedBots;
        if (message.botSubstitutionIntent != null && message.hasOwnProperty("botSubstitutionIntent"))
            object.botSubstitutionIntent = message.botSubstitutionIntent;
        return object;
    };

    /**
     * Converts this TeamInfo to JSON.
     * @function toJSON
     * @memberof TeamInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TeamInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TeamInfo;
})();

export const State = $root.State = (() => {

    /**
     * Properties of a State.
     * @exports IState
     * @interface IState
     * @property {Referee.Stage|null} [stage] State stage
     * @property {ICommand|null} [command] State command
     * @property {google.protobuf.IDuration|null} [stageTimeElapsed] State stageTimeElapsed
     * @property {google.protobuf.IDuration|null} [stageTimeLeft] State stageTimeLeft
     * @property {google.protobuf.ITimestamp|null} [matchTimeStart] State matchTimeStart
     * @property {Object.<string,ITeamInfo>|null} [teamState] State teamState
     * @property {IVector2|null} [placementPos] State placementPos
     * @property {ICommand|null} [nextCommand] State nextCommand
     * @property {google.protobuf.IDuration|null} [currentActionTimeRemaining] State currentActionTimeRemaining
     * @property {Array.<IGameEvent>|null} [gameEvents] State gameEvents
     * @property {Array.<IProposedGameEvent>|null} [proposedGameEvents] State proposedGameEvents
     * @property {State.Division|null} [division] State division
     * @property {boolean|null} [autoContinue] State autoContinue
     * @property {Team|null} [firstKickoffTeam] State firstKickoffTeam
     * @property {Object.<string,State.GameEventBehavior>|null} [gameEventBehavior] State gameEventBehavior
     */

    /**
     * Constructs a new State.
     * @exports State
     * @classdesc Represents a State.
     * @implements IState
     * @constructor
     * @param {IState=} [properties] Properties to set
     */
    function State(properties) {
        this.teamState = {};
        this.gameEvents = [];
        this.proposedGameEvents = [];
        this.gameEventBehavior = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * State stage.
     * @member {Referee.Stage} stage
     * @memberof State
     * @instance
     */
    State.prototype.stage = 0;

    /**
     * State command.
     * @member {ICommand|null|undefined} command
     * @memberof State
     * @instance
     */
    State.prototype.command = null;

    /**
     * State stageTimeElapsed.
     * @member {google.protobuf.IDuration|null|undefined} stageTimeElapsed
     * @memberof State
     * @instance
     */
    State.prototype.stageTimeElapsed = null;

    /**
     * State stageTimeLeft.
     * @member {google.protobuf.IDuration|null|undefined} stageTimeLeft
     * @memberof State
     * @instance
     */
    State.prototype.stageTimeLeft = null;

    /**
     * State matchTimeStart.
     * @member {google.protobuf.ITimestamp|null|undefined} matchTimeStart
     * @memberof State
     * @instance
     */
    State.prototype.matchTimeStart = null;

    /**
     * State teamState.
     * @member {Object.<string,ITeamInfo>} teamState
     * @memberof State
     * @instance
     */
    State.prototype.teamState = $util.emptyObject;

    /**
     * State placementPos.
     * @member {IVector2|null|undefined} placementPos
     * @memberof State
     * @instance
     */
    State.prototype.placementPos = null;

    /**
     * State nextCommand.
     * @member {ICommand|null|undefined} nextCommand
     * @memberof State
     * @instance
     */
    State.prototype.nextCommand = null;

    /**
     * State currentActionTimeRemaining.
     * @member {google.protobuf.IDuration|null|undefined} currentActionTimeRemaining
     * @memberof State
     * @instance
     */
    State.prototype.currentActionTimeRemaining = null;

    /**
     * State gameEvents.
     * @member {Array.<IGameEvent>} gameEvents
     * @memberof State
     * @instance
     */
    State.prototype.gameEvents = $util.emptyArray;

    /**
     * State proposedGameEvents.
     * @member {Array.<IProposedGameEvent>} proposedGameEvents
     * @memberof State
     * @instance
     */
    State.prototype.proposedGameEvents = $util.emptyArray;

    /**
     * State division.
     * @member {State.Division} division
     * @memberof State
     * @instance
     */
    State.prototype.division = 0;

    /**
     * State autoContinue.
     * @member {boolean} autoContinue
     * @memberof State
     * @instance
     */
    State.prototype.autoContinue = false;

    /**
     * State firstKickoffTeam.
     * @member {Team} firstKickoffTeam
     * @memberof State
     * @instance
     */
    State.prototype.firstKickoffTeam = 0;

    /**
     * State gameEventBehavior.
     * @member {Object.<string,State.GameEventBehavior>} gameEventBehavior
     * @memberof State
     * @instance
     */
    State.prototype.gameEventBehavior = $util.emptyObject;

    /**
     * Creates a new State instance using the specified properties.
     * @function create
     * @memberof State
     * @static
     * @param {IState=} [properties] Properties to set
     * @returns {State} State instance
     */
    State.create = function create(properties) {
        return new State(properties);
    };

    /**
     * Encodes the specified State message. Does not implicitly {@link State.verify|verify} messages.
     * @function encode
     * @memberof State
     * @static
     * @param {IState} message State message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    State.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.stage != null && message.hasOwnProperty("stage"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.stage);
        if (message.command != null && message.hasOwnProperty("command"))
            $root.Command.encode(message.command, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.stageTimeElapsed != null && message.hasOwnProperty("stageTimeElapsed"))
            $root.google.protobuf.Duration.encode(message.stageTimeElapsed, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.stageTimeLeft != null && message.hasOwnProperty("stageTimeLeft"))
            $root.google.protobuf.Duration.encode(message.stageTimeLeft, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.matchTimeStart != null && message.hasOwnProperty("matchTimeStart"))
            $root.google.protobuf.Timestamp.encode(message.matchTimeStart, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.teamState != null && message.hasOwnProperty("teamState"))
            for (let keys = Object.keys(message.teamState), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.TeamInfo.encode(message.teamState[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.placementPos != null && message.hasOwnProperty("placementPos"))
            $root.Vector2.encode(message.placementPos, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.nextCommand != null && message.hasOwnProperty("nextCommand"))
            $root.Command.encode(message.nextCommand, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message.currentActionTimeRemaining != null && message.hasOwnProperty("currentActionTimeRemaining"))
            $root.google.protobuf.Duration.encode(message.currentActionTimeRemaining, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
        if (message.gameEvents != null && message.gameEvents.length)
            for (let i = 0; i < message.gameEvents.length; ++i)
                $root.GameEvent.encode(message.gameEvents[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.proposedGameEvents != null && message.proposedGameEvents.length)
            for (let i = 0; i < message.proposedGameEvents.length; ++i)
                $root.ProposedGameEvent.encode(message.proposedGameEvents[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
        if (message.division != null && message.hasOwnProperty("division"))
            writer.uint32(/* id 15, wireType 0 =*/120).int32(message.division);
        if (message.autoContinue != null && message.hasOwnProperty("autoContinue"))
            writer.uint32(/* id 16, wireType 0 =*/128).bool(message.autoContinue);
        if (message.firstKickoffTeam != null && message.hasOwnProperty("firstKickoffTeam"))
            writer.uint32(/* id 17, wireType 0 =*/136).int32(message.firstKickoffTeam);
        if (message.gameEventBehavior != null && message.hasOwnProperty("gameEventBehavior"))
            for (let keys = Object.keys(message.gameEventBehavior), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 18, wireType 2 =*/146).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.gameEventBehavior[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified State message, length delimited. Does not implicitly {@link State.verify|verify} messages.
     * @function encodeDelimited
     * @memberof State
     * @static
     * @param {IState} message State message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    State.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a State message from the specified reader or buffer.
     * @function decode
     * @memberof State
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {State} State
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    State.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.State(), key;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.stage = reader.int32();
                break;
            case 2:
                message.command = $root.Command.decode(reader, reader.uint32());
                break;
            case 4:
                message.stageTimeElapsed = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                break;
            case 5:
                message.stageTimeLeft = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                break;
            case 6:
                message.matchTimeStart = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                break;
            case 8:
                reader.skip().pos++;
                if (message.teamState === $util.emptyObject)
                    message.teamState = {};
                key = reader.string();
                reader.pos++;
                message.teamState[key] = $root.TeamInfo.decode(reader, reader.uint32());
                break;
            case 9:
                message.placementPos = $root.Vector2.decode(reader, reader.uint32());
                break;
            case 10:
                message.nextCommand = $root.Command.decode(reader, reader.uint32());
                break;
            case 12:
                message.currentActionTimeRemaining = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                break;
            case 13:
                if (!(message.gameEvents && message.gameEvents.length))
                    message.gameEvents = [];
                message.gameEvents.push($root.GameEvent.decode(reader, reader.uint32()));
                break;
            case 14:
                if (!(message.proposedGameEvents && message.proposedGameEvents.length))
                    message.proposedGameEvents = [];
                message.proposedGameEvents.push($root.ProposedGameEvent.decode(reader, reader.uint32()));
                break;
            case 15:
                message.division = reader.int32();
                break;
            case 16:
                message.autoContinue = reader.bool();
                break;
            case 17:
                message.firstKickoffTeam = reader.int32();
                break;
            case 18:
                reader.skip().pos++;
                if (message.gameEventBehavior === $util.emptyObject)
                    message.gameEventBehavior = {};
                key = reader.string();
                reader.pos++;
                message.gameEventBehavior[key] = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a State message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof State
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {State} State
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    State.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a State message.
     * @function verify
     * @memberof State
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    State.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.stage != null && message.hasOwnProperty("stage"))
            switch (message.stage) {
            default:
                return "stage: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                break;
            }
        if (message.command != null && message.hasOwnProperty("command")) {
            let error = $root.Command.verify(message.command);
            if (error)
                return "command." + error;
        }
        if (message.stageTimeElapsed != null && message.hasOwnProperty("stageTimeElapsed")) {
            let error = $root.google.protobuf.Duration.verify(message.stageTimeElapsed);
            if (error)
                return "stageTimeElapsed." + error;
        }
        if (message.stageTimeLeft != null && message.hasOwnProperty("stageTimeLeft")) {
            let error = $root.google.protobuf.Duration.verify(message.stageTimeLeft);
            if (error)
                return "stageTimeLeft." + error;
        }
        if (message.matchTimeStart != null && message.hasOwnProperty("matchTimeStart")) {
            let error = $root.google.protobuf.Timestamp.verify(message.matchTimeStart);
            if (error)
                return "matchTimeStart." + error;
        }
        if (message.teamState != null && message.hasOwnProperty("teamState")) {
            if (!$util.isObject(message.teamState))
                return "teamState: object expected";
            let key = Object.keys(message.teamState);
            for (let i = 0; i < key.length; ++i) {
                let error = $root.TeamInfo.verify(message.teamState[key[i]]);
                if (error)
                    return "teamState." + error;
            }
        }
        if (message.placementPos != null && message.hasOwnProperty("placementPos")) {
            let error = $root.Vector2.verify(message.placementPos);
            if (error)
                return "placementPos." + error;
        }
        if (message.nextCommand != null && message.hasOwnProperty("nextCommand")) {
            let error = $root.Command.verify(message.nextCommand);
            if (error)
                return "nextCommand." + error;
        }
        if (message.currentActionTimeRemaining != null && message.hasOwnProperty("currentActionTimeRemaining")) {
            let error = $root.google.protobuf.Duration.verify(message.currentActionTimeRemaining);
            if (error)
                return "currentActionTimeRemaining." + error;
        }
        if (message.gameEvents != null && message.hasOwnProperty("gameEvents")) {
            if (!Array.isArray(message.gameEvents))
                return "gameEvents: array expected";
            for (let i = 0; i < message.gameEvents.length; ++i) {
                let error = $root.GameEvent.verify(message.gameEvents[i]);
                if (error)
                    return "gameEvents." + error;
            }
        }
        if (message.proposedGameEvents != null && message.hasOwnProperty("proposedGameEvents")) {
            if (!Array.isArray(message.proposedGameEvents))
                return "proposedGameEvents: array expected";
            for (let i = 0; i < message.proposedGameEvents.length; ++i) {
                let error = $root.ProposedGameEvent.verify(message.proposedGameEvents[i]);
                if (error)
                    return "proposedGameEvents." + error;
            }
        }
        if (message.division != null && message.hasOwnProperty("division"))
            switch (message.division) {
            default:
                return "division: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.autoContinue != null && message.hasOwnProperty("autoContinue"))
            if (typeof message.autoContinue !== "boolean")
                return "autoContinue: boolean expected";
        if (message.firstKickoffTeam != null && message.hasOwnProperty("firstKickoffTeam"))
            switch (message.firstKickoffTeam) {
            default:
                return "firstKickoffTeam: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.gameEventBehavior != null && message.hasOwnProperty("gameEventBehavior")) {
            if (!$util.isObject(message.gameEventBehavior))
                return "gameEventBehavior: object expected";
            let key = Object.keys(message.gameEventBehavior);
            for (let i = 0; i < key.length; ++i)
                switch (message.gameEventBehavior[key[i]]) {
                default:
                    return "gameEventBehavior: enum value{k:string} expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
        }
        return null;
    };

    /**
     * Creates a State message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof State
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {State} State
     */
    State.fromObject = function fromObject(object) {
        if (object instanceof $root.State)
            return object;
        let message = new $root.State();
        switch (object.stage) {
        case "NORMAL_FIRST_HALF_PRE":
        case 0:
            message.stage = 0;
            break;
        case "NORMAL_FIRST_HALF":
        case 1:
            message.stage = 1;
            break;
        case "NORMAL_HALF_TIME":
        case 2:
            message.stage = 2;
            break;
        case "NORMAL_SECOND_HALF_PRE":
        case 3:
            message.stage = 3;
            break;
        case "NORMAL_SECOND_HALF":
        case 4:
            message.stage = 4;
            break;
        case "EXTRA_TIME_BREAK":
        case 5:
            message.stage = 5;
            break;
        case "EXTRA_FIRST_HALF_PRE":
        case 6:
            message.stage = 6;
            break;
        case "EXTRA_FIRST_HALF":
        case 7:
            message.stage = 7;
            break;
        case "EXTRA_HALF_TIME":
        case 8:
            message.stage = 8;
            break;
        case "EXTRA_SECOND_HALF_PRE":
        case 9:
            message.stage = 9;
            break;
        case "EXTRA_SECOND_HALF":
        case 10:
            message.stage = 10;
            break;
        case "PENALTY_SHOOTOUT_BREAK":
        case 11:
            message.stage = 11;
            break;
        case "PENALTY_SHOOTOUT":
        case 12:
            message.stage = 12;
            break;
        case "POST_GAME":
        case 13:
            message.stage = 13;
            break;
        }
        if (object.command != null) {
            if (typeof object.command !== "object")
                throw TypeError(".State.command: object expected");
            message.command = $root.Command.fromObject(object.command);
        }
        if (object.stageTimeElapsed != null) {
            if (typeof object.stageTimeElapsed !== "object")
                throw TypeError(".State.stageTimeElapsed: object expected");
            message.stageTimeElapsed = $root.google.protobuf.Duration.fromObject(object.stageTimeElapsed);
        }
        if (object.stageTimeLeft != null) {
            if (typeof object.stageTimeLeft !== "object")
                throw TypeError(".State.stageTimeLeft: object expected");
            message.stageTimeLeft = $root.google.protobuf.Duration.fromObject(object.stageTimeLeft);
        }
        if (object.matchTimeStart != null) {
            if (typeof object.matchTimeStart !== "object")
                throw TypeError(".State.matchTimeStart: object expected");
            message.matchTimeStart = $root.google.protobuf.Timestamp.fromObject(object.matchTimeStart);
        }
        if (object.teamState) {
            if (typeof object.teamState !== "object")
                throw TypeError(".State.teamState: object expected");
            message.teamState = {};
            for (let keys = Object.keys(object.teamState), i = 0; i < keys.length; ++i) {
                if (typeof object.teamState[keys[i]] !== "object")
                    throw TypeError(".State.teamState: object expected");
                message.teamState[keys[i]] = $root.TeamInfo.fromObject(object.teamState[keys[i]]);
            }
        }
        if (object.placementPos != null) {
            if (typeof object.placementPos !== "object")
                throw TypeError(".State.placementPos: object expected");
            message.placementPos = $root.Vector2.fromObject(object.placementPos);
        }
        if (object.nextCommand != null) {
            if (typeof object.nextCommand !== "object")
                throw TypeError(".State.nextCommand: object expected");
            message.nextCommand = $root.Command.fromObject(object.nextCommand);
        }
        if (object.currentActionTimeRemaining != null) {
            if (typeof object.currentActionTimeRemaining !== "object")
                throw TypeError(".State.currentActionTimeRemaining: object expected");
            message.currentActionTimeRemaining = $root.google.protobuf.Duration.fromObject(object.currentActionTimeRemaining);
        }
        if (object.gameEvents) {
            if (!Array.isArray(object.gameEvents))
                throw TypeError(".State.gameEvents: array expected");
            message.gameEvents = [];
            for (let i = 0; i < object.gameEvents.length; ++i) {
                if (typeof object.gameEvents[i] !== "object")
                    throw TypeError(".State.gameEvents: object expected");
                message.gameEvents[i] = $root.GameEvent.fromObject(object.gameEvents[i]);
            }
        }
        if (object.proposedGameEvents) {
            if (!Array.isArray(object.proposedGameEvents))
                throw TypeError(".State.proposedGameEvents: array expected");
            message.proposedGameEvents = [];
            for (let i = 0; i < object.proposedGameEvents.length; ++i) {
                if (typeof object.proposedGameEvents[i] !== "object")
                    throw TypeError(".State.proposedGameEvents: object expected");
                message.proposedGameEvents[i] = $root.ProposedGameEvent.fromObject(object.proposedGameEvents[i]);
            }
        }
        switch (object.division) {
        case "DIV_UNKNOWN":
        case 0:
            message.division = 0;
            break;
        case "DIV_A":
        case 1:
            message.division = 1;
            break;
        case "DIV_B":
        case 2:
            message.division = 2;
            break;
        }
        if (object.autoContinue != null)
            message.autoContinue = Boolean(object.autoContinue);
        switch (object.firstKickoffTeam) {
        case "UNKNOWN":
        case 0:
            message.firstKickoffTeam = 0;
            break;
        case "YELLOW":
        case 1:
            message.firstKickoffTeam = 1;
            break;
        case "BLUE":
        case 2:
            message.firstKickoffTeam = 2;
            break;
        }
        if (object.gameEventBehavior) {
            if (typeof object.gameEventBehavior !== "object")
                throw TypeError(".State.gameEventBehavior: object expected");
            message.gameEventBehavior = {};
            for (let keys = Object.keys(object.gameEventBehavior), i = 0; i < keys.length; ++i)
                switch (object.gameEventBehavior[keys[i]]) {
                case "GAME_EVENT_BEHAVIOR_UNKNOWN":
                case 0:
                    message.gameEventBehavior[keys[i]] = 0;
                    break;
                case "GAME_EVENT_BEHAVIOR_ON":
                case 1:
                    message.gameEventBehavior[keys[i]] = 1;
                    break;
                case "GAME_EVENT_BEHAVIOR_MAJORITY":
                case 2:
                    message.gameEventBehavior[keys[i]] = 2;
                    break;
                case "GAME_EVENT_BEHAVIOR_OFF":
                case 3:
                    message.gameEventBehavior[keys[i]] = 3;
                    break;
                }
        }
        return message;
    };

    /**
     * Creates a plain object from a State message. Also converts values to other types if specified.
     * @function toObject
     * @memberof State
     * @static
     * @param {State} message State
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    State.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.gameEvents = [];
            object.proposedGameEvents = [];
        }
        if (options.objects || options.defaults) {
            object.teamState = {};
            object.gameEventBehavior = {};
        }
        if (options.defaults) {
            object.stage = options.enums === String ? "NORMAL_FIRST_HALF_PRE" : 0;
            object.command = null;
            object.stageTimeElapsed = null;
            object.stageTimeLeft = null;
            object.matchTimeStart = null;
            object.placementPos = null;
            object.nextCommand = null;
            object.currentActionTimeRemaining = null;
            object.division = options.enums === String ? "DIV_UNKNOWN" : 0;
            object.autoContinue = false;
            object.firstKickoffTeam = options.enums === String ? "UNKNOWN" : 0;
        }
        if (message.stage != null && message.hasOwnProperty("stage"))
            object.stage = options.enums === String ? $root.Referee.Stage[message.stage] : message.stage;
        if (message.command != null && message.hasOwnProperty("command"))
            object.command = $root.Command.toObject(message.command, options);
        if (message.stageTimeElapsed != null && message.hasOwnProperty("stageTimeElapsed"))
            object.stageTimeElapsed = $root.google.protobuf.Duration.toObject(message.stageTimeElapsed, options);
        if (message.stageTimeLeft != null && message.hasOwnProperty("stageTimeLeft"))
            object.stageTimeLeft = $root.google.protobuf.Duration.toObject(message.stageTimeLeft, options);
        if (message.matchTimeStart != null && message.hasOwnProperty("matchTimeStart"))
            object.matchTimeStart = $root.google.protobuf.Timestamp.toObject(message.matchTimeStart, options);
        let keys2;
        if (message.teamState && (keys2 = Object.keys(message.teamState)).length) {
            object.teamState = {};
            for (let j = 0; j < keys2.length; ++j)
                object.teamState[keys2[j]] = $root.TeamInfo.toObject(message.teamState[keys2[j]], options);
        }
        if (message.placementPos != null && message.hasOwnProperty("placementPos"))
            object.placementPos = $root.Vector2.toObject(message.placementPos, options);
        if (message.nextCommand != null && message.hasOwnProperty("nextCommand"))
            object.nextCommand = $root.Command.toObject(message.nextCommand, options);
        if (message.currentActionTimeRemaining != null && message.hasOwnProperty("currentActionTimeRemaining"))
            object.currentActionTimeRemaining = $root.google.protobuf.Duration.toObject(message.currentActionTimeRemaining, options);
        if (message.gameEvents && message.gameEvents.length) {
            object.gameEvents = [];
            for (let j = 0; j < message.gameEvents.length; ++j)
                object.gameEvents[j] = $root.GameEvent.toObject(message.gameEvents[j], options);
        }
        if (message.proposedGameEvents && message.proposedGameEvents.length) {
            object.proposedGameEvents = [];
            for (let j = 0; j < message.proposedGameEvents.length; ++j)
                object.proposedGameEvents[j] = $root.ProposedGameEvent.toObject(message.proposedGameEvents[j], options);
        }
        if (message.division != null && message.hasOwnProperty("division"))
            object.division = options.enums === String ? $root.State.Division[message.division] : message.division;
        if (message.autoContinue != null && message.hasOwnProperty("autoContinue"))
            object.autoContinue = message.autoContinue;
        if (message.firstKickoffTeam != null && message.hasOwnProperty("firstKickoffTeam"))
            object.firstKickoffTeam = options.enums === String ? $root.Team[message.firstKickoffTeam] : message.firstKickoffTeam;
        if (message.gameEventBehavior && (keys2 = Object.keys(message.gameEventBehavior)).length) {
            object.gameEventBehavior = {};
            for (let j = 0; j < keys2.length; ++j)
                object.gameEventBehavior[keys2[j]] = options.enums === String ? $root.State.GameEventBehavior[message.gameEventBehavior[keys2[j]]] : message.gameEventBehavior[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this State to JSON.
     * @function toJSON
     * @memberof State
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    State.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Division enum.
     * @name State.Division
     * @enum {string}
     * @property {number} DIV_UNKNOWN=0 DIV_UNKNOWN value
     * @property {number} DIV_A=1 DIV_A value
     * @property {number} DIV_B=2 DIV_B value
     */
    State.Division = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DIV_UNKNOWN"] = 0;
        values[valuesById[1] = "DIV_A"] = 1;
        values[valuesById[2] = "DIV_B"] = 2;
        return values;
    })();

    /**
     * GameEventBehavior enum.
     * @name State.GameEventBehavior
     * @enum {string}
     * @property {number} GAME_EVENT_BEHAVIOR_UNKNOWN=0 GAME_EVENT_BEHAVIOR_UNKNOWN value
     * @property {number} GAME_EVENT_BEHAVIOR_ON=1 GAME_EVENT_BEHAVIOR_ON value
     * @property {number} GAME_EVENT_BEHAVIOR_MAJORITY=2 GAME_EVENT_BEHAVIOR_MAJORITY value
     * @property {number} GAME_EVENT_BEHAVIOR_OFF=3 GAME_EVENT_BEHAVIOR_OFF value
     */
    State.GameEventBehavior = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GAME_EVENT_BEHAVIOR_UNKNOWN"] = 0;
        values[valuesById[1] = "GAME_EVENT_BEHAVIOR_ON"] = 1;
        values[valuesById[2] = "GAME_EVENT_BEHAVIOR_MAJORITY"] = 2;
        values[valuesById[3] = "GAME_EVENT_BEHAVIOR_OFF"] = 3;
        return values;
    })();

    return State;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Duration = (function() {

            /**
             * Properties of a Duration.
             * @memberof google.protobuf
             * @interface IDuration
             * @property {number|Long|null} [seconds] Duration seconds
             * @property {number|null} [nanos] Duration nanos
             */

            /**
             * Constructs a new Duration.
             * @memberof google.protobuf
             * @classdesc Represents a Duration.
             * @implements IDuration
             * @constructor
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             */
            function Duration(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Duration seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Duration nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.nanos = 0;

            /**
             * Creates a new Duration instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             * @returns {google.protobuf.Duration} Duration instance
             */
            Duration.create = function create(properties) {
                return new Duration(properties);
            };

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Duration();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Duration message.
             * @function verify
             * @memberof google.protobuf.Duration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Duration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Duration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Duration} Duration
             */
            Duration.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Duration)
                    return object;
                let message = new $root.google.protobuf.Duration();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.Duration} message Duration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Duration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Duration to JSON.
             * @function toJSON
             * @memberof google.protobuf.Duration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Duration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Duration;
        })();

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export const Output = $root.Output = (() => {

    /**
     * Properties of an Output.
     * @exports IOutput
     * @interface IOutput
     * @property {IState|null} [matchState] Output matchState
     * @property {IGcState|null} [gcState] Output gcState
     * @property {IProtocol|null} [protocol] Output protocol
     */

    /**
     * Constructs a new Output.
     * @exports Output
     * @classdesc Represents an Output.
     * @implements IOutput
     * @constructor
     * @param {IOutput=} [properties] Properties to set
     */
    function Output(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Output matchState.
     * @member {IState|null|undefined} matchState
     * @memberof Output
     * @instance
     */
    Output.prototype.matchState = null;

    /**
     * Output gcState.
     * @member {IGcState|null|undefined} gcState
     * @memberof Output
     * @instance
     */
    Output.prototype.gcState = null;

    /**
     * Output protocol.
     * @member {IProtocol|null|undefined} protocol
     * @memberof Output
     * @instance
     */
    Output.prototype.protocol = null;

    /**
     * Creates a new Output instance using the specified properties.
     * @function create
     * @memberof Output
     * @static
     * @param {IOutput=} [properties] Properties to set
     * @returns {Output} Output instance
     */
    Output.create = function create(properties) {
        return new Output(properties);
    };

    /**
     * Encodes the specified Output message. Does not implicitly {@link Output.verify|verify} messages.
     * @function encode
     * @memberof Output
     * @static
     * @param {IOutput} message Output message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Output.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.matchState != null && message.hasOwnProperty("matchState"))
            $root.State.encode(message.matchState, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.gcState != null && message.hasOwnProperty("gcState"))
            $root.GcState.encode(message.gcState, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.protocol != null && message.hasOwnProperty("protocol"))
            $root.Protocol.encode(message.protocol, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Output message, length delimited. Does not implicitly {@link Output.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Output
     * @static
     * @param {IOutput} message Output message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Output.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Output message from the specified reader or buffer.
     * @function decode
     * @memberof Output
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Output} Output
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Output.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Output();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.matchState = $root.State.decode(reader, reader.uint32());
                break;
            case 2:
                message.gcState = $root.GcState.decode(reader, reader.uint32());
                break;
            case 3:
                message.protocol = $root.Protocol.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Output message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Output
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Output} Output
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Output.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Output message.
     * @function verify
     * @memberof Output
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Output.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.matchState != null && message.hasOwnProperty("matchState")) {
            let error = $root.State.verify(message.matchState);
            if (error)
                return "matchState." + error;
        }
        if (message.gcState != null && message.hasOwnProperty("gcState")) {
            let error = $root.GcState.verify(message.gcState);
            if (error)
                return "gcState." + error;
        }
        if (message.protocol != null && message.hasOwnProperty("protocol")) {
            let error = $root.Protocol.verify(message.protocol);
            if (error)
                return "protocol." + error;
        }
        return null;
    };

    /**
     * Creates an Output message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Output
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Output} Output
     */
    Output.fromObject = function fromObject(object) {
        if (object instanceof $root.Output)
            return object;
        let message = new $root.Output();
        if (object.matchState != null) {
            if (typeof object.matchState !== "object")
                throw TypeError(".Output.matchState: object expected");
            message.matchState = $root.State.fromObject(object.matchState);
        }
        if (object.gcState != null) {
            if (typeof object.gcState !== "object")
                throw TypeError(".Output.gcState: object expected");
            message.gcState = $root.GcState.fromObject(object.gcState);
        }
        if (object.protocol != null) {
            if (typeof object.protocol !== "object")
                throw TypeError(".Output.protocol: object expected");
            message.protocol = $root.Protocol.fromObject(object.protocol);
        }
        return message;
    };

    /**
     * Creates a plain object from an Output message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Output
     * @static
     * @param {Output} message Output
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Output.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.matchState = null;
            object.gcState = null;
            object.protocol = null;
        }
        if (message.matchState != null && message.hasOwnProperty("matchState"))
            object.matchState = $root.State.toObject(message.matchState, options);
        if (message.gcState != null && message.hasOwnProperty("gcState"))
            object.gcState = $root.GcState.toObject(message.gcState, options);
        if (message.protocol != null && message.hasOwnProperty("protocol"))
            object.protocol = $root.Protocol.toObject(message.protocol, options);
        return object;
    };

    /**
     * Converts this Output to JSON.
     * @function toJSON
     * @memberof Output
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Output.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Output;
})();

export const Protocol = $root.Protocol = (() => {

    /**
     * Properties of a Protocol.
     * @exports IProtocol
     * @interface IProtocol
     * @property {boolean|null} [delta] Protocol delta
     * @property {Array.<IProtocolEntry>|null} [entry] Protocol entry
     */

    /**
     * Constructs a new Protocol.
     * @exports Protocol
     * @classdesc Represents a Protocol.
     * @implements IProtocol
     * @constructor
     * @param {IProtocol=} [properties] Properties to set
     */
    function Protocol(properties) {
        this.entry = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Protocol delta.
     * @member {boolean} delta
     * @memberof Protocol
     * @instance
     */
    Protocol.prototype.delta = false;

    /**
     * Protocol entry.
     * @member {Array.<IProtocolEntry>} entry
     * @memberof Protocol
     * @instance
     */
    Protocol.prototype.entry = $util.emptyArray;

    /**
     * Creates a new Protocol instance using the specified properties.
     * @function create
     * @memberof Protocol
     * @static
     * @param {IProtocol=} [properties] Properties to set
     * @returns {Protocol} Protocol instance
     */
    Protocol.create = function create(properties) {
        return new Protocol(properties);
    };

    /**
     * Encodes the specified Protocol message. Does not implicitly {@link Protocol.verify|verify} messages.
     * @function encode
     * @memberof Protocol
     * @static
     * @param {IProtocol} message Protocol message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Protocol.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.delta != null && message.hasOwnProperty("delta"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.delta);
        if (message.entry != null && message.entry.length)
            for (let i = 0; i < message.entry.length; ++i)
                $root.ProtocolEntry.encode(message.entry[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Protocol message, length delimited. Does not implicitly {@link Protocol.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Protocol
     * @static
     * @param {IProtocol} message Protocol message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Protocol.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Protocol message from the specified reader or buffer.
     * @function decode
     * @memberof Protocol
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Protocol} Protocol
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Protocol.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protocol();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.delta = reader.bool();
                break;
            case 2:
                if (!(message.entry && message.entry.length))
                    message.entry = [];
                message.entry.push($root.ProtocolEntry.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Protocol message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Protocol
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Protocol} Protocol
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Protocol.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Protocol message.
     * @function verify
     * @memberof Protocol
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Protocol.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.delta != null && message.hasOwnProperty("delta"))
            if (typeof message.delta !== "boolean")
                return "delta: boolean expected";
        if (message.entry != null && message.hasOwnProperty("entry")) {
            if (!Array.isArray(message.entry))
                return "entry: array expected";
            for (let i = 0; i < message.entry.length; ++i) {
                let error = $root.ProtocolEntry.verify(message.entry[i]);
                if (error)
                    return "entry." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Protocol message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Protocol
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Protocol} Protocol
     */
    Protocol.fromObject = function fromObject(object) {
        if (object instanceof $root.Protocol)
            return object;
        let message = new $root.Protocol();
        if (object.delta != null)
            message.delta = Boolean(object.delta);
        if (object.entry) {
            if (!Array.isArray(object.entry))
                throw TypeError(".Protocol.entry: array expected");
            message.entry = [];
            for (let i = 0; i < object.entry.length; ++i) {
                if (typeof object.entry[i] !== "object")
                    throw TypeError(".Protocol.entry: object expected");
                message.entry[i] = $root.ProtocolEntry.fromObject(object.entry[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Protocol message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Protocol
     * @static
     * @param {Protocol} message Protocol
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Protocol.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.entry = [];
        if (options.defaults)
            object.delta = false;
        if (message.delta != null && message.hasOwnProperty("delta"))
            object.delta = message.delta;
        if (message.entry && message.entry.length) {
            object.entry = [];
            for (let j = 0; j < message.entry.length; ++j)
                object.entry[j] = $root.ProtocolEntry.toObject(message.entry[j], options);
        }
        return object;
    };

    /**
     * Converts this Protocol to JSON.
     * @function toJSON
     * @memberof Protocol
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Protocol.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Protocol;
})();

export const ProtocolEntry = $root.ProtocolEntry = (() => {

    /**
     * Properties of a ProtocolEntry.
     * @exports IProtocolEntry
     * @interface IProtocolEntry
     * @property {number|null} [id] ProtocolEntry id
     * @property {IChange|null} [change] ProtocolEntry change
     * @property {google.protobuf.IDuration|null} [matchTimeElapsed] ProtocolEntry matchTimeElapsed
     * @property {google.protobuf.IDuration|null} [stageTimeElapsed] ProtocolEntry stageTimeElapsed
     */

    /**
     * Constructs a new ProtocolEntry.
     * @exports ProtocolEntry
     * @classdesc Represents a ProtocolEntry.
     * @implements IProtocolEntry
     * @constructor
     * @param {IProtocolEntry=} [properties] Properties to set
     */
    function ProtocolEntry(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ProtocolEntry id.
     * @member {number} id
     * @memberof ProtocolEntry
     * @instance
     */
    ProtocolEntry.prototype.id = 0;

    /**
     * ProtocolEntry change.
     * @member {IChange|null|undefined} change
     * @memberof ProtocolEntry
     * @instance
     */
    ProtocolEntry.prototype.change = null;

    /**
     * ProtocolEntry matchTimeElapsed.
     * @member {google.protobuf.IDuration|null|undefined} matchTimeElapsed
     * @memberof ProtocolEntry
     * @instance
     */
    ProtocolEntry.prototype.matchTimeElapsed = null;

    /**
     * ProtocolEntry stageTimeElapsed.
     * @member {google.protobuf.IDuration|null|undefined} stageTimeElapsed
     * @memberof ProtocolEntry
     * @instance
     */
    ProtocolEntry.prototype.stageTimeElapsed = null;

    /**
     * Creates a new ProtocolEntry instance using the specified properties.
     * @function create
     * @memberof ProtocolEntry
     * @static
     * @param {IProtocolEntry=} [properties] Properties to set
     * @returns {ProtocolEntry} ProtocolEntry instance
     */
    ProtocolEntry.create = function create(properties) {
        return new ProtocolEntry(properties);
    };

    /**
     * Encodes the specified ProtocolEntry message. Does not implicitly {@link ProtocolEntry.verify|verify} messages.
     * @function encode
     * @memberof ProtocolEntry
     * @static
     * @param {IProtocolEntry} message ProtocolEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProtocolEntry.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.change != null && message.hasOwnProperty("change"))
            $root.Change.encode(message.change, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.matchTimeElapsed != null && message.hasOwnProperty("matchTimeElapsed"))
            $root.google.protobuf.Duration.encode(message.matchTimeElapsed, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.stageTimeElapsed != null && message.hasOwnProperty("stageTimeElapsed"))
            $root.google.protobuf.Duration.encode(message.stageTimeElapsed, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ProtocolEntry message, length delimited. Does not implicitly {@link ProtocolEntry.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ProtocolEntry
     * @static
     * @param {IProtocolEntry} message ProtocolEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProtocolEntry.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ProtocolEntry message from the specified reader or buffer.
     * @function decode
     * @memberof ProtocolEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ProtocolEntry} ProtocolEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProtocolEntry.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ProtocolEntry();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                message.change = $root.Change.decode(reader, reader.uint32());
                break;
            case 3:
                message.matchTimeElapsed = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                break;
            case 4:
                message.stageTimeElapsed = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ProtocolEntry message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ProtocolEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ProtocolEntry} ProtocolEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProtocolEntry.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ProtocolEntry message.
     * @function verify
     * @memberof ProtocolEntry
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ProtocolEntry.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.change != null && message.hasOwnProperty("change")) {
            let error = $root.Change.verify(message.change);
            if (error)
                return "change." + error;
        }
        if (message.matchTimeElapsed != null && message.hasOwnProperty("matchTimeElapsed")) {
            let error = $root.google.protobuf.Duration.verify(message.matchTimeElapsed);
            if (error)
                return "matchTimeElapsed." + error;
        }
        if (message.stageTimeElapsed != null && message.hasOwnProperty("stageTimeElapsed")) {
            let error = $root.google.protobuf.Duration.verify(message.stageTimeElapsed);
            if (error)
                return "stageTimeElapsed." + error;
        }
        return null;
    };

    /**
     * Creates a ProtocolEntry message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ProtocolEntry
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ProtocolEntry} ProtocolEntry
     */
    ProtocolEntry.fromObject = function fromObject(object) {
        if (object instanceof $root.ProtocolEntry)
            return object;
        let message = new $root.ProtocolEntry();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.change != null) {
            if (typeof object.change !== "object")
                throw TypeError(".ProtocolEntry.change: object expected");
            message.change = $root.Change.fromObject(object.change);
        }
        if (object.matchTimeElapsed != null) {
            if (typeof object.matchTimeElapsed !== "object")
                throw TypeError(".ProtocolEntry.matchTimeElapsed: object expected");
            message.matchTimeElapsed = $root.google.protobuf.Duration.fromObject(object.matchTimeElapsed);
        }
        if (object.stageTimeElapsed != null) {
            if (typeof object.stageTimeElapsed !== "object")
                throw TypeError(".ProtocolEntry.stageTimeElapsed: object expected");
            message.stageTimeElapsed = $root.google.protobuf.Duration.fromObject(object.stageTimeElapsed);
        }
        return message;
    };

    /**
     * Creates a plain object from a ProtocolEntry message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ProtocolEntry
     * @static
     * @param {ProtocolEntry} message ProtocolEntry
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ProtocolEntry.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.change = null;
            object.matchTimeElapsed = null;
            object.stageTimeElapsed = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.change != null && message.hasOwnProperty("change"))
            object.change = $root.Change.toObject(message.change, options);
        if (message.matchTimeElapsed != null && message.hasOwnProperty("matchTimeElapsed"))
            object.matchTimeElapsed = $root.google.protobuf.Duration.toObject(message.matchTimeElapsed, options);
        if (message.stageTimeElapsed != null && message.hasOwnProperty("stageTimeElapsed"))
            object.stageTimeElapsed = $root.google.protobuf.Duration.toObject(message.stageTimeElapsed, options);
        return object;
    };

    /**
     * Converts this ProtocolEntry to JSON.
     * @function toJSON
     * @memberof ProtocolEntry
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ProtocolEntry.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ProtocolEntry;
})();

export const Input = $root.Input = (() => {

    /**
     * Properties of an Input.
     * @exports IInput
     * @interface IInput
     * @property {IChange|null} [change] Input change
     * @property {boolean|null} [resetMatch] Input resetMatch
     */

    /**
     * Constructs a new Input.
     * @exports Input
     * @classdesc Represents an Input.
     * @implements IInput
     * @constructor
     * @param {IInput=} [properties] Properties to set
     */
    function Input(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Input change.
     * @member {IChange|null|undefined} change
     * @memberof Input
     * @instance
     */
    Input.prototype.change = null;

    /**
     * Input resetMatch.
     * @member {boolean} resetMatch
     * @memberof Input
     * @instance
     */
    Input.prototype.resetMatch = false;

    /**
     * Creates a new Input instance using the specified properties.
     * @function create
     * @memberof Input
     * @static
     * @param {IInput=} [properties] Properties to set
     * @returns {Input} Input instance
     */
    Input.create = function create(properties) {
        return new Input(properties);
    };

    /**
     * Encodes the specified Input message. Does not implicitly {@link Input.verify|verify} messages.
     * @function encode
     * @memberof Input
     * @static
     * @param {IInput} message Input message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Input.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.change != null && message.hasOwnProperty("change"))
            $root.Change.encode(message.change, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.resetMatch != null && message.hasOwnProperty("resetMatch"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.resetMatch);
        return writer;
    };

    /**
     * Encodes the specified Input message, length delimited. Does not implicitly {@link Input.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Input
     * @static
     * @param {IInput} message Input message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Input.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Input message from the specified reader or buffer.
     * @function decode
     * @memberof Input
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Input} Input
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Input.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Input();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.change = $root.Change.decode(reader, reader.uint32());
                break;
            case 2:
                message.resetMatch = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Input message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Input
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Input} Input
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Input.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Input message.
     * @function verify
     * @memberof Input
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Input.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.change != null && message.hasOwnProperty("change")) {
            let error = $root.Change.verify(message.change);
            if (error)
                return "change." + error;
        }
        if (message.resetMatch != null && message.hasOwnProperty("resetMatch"))
            if (typeof message.resetMatch !== "boolean")
                return "resetMatch: boolean expected";
        return null;
    };

    /**
     * Creates an Input message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Input
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Input} Input
     */
    Input.fromObject = function fromObject(object) {
        if (object instanceof $root.Input)
            return object;
        let message = new $root.Input();
        if (object.change != null) {
            if (typeof object.change !== "object")
                throw TypeError(".Input.change: object expected");
            message.change = $root.Change.fromObject(object.change);
        }
        if (object.resetMatch != null)
            message.resetMatch = Boolean(object.resetMatch);
        return message;
    };

    /**
     * Creates a plain object from an Input message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Input
     * @static
     * @param {Input} message Input
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Input.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.change = null;
            object.resetMatch = false;
        }
        if (message.change != null && message.hasOwnProperty("change"))
            object.change = $root.Change.toObject(message.change, options);
        if (message.resetMatch != null && message.hasOwnProperty("resetMatch"))
            object.resetMatch = message.resetMatch;
        return object;
    };

    /**
     * Converts this Input to JSON.
     * @function toJSON
     * @memberof Input
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Input.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Input;
})();

export const GcState = $root.GcState = (() => {

    /**
     * Properties of a GcState.
     * @exports IGcState
     * @interface IGcState
     * @property {Object.<string,IGcStateTeam>|null} [teamState] GcState teamState
     * @property {Object.<string,IGcStateAutoRef>|null} [autoRefState] GcState autoRefState
     * @property {Object.<string,IGcStateTracker>|null} [trackerState] GcState trackerState
     * @property {IGcStateTracker|null} [trackerStateGc] GcState trackerStateGc
     * @property {boolean|null} [readyToContinue] GcState readyToContinue
     */

    /**
     * Constructs a new GcState.
     * @exports GcState
     * @classdesc Represents a GcState.
     * @implements IGcState
     * @constructor
     * @param {IGcState=} [properties] Properties to set
     */
    function GcState(properties) {
        this.teamState = {};
        this.autoRefState = {};
        this.trackerState = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GcState teamState.
     * @member {Object.<string,IGcStateTeam>} teamState
     * @memberof GcState
     * @instance
     */
    GcState.prototype.teamState = $util.emptyObject;

    /**
     * GcState autoRefState.
     * @member {Object.<string,IGcStateAutoRef>} autoRefState
     * @memberof GcState
     * @instance
     */
    GcState.prototype.autoRefState = $util.emptyObject;

    /**
     * GcState trackerState.
     * @member {Object.<string,IGcStateTracker>} trackerState
     * @memberof GcState
     * @instance
     */
    GcState.prototype.trackerState = $util.emptyObject;

    /**
     * GcState trackerStateGc.
     * @member {IGcStateTracker|null|undefined} trackerStateGc
     * @memberof GcState
     * @instance
     */
    GcState.prototype.trackerStateGc = null;

    /**
     * GcState readyToContinue.
     * @member {boolean} readyToContinue
     * @memberof GcState
     * @instance
     */
    GcState.prototype.readyToContinue = false;

    /**
     * Creates a new GcState instance using the specified properties.
     * @function create
     * @memberof GcState
     * @static
     * @param {IGcState=} [properties] Properties to set
     * @returns {GcState} GcState instance
     */
    GcState.create = function create(properties) {
        return new GcState(properties);
    };

    /**
     * Encodes the specified GcState message. Does not implicitly {@link GcState.verify|verify} messages.
     * @function encode
     * @memberof GcState
     * @static
     * @param {IGcState} message GcState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcState.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.teamState != null && message.hasOwnProperty("teamState"))
            for (let keys = Object.keys(message.teamState), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.GcStateTeam.encode(message.teamState[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.autoRefState != null && message.hasOwnProperty("autoRefState"))
            for (let keys = Object.keys(message.autoRefState), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.GcStateAutoRef.encode(message.autoRefState[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.trackerState != null && message.hasOwnProperty("trackerState"))
            for (let keys = Object.keys(message.trackerState), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.GcStateTracker.encode(message.trackerState[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.trackerStateGc != null && message.hasOwnProperty("trackerStateGc"))
            $root.GcStateTracker.encode(message.trackerStateGc, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.readyToContinue != null && message.hasOwnProperty("readyToContinue"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.readyToContinue);
        return writer;
    };

    /**
     * Encodes the specified GcState message, length delimited. Does not implicitly {@link GcState.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GcState
     * @static
     * @param {IGcState} message GcState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcState.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GcState message from the specified reader or buffer.
     * @function decode
     * @memberof GcState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GcState} GcState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcState.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GcState(), key;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                reader.skip().pos++;
                if (message.teamState === $util.emptyObject)
                    message.teamState = {};
                key = reader.string();
                reader.pos++;
                message.teamState[key] = $root.GcStateTeam.decode(reader, reader.uint32());
                break;
            case 2:
                reader.skip().pos++;
                if (message.autoRefState === $util.emptyObject)
                    message.autoRefState = {};
                key = reader.string();
                reader.pos++;
                message.autoRefState[key] = $root.GcStateAutoRef.decode(reader, reader.uint32());
                break;
            case 3:
                reader.skip().pos++;
                if (message.trackerState === $util.emptyObject)
                    message.trackerState = {};
                key = reader.string();
                reader.pos++;
                message.trackerState[key] = $root.GcStateTracker.decode(reader, reader.uint32());
                break;
            case 4:
                message.trackerStateGc = $root.GcStateTracker.decode(reader, reader.uint32());
                break;
            case 5:
                message.readyToContinue = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GcState message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GcState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GcState} GcState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcState.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GcState message.
     * @function verify
     * @memberof GcState
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GcState.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.teamState != null && message.hasOwnProperty("teamState")) {
            if (!$util.isObject(message.teamState))
                return "teamState: object expected";
            let key = Object.keys(message.teamState);
            for (let i = 0; i < key.length; ++i) {
                let error = $root.GcStateTeam.verify(message.teamState[key[i]]);
                if (error)
                    return "teamState." + error;
            }
        }
        if (message.autoRefState != null && message.hasOwnProperty("autoRefState")) {
            if (!$util.isObject(message.autoRefState))
                return "autoRefState: object expected";
            let key = Object.keys(message.autoRefState);
            for (let i = 0; i < key.length; ++i) {
                let error = $root.GcStateAutoRef.verify(message.autoRefState[key[i]]);
                if (error)
                    return "autoRefState." + error;
            }
        }
        if (message.trackerState != null && message.hasOwnProperty("trackerState")) {
            if (!$util.isObject(message.trackerState))
                return "trackerState: object expected";
            let key = Object.keys(message.trackerState);
            for (let i = 0; i < key.length; ++i) {
                let error = $root.GcStateTracker.verify(message.trackerState[key[i]]);
                if (error)
                    return "trackerState." + error;
            }
        }
        if (message.trackerStateGc != null && message.hasOwnProperty("trackerStateGc")) {
            let error = $root.GcStateTracker.verify(message.trackerStateGc);
            if (error)
                return "trackerStateGc." + error;
        }
        if (message.readyToContinue != null && message.hasOwnProperty("readyToContinue"))
            if (typeof message.readyToContinue !== "boolean")
                return "readyToContinue: boolean expected";
        return null;
    };

    /**
     * Creates a GcState message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GcState
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GcState} GcState
     */
    GcState.fromObject = function fromObject(object) {
        if (object instanceof $root.GcState)
            return object;
        let message = new $root.GcState();
        if (object.teamState) {
            if (typeof object.teamState !== "object")
                throw TypeError(".GcState.teamState: object expected");
            message.teamState = {};
            for (let keys = Object.keys(object.teamState), i = 0; i < keys.length; ++i) {
                if (typeof object.teamState[keys[i]] !== "object")
                    throw TypeError(".GcState.teamState: object expected");
                message.teamState[keys[i]] = $root.GcStateTeam.fromObject(object.teamState[keys[i]]);
            }
        }
        if (object.autoRefState) {
            if (typeof object.autoRefState !== "object")
                throw TypeError(".GcState.autoRefState: object expected");
            message.autoRefState = {};
            for (let keys = Object.keys(object.autoRefState), i = 0; i < keys.length; ++i) {
                if (typeof object.autoRefState[keys[i]] !== "object")
                    throw TypeError(".GcState.autoRefState: object expected");
                message.autoRefState[keys[i]] = $root.GcStateAutoRef.fromObject(object.autoRefState[keys[i]]);
            }
        }
        if (object.trackerState) {
            if (typeof object.trackerState !== "object")
                throw TypeError(".GcState.trackerState: object expected");
            message.trackerState = {};
            for (let keys = Object.keys(object.trackerState), i = 0; i < keys.length; ++i) {
                if (typeof object.trackerState[keys[i]] !== "object")
                    throw TypeError(".GcState.trackerState: object expected");
                message.trackerState[keys[i]] = $root.GcStateTracker.fromObject(object.trackerState[keys[i]]);
            }
        }
        if (object.trackerStateGc != null) {
            if (typeof object.trackerStateGc !== "object")
                throw TypeError(".GcState.trackerStateGc: object expected");
            message.trackerStateGc = $root.GcStateTracker.fromObject(object.trackerStateGc);
        }
        if (object.readyToContinue != null)
            message.readyToContinue = Boolean(object.readyToContinue);
        return message;
    };

    /**
     * Creates a plain object from a GcState message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GcState
     * @static
     * @param {GcState} message GcState
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GcState.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.objects || options.defaults) {
            object.teamState = {};
            object.autoRefState = {};
            object.trackerState = {};
        }
        if (options.defaults) {
            object.trackerStateGc = null;
            object.readyToContinue = false;
        }
        let keys2;
        if (message.teamState && (keys2 = Object.keys(message.teamState)).length) {
            object.teamState = {};
            for (let j = 0; j < keys2.length; ++j)
                object.teamState[keys2[j]] = $root.GcStateTeam.toObject(message.teamState[keys2[j]], options);
        }
        if (message.autoRefState && (keys2 = Object.keys(message.autoRefState)).length) {
            object.autoRefState = {};
            for (let j = 0; j < keys2.length; ++j)
                object.autoRefState[keys2[j]] = $root.GcStateAutoRef.toObject(message.autoRefState[keys2[j]], options);
        }
        if (message.trackerState && (keys2 = Object.keys(message.trackerState)).length) {
            object.trackerState = {};
            for (let j = 0; j < keys2.length; ++j)
                object.trackerState[keys2[j]] = $root.GcStateTracker.toObject(message.trackerState[keys2[j]], options);
        }
        if (message.trackerStateGc != null && message.hasOwnProperty("trackerStateGc"))
            object.trackerStateGc = $root.GcStateTracker.toObject(message.trackerStateGc, options);
        if (message.readyToContinue != null && message.hasOwnProperty("readyToContinue"))
            object.readyToContinue = message.readyToContinue;
        return object;
    };

    /**
     * Converts this GcState to JSON.
     * @function toJSON
     * @memberof GcState
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GcState.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GcState;
})();

export const GcStateTeam = $root.GcStateTeam = (() => {

    /**
     * Properties of a GcStateTeam.
     * @exports IGcStateTeam
     * @interface IGcStateTeam
     * @property {boolean|null} [connected] GcStateTeam connected
     * @property {boolean|null} [connectionVerified] GcStateTeam connectionVerified
     */

    /**
     * Constructs a new GcStateTeam.
     * @exports GcStateTeam
     * @classdesc Represents a GcStateTeam.
     * @implements IGcStateTeam
     * @constructor
     * @param {IGcStateTeam=} [properties] Properties to set
     */
    function GcStateTeam(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GcStateTeam connected.
     * @member {boolean} connected
     * @memberof GcStateTeam
     * @instance
     */
    GcStateTeam.prototype.connected = false;

    /**
     * GcStateTeam connectionVerified.
     * @member {boolean} connectionVerified
     * @memberof GcStateTeam
     * @instance
     */
    GcStateTeam.prototype.connectionVerified = false;

    /**
     * Creates a new GcStateTeam instance using the specified properties.
     * @function create
     * @memberof GcStateTeam
     * @static
     * @param {IGcStateTeam=} [properties] Properties to set
     * @returns {GcStateTeam} GcStateTeam instance
     */
    GcStateTeam.create = function create(properties) {
        return new GcStateTeam(properties);
    };

    /**
     * Encodes the specified GcStateTeam message. Does not implicitly {@link GcStateTeam.verify|verify} messages.
     * @function encode
     * @memberof GcStateTeam
     * @static
     * @param {IGcStateTeam} message GcStateTeam message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcStateTeam.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.connected != null && message.hasOwnProperty("connected"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.connected);
        if (message.connectionVerified != null && message.hasOwnProperty("connectionVerified"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.connectionVerified);
        return writer;
    };

    /**
     * Encodes the specified GcStateTeam message, length delimited. Does not implicitly {@link GcStateTeam.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GcStateTeam
     * @static
     * @param {IGcStateTeam} message GcStateTeam message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcStateTeam.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GcStateTeam message from the specified reader or buffer.
     * @function decode
     * @memberof GcStateTeam
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GcStateTeam} GcStateTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcStateTeam.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GcStateTeam();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.connected = reader.bool();
                break;
            case 2:
                message.connectionVerified = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GcStateTeam message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GcStateTeam
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GcStateTeam} GcStateTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcStateTeam.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GcStateTeam message.
     * @function verify
     * @memberof GcStateTeam
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GcStateTeam.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.connected != null && message.hasOwnProperty("connected"))
            if (typeof message.connected !== "boolean")
                return "connected: boolean expected";
        if (message.connectionVerified != null && message.hasOwnProperty("connectionVerified"))
            if (typeof message.connectionVerified !== "boolean")
                return "connectionVerified: boolean expected";
        return null;
    };

    /**
     * Creates a GcStateTeam message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GcStateTeam
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GcStateTeam} GcStateTeam
     */
    GcStateTeam.fromObject = function fromObject(object) {
        if (object instanceof $root.GcStateTeam)
            return object;
        let message = new $root.GcStateTeam();
        if (object.connected != null)
            message.connected = Boolean(object.connected);
        if (object.connectionVerified != null)
            message.connectionVerified = Boolean(object.connectionVerified);
        return message;
    };

    /**
     * Creates a plain object from a GcStateTeam message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GcStateTeam
     * @static
     * @param {GcStateTeam} message GcStateTeam
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GcStateTeam.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.connected = false;
            object.connectionVerified = false;
        }
        if (message.connected != null && message.hasOwnProperty("connected"))
            object.connected = message.connected;
        if (message.connectionVerified != null && message.hasOwnProperty("connectionVerified"))
            object.connectionVerified = message.connectionVerified;
        return object;
    };

    /**
     * Converts this GcStateTeam to JSON.
     * @function toJSON
     * @memberof GcStateTeam
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GcStateTeam.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GcStateTeam;
})();

export const GcStateAutoRef = $root.GcStateAutoRef = (() => {

    /**
     * Properties of a GcStateAutoRef.
     * @exports IGcStateAutoRef
     * @interface IGcStateAutoRef
     * @property {boolean|null} [connectionVerified] GcStateAutoRef connectionVerified
     */

    /**
     * Constructs a new GcStateAutoRef.
     * @exports GcStateAutoRef
     * @classdesc Represents a GcStateAutoRef.
     * @implements IGcStateAutoRef
     * @constructor
     * @param {IGcStateAutoRef=} [properties] Properties to set
     */
    function GcStateAutoRef(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GcStateAutoRef connectionVerified.
     * @member {boolean} connectionVerified
     * @memberof GcStateAutoRef
     * @instance
     */
    GcStateAutoRef.prototype.connectionVerified = false;

    /**
     * Creates a new GcStateAutoRef instance using the specified properties.
     * @function create
     * @memberof GcStateAutoRef
     * @static
     * @param {IGcStateAutoRef=} [properties] Properties to set
     * @returns {GcStateAutoRef} GcStateAutoRef instance
     */
    GcStateAutoRef.create = function create(properties) {
        return new GcStateAutoRef(properties);
    };

    /**
     * Encodes the specified GcStateAutoRef message. Does not implicitly {@link GcStateAutoRef.verify|verify} messages.
     * @function encode
     * @memberof GcStateAutoRef
     * @static
     * @param {IGcStateAutoRef} message GcStateAutoRef message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcStateAutoRef.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.connectionVerified != null && message.hasOwnProperty("connectionVerified"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.connectionVerified);
        return writer;
    };

    /**
     * Encodes the specified GcStateAutoRef message, length delimited. Does not implicitly {@link GcStateAutoRef.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GcStateAutoRef
     * @static
     * @param {IGcStateAutoRef} message GcStateAutoRef message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcStateAutoRef.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GcStateAutoRef message from the specified reader or buffer.
     * @function decode
     * @memberof GcStateAutoRef
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GcStateAutoRef} GcStateAutoRef
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcStateAutoRef.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GcStateAutoRef();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.connectionVerified = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GcStateAutoRef message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GcStateAutoRef
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GcStateAutoRef} GcStateAutoRef
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcStateAutoRef.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GcStateAutoRef message.
     * @function verify
     * @memberof GcStateAutoRef
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GcStateAutoRef.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.connectionVerified != null && message.hasOwnProperty("connectionVerified"))
            if (typeof message.connectionVerified !== "boolean")
                return "connectionVerified: boolean expected";
        return null;
    };

    /**
     * Creates a GcStateAutoRef message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GcStateAutoRef
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GcStateAutoRef} GcStateAutoRef
     */
    GcStateAutoRef.fromObject = function fromObject(object) {
        if (object instanceof $root.GcStateAutoRef)
            return object;
        let message = new $root.GcStateAutoRef();
        if (object.connectionVerified != null)
            message.connectionVerified = Boolean(object.connectionVerified);
        return message;
    };

    /**
     * Creates a plain object from a GcStateAutoRef message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GcStateAutoRef
     * @static
     * @param {GcStateAutoRef} message GcStateAutoRef
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GcStateAutoRef.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.connectionVerified = false;
        if (message.connectionVerified != null && message.hasOwnProperty("connectionVerified"))
            object.connectionVerified = message.connectionVerified;
        return object;
    };

    /**
     * Converts this GcStateAutoRef to JSON.
     * @function toJSON
     * @memberof GcStateAutoRef
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GcStateAutoRef.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GcStateAutoRef;
})();

export const GcStateTracker = $root.GcStateTracker = (() => {

    /**
     * Properties of a GcStateTracker.
     * @exports IGcStateTracker
     * @interface IGcStateTracker
     * @property {string|null} [sourceName] GcStateTracker sourceName
     * @property {IBall|null} [ball] GcStateTracker ball
     * @property {Array.<IRobot>|null} [robots] GcStateTracker robots
     */

    /**
     * Constructs a new GcStateTracker.
     * @exports GcStateTracker
     * @classdesc Represents a GcStateTracker.
     * @implements IGcStateTracker
     * @constructor
     * @param {IGcStateTracker=} [properties] Properties to set
     */
    function GcStateTracker(properties) {
        this.robots = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GcStateTracker sourceName.
     * @member {string} sourceName
     * @memberof GcStateTracker
     * @instance
     */
    GcStateTracker.prototype.sourceName = "";

    /**
     * GcStateTracker ball.
     * @member {IBall|null|undefined} ball
     * @memberof GcStateTracker
     * @instance
     */
    GcStateTracker.prototype.ball = null;

    /**
     * GcStateTracker robots.
     * @member {Array.<IRobot>} robots
     * @memberof GcStateTracker
     * @instance
     */
    GcStateTracker.prototype.robots = $util.emptyArray;

    /**
     * Creates a new GcStateTracker instance using the specified properties.
     * @function create
     * @memberof GcStateTracker
     * @static
     * @param {IGcStateTracker=} [properties] Properties to set
     * @returns {GcStateTracker} GcStateTracker instance
     */
    GcStateTracker.create = function create(properties) {
        return new GcStateTracker(properties);
    };

    /**
     * Encodes the specified GcStateTracker message. Does not implicitly {@link GcStateTracker.verify|verify} messages.
     * @function encode
     * @memberof GcStateTracker
     * @static
     * @param {IGcStateTracker} message GcStateTracker message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcStateTracker.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sourceName != null && message.hasOwnProperty("sourceName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceName);
        if (message.ball != null && message.hasOwnProperty("ball"))
            $root.Ball.encode(message.ball, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.robots != null && message.robots.length)
            for (let i = 0; i < message.robots.length; ++i)
                $root.Robot.encode(message.robots[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GcStateTracker message, length delimited. Does not implicitly {@link GcStateTracker.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GcStateTracker
     * @static
     * @param {IGcStateTracker} message GcStateTracker message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GcStateTracker.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GcStateTracker message from the specified reader or buffer.
     * @function decode
     * @memberof GcStateTracker
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GcStateTracker} GcStateTracker
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcStateTracker.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GcStateTracker();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sourceName = reader.string();
                break;
            case 2:
                message.ball = $root.Ball.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.robots && message.robots.length))
                    message.robots = [];
                message.robots.push($root.Robot.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GcStateTracker message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GcStateTracker
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GcStateTracker} GcStateTracker
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GcStateTracker.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GcStateTracker message.
     * @function verify
     * @memberof GcStateTracker
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GcStateTracker.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sourceName != null && message.hasOwnProperty("sourceName"))
            if (!$util.isString(message.sourceName))
                return "sourceName: string expected";
        if (message.ball != null && message.hasOwnProperty("ball")) {
            let error = $root.Ball.verify(message.ball);
            if (error)
                return "ball." + error;
        }
        if (message.robots != null && message.hasOwnProperty("robots")) {
            if (!Array.isArray(message.robots))
                return "robots: array expected";
            for (let i = 0; i < message.robots.length; ++i) {
                let error = $root.Robot.verify(message.robots[i]);
                if (error)
                    return "robots." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GcStateTracker message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GcStateTracker
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GcStateTracker} GcStateTracker
     */
    GcStateTracker.fromObject = function fromObject(object) {
        if (object instanceof $root.GcStateTracker)
            return object;
        let message = new $root.GcStateTracker();
        if (object.sourceName != null)
            message.sourceName = String(object.sourceName);
        if (object.ball != null) {
            if (typeof object.ball !== "object")
                throw TypeError(".GcStateTracker.ball: object expected");
            message.ball = $root.Ball.fromObject(object.ball);
        }
        if (object.robots) {
            if (!Array.isArray(object.robots))
                throw TypeError(".GcStateTracker.robots: array expected");
            message.robots = [];
            for (let i = 0; i < object.robots.length; ++i) {
                if (typeof object.robots[i] !== "object")
                    throw TypeError(".GcStateTracker.robots: object expected");
                message.robots[i] = $root.Robot.fromObject(object.robots[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a GcStateTracker message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GcStateTracker
     * @static
     * @param {GcStateTracker} message GcStateTracker
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GcStateTracker.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.robots = [];
        if (options.defaults) {
            object.sourceName = "";
            object.ball = null;
        }
        if (message.sourceName != null && message.hasOwnProperty("sourceName"))
            object.sourceName = message.sourceName;
        if (message.ball != null && message.hasOwnProperty("ball"))
            object.ball = $root.Ball.toObject(message.ball, options);
        if (message.robots && message.robots.length) {
            object.robots = [];
            for (let j = 0; j < message.robots.length; ++j)
                object.robots[j] = $root.Robot.toObject(message.robots[j], options);
        }
        return object;
    };

    /**
     * Converts this GcStateTracker to JSON.
     * @function toJSON
     * @memberof GcStateTracker
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GcStateTracker.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GcStateTracker;
})();

export const Ball = $root.Ball = (() => {

    /**
     * Properties of a Ball.
     * @exports IBall
     * @interface IBall
     * @property {IVector3|null} [pos] Ball pos
     * @property {IVector3|null} [vel] Ball vel
     */

    /**
     * Constructs a new Ball.
     * @exports Ball
     * @classdesc Represents a Ball.
     * @implements IBall
     * @constructor
     * @param {IBall=} [properties] Properties to set
     */
    function Ball(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Ball pos.
     * @member {IVector3|null|undefined} pos
     * @memberof Ball
     * @instance
     */
    Ball.prototype.pos = null;

    /**
     * Ball vel.
     * @member {IVector3|null|undefined} vel
     * @memberof Ball
     * @instance
     */
    Ball.prototype.vel = null;

    /**
     * Creates a new Ball instance using the specified properties.
     * @function create
     * @memberof Ball
     * @static
     * @param {IBall=} [properties] Properties to set
     * @returns {Ball} Ball instance
     */
    Ball.create = function create(properties) {
        return new Ball(properties);
    };

    /**
     * Encodes the specified Ball message. Does not implicitly {@link Ball.verify|verify} messages.
     * @function encode
     * @memberof Ball
     * @static
     * @param {IBall} message Ball message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ball.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pos != null && message.hasOwnProperty("pos"))
            $root.Vector3.encode(message.pos, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.vel != null && message.hasOwnProperty("vel"))
            $root.Vector3.encode(message.vel, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Ball message, length delimited. Does not implicitly {@link Ball.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ball
     * @static
     * @param {IBall} message Ball message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ball.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ball message from the specified reader or buffer.
     * @function decode
     * @memberof Ball
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ball} Ball
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ball.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ball();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pos = $root.Vector3.decode(reader, reader.uint32());
                break;
            case 2:
                message.vel = $root.Vector3.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Ball message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ball
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ball} Ball
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ball.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ball message.
     * @function verify
     * @memberof Ball
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ball.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pos != null && message.hasOwnProperty("pos")) {
            let error = $root.Vector3.verify(message.pos);
            if (error)
                return "pos." + error;
        }
        if (message.vel != null && message.hasOwnProperty("vel")) {
            let error = $root.Vector3.verify(message.vel);
            if (error)
                return "vel." + error;
        }
        return null;
    };

    /**
     * Creates a Ball message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ball
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ball} Ball
     */
    Ball.fromObject = function fromObject(object) {
        if (object instanceof $root.Ball)
            return object;
        let message = new $root.Ball();
        if (object.pos != null) {
            if (typeof object.pos !== "object")
                throw TypeError(".Ball.pos: object expected");
            message.pos = $root.Vector3.fromObject(object.pos);
        }
        if (object.vel != null) {
            if (typeof object.vel !== "object")
                throw TypeError(".Ball.vel: object expected");
            message.vel = $root.Vector3.fromObject(object.vel);
        }
        return message;
    };

    /**
     * Creates a plain object from a Ball message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ball
     * @static
     * @param {Ball} message Ball
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ball.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.pos = null;
            object.vel = null;
        }
        if (message.pos != null && message.hasOwnProperty("pos"))
            object.pos = $root.Vector3.toObject(message.pos, options);
        if (message.vel != null && message.hasOwnProperty("vel"))
            object.vel = $root.Vector3.toObject(message.vel, options);
        return object;
    };

    /**
     * Converts this Ball to JSON.
     * @function toJSON
     * @memberof Ball
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ball.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ball;
})();

export const Robot = $root.Robot = (() => {

    /**
     * Properties of a Robot.
     * @exports IRobot
     * @interface IRobot
     * @property {IRobotId|null} [id] Robot id
     * @property {IVector2|null} [pos] Robot pos
     */

    /**
     * Constructs a new Robot.
     * @exports Robot
     * @classdesc Represents a Robot.
     * @implements IRobot
     * @constructor
     * @param {IRobot=} [properties] Properties to set
     */
    function Robot(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Robot id.
     * @member {IRobotId|null|undefined} id
     * @memberof Robot
     * @instance
     */
    Robot.prototype.id = null;

    /**
     * Robot pos.
     * @member {IVector2|null|undefined} pos
     * @memberof Robot
     * @instance
     */
    Robot.prototype.pos = null;

    /**
     * Creates a new Robot instance using the specified properties.
     * @function create
     * @memberof Robot
     * @static
     * @param {IRobot=} [properties] Properties to set
     * @returns {Robot} Robot instance
     */
    Robot.create = function create(properties) {
        return new Robot(properties);
    };

    /**
     * Encodes the specified Robot message. Does not implicitly {@link Robot.verify|verify} messages.
     * @function encode
     * @memberof Robot
     * @static
     * @param {IRobot} message Robot message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Robot.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            $root.RobotId.encode(message.id, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.pos != null && message.hasOwnProperty("pos"))
            $root.Vector2.encode(message.pos, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Robot message, length delimited. Does not implicitly {@link Robot.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Robot
     * @static
     * @param {IRobot} message Robot message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Robot.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Robot message from the specified reader or buffer.
     * @function decode
     * @memberof Robot
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Robot} Robot
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Robot.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Robot();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = $root.RobotId.decode(reader, reader.uint32());
                break;
            case 2:
                message.pos = $root.Vector2.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Robot message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Robot
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Robot} Robot
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Robot.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Robot message.
     * @function verify
     * @memberof Robot
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Robot.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id")) {
            let error = $root.RobotId.verify(message.id);
            if (error)
                return "id." + error;
        }
        if (message.pos != null && message.hasOwnProperty("pos")) {
            let error = $root.Vector2.verify(message.pos);
            if (error)
                return "pos." + error;
        }
        return null;
    };

    /**
     * Creates a Robot message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Robot
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Robot} Robot
     */
    Robot.fromObject = function fromObject(object) {
        if (object instanceof $root.Robot)
            return object;
        let message = new $root.Robot();
        if (object.id != null) {
            if (typeof object.id !== "object")
                throw TypeError(".Robot.id: object expected");
            message.id = $root.RobotId.fromObject(object.id);
        }
        if (object.pos != null) {
            if (typeof object.pos !== "object")
                throw TypeError(".Robot.pos: object expected");
            message.pos = $root.Vector2.fromObject(object.pos);
        }
        return message;
    };

    /**
     * Creates a plain object from a Robot message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Robot
     * @static
     * @param {Robot} message Robot
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Robot.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = null;
            object.pos = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = $root.RobotId.toObject(message.id, options);
        if (message.pos != null && message.hasOwnProperty("pos"))
            object.pos = $root.Vector2.toObject(message.pos, options);
        return object;
    };

    /**
     * Converts this Robot to JSON.
     * @function toJSON
     * @memberof Robot
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Robot.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Robot;
})();

export { $root as default };
