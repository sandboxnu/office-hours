import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Menu } from 'antd'
import { MenuProps } from 'antd/lib/menu'
import Link from 'next/link'
import { QueuePartial } from '@koh/common'
import './overwriteAntdNavStyes.css'

const HorizontalMenu = styled(Menu)<MenuProps>`
  ${(props) => (props.mode === 'horizontal' ? 'border-bottom: none' : '')}
`

const { SubMenu } = Menu
const QueueMenu = styled(SubMenu)`
  @media (min-width: 650px) {
    font-size: 16px !important;
    color: #262626 !important;
    margin: 0 !important;
    padding: 0 !important;
    &&& .ant-menu-submenu-title {
      padding: 10px 50px !important;
    }
    &&&:after {
      left: 0px;
      right: 0px;
    }
  }
`

const MenuItem = styled(Menu.Item)`
  // desktop
  @media (min-width: 650px) {
    padding: 10px 50px !important;
    font-size: 16px !important;
    color: #262626 !important;
    margin: 0 !important;
  }
  &&&:after {
    left: 0px;
    right: 0px;
  }
`

const QueueMenuItem = styled(Menu.Item)`
  z-index: 1;
  background: #ffffff;
`

export type NavBarTabsItem = NavBarGeneralTabItem | NavBarQueueTabItem

interface NavBarGeneralTabItem {
  href: string
  as: string
  text: string
  className?: string // if you want to add any tailwind styles to the navbar link
}

interface NavBarQueueTabItem {
  text: string
  queues: QueuePartial[]
  courseId: number
}

interface NavBarTabsProps {
  currentHref: string
  hrefAsPath: string
  tabs: NavBarTabsItem[]
  horizontal?: boolean
  onClose?: () => void
}

function createQueueTab(
  queueTabItem: NavBarQueueTabItem,
  currentPath: string,
  onClose?: () => void,
) {
  return (
    // need to manually add the ant-menu-item-selected class for this submenu and it's menu items since antd isn't adding it automatically like it should be
    <QueueMenu
      data-cy="queue-tab"
      title="Queue"
      className={
        currentPath?.includes(`/course/${queueTabItem.courseId}/queue/`)
          ? 'ant-menu-item-selected'
          : ''
      }
    >
      {queueTabItem.queues?.map((openQueue) => {
        const queuePath = `/course/${queueTabItem.courseId}/queue/${openQueue.id}`
        const isSelected = currentPath === queuePath

        return (
          <QueueMenuItem
            key={openQueue.id}
            data-cy={`queue-menu-item-${openQueue.room}`}
            className={isSelected ? 'ant-menu-item-selected' : ''}
            onClick={onClose} // close the mobile drawer when clicked
          >
            <Link href="/course/[cid]/queue/[qid]" as={queuePath}>
              <a>{openQueue.room}</a>
            </Link>
          </QueueMenuItem>
        )
      })}
    </QueueMenu>
  )
}

function createGeneralTab(tabItem: NavBarGeneralTabItem) {
  return (
    <MenuItem key={tabItem.href}>
      <Link href={tabItem.href} as={tabItem.as}>
        <a className={tabItem.className}>{tabItem.text}</a>
      </Link>
    </MenuItem>
  )
}

export default function NavBarTabs({
  currentHref,
  hrefAsPath,
  tabs,
  horizontal,
  onClose,
}: NavBarTabsProps): ReactElement {
  return (
    <HorizontalMenu
      selectedKeys={[currentHref]}
      mode={horizontal ? 'horizontal' : 'vertical'}
    >
      {tabs.map((tab) =>
        tab.text !== 'Queue'
          ? createGeneralTab(tab as NavBarGeneralTabItem)
          : createQueueTab(tab as NavBarQueueTabItem, hrefAsPath, onClose),
      )}
    </HorizontalMenu>
  )
}
