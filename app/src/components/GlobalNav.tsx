import React from 'react'

import { Avatar } from '@oxide/ui'

export const GlobalNav = () => {
  return (
    <div className="w-full flex items-center justify-end">
      <button type="button">
        <Avatar round size="sm" name="Some User" />
      </button>
    </div>
  )
}