import React, { Component } from "react";
import styled from "styled-components";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import Link from "next/link";

const HorizontalMenu = styled(Menu)`
  border-bottom: none;
`;

const MenuItem = styled(Menu.Item)`
  padding: 10px 50px;
  font-size: 16px;
  color: #262626;

  @media (max-width: 767px) {
    padding: 1px 20px;
  }
`;

interface LeftNavBarProps {
  courseId: number;
  queueId: number;
}

export default function LeftNavBar({ courseId, queueId }: LeftNavBarProps) {
  return (
    <HorizontalMenu mode="horizontal">
      <MenuItem key="today">
        <Link href="/class/[cid]/today" as={`/class/${courseId}/today`}>
          <a>Today</a>
        </Link>
      </MenuItem>
      <MenuItem key="week">
        <Link href="/class/[cid]/schedule" as={`/class/${courseId}/schedule`}>
          <a>Schedule</a>
        </Link>
      </MenuItem>
      {queueId && (
        <MenuItem key="queue">
          <Link
            href="/class/[cid]/queue/[qid]"
            as={`/class/${courseId}/queue/${queueId}`}
          >
            <a>Queue</a>
          </Link>
        </MenuItem>
      )}
    </HorizontalMenu>
  );
}
