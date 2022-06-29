import { getCoreRowModel, useTableInstance } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import {
  orgRoleOrder,
  setUserRole,
  useApiMutation,
  useApiQueryClient,
  useUserAccessRows,
} from '@oxide/api'
import type { OrganizationRole, UserAccessRow } from '@oxide/api'
import { useApiQuery } from '@oxide/api'
import { Table, createTable, getActionsCol } from '@oxide/table'
import { Access24Icon, Badge, Button, PageHeader, PageTitle, TableActions } from '@oxide/ui'

import { OrgAccessAddUserSideModal, OrgAccessEditUserSideModal } from 'app/forms/org-access'
import { useParams } from 'app/hooks'

type UserRow = UserAccessRow<OrganizationRole>

const table = createTable().setRowType<UserRow>()

export const OrgAccessPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingUserRow, setEditingUserRow] = useState<UserRow | null>(null)
  const orgParams = useParams('orgName')
  const { data: policy } = useApiQuery('organizationGetPolicy', orgParams)

  const rows = useUserAccessRows(policy, orgRoleOrder)

  const queryClient = useApiQueryClient()
  const updatePolicy = useApiMutation('organizationPutPolicy', {
    onSuccess: () => queryClient.invalidateQueries('organizationGetPolicy', orgParams),
    // TODO: handle 403
  })

  // TODO: checkboxes and bulk delete? not sure
  // TODO: disable delete on permissions you can't delete

  const columns = useMemo(
    () => [
      table.createDataColumn('id', { header: 'ID' }),
      table.createDataColumn('name', { header: 'Name' }),
      table.createDataColumn('roleName', {
        header: 'Role',
        cell: (info) => <Badge color="neutral">{info.getValue()}</Badge>,
      }),
      table.createDisplayColumn(
        getActionsCol((row) => [
          {
            label: 'Change role',
            onActivate: () => setEditingUserRow(row),
          },
          // TODO: only show if you have permission to do this
          {
            label: 'Delete',
            onActivate() {
              // TODO: confirm delete
              updatePolicy.mutate({
                ...orgParams,
                // we know policy is there, otherwise there's no row to display
                body: setUserRole(row.id, null, policy!),
              })
            },
          },
        ])
      ),
    ],
    [policy, orgParams, updatePolicy]
  )

  const tableInstance = useTableInstance(table, {
    columns,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <PageHeader>
        <PageTitle icon={<Access24Icon />}>Access &amp; IAM</PageTitle>
      </PageHeader>

      <TableActions>
        <Button size="xs" variant="default" onClick={() => setAddModalOpen(true)}>
          Add user to organization
        </Button>
      </TableActions>
      {policy && (
        <OrgAccessAddUserSideModal
          isOpen={addModalOpen}
          onDismiss={() => setAddModalOpen(false)}
          onSuccess={() => setAddModalOpen(false)}
          policy={policy}
        />
      )}
      {policy && editingUserRow && (
        <OrgAccessEditUserSideModal
          isOpen={!!editingUserRow}
          onDismiss={() => setEditingUserRow(null)}
          onSuccess={() => setEditingUserRow(null)}
          policy={policy}
          userId={editingUserRow.id}
          initialValues={{ roleName: editingUserRow.roleName }}
        />
      )}
      <Table table={tableInstance} />
    </>
  )
}