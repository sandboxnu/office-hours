import React, { ReactElement } from "react";
import styled from "styled-components";
import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import Link from "next/link";
import { QueuePartial } from "@koh/common";

const { SubMenu } = Menu;

const HorizontalMenu = styled(Menu)<MenuProps>`
  ${(props) => (props.mode === "horizontal" ? "border-bottom: none" : "")}
  border: none;
`;

const QueueMenu = styled(SubMenu)`
  @media (min-width: 650px) {
    font-size: 16px !important;
    color: #262626 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  &&&:after {
    left: 0px;
    right: 0px;
  }

  &&& .ant-menu-submenu-title {
    @media (min-width: 650px) {
      padding: 10px 50px !important;
    }
  }
`;

const MenuItem = styled(Menu.Item)`
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
`;

const QueueMenuItem = styled(Menu.Item)`
  @media (min-width: 650px) {
    z-index: 1;
    background: #ffffff;
  }
`;

export type NavBarTabsItem = NavBarGeneralTabItem | NavBarQueueTabItem;

interface NavBarGeneralTabItem {
  href: string;
  as: string;
  text: string;
}

interface NavBarQueueTabItem {
  text: string;
  queues: QueuePartial[];
  courseId: number;
}

interface NavBarTabsProps {
  currentHref: string;
  tabs: NavBarTabsItem[];
  horizontal?: boolean;
}

function createQueueTab(queueTabItem: NavBarQueueTabItem) {
  return (
    <QueueMenu data-cy="queue-tab" title="Queue" key="queue">
      {queueTabItem.queues?.map((openQueue) => (
        <QueueMenuItem
          key={openQueue.id}
          data-cy={`queue-menu-item-${openQueue.room}`}
        >
          <Link
            href="/course/[cid]/queue/[qid]"
            as={`/course/${queueTabItem.courseId}/queue/${openQueue.id}`}
          >
            <a>{openQueue.room}</a>
          </Link>
        </QueueMenuItem>
      ))}
    </QueueMenu>
  );
}

function createGeneralTab(tabItem: NavBarGeneralTabItem) {
  return (
    <MenuItem key={tabItem.href}>
      <Link href={tabItem.href} as={tabItem.as}>
        <a>{tabItem.text}</a>
      </Link>
    </MenuItem>
  );
}

export default function NavBarTabs({
  currentHref,
  tabs,
  horizontal,
}: NavBarTabsProps): ReactElement {
  return (
    <HorizontalMenu
      selectedKeys={[currentHref]}
      mode={horizontal ? "horizontal" : "inline"}
    >
      {tabs.map((tab) =>
        tab.text !== "Queue"
          ? createGeneralTab(tab as NavBarGeneralTabItem)
          : createQueueTab(tab as NavBarQueueTabItem)
      )}
    </HorizontalMenu>
  );
}
