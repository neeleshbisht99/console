import React from 'react'
import { styled } from 'twin.macro'
import filesize from 'filesize'

import type { ApiInstanceView } from '@oxide/api'
import { Badge, Icon } from '@oxide/ui'

export interface InstanceDetailsProps {
  instance: ApiInstanceView
}

const Cell = styled.span`
  :not(:first-of-type):before {
    content: ' // ';
  }
`

export const InstanceDetails = ({ instance }: InstanceDetailsProps) => {
  return (
    <span tw="text-sm">
      <Badge tw="mr-3" variant="notification" color="green">
        {instance.runState}
      </Badge>
      <span>
        <Cell>{instance.ncpus} vCPU</Cell>
        <Cell>{filesize(instance.memory)} RAM</Cell>
        <Cell style={{ textTransform: 'uppercase' }}>100 GB Disk</Cell>
        <Cell>Debian 9.12 x64</Cell>
        <Cell>
          {instance.hostname}
          <Icon tw="ml-1 mr-3" name="copy" />
          10.10.16.7
        </Cell>
      </span>
    </span>
  )
}