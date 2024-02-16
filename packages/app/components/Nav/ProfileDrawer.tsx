import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu, Popover } from 'antd'
import Link from 'next/link'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import SelfAvatar from '../common/SelfAvatar'

const StyleablePopover = ({ className, ...props }: { className: string }) => (
  <Popover {...props} overlayClassName={className} />
)
const NoPaddingPopover: typeof Popover = styled(StyleablePopover)`
  & .ant-popover-inner-content {
    padding: 0px;
  }
  // antd for some reason thinks having 24px of padding on the left and 16px of padding on the right looks good
  .ant-menu-item {
    padding: 0 16px !important;
  }
`

const AvatarButton = styled.div`
  cursor: pointer;

  // give it a bit of margins in the mobile navbar drawer
  @media (max-width: 650px) {
    margin-left: 1em;
    margin-top: 1em;
  }
`

export default function ProfileDrawer(): ReactElement {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <>
      <NoPaddingPopover
        content={
          <Menu mode="inline">
            <Menu.Item icon={<SettingOutlined />}>
              <Link href={{ pathname: '/settings' }}>Settings</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />}>
              <Link href={'/api/v1/logout'}>Logout</Link>
            </Menu.Item>
          </Menu>
        }
        placement="bottomLeft"
        trigger="click"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <AvatarButton>
          {/* show a larger avatar icon for mobile */}
          <SelfAvatar className="hidden sm:inline-block" size={40} />
          <SelfAvatar className="inline-block sm:hidden" size={50} />
        </AvatarButton>
      </NoPaddingPopover>
    </>
  )
}
