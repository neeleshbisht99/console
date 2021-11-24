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
 * Updateable properties of an [`Project`]
 * @export
 * @interface ProjectUpdate
 */
export interface ProjectUpdate {
  /**
   *
   * @type {string}
   * @memberof ProjectUpdate
   */
  description?: string | null
  /**
   *
   * @type {string}
   * @memberof ProjectUpdate
   */
  name?: string | null
}

export function ProjectUpdateFromJSON(json: any): ProjectUpdate {
  return ProjectUpdateFromJSONTyped(json, false)
}

export function ProjectUpdateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ProjectUpdate {
  if (json === undefined || json === null) {
    return json
  }
  return {
    description: !exists(json, 'description') ? undefined : json['description'],
    name: !exists(json, 'name') ? undefined : json['name'],
  }
}

export function ProjectUpdateToJSON(value?: ProjectUpdate | null): any {
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