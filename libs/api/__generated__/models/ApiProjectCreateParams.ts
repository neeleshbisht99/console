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
 * Create-time parameters for an [`ApiProject`]
 * @export
 * @interface ApiProjectCreateParams
 */
export interface ApiProjectCreateParams {
  /**
   *
   * @type {string}
   * @memberof ApiProjectCreateParams
   */
  description: string
  /**
   * Names must begin with a lower case ASCII letter, be composed exclusively of lowercase ASCII, uppercase ASCII, numbers, and '-', and may not end with a '-'.
   * @type {string}
   * @memberof ApiProjectCreateParams
   */
  name: string
}

export function ApiProjectCreateParamsFromJSON(
  json: any
): ApiProjectCreateParams {
  return ApiProjectCreateParamsFromJSONTyped(json, false)
}

export function ApiProjectCreateParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ApiProjectCreateParams {
  if (json === undefined || json === null) {
    return json
  }
  return {
    description: json['description'],
    name: json['name'],
  }
}

export function ApiProjectCreateParamsToJSON(
  value?: ApiProjectCreateParams | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    description: value.description,
    name: value.name,
  }
}