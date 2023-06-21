import { useForm } from 'react-hook-form'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import invariant from 'tiny-invariant'

import { type Image, apiQueryClient, useApiQuery } from '@oxide/api'
import { Images16Icon, PropertiesTable, ResourceLabel, Truncate } from '@oxide/ui'
import { bytesToGiB, formatDateTime } from '@oxide/util'

import { DescriptionField, NameField, SideModalForm, TextField } from 'app/components/form'
import {
  getProjectImageSelector,
  getSiloImageSelector,
  useProjectImageSelector,
  useSiloImageSelector,
} from 'app/hooks'
import { pb } from 'app/util/path-builder'

EditProjectImageSideModalForm.loader = async ({ params }: LoaderFunctionArgs) => {
  const { project, image } = getProjectImageSelector(params)
  await apiQueryClient.prefetchQuery('imageView', { path: { image }, query: { project } })
  return null
}

export function EditProjectImageSideModalForm() {
  const { project, image } = useProjectImageSelector()
  const { data } = useApiQuery('imageView', { path: { image }, query: { project } })
  invariant(data, 'Image must be prefetched in loader')

  const dismissLink = pb.projectImages({ project })
  return <EditImageSideModalForm image={data} dismissLink={dismissLink} type="Project" />
}

EditSiloImageSideModalForm.loader = async ({ params }: LoaderFunctionArgs) => {
  const { image } = getSiloImageSelector(params)
  await apiQueryClient.prefetchQuery('imageView', { path: { image } })
  return null
}

export function EditSiloImageSideModalForm() {
  const { image } = useSiloImageSelector()
  const { data } = useApiQuery('imageView', { path: { image } })
  invariant(data, 'Image must be prefetched in loader')

  return <EditImageSideModalForm image={data} dismissLink={pb.siloImages()} type="Silo" />
}

export function EditImageSideModalForm({
  image,
  dismissLink,
  type,
}: {
  image: Image
  dismissLink: string
  type: 'Project' | 'Silo'
}) {
  const navigate = useNavigate()
  const form = useForm({ mode: 'all', defaultValues: image })

  return (
    <SideModalForm
      id="edit-project-image-form"
      form={form}
      title={`${type} image`}
      onDismiss={() => navigate(dismissLink)}
      subtitle={
        <ResourceLabel>
          <Images16Icon /> {image.name}
        </ResourceLabel>
      }
    >
      <PropertiesTable>
        <PropertiesTable.Row label="Shared with">{type}</PropertiesTable.Row>
        <PropertiesTable.Row label="ID">
          <Truncate text={image.id} maxLength={32} hasCopyButton />
        </PropertiesTable.Row>
        <PropertiesTable.Row label="Size">
          <span>{bytesToGiB(image.size)}</span>
          <span className="ml-1 inline-block text-quaternary">GiB</span>
        </PropertiesTable.Row>
        <PropertiesTable.Row label="Created">
          {formatDateTime(image.timeCreated)}
        </PropertiesTable.Row>
        <PropertiesTable.Row label="Updated">
          {formatDateTime(image.timeModified)}
        </PropertiesTable.Row>
      </PropertiesTable>

      <NameField name="name" control={form.control} disabled />
      <DescriptionField name="description" control={form.control} required disabled />
      <TextField name="os" label="OS" control={form.control} required disabled />
      <TextField name="version" control={form.control} required disabled />
    </SideModalForm>
  )
}