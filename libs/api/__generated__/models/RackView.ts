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
  IdentityMetadata,
  IdentityMetadataFromJSON,
  IdentityMetadataFromJSONTyped,
  IdentityMetadataToJSON,
} from './'

/**
 * Client view of an [`Rack`]
 * @export
 * @interface RackView
 */
export interface RackView {
  /**
   *
   * @type {IdentityMetadata}
   * @memberof RackView
   */
  identity: IdentityMetadata
}

export function RackViewFromJSON(json: any): RackView {
  return RackViewFromJSONTyped(json, false)
}

export function RackViewFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RackView {
  if (json === undefined || json === null) {
    return json
  }
  return {
    identity: IdentityMetadataFromJSON(json['identity']),
  }
}

export function RackViewToJSON(value?: RackView | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    identity: IdentityMetadataToJSON(value.identity),
  }
}