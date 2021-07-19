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
 * Disk is being attached to the given Instance
 * @export
 * @interface DiskStateAnyOf1
 */
export interface DiskStateAnyOf1 {
  /**
   *
   * @type {string}
   * @memberof DiskStateAnyOf1
   */
  attaching: string
}

export function DiskStateAnyOf1FromJSON(json: any): DiskStateAnyOf1 {
  return DiskStateAnyOf1FromJSONTyped(json, false)
}

export function DiskStateAnyOf1FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DiskStateAnyOf1 {
  if (json === undefined || json === null) {
    return json
  }
  return {
    attaching: json['attaching'],
  }
}

export function DiskStateAnyOf1ToJSON(value?: DiskStateAnyOf1 | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    attaching: value.attaching,
  }
}