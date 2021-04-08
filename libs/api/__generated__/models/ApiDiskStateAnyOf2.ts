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
 * Disk is attached to the given Instance
 * @export
 * @interface ApiDiskStateAnyOf2
 */
export interface ApiDiskStateAnyOf2 {
  /**
   *
   * @type {string}
   * @memberof ApiDiskStateAnyOf2
   */
  attached: string
}

export function ApiDiskStateAnyOf2FromJSON(json: any): ApiDiskStateAnyOf2 {
  return ApiDiskStateAnyOf2FromJSONTyped(json, false)
}

export function ApiDiskStateAnyOf2FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ApiDiskStateAnyOf2 {
  if (json === undefined || json === null) {
    return json
  }
  return {
    attached: json['attached'],
  }
}

export function ApiDiskStateAnyOf2ToJSON(
  value?: ApiDiskStateAnyOf2 | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    attached: value.attached,
  }
}