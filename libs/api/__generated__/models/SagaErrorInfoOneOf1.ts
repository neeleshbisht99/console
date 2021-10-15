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
 *
 * @export
 * @interface SagaErrorInfoOneOf1
 */
export interface SagaErrorInfoOneOf1 {
  /**
   *
   * @type {string}
   * @memberof SagaErrorInfoOneOf1
   */
  error: 'deserializeFailed'
  /**
   *
   * @type {string}
   * @memberof SagaErrorInfoOneOf1
   */
  message: string
}

export function SagaErrorInfoOneOf1FromJSON(json: any): SagaErrorInfoOneOf1 {
  return SagaErrorInfoOneOf1FromJSONTyped(json, false)
}

export function SagaErrorInfoOneOf1FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SagaErrorInfoOneOf1 {
  if (json === undefined || json === null) {
    return json
  }
  return {
    error: json['error'],
    message: json['message'],
  }
}

export function SagaErrorInfoOneOf1ToJSON(
  value?: SagaErrorInfoOneOf1 | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    error: value.error,
    message: value.message,
  }
}