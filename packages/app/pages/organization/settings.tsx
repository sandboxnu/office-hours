import React, { useState } from 'react'
import { StandardPageContainer } from '../../components/common/PageContainer'
import Head from 'next/head'
import { useProfile } from '../../hooks/useProfile'
import { Col, Menu, MenuProps, Row, Spin } from 'antd'
import { OrganizationRole } from '@koh/common'
import { useOrganization } from '../../hooks/useOrganization'
import NavBar from '../../components/Nav/NavBar'
import {
  DashboardOutlined,
  TeamOutlined,
  ExperimentOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import MainTab from '../../components/Organization/MainTab'
import SettingsTab from '../../components/Organization/SettingsTab'
import UsersTab from '../../components/Organization/UsersTab'
import DefaultErrorPage from 'next/error'
import CoursesTab from '../../components/Organization/CoursesTab'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Main', 'main', <DashboardOutlined />),
  getItem('Users', 'users', <TeamOutlined />),
  getItem('Courses', 'courses', <ExperimentOutlined />),
  getItem('Settings', 'settings', <SettingOutlined />),
]

export default function Settings(): React.ReactElement {
  const profile = useProfile()
  const { organization } = useOrganization(profile?.organization.orgId)
  const [selectedMenuItem, setSelectedMenuItem] = useState('main')

  const handleMenuItemSelect = (info: { key: string }) => {
    setSelectedMenuItem(info.key)
  }

  if (
    profile &&
    profile.organization.organizationRole !== OrganizationRole.ADMIN
  ) {
    return <DefaultErrorPage statusCode={404} />
  }

  return profile &&
    profile.organization.organizationRole == OrganizationRole.ADMIN ? (
    <>
      <Head>
        <title>{organization?.name} | Admin Panel</title>
      </Head>
      <StandardPageContainer>
        <NavBar />

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: 50 }}
        >
          <Col xs={{ span: 24 }} sm={{ span: 6 }}>
            <Menu
              defaultSelectedKeys={['main']}
              defaultOpenKeys={['main']}
              selectedKeys={[selectedMenuItem]}
              mode="vertical"
              items={items}
              onSelect={handleMenuItemSelect}
            />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 18 }}>
            {selectedMenuItem === 'main' && (
              <MainTab
                userName={profile?.firstName + ' ' + profile?.lastName}
                organizationId={organization?.id}
              />
            )}

            {selectedMenuItem === 'users' && (
              <UsersTab organization={organization} profile={profile} />
            )}

            {selectedMenuItem === 'courses' && (
              <CoursesTab organizationId={organization?.id} />
            )}

            {selectedMenuItem === 'settings' && (
              <SettingsTab organization={organization} />
            )}
          </Col>
        </Row>
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  )
}
