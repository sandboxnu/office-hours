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

const MenuItemLink = styled(Link)`
  padding: 10px 15px;
`;

interface LeftNavBarProps {
  courseId: number;
  queueId: number;
}

export default function LeftNavBar({ courseId, queueId }: LeftNavBarProps) {
  return (
    <HorizontalMenu mode="horizontal">
      <MenuItem key="today">
        <MenuItemLink href={`/class/${courseId}/today`}>Today</MenuItemLink>
      </MenuItem>
      <MenuItem key="week">
        <MenuItemLink href={`/class/${courseId}/schedule`}>
          Schedule
        </MenuItemLink>
      </MenuItem>
      {queueId && (
        <MenuItem key="queue">
          <MenuItemLink href={`/class/${courseId}/queue/${queueId}`}>
            Queue
          </MenuItemLink>
        </MenuItem>
      )}
    </HorizontalMenu>
  );
}
