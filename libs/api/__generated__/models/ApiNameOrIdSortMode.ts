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
 * Supported set of sort modes for scanning by name or id
 * @export
 * @enum {string}
 */
export enum ApiNameOrIdSortMode {
  NameAscending = 'name-ascending',
  NameDescending = 'name-descending',
  IdAscending = 'id-ascending',
}

export function ApiNameOrIdSortModeFromJSON(json: any): ApiNameOrIdSortMode {
  return ApiNameOrIdSortModeFromJSONTyped(json, false)
}

export function ApiNameOrIdSortModeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ApiNameOrIdSortMode {
  return json as ApiNameOrIdSortMode
}

export function ApiNameOrIdSortModeToJSON(
  value?: ApiNameOrIdSortMode | null
): any {
  return value as any
}