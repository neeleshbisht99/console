import { useMemo } from 'react'
import { Outlet, useNavigate, useLocation, matchPath } from 'react-router-dom'

import { Button, DirectionLeftIcon, SkipLinkTarget } from '@oxide/ui'
import {
  ContentPane,
  ContentPaneWrapper,
  PageContainer,
  ContentPaneActions,
} from './helpers'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { TopBar } from '../components/TopBar'
import { Sidebar, NavLinkItem } from '../components/Sidebar'
import { PageHeader } from '../components/PageHeader'
import { useQuickActions } from 'app/hooks'
import { Pagination } from '@oxide/pagination'
import { Form } from 'app/components/form'

const SettingsLayout = () => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname

  useQuickActions(
    useMemo(
      () =>
        [
          { value: 'Profile', path: 'profile' },
          { value: 'Appearance', path: 'appearance' },
          { value: 'Hotkeys', path: 'hotkeys' },
          { value: 'SSH Keys', path: 'ssh-keys' },
        ]
          // filter out the entry for the path we're currently on
          .filter((i) => !matchPath(`/settings/${i.path}`, currentPath))
          .map((i) => ({
            navGroup: `Settings`,
            value: i.value,
            onSelect: () => navigate(i.path),
          })),
      [currentPath, navigate]
    )
  )

  return (
    <PageContainer>
      <Sidebar>
        {/* TODO: Make the back nav here smarter to return you to the previous non-settings screen */}
        <Button variant="link" onClick={() => navigate('/')}>
          <DirectionLeftIcon />
          Home
        </Button>
        <Sidebar.Nav heading="User">
          <NavLinkItem to="profile">Profile</NavLinkItem>
          <NavLinkItem to="appearance">Appearance</NavLinkItem>
          <NavLinkItem to="hotkeys">Hotkeys</NavLinkItem>
          <NavLinkItem to="ssh-keys">SSH Keys</NavLinkItem>
        </Sidebar.Nav>
      </Sidebar>
      <ContentPaneWrapper>
        <ContentPane>
          <TopBar />
          <Breadcrumbs />
          <SkipLinkTarget />
          <PageHeader />
          <Outlet />
        </ContentPane>
        <ContentPaneActions>
          <Pagination.Target />
          <Form.PageActions />
        </ContentPaneActions>
      </ContentPaneWrapper>
    </PageContainer>
  )
}

export default SettingsLayout