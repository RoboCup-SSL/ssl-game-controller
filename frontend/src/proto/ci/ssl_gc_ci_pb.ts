// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,json_types=true"
// @generated from file ci/ssl_gc_ci.proto (syntax proto2)
 

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { TrackerWrapperPacket, TrackerWrapperPacketJson } from "../tracker/ssl_vision_wrapper_tracked_pb";
import { file_tracker_ssl_vision_wrapper_tracked } from "../tracker/ssl_vision_wrapper_tracked_pb";
import type { Input, InputJson } from "../api/ssl_gc_api_pb";
import { file_api_ssl_gc_api } from "../api/ssl_gc_api_pb";
import type { Referee, RefereeJson } from "../state/ssl_gc_referee_message_pb";
import { file_state_ssl_gc_referee_message } from "../state/ssl_gc_referee_message_pb";
import type { SSL_GeometryData, SSL_GeometryDataJson } from "../vision/ssl_vision_geometry_pb";
import { file_vision_ssl_vision_geometry } from "../vision/ssl_vision_geometry_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file ci/ssl_gc_ci.proto.
 */
export const file_ci_ssl_gc_ci: GenFile = /*@__PURE__*/
  fileDesc("ChJjaS9zc2xfZ2NfY2kucHJvdG8ijAEKB0NpSW5wdXQSEQoJdGltZXN0YW1wGAEgASgDEi0KDnRyYWNrZXJfcGFja2V0GAIgASgLMhUuVHJhY2tlcldyYXBwZXJQYWNrZXQSGgoKYXBpX2lucHV0cxgDIAMoCzIGLklucHV0EiMKCGdlb21ldHJ5GAQgASgLMhEuU1NMX0dlb21ldHJ5RGF0YSIpCghDaU91dHB1dBIdCgtyZWZlcmVlX21zZxgBIAEoCzIILlJlZmVyZWVCTEIMU3NsR2NDaVByb3RvUAFaOmdpdGh1Yi5jb20vUm9ib0N1cC1TU0wvc3NsLWdhbWUtY29udHJvbGxlci9pbnRlcm5hbC9hcHAvY2k", [file_tracker_ssl_vision_wrapper_tracked, file_api_ssl_gc_api, file_state_ssl_gc_referee_message, file_vision_ssl_vision_geometry]);

/**
 * The input format to the GC
 *
 * @generated from message CiInput
 */
export type CiInput = Message<"CiInput"> & {
  /**
   * New unix timestamp in [ns] for the GC
   *
   * @generated from field: optional int64 timestamp = 1;
   */
  timestamp: bigint;

  /**
   * New tracker packet with ball and robot data
   *
   * @generated from field: optional TrackerWrapperPacket tracker_packet = 2;
   */
  trackerPacket?: TrackerWrapperPacket;

  /**
   * (UI) API input
   *
   * @generated from field: repeated Input api_inputs = 3;
   */
  apiInputs: Input[];

  /**
   * Update geometry
   *
   * @generated from field: optional SSL_GeometryData geometry = 4;
   */
  geometry?: SSL_GeometryData;
};

/**
 * The input format to the GC
 *
 * @generated from message CiInput
 */
export type CiInputJson = {
  /**
   * New unix timestamp in [ns] for the GC
   *
   * @generated from field: optional int64 timestamp = 1;
   */
  timestamp?: string;

  /**
   * New tracker packet with ball and robot data
   *
   * @generated from field: optional TrackerWrapperPacket tracker_packet = 2;
   */
  trackerPacket?: TrackerWrapperPacketJson;

  /**
   * (UI) API input
   *
   * @generated from field: repeated Input api_inputs = 3;
   */
  apiInputs?: InputJson[];

  /**
   * Update geometry
   *
   * @generated from field: optional SSL_GeometryData geometry = 4;
   */
  geometry?: SSL_GeometryDataJson;
};

/**
 * Describes the message CiInput.
 * Use `create(CiInputSchema)` to create a new message.
 */
export const CiInputSchema: GenMessage<CiInput, CiInputJson> = /*@__PURE__*/
  messageDesc(file_ci_ssl_gc_ci, 0);

/**
 * The output format of the GC response
 *
 * @generated from message CiOutput
 */
export type CiOutput = Message<"CiOutput"> & {
  /**
   * Latest referee message
   *
   * @generated from field: optional Referee referee_msg = 1;
   */
  refereeMsg?: Referee;
};

/**
 * The output format of the GC response
 *
 * @generated from message CiOutput
 */
export type CiOutputJson = {
  /**
   * Latest referee message
   *
   * @generated from field: optional Referee referee_msg = 1;
   */
  refereeMsg?: RefereeJson;
};

/**
 * Describes the message CiOutput.
 * Use `create(CiOutputSchema)` to create a new message.
 */
export const CiOutputSchema: GenMessage<CiOutput, CiOutputJson> = /*@__PURE__*/
  messageDesc(file_ci_ssl_gc_ci, 1);

