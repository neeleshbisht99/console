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
/**
 * Disk has been destroyed
 * @export
 * @interface DiskStateOneOf5
 */
export interface DiskStateOneOf5 {
  /**
   *
   * @type {string}
   * @memberof DiskStateOneOf5
   */
  state: 'destroyed'
}

export function DiskStateOneOf5FromJSON(json: any): DiskStateOneOf5 {
  return DiskStateOneOf5FromJSONTyped(json, false)
}

export function DiskStateOneOf5FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DiskStateOneOf5 {
  if (json === undefined || json === null) {
    return json
  }
  return {
    state: json['state'],
  }
}

export function DiskStateOneOf5ToJSON(value?: DiskStateOneOf5 | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    state: value.state,
  }
}