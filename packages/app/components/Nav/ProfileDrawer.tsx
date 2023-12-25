import {
  LogoutOutlined,
  MacCommandOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Menu, Modal, Popover, Typography, Space } from 'antd'
import Link from 'next/link'
import React, { ReactElement, ReactNode, useState } from 'react'
import styled from 'styled-components'
import SelfAvatar from '../common/SelfAvatar'
import { useRoleInCourse } from '../../hooks/useRoleInCourse'
import { Role } from '@koh/common'
const { Text } = Typography

const StyleablePopover = ({ className, ...props }: { className: string }) => (
  <Popover {...props} overlayClassName={className} />
)
const NoPaddingPopover: typeof Popover = styled(StyleablePopover)`
  & .ant-popover-inner-content {
    padding: 0px;
  }
`

const AvatarButton = styled.div`
  cursor: pointer;
`

interface ProfileDrawerProps {
  courseId: number
}

function shortcutInfoContent(role: Role): ReactNode {
  if (role === Role.STUDENT) {
    return (
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Space>
          <Text keyboard>shift</Text>
          <Text keyboard>n</Text>Create a new question
        </Space>
        <Space>
          <Text keyboard>shift</Text>
          <Text keyboard>e</Text>Edit question
        </Space>
        <Space size={40}>
          <Text keyboard>enter</Text>Finish writing question
        </Space>
      </Space>
    )
  } else {
    return (
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Space>
          <Text keyboard>shift</Text>
          <Text keyboard>h</Text>Help the next student
        </Space>
        <Space>
          <Text keyboard>shift</Text>
          <Text keyboard>d</Text>Delete the currently selected student&apos;s
          question
        </Space>
        <Space>
          <Space size={1}>
            <Text keyboard>up</Text>/<Text keyboard>down</Text>
          </Space>
          Navigate through students
        </Space>
      </Space>
    )
  }
}

export default function ProfileDrawer({
  courseId = null,
}: ProfileDrawerProps): ReactElement {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const role = useRoleInCourse(courseId)
  return (
    <>
      <NoPaddingPopover
        content={
          <Menu mode="inline">
            <Menu.Item icon={<SettingOutlined />}>
              <Link href={{ pathname: '/settings' }}>
                <a>Settings</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              hidden={courseId === null}
              icon={<MacCommandOutlined />}
              onClick={() => {
                Modal.info({
                  title: 'Queue Page Keyboard Shortcuts',
                  content: shortcutInfoContent(role),
                })
                setIsPopoverOpen(false)
              }}
            >
              Keyboard Shortcuts
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />}>
              <Link href={'/api/v1/logout'}>
                <a data-cy="logout-button">Logout</a>
              </Link>
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
        trigger="click"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <AvatarButton>
          <SelfAvatar size={40} />
        </AvatarButton>
      </NoPaddingPopover>
    </>
  )
}
