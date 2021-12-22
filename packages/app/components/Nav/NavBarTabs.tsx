import React, { ReactElement } from "react";
import styled from "styled-components";
import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import Link from "next/link";
import { QueuePartial } from "@koh/common";

const { SubMenu } = Menu;

const HorizontalMenu = styled(Menu)<MenuProps>`
  ${(props) => (props.mode === "horizontal" ? "border-bottom: none" : "")}
`;

const QueueMenu = styled(SubMenu)`
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
  z-index: 1;
  background: #ffffff;
`;

export interface NavBarTabsItem {
  href?: string;
  as?: string;
  text: string;
  queues?: QueuePartial[];
  courseId?: number;
}

interface NavBarTabsProps {
  currentHref: string;
  tabs: NavBarTabsItem[];
  horizontal?: boolean;
}

function queueSelector(courseId: number, openQueues: QueuePartial[]) {
  return (
    <QueueMenu data-cy="queue-tab" title="Queue">
      {openQueues?.map((openQueue) => (
        <QueueMenuItem
          key={openQueue.id}
          data-cy={`queue-menu-item-${openQueue.room}`}
        >
          <Link
            href="/course/[cid]/queue/[qid]"
            as={`/course/${courseId}/queue/${openQueue.id}`}
          >
            <a>{openQueue.room}</a>
          </Link>
        </QueueMenuItem>
      ))}
    </QueueMenu>
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
      mode={horizontal ? "horizontal" : "vertical"}
    >
      {tabs.map((tab) =>
        tab.text !== "Queue" ? (
          <MenuItem key={tab.href}>
            <Link href={tab.href} as={tab.as}>
              <a>{tab.text}</a>
            </Link>
          </MenuItem>
        ) : (
          queueSelector(tab.courseId, tab.queues)
        )
      )}
    </HorizontalMenu>
  );
}
