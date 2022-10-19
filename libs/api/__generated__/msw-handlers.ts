/* eslint-disable */
import {
  ResponseComposition,
  ResponseTransformer,
  RestContext,
  RestHandler,
  RestRequest,
  compose,
  context,
  rest,
} from 'msw'
import type { SnakeCasedPropertiesDeep as Snakify } from 'type-fest'
import { ZodSchema, z } from 'zod'

import type * as Api from './Api'
import * as schema from './validate'
import { snakeify } from './util'

type HandlerResult<T> = Json<T> | ResponseTransformer<Json<T>>
type StatusCode = number

/**
 * Custom transformer: convenience function for setting response `status` and/or
 * `delay`.
 *
 * @see https://mswjs.io/docs/basics/response-transformer#custom-transformer
 */
export function json<B>(
  body: B,
  options: { status?: number; delay?: number } = {}
): ResponseTransformer<B> {
  const { status = 200, delay = 0 } = options
  return compose(context.status(status), context.json(body), context.delay(delay))
}

// these are used for turning our nice JS-ified API types back into the original
// API JSON types (snake cased and dates as strings) for use in our mock API

type StringifyDates<T> = T extends Date
  ? string
  : {
      [K in keyof T]: T[K] extends Array<infer U>
        ? Array<StringifyDates<U>>
        : StringifyDates<T[K]>
    }

/**
 * Snake case fields and convert dates to strings. Not intended to be a general
 * purpose JSON type!
 */
export type Json<B> = Snakify<StringifyDates<B>>

export interface MSWHandlers {
  /** `GET /by-id/disks/:id` */
  diskViewById: (params: Api.DiskViewByIdParams) => HandlerResult<Api.Disk>
  /** `GET /by-id/images/:id` */
  imageViewById: (params: Api.ImageViewByIdParams) => HandlerResult<Api.Image>
  /** `GET /by-id/instances/:id` */
  instanceViewById: (params: Api.InstanceViewByIdParams) => HandlerResult<Api.Instance>
  /** `GET /by-id/network-interfaces/:id` */
  instanceNetworkInterfaceViewById: (
    params: Api.InstanceNetworkInterfaceViewByIdParams
  ) => HandlerResult<Api.NetworkInterface>
  /** `GET /by-id/organizations/:id` */
  organizationViewById: (
    params: Api.OrganizationViewByIdParams
  ) => HandlerResult<Api.Organization>
  /** `GET /by-id/projects/:id` */
  projectViewById: (params: Api.ProjectViewByIdParams) => HandlerResult<Api.Project>
  /** `GET /by-id/snapshots/:id` */
  snapshotViewById: (params: Api.SnapshotViewByIdParams) => HandlerResult<Api.Snapshot>
  /** `GET /by-id/vpc-router-routes/:id` */
  vpcRouterRouteViewById: (
    params: Api.VpcRouterRouteViewByIdParams
  ) => HandlerResult<Api.RouterRoute>
  /** `GET /by-id/vpc-routers/:id` */
  vpcRouterViewById: (params: Api.VpcRouterViewByIdParams) => HandlerResult<Api.VpcRouter>
  /** `GET /by-id/vpc-subnets/:id` */
  vpcSubnetViewById: (params: Api.VpcSubnetViewByIdParams) => HandlerResult<Api.VpcSubnet>
  /** `GET /by-id/vpcs/:id` */
  vpcViewById: (params: Api.VpcViewByIdParams) => HandlerResult<Api.Vpc>
  /** `POST /device/auth` */
  deviceAuthRequest: () => StatusCode
  /** `POST /device/confirm` */
  deviceAuthConfirm: (body: Json<Api.DeviceAuthVerify>) => StatusCode
  /** `POST /device/token` */
  deviceAccessToken: () => StatusCode
  /** `GET /groups` */
  groupList: (params: Api.GroupListParams) => HandlerResult<Api.GroupResultsPage>
  /** `POST /login` */
  loginSpoof: (body: Json<Api.SpoofLoginBody>) => StatusCode
  /** `GET /login/:siloName/saml/:providerName` */
  loginSamlBegin: (params: Api.LoginSamlBeginParams) => StatusCode
  /** `POST /login/:siloName/saml/:providerName` */
  loginSaml: (params: Api.LoginSamlParams) => StatusCode
  /** `POST /logout` */
  logout: () => StatusCode
  /** `GET /organizations` */
  organizationList: (
    params: Api.OrganizationListParams
  ) => HandlerResult<Api.OrganizationResultsPage>
  /** `POST /organizations` */
  organizationCreate: (
    body: Json<Api.OrganizationCreate>
  ) => HandlerResult<Api.Organization>
  /** `GET /organizations/:orgName` */
  organizationView: (params: Api.OrganizationViewParams) => HandlerResult<Api.Organization>
  /** `PUT /organizations/:orgName` */
  organizationUpdate: (
    params: Api.OrganizationUpdateParams,
    body: Json<Api.OrganizationUpdate>
  ) => HandlerResult<Api.Organization>
  /** `DELETE /organizations/:orgName` */
  organizationDelete: (params: Api.OrganizationDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/policy` */
  organizationPolicyView: (
    params: Api.OrganizationPolicyViewParams
  ) => HandlerResult<Api.OrganizationRolePolicy>
  /** `PUT /organizations/:orgName/policy` */
  organizationPolicyUpdate: (
    params: Api.OrganizationPolicyUpdateParams,
    body: Json<Api.OrganizationRolePolicy>
  ) => HandlerResult<Api.OrganizationRolePolicy>
  /** `GET /organizations/:orgName/projects` */
  projectList: (params: Api.ProjectListParams) => HandlerResult<Api.ProjectResultsPage>
  /** `POST /organizations/:orgName/projects` */
  projectCreate: (
    params: Api.ProjectCreateParams,
    body: Json<Api.ProjectCreate>
  ) => HandlerResult<Api.Project>
  /** `GET /organizations/:orgName/projects/:projectName` */
  projectView: (params: Api.ProjectViewParams) => HandlerResult<Api.Project>
  /** `PUT /organizations/:orgName/projects/:projectName` */
  projectUpdate: (
    params: Api.ProjectUpdateParams,
    body: Json<Api.ProjectUpdate>
  ) => HandlerResult<Api.Project>
  /** `DELETE /organizations/:orgName/projects/:projectName` */
  projectDelete: (params: Api.ProjectDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/disks` */
  diskList: (params: Api.DiskListParams) => HandlerResult<Api.DiskResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/disks` */
  diskCreate: (
    params: Api.DiskCreateParams,
    body: Json<Api.DiskCreate>
  ) => HandlerResult<Api.Disk>
  /** `GET /organizations/:orgName/projects/:projectName/disks/:diskName` */
  diskView: (params: Api.DiskViewParams) => HandlerResult<Api.Disk>
  /** `DELETE /organizations/:orgName/projects/:projectName/disks/:diskName` */
  diskDelete: (params: Api.DiskDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/disks/:diskName/metrics/:metricName` */
  diskMetricsList: (
    params: Api.DiskMetricsListParams
  ) => HandlerResult<Api.MeasurementResultsPage>
  /** `GET /organizations/:orgName/projects/:projectName/images` */
  imageList: (params: Api.ImageListParams) => HandlerResult<Api.ImageResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/images` */
  imageCreate: (
    params: Api.ImageCreateParams,
    body: Json<Api.ImageCreate>
  ) => HandlerResult<Api.Image>
  /** `GET /organizations/:orgName/projects/:projectName/images/:imageName` */
  imageView: (params: Api.ImageViewParams) => HandlerResult<Api.Image>
  /** `DELETE /organizations/:orgName/projects/:projectName/images/:imageName` */
  imageDelete: (params: Api.ImageDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/instances` */
  instanceList: (params: Api.InstanceListParams) => HandlerResult<Api.InstanceResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/instances` */
  instanceCreate: (
    params: Api.InstanceCreateParams,
    body: Json<Api.InstanceCreate>
  ) => HandlerResult<Api.Instance>
  /** `GET /organizations/:orgName/projects/:projectName/instances/:instanceName` */
  instanceView: (params: Api.InstanceViewParams) => HandlerResult<Api.Instance>
  /** `DELETE /organizations/:orgName/projects/:projectName/instances/:instanceName` */
  instanceDelete: (params: Api.InstanceDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/instances/:instanceName/disks` */
  instanceDiskList: (
    params: Api.InstanceDiskListParams
  ) => HandlerResult<Api.DiskResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/instances/:instanceName/disks/attach` */
  instanceDiskAttach: (
    params: Api.InstanceDiskAttachParams,
    body: Json<Api.DiskIdentifier>
  ) => HandlerResult<Api.Disk>
  /** `POST /organizations/:orgName/projects/:projectName/instances/:instanceName/disks/detach` */
  instanceDiskDetach: (
    params: Api.InstanceDiskDetachParams,
    body: Json<Api.DiskIdentifier>
  ) => HandlerResult<Api.Disk>
  /** `GET /organizations/:orgName/projects/:projectName/instances/:instanceName/external-ips` */
  instanceExternalIpList: (
    params: Api.InstanceExternalIpListParams
  ) => HandlerResult<Api.ExternalIpResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/instances/:instanceName/migrate` */
  instanceMigrate: (
    params: Api.InstanceMigrateParams,
    body: Json<Api.InstanceMigrate>
  ) => HandlerResult<Api.Instance>
  /** `GET /organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces` */
  instanceNetworkInterfaceList: (
    params: Api.InstanceNetworkInterfaceListParams
  ) => HandlerResult<Api.NetworkInterfaceResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces` */
  instanceNetworkInterfaceCreate: (
    params: Api.InstanceNetworkInterfaceCreateParams,
    body: Json<Api.NetworkInterfaceCreate>
  ) => HandlerResult<Api.NetworkInterface>
  /** `GET /organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces/:interfaceName` */
  instanceNetworkInterfaceView: (
    params: Api.InstanceNetworkInterfaceViewParams
  ) => HandlerResult<Api.NetworkInterface>
  /** `PUT /organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces/:interfaceName` */
  instanceNetworkInterfaceUpdate: (
    params: Api.InstanceNetworkInterfaceUpdateParams,
    body: Json<Api.NetworkInterfaceUpdate>
  ) => HandlerResult<Api.NetworkInterface>
  /** `DELETE /organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces/:interfaceName` */
  instanceNetworkInterfaceDelete: (
    params: Api.InstanceNetworkInterfaceDeleteParams
  ) => StatusCode
  /** `POST /organizations/:orgName/projects/:projectName/instances/:instanceName/reboot` */
  instanceReboot: (params: Api.InstanceRebootParams) => HandlerResult<Api.Instance>
  /** `GET /organizations/:orgName/projects/:projectName/instances/:instanceName/serial-console` */
  instanceSerialConsole: (
    params: Api.InstanceSerialConsoleParams
  ) => HandlerResult<Api.InstanceSerialConsoleData>
  /** `POST /organizations/:orgName/projects/:projectName/instances/:instanceName/start` */
  instanceStart: (params: Api.InstanceStartParams) => HandlerResult<Api.Instance>
  /** `POST /organizations/:orgName/projects/:projectName/instances/:instanceName/stop` */
  instanceStop: (params: Api.InstanceStopParams) => HandlerResult<Api.Instance>
  /** `GET /organizations/:orgName/projects/:projectName/policy` */
  projectPolicyView: (
    params: Api.ProjectPolicyViewParams
  ) => HandlerResult<Api.ProjectRolePolicy>
  /** `PUT /organizations/:orgName/projects/:projectName/policy` */
  projectPolicyUpdate: (
    params: Api.ProjectPolicyUpdateParams,
    body: Json<Api.ProjectRolePolicy>
  ) => HandlerResult<Api.ProjectRolePolicy>
  /** `GET /organizations/:orgName/projects/:projectName/snapshots` */
  snapshotList: (params: Api.SnapshotListParams) => HandlerResult<Api.SnapshotResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/snapshots` */
  snapshotCreate: (
    params: Api.SnapshotCreateParams,
    body: Json<Api.SnapshotCreate>
  ) => HandlerResult<Api.Snapshot>
  /** `GET /organizations/:orgName/projects/:projectName/snapshots/:snapshotName` */
  snapshotView: (params: Api.SnapshotViewParams) => HandlerResult<Api.Snapshot>
  /** `DELETE /organizations/:orgName/projects/:projectName/snapshots/:snapshotName` */
  snapshotDelete: (params: Api.SnapshotDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/vpcs` */
  vpcList: (params: Api.VpcListParams) => HandlerResult<Api.VpcResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/vpcs` */
  vpcCreate: (
    params: Api.VpcCreateParams,
    body: Json<Api.VpcCreate>
  ) => HandlerResult<Api.Vpc>
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName` */
  vpcView: (params: Api.VpcViewParams) => HandlerResult<Api.Vpc>
  /** `PUT /organizations/:orgName/projects/:projectName/vpcs/:vpcName` */
  vpcUpdate: (
    params: Api.VpcUpdateParams,
    body: Json<Api.VpcUpdate>
  ) => HandlerResult<Api.Vpc>
  /** `DELETE /organizations/:orgName/projects/:projectName/vpcs/:vpcName` */
  vpcDelete: (params: Api.VpcDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/firewall/rules` */
  vpcFirewallRulesView: (
    params: Api.VpcFirewallRulesViewParams
  ) => HandlerResult<Api.VpcFirewallRules>
  /** `PUT /organizations/:orgName/projects/:projectName/vpcs/:vpcName/firewall/rules` */
  vpcFirewallRulesUpdate: (
    params: Api.VpcFirewallRulesUpdateParams,
    body: Json<Api.VpcFirewallRuleUpdateParams>
  ) => HandlerResult<Api.VpcFirewallRules>
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers` */
  vpcRouterList: (
    params: Api.VpcRouterListParams
  ) => HandlerResult<Api.VpcRouterResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers` */
  vpcRouterCreate: (
    params: Api.VpcRouterCreateParams,
    body: Json<Api.VpcRouterCreate>
  ) => HandlerResult<Api.VpcRouter>
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName` */
  vpcRouterView: (params: Api.VpcRouterViewParams) => HandlerResult<Api.VpcRouter>
  /** `PUT /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName` */
  vpcRouterUpdate: (
    params: Api.VpcRouterUpdateParams,
    body: Json<Api.VpcRouterUpdate>
  ) => HandlerResult<Api.VpcRouter>
  /** `DELETE /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName` */
  vpcRouterDelete: (params: Api.VpcRouterDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes` */
  vpcRouterRouteList: (
    params: Api.VpcRouterRouteListParams
  ) => HandlerResult<Api.RouterRouteResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes` */
  vpcRouterRouteCreate: (
    params: Api.VpcRouterRouteCreateParams,
    body: Json<Api.RouterRouteCreateParams>
  ) => HandlerResult<Api.RouterRoute>
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes/:routeName` */
  vpcRouterRouteView: (
    params: Api.VpcRouterRouteViewParams
  ) => HandlerResult<Api.RouterRoute>
  /** `PUT /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes/:routeName` */
  vpcRouterRouteUpdate: (
    params: Api.VpcRouterRouteUpdateParams,
    body: Json<Api.RouterRouteUpdateParams>
  ) => HandlerResult<Api.RouterRoute>
  /** `DELETE /organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes/:routeName` */
  vpcRouterRouteDelete: (params: Api.VpcRouterRouteDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets` */
  vpcSubnetList: (
    params: Api.VpcSubnetListParams
  ) => HandlerResult<Api.VpcSubnetResultsPage>
  /** `POST /organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets` */
  vpcSubnetCreate: (
    params: Api.VpcSubnetCreateParams,
    body: Json<Api.VpcSubnetCreate>
  ) => HandlerResult<Api.VpcSubnet>
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName` */
  vpcSubnetView: (params: Api.VpcSubnetViewParams) => HandlerResult<Api.VpcSubnet>
  /** `PUT /organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName` */
  vpcSubnetUpdate: (
    params: Api.VpcSubnetUpdateParams,
    body: Json<Api.VpcSubnetUpdate>
  ) => HandlerResult<Api.VpcSubnet>
  /** `DELETE /organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName` */
  vpcSubnetDelete: (params: Api.VpcSubnetDeleteParams) => StatusCode
  /** `GET /organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName/network-interfaces` */
  vpcSubnetListNetworkInterfaces: (
    params: Api.VpcSubnetListNetworkInterfacesParams
  ) => HandlerResult<Api.NetworkInterfaceResultsPage>
  /** `GET /policy` */
  policyView: () => HandlerResult<Api.SiloRolePolicy>
  /** `PUT /policy` */
  policyUpdate: (body: Json<Api.SiloRolePolicy>) => HandlerResult<Api.SiloRolePolicy>
  /** `GET /roles` */
  roleList: (params: Api.RoleListParams) => HandlerResult<Api.RoleResultsPage>
  /** `GET /roles/:roleName` */
  roleView: (params: Api.RoleViewParams) => HandlerResult<Api.Role>
  /** `GET /session/me` */
  sessionMe: () => HandlerResult<Api.User>
  /** `GET /session/me/sshkeys` */
  sessionSshkeyList: (
    params: Api.SessionSshkeyListParams
  ) => HandlerResult<Api.SshKeyResultsPage>
  /** `POST /session/me/sshkeys` */
  sessionSshkeyCreate: (body: Json<Api.SshKeyCreate>) => HandlerResult<Api.SshKey>
  /** `GET /session/me/sshkeys/:sshKeyName` */
  sessionSshkeyView: (params: Api.SessionSshkeyViewParams) => HandlerResult<Api.SshKey>
  /** `DELETE /session/me/sshkeys/:sshKeyName` */
  sessionSshkeyDelete: (params: Api.SessionSshkeyDeleteParams) => StatusCode
  /** `GET /system/by-id/images/:id` */
  systemImageViewById: (
    params: Api.SystemImageViewByIdParams
  ) => HandlerResult<Api.GlobalImage>
  /** `GET /system/by-id/ip-pools/:id` */
  ipPoolViewById: (params: Api.IpPoolViewByIdParams) => HandlerResult<Api.IpPool>
  /** `GET /system/by-id/silos/:id` */
  siloViewById: (params: Api.SiloViewByIdParams) => HandlerResult<Api.Silo>
  /** `GET /system/hardware/racks` */
  rackList: (params: Api.RackListParams) => HandlerResult<Api.RackResultsPage>
  /** `GET /system/hardware/racks/:rackId` */
  rackView: (params: Api.RackViewParams) => HandlerResult<Api.Rack>
  /** `GET /system/hardware/sleds` */
  sledList: (params: Api.SledListParams) => HandlerResult<Api.SledResultsPage>
  /** `GET /system/hardware/sleds/:sledId` */
  sledView: (params: Api.SledViewParams) => HandlerResult<Api.Sled>
  /** `GET /system/images` */
  systemImageList: (
    params: Api.SystemImageListParams
  ) => HandlerResult<Api.GlobalImageResultsPage>
  /** `POST /system/images` */
  systemImageCreate: (body: Json<Api.GlobalImageCreate>) => HandlerResult<Api.GlobalImage>
  /** `GET /system/images/:imageName` */
  systemImageView: (params: Api.SystemImageViewParams) => HandlerResult<Api.GlobalImage>
  /** `DELETE /system/images/:imageName` */
  systemImageDelete: (params: Api.SystemImageDeleteParams) => StatusCode
  /** `GET /system/ip-pools` */
  ipPoolList: (params: Api.IpPoolListParams) => HandlerResult<Api.IpPoolResultsPage>
  /** `POST /system/ip-pools` */
  ipPoolCreate: (body: Json<Api.IpPoolCreate>) => HandlerResult<Api.IpPool>
  /** `GET /system/ip-pools/:poolName` */
  ipPoolView: (params: Api.IpPoolViewParams) => HandlerResult<Api.IpPool>
  /** `PUT /system/ip-pools/:poolName` */
  ipPoolUpdate: (
    params: Api.IpPoolUpdateParams,
    body: Json<Api.IpPoolUpdate>
  ) => HandlerResult<Api.IpPool>
  /** `DELETE /system/ip-pools/:poolName` */
  ipPoolDelete: (params: Api.IpPoolDeleteParams) => StatusCode
  /** `GET /system/ip-pools/:poolName/ranges` */
  ipPoolRangeList: (
    params: Api.IpPoolRangeListParams
  ) => HandlerResult<Api.IpPoolRangeResultsPage>
  /** `POST /system/ip-pools/:poolName/ranges/add` */
  ipPoolRangeAdd: (
    params: Api.IpPoolRangeAddParams,
    body: Json<Api.IpRange>
  ) => HandlerResult<Api.IpPoolRange>
  /** `POST /system/ip-pools/:poolName/ranges/remove` */
  ipPoolRangeRemove: (
    params: Api.IpPoolRangeRemoveParams,
    body: Json<Api.IpRange>
  ) => StatusCode
  /** `GET /system/ip-pools-service/:rackId` */
  ipPoolServiceView: (params: Api.IpPoolServiceViewParams) => HandlerResult<Api.IpPool>
  /** `GET /system/ip-pools-service/:rackId/ranges` */
  ipPoolServiceRangeList: (
    params: Api.IpPoolServiceRangeListParams
  ) => HandlerResult<Api.IpPoolRangeResultsPage>
  /** `POST /system/ip-pools-service/:rackId/ranges/add` */
  ipPoolServiceRangeAdd: (
    params: Api.IpPoolServiceRangeAddParams,
    body: Json<Api.IpRange>
  ) => HandlerResult<Api.IpPoolRange>
  /** `POST /system/ip-pools-service/:rackId/ranges/remove` */
  ipPoolServiceRangeRemove: (
    params: Api.IpPoolServiceRangeRemoveParams,
    body: Json<Api.IpRange>
  ) => StatusCode
  /** `GET /system/policy` */
  systemPolicyView: () => HandlerResult<Api.FleetRolePolicy>
  /** `PUT /system/policy` */
  systemPolicyUpdate: (
    body: Json<Api.FleetRolePolicy>
  ) => HandlerResult<Api.FleetRolePolicy>
  /** `GET /system/sagas` */
  sagaList: (params: Api.SagaListParams) => HandlerResult<Api.SagaResultsPage>
  /** `GET /system/sagas/:sagaId` */
  sagaView: (params: Api.SagaViewParams) => HandlerResult<Api.Saga>
  /** `GET /system/silos` */
  siloList: (params: Api.SiloListParams) => HandlerResult<Api.SiloResultsPage>
  /** `POST /system/silos` */
  siloCreate: (body: Json<Api.SiloCreate>) => HandlerResult<Api.Silo>
  /** `GET /system/silos/:siloName` */
  siloView: (params: Api.SiloViewParams) => HandlerResult<Api.Silo>
  /** `DELETE /system/silos/:siloName` */
  siloDelete: (params: Api.SiloDeleteParams) => StatusCode
  /** `GET /system/silos/:siloName/identity-providers` */
  siloIdentityProviderList: (
    params: Api.SiloIdentityProviderListParams
  ) => HandlerResult<Api.IdentityProviderResultsPage>
  /** `POST /system/silos/:siloName/identity-providers/saml` */
  samlIdentityProviderCreate: (
    params: Api.SamlIdentityProviderCreateParams,
    body: Json<Api.SamlIdentityProviderCreate>
  ) => HandlerResult<Api.SamlIdentityProvider>
  /** `GET /system/silos/:siloName/identity-providers/saml/:providerName` */
  samlIdentityProviderView: (
    params: Api.SamlIdentityProviderViewParams
  ) => HandlerResult<Api.SamlIdentityProvider>
  /** `GET /system/silos/:siloName/policy` */
  siloPolicyView: (params: Api.SiloPolicyViewParams) => HandlerResult<Api.SiloRolePolicy>
  /** `PUT /system/silos/:siloName/policy` */
  siloPolicyUpdate: (
    params: Api.SiloPolicyUpdateParams,
    body: Json<Api.SiloRolePolicy>
  ) => HandlerResult<Api.SiloRolePolicy>
  /** `POST /system/updates/refresh` */
  updatesRefresh: () => StatusCode
  /** `GET /system/user` */
  systemUserList: (
    params: Api.SystemUserListParams
  ) => HandlerResult<Api.UserBuiltinResultsPage>
  /** `GET /system/user/:userName` */
  systemUserView: (params: Api.SystemUserViewParams) => HandlerResult<Api.UserBuiltin>
  /** `GET /timeseries/schema` */
  timeseriesSchemaGet: (
    params: Api.TimeseriesSchemaGetParams
  ) => HandlerResult<Api.TimeseriesSchemaResultsPage>
  /** `GET /users` */
  userList: (params: Api.UserListParams) => HandlerResult<Api.UserResultsPage>
}

function validateBody<S extends ZodSchema>(schema: S, body: unknown) {
  const result = schema.transform(snakeify).safeParse(body)
  if (result.success) {
    return { body: result.data as Json<z.infer<S>> }
  }
  return { bodyErr: json(result.error.issues, { status: 400 }) }
}
function validateParams<S extends ZodSchema>(schema: S, req: RestRequest) {
  const rawParams = new URLSearchParams(req.url.search)
  const params: [string, unknown][] = []

  // Ensure numeric params like `limit` are parsed as numbers
  for (const [name, value] of rawParams) {
    params.push([name, isNaN(Number(value)) ? value : Number(value)])
  }

  const result = schema.safeParse({
    ...req.params,
    ...Object.fromEntries(params),
  })
  if (result.success) {
    return { params: result.data }
  }
  return { paramsErr: json(result.error.issues, { status: 400 }) }
}

const handler =
  (
    handler: MSWHandlers[keyof MSWHandlers],
    paramSchema: ZodSchema | null,
    bodySchema: ZodSchema | null
  ) =>
  async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const { params, paramsErr } = paramSchema
      ? validateParams(paramSchema, req)
      : { params: undefined, paramsErr: undefined }
    if (paramsErr) return res(paramsErr)

    const { body, bodyErr } = bodySchema
      ? validateBody(bodySchema, await req.json())
      : { body: undefined, bodyErr: undefined }
    if (bodyErr) return res(bodyErr)

    try {
      // TypeScript can't narrow the handler down because there's not an explicit relationship between the schema
      // being present and the shape of the handler API. The type of this function could be resolved such that the
      // relevant schema is required if and only if the handler has a type that matches the inferred schema
      const result = await (handler as any).apply(null, [params, body].filter(Boolean))
      if (typeof result === 'number') {
        return res(ctx.status(result))
      }
      if (typeof result === 'function') {
        return res(result as ResponseTransformer)
      }
      return res(json(result))
    } catch (thrown) {
      if (typeof thrown === 'number') {
        return res(ctx.status(thrown))
      }
      if (typeof thrown === 'function') {
        return res(thrown as ResponseTransformer)
      }
      if (typeof thrown === 'string') {
        return res(json({ message: thrown }, { status: 400 }))
      }
      console.error('Unexpected mock error', thrown)
      return res(json({ message: 'Unknown Server Error' }, { status: 500 }))
    }
  }

export function makeHandlers(handlers: MSWHandlers): RestHandler[] {
  return [
    rest.get(
      '/by-id/disks/:id',
      handler(handlers['diskViewById'], schema.DiskViewByIdParams, null)
    ),
    rest.get(
      '/by-id/images/:id',
      handler(handlers['imageViewById'], schema.ImageViewByIdParams, null)
    ),
    rest.get(
      '/by-id/instances/:id',
      handler(handlers['instanceViewById'], schema.InstanceViewByIdParams, null)
    ),
    rest.get(
      '/by-id/network-interfaces/:id',
      handler(
        handlers['instanceNetworkInterfaceViewById'],
        schema.InstanceNetworkInterfaceViewByIdParams,
        null
      )
    ),
    rest.get(
      '/by-id/organizations/:id',
      handler(handlers['organizationViewById'], schema.OrganizationViewByIdParams, null)
    ),
    rest.get(
      '/by-id/projects/:id',
      handler(handlers['projectViewById'], schema.ProjectViewByIdParams, null)
    ),
    rest.get(
      '/by-id/snapshots/:id',
      handler(handlers['snapshotViewById'], schema.SnapshotViewByIdParams, null)
    ),
    rest.get(
      '/by-id/vpc-router-routes/:id',
      handler(handlers['vpcRouterRouteViewById'], schema.VpcRouterRouteViewByIdParams, null)
    ),
    rest.get(
      '/by-id/vpc-routers/:id',
      handler(handlers['vpcRouterViewById'], schema.VpcRouterViewByIdParams, null)
    ),
    rest.get(
      '/by-id/vpc-subnets/:id',
      handler(handlers['vpcSubnetViewById'], schema.VpcSubnetViewByIdParams, null)
    ),
    rest.get(
      '/by-id/vpcs/:id',
      handler(handlers['vpcViewById'], schema.VpcViewByIdParams, null)
    ),
    rest.post('/device/auth', handler(handlers['deviceAuthRequest'], null, null)),
    rest.post(
      '/device/confirm',
      handler(handlers['deviceAuthConfirm'], null, schema.DeviceAuthVerify)
    ),
    rest.post('/device/token', handler(handlers['deviceAccessToken'], null, null)),
    rest.get('/groups', handler(handlers['groupList'], schema.GroupListParams, null)),
    rest.post('/login', handler(handlers['loginSpoof'], null, schema.SpoofLoginBody)),
    rest.get(
      '/login/:siloName/saml/:providerName',
      handler(handlers['loginSamlBegin'], schema.LoginSamlBeginParams, null)
    ),
    rest.post(
      '/login/:siloName/saml/:providerName',
      handler(handlers['loginSaml'], schema.LoginSamlParams, null)
    ),
    rest.post('/logout', handler(handlers['logout'], null, null)),
    rest.get(
      '/organizations',
      handler(handlers['organizationList'], schema.OrganizationListParams, null)
    ),
    rest.post(
      '/organizations',
      handler(handlers['organizationCreate'], null, schema.OrganizationCreate)
    ),
    rest.get(
      '/organizations/:orgName',
      handler(handlers['organizationView'], schema.OrganizationViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName',
      handler(
        handlers['organizationUpdate'],
        schema.OrganizationUpdateParams,
        schema.OrganizationUpdate
      )
    ),
    rest.delete(
      '/organizations/:orgName',
      handler(handlers['organizationDelete'], schema.OrganizationDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/policy',
      handler(handlers['organizationPolicyView'], schema.OrganizationPolicyViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/policy',
      handler(
        handlers['organizationPolicyUpdate'],
        schema.OrganizationPolicyUpdateParams,
        schema.OrganizationRolePolicy
      )
    ),
    rest.get(
      '/organizations/:orgName/projects',
      handler(handlers['projectList'], schema.ProjectListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects',
      handler(handlers['projectCreate'], schema.ProjectCreateParams, schema.ProjectCreate)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName',
      handler(handlers['projectView'], schema.ProjectViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName',
      handler(handlers['projectUpdate'], schema.ProjectUpdateParams, schema.ProjectUpdate)
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName',
      handler(handlers['projectDelete'], schema.ProjectDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/disks',
      handler(handlers['diskList'], schema.DiskListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/disks',
      handler(handlers['diskCreate'], schema.DiskCreateParams, schema.DiskCreate)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/disks/:diskName',
      handler(handlers['diskView'], schema.DiskViewParams, null)
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/disks/:diskName',
      handler(handlers['diskDelete'], schema.DiskDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/disks/:diskName/metrics/:metricName',
      handler(handlers['diskMetricsList'], schema.DiskMetricsListParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/images',
      handler(handlers['imageList'], schema.ImageListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/images',
      handler(handlers['imageCreate'], schema.ImageCreateParams, schema.ImageCreate)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/images/:imageName',
      handler(handlers['imageView'], schema.ImageViewParams, null)
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/images/:imageName',
      handler(handlers['imageDelete'], schema.ImageDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/instances',
      handler(handlers['instanceList'], schema.InstanceListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances',
      handler(
        handlers['instanceCreate'],
        schema.InstanceCreateParams,
        schema.InstanceCreate
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName',
      handler(handlers['instanceView'], schema.InstanceViewParams, null)
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName',
      handler(handlers['instanceDelete'], schema.InstanceDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/disks',
      handler(handlers['instanceDiskList'], schema.InstanceDiskListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/disks/attach',
      handler(
        handlers['instanceDiskAttach'],
        schema.InstanceDiskAttachParams,
        schema.DiskIdentifier
      )
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/disks/detach',
      handler(
        handlers['instanceDiskDetach'],
        schema.InstanceDiskDetachParams,
        schema.DiskIdentifier
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/external-ips',
      handler(handlers['instanceExternalIpList'], schema.InstanceExternalIpListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/migrate',
      handler(
        handlers['instanceMigrate'],
        schema.InstanceMigrateParams,
        schema.InstanceMigrate
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces',
      handler(
        handlers['instanceNetworkInterfaceList'],
        schema.InstanceNetworkInterfaceListParams,
        null
      )
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces',
      handler(
        handlers['instanceNetworkInterfaceCreate'],
        schema.InstanceNetworkInterfaceCreateParams,
        schema.NetworkInterfaceCreate
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces/:interfaceName',
      handler(
        handlers['instanceNetworkInterfaceView'],
        schema.InstanceNetworkInterfaceViewParams,
        null
      )
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces/:interfaceName',
      handler(
        handlers['instanceNetworkInterfaceUpdate'],
        schema.InstanceNetworkInterfaceUpdateParams,
        schema.NetworkInterfaceUpdate
      )
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/network-interfaces/:interfaceName',
      handler(
        handlers['instanceNetworkInterfaceDelete'],
        schema.InstanceNetworkInterfaceDeleteParams,
        null
      )
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/reboot',
      handler(handlers['instanceReboot'], schema.InstanceRebootParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/serial-console',
      handler(handlers['instanceSerialConsole'], schema.InstanceSerialConsoleParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/start',
      handler(handlers['instanceStart'], schema.InstanceStartParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/instances/:instanceName/stop',
      handler(handlers['instanceStop'], schema.InstanceStopParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/policy',
      handler(handlers['projectPolicyView'], schema.ProjectPolicyViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName/policy',
      handler(
        handlers['projectPolicyUpdate'],
        schema.ProjectPolicyUpdateParams,
        schema.ProjectRolePolicy
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/snapshots',
      handler(handlers['snapshotList'], schema.SnapshotListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/snapshots',
      handler(
        handlers['snapshotCreate'],
        schema.SnapshotCreateParams,
        schema.SnapshotCreate
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/snapshots/:snapshotName',
      handler(handlers['snapshotView'], schema.SnapshotViewParams, null)
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/snapshots/:snapshotName',
      handler(handlers['snapshotDelete'], schema.SnapshotDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs',
      handler(handlers['vpcList'], schema.VpcListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/vpcs',
      handler(handlers['vpcCreate'], schema.VpcCreateParams, schema.VpcCreate)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName',
      handler(handlers['vpcView'], schema.VpcViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName',
      handler(handlers['vpcUpdate'], schema.VpcUpdateParams, schema.VpcUpdate)
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName',
      handler(handlers['vpcDelete'], schema.VpcDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/firewall/rules',
      handler(handlers['vpcFirewallRulesView'], schema.VpcFirewallRulesViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/firewall/rules',
      handler(
        handlers['vpcFirewallRulesUpdate'],
        schema.VpcFirewallRulesUpdateParams,
        schema.VpcFirewallRuleUpdateParams
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers',
      handler(handlers['vpcRouterList'], schema.VpcRouterListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers',
      handler(
        handlers['vpcRouterCreate'],
        schema.VpcRouterCreateParams,
        schema.VpcRouterCreate
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName',
      handler(handlers['vpcRouterView'], schema.VpcRouterViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName',
      handler(
        handlers['vpcRouterUpdate'],
        schema.VpcRouterUpdateParams,
        schema.VpcRouterUpdate
      )
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName',
      handler(handlers['vpcRouterDelete'], schema.VpcRouterDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes',
      handler(handlers['vpcRouterRouteList'], schema.VpcRouterRouteListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes',
      handler(
        handlers['vpcRouterRouteCreate'],
        schema.VpcRouterRouteCreateParams,
        schema.RouterRouteCreateParams
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes/:routeName',
      handler(handlers['vpcRouterRouteView'], schema.VpcRouterRouteViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes/:routeName',
      handler(
        handlers['vpcRouterRouteUpdate'],
        schema.VpcRouterRouteUpdateParams,
        schema.RouterRouteUpdateParams
      )
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/routers/:routerName/routes/:routeName',
      handler(handlers['vpcRouterRouteDelete'], schema.VpcRouterRouteDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets',
      handler(handlers['vpcSubnetList'], schema.VpcSubnetListParams, null)
    ),
    rest.post(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets',
      handler(
        handlers['vpcSubnetCreate'],
        schema.VpcSubnetCreateParams,
        schema.VpcSubnetCreate
      )
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName',
      handler(handlers['vpcSubnetView'], schema.VpcSubnetViewParams, null)
    ),
    rest.put(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName',
      handler(
        handlers['vpcSubnetUpdate'],
        schema.VpcSubnetUpdateParams,
        schema.VpcSubnetUpdate
      )
    ),
    rest.delete(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName',
      handler(handlers['vpcSubnetDelete'], schema.VpcSubnetDeleteParams, null)
    ),
    rest.get(
      '/organizations/:orgName/projects/:projectName/vpcs/:vpcName/subnets/:subnetName/network-interfaces',
      handler(
        handlers['vpcSubnetListNetworkInterfaces'],
        schema.VpcSubnetListNetworkInterfacesParams,
        null
      )
    ),
    rest.get('/policy', handler(handlers['policyView'], null, null)),
    rest.put('/policy', handler(handlers['policyUpdate'], null, schema.SiloRolePolicy)),
    rest.get('/roles', handler(handlers['roleList'], schema.RoleListParams, null)),
    rest.get(
      '/roles/:roleName',
      handler(handlers['roleView'], schema.RoleViewParams, null)
    ),
    rest.get('/session/me', handler(handlers['sessionMe'], null, null)),
    rest.get(
      '/session/me/sshkeys',
      handler(handlers['sessionSshkeyList'], schema.SessionSshkeyListParams, null)
    ),
    rest.post(
      '/session/me/sshkeys',
      handler(handlers['sessionSshkeyCreate'], null, schema.SshKeyCreate)
    ),
    rest.get(
      '/session/me/sshkeys/:sshKeyName',
      handler(handlers['sessionSshkeyView'], schema.SessionSshkeyViewParams, null)
    ),
    rest.delete(
      '/session/me/sshkeys/:sshKeyName',
      handler(handlers['sessionSshkeyDelete'], schema.SessionSshkeyDeleteParams, null)
    ),
    rest.get(
      '/system/by-id/images/:id',
      handler(handlers['systemImageViewById'], schema.SystemImageViewByIdParams, null)
    ),
    rest.get(
      '/system/by-id/ip-pools/:id',
      handler(handlers['ipPoolViewById'], schema.IpPoolViewByIdParams, null)
    ),
    rest.get(
      '/system/by-id/silos/:id',
      handler(handlers['siloViewById'], schema.SiloViewByIdParams, null)
    ),
    rest.get(
      '/system/hardware/racks',
      handler(handlers['rackList'], schema.RackListParams, null)
    ),
    rest.get(
      '/system/hardware/racks/:rackId',
      handler(handlers['rackView'], schema.RackViewParams, null)
    ),
    rest.get(
      '/system/hardware/sleds',
      handler(handlers['sledList'], schema.SledListParams, null)
    ),
    rest.get(
      '/system/hardware/sleds/:sledId',
      handler(handlers['sledView'], schema.SledViewParams, null)
    ),
    rest.get(
      '/system/images',
      handler(handlers['systemImageList'], schema.SystemImageListParams, null)
    ),
    rest.post(
      '/system/images',
      handler(handlers['systemImageCreate'], null, schema.GlobalImageCreate)
    ),
    rest.get(
      '/system/images/:imageName',
      handler(handlers['systemImageView'], schema.SystemImageViewParams, null)
    ),
    rest.delete(
      '/system/images/:imageName',
      handler(handlers['systemImageDelete'], schema.SystemImageDeleteParams, null)
    ),
    rest.get(
      '/system/ip-pools',
      handler(handlers['ipPoolList'], schema.IpPoolListParams, null)
    ),
    rest.post(
      '/system/ip-pools',
      handler(handlers['ipPoolCreate'], null, schema.IpPoolCreate)
    ),
    rest.get(
      '/system/ip-pools/:poolName',
      handler(handlers['ipPoolView'], schema.IpPoolViewParams, null)
    ),
    rest.put(
      '/system/ip-pools/:poolName',
      handler(handlers['ipPoolUpdate'], schema.IpPoolUpdateParams, schema.IpPoolUpdate)
    ),
    rest.delete(
      '/system/ip-pools/:poolName',
      handler(handlers['ipPoolDelete'], schema.IpPoolDeleteParams, null)
    ),
    rest.get(
      '/system/ip-pools/:poolName/ranges',
      handler(handlers['ipPoolRangeList'], schema.IpPoolRangeListParams, null)
    ),
    rest.post(
      '/system/ip-pools/:poolName/ranges/add',
      handler(handlers['ipPoolRangeAdd'], schema.IpPoolRangeAddParams, schema.IpRange)
    ),
    rest.post(
      '/system/ip-pools/:poolName/ranges/remove',
      handler(handlers['ipPoolRangeRemove'], schema.IpPoolRangeRemoveParams, schema.IpRange)
    ),
    rest.get(
      '/system/ip-pools-service/:rackId',
      handler(handlers['ipPoolServiceView'], schema.IpPoolServiceViewParams, null)
    ),
    rest.get(
      '/system/ip-pools-service/:rackId/ranges',
      handler(handlers['ipPoolServiceRangeList'], schema.IpPoolServiceRangeListParams, null)
    ),
    rest.post(
      '/system/ip-pools-service/:rackId/ranges/add',
      handler(
        handlers['ipPoolServiceRangeAdd'],
        schema.IpPoolServiceRangeAddParams,
        schema.IpRange
      )
    ),
    rest.post(
      '/system/ip-pools-service/:rackId/ranges/remove',
      handler(
        handlers['ipPoolServiceRangeRemove'],
        schema.IpPoolServiceRangeRemoveParams,
        schema.IpRange
      )
    ),
    rest.get('/system/policy', handler(handlers['systemPolicyView'], null, null)),
    rest.put(
      '/system/policy',
      handler(handlers['systemPolicyUpdate'], null, schema.FleetRolePolicy)
    ),
    rest.get('/system/sagas', handler(handlers['sagaList'], schema.SagaListParams, null)),
    rest.get(
      '/system/sagas/:sagaId',
      handler(handlers['sagaView'], schema.SagaViewParams, null)
    ),
    rest.get('/system/silos', handler(handlers['siloList'], schema.SiloListParams, null)),
    rest.post('/system/silos', handler(handlers['siloCreate'], null, schema.SiloCreate)),
    rest.get(
      '/system/silos/:siloName',
      handler(handlers['siloView'], schema.SiloViewParams, null)
    ),
    rest.delete(
      '/system/silos/:siloName',
      handler(handlers['siloDelete'], schema.SiloDeleteParams, null)
    ),
    rest.get(
      '/system/silos/:siloName/identity-providers',
      handler(
        handlers['siloIdentityProviderList'],
        schema.SiloIdentityProviderListParams,
        null
      )
    ),
    rest.post(
      '/system/silos/:siloName/identity-providers/saml',
      handler(
        handlers['samlIdentityProviderCreate'],
        schema.SamlIdentityProviderCreateParams,
        schema.SamlIdentityProviderCreate
      )
    ),
    rest.get(
      '/system/silos/:siloName/identity-providers/saml/:providerName',
      handler(
        handlers['samlIdentityProviderView'],
        schema.SamlIdentityProviderViewParams,
        null
      )
    ),
    rest.get(
      '/system/silos/:siloName/policy',
      handler(handlers['siloPolicyView'], schema.SiloPolicyViewParams, null)
    ),
    rest.put(
      '/system/silos/:siloName/policy',
      handler(
        handlers['siloPolicyUpdate'],
        schema.SiloPolicyUpdateParams,
        schema.SiloRolePolicy
      )
    ),
    rest.post('/system/updates/refresh', handler(handlers['updatesRefresh'], null, null)),
    rest.get(
      '/system/user',
      handler(handlers['systemUserList'], schema.SystemUserListParams, null)
    ),
    rest.get(
      '/system/user/:userName',
      handler(handlers['systemUserView'], schema.SystemUserViewParams, null)
    ),
    rest.get(
      '/timeseries/schema',
      handler(handlers['timeseriesSchemaGet'], schema.TimeseriesSchemaGetParams, null)
    ),
    rest.get('/users', handler(handlers['userList'], schema.UserListParams, null)),
  ]
}
