/* tslint:disable */
/* eslint-disable */
/**
 * Oxide Region API
 * API for interacting with the Oxide control plane
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: api@oxide.computer
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Running state of an Instance (primarily: booted or stopped)
 *
 * This typically reflects whether it's starting, running, stopping, or stopped, but also includes states related to the Instance's lifecycle
 * @export
 * @enum {string}
 */
export enum ApiInstanceState {
  Creating = 'creating',
  Starting = 'starting',
  Running = 'running',
  Stopping = 'stopping',
  Stopped = 'stopped',
  Repairing = 'repairing',
  Failed = 'failed',
  Destroyed = 'destroyed',
}

export function ApiInstanceStateFromJSON(json: any): ApiInstanceState {
  return ApiInstanceStateFromJSONTyped(json, false)
}

export function ApiInstanceStateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ApiInstanceState {
  return json as ApiInstanceState
}

export function ApiInstanceStateToJSON(value?: ApiInstanceState | null): any {
  return value as any
}