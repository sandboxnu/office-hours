import React, { ReactElement } from "react";
import styled from "styled-components";
import { Dropdown, Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import Link from "next/link";
import { QueuePartial } from "@koh/common";
import { DownOutlined } from "@ant-design/icons";

const HorizontalMenu = styled(Menu)<MenuProps>`
  ${(props) => (props.mode === "horizontal" ? "border-bottom: none" : "")}
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

export default function NavBarTabs({
  currentHref,
  tabs,
  horizontal,
}: NavBarTabsProps): ReactElement {
  function queueSelector(courseId: number, openQueues: QueuePartial[]) {
    return (
      <Menu>
        {openQueues?.map((openQueue) => (
          <QueueMenuItem key={openQueue.id}>
            <Link
              href="/course/[cid]/queue/[qid]"
              as={`/course/${courseId}/queue/${openQueue.id}`}
            >
              <a>{openQueue.room}</a>
            </Link>
          </QueueMenuItem>
        ))}
      </Menu>
    );
  }

  return (
    <HorizontalMenu
      selectedKeys={[currentHref]}
      mode={horizontal ? "horizontal" : "vertical"}
    >
      {tabs.map((tab) => (
        <MenuItem key={tab.href}>
          {tab.text !== "Queue" ? (
            <Link href={tab.href} as={tab.as}>
              <a>{tab.text}</a>
            </Link>
          ) : (
            <Dropdown
              overlay={queueSelector(tab.courseId, tab.queues)}
              trigger={["click"]}
            >
              <a>
                <span>Queue</span>
                <DownOutlined
                  style={{
                    fontSize: "16px",
                    verticalAlign: "-0.125em",
                    marginLeft: "5px",
                  }}
                />
              </a>
            </Dropdown>
          )}
        </MenuItem>
      ))}
    </HorizontalMenu>
  );
}
