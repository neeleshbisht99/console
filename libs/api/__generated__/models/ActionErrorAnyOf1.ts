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

import { exists, mapValues } from '../runtime'
import {
  ActionErrorAnyOf1ActionFailed,
  ActionErrorAnyOf1ActionFailedFromJSON,
  ActionErrorAnyOf1ActionFailedFromJSONTyped,
  ActionErrorAnyOf1ActionFailedToJSON,
} from './'

/**
 * Action failed due to a consumer-specific error
 * @export
 * @interface ActionErrorAnyOf1
 */
export interface ActionErrorAnyOf1 {
  /**
   *
   * @type {ActionErrorAnyOf1ActionFailed}
   * @memberof ActionErrorAnyOf1
   */
  actionFailed: ActionErrorAnyOf1ActionFailed
}

export function ActionErrorAnyOf1FromJSON(json: any): ActionErrorAnyOf1 {
  return ActionErrorAnyOf1FromJSONTyped(json, false)
}

export function ActionErrorAnyOf1FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ActionErrorAnyOf1 {
  if (json === undefined || json === null) {
    return json
  }
  return {
    actionFailed: ActionErrorAnyOf1ActionFailedFromJSON(json['ActionFailed']),
  }
}

export function ActionErrorAnyOf1ToJSON(value?: ActionErrorAnyOf1 | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    ActionFailed: ActionErrorAnyOf1ActionFailedToJSON(value.actionFailed),
  }
}