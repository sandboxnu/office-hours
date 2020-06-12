import React, { Component } from "react";
import styled from "styled-components";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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

const MenuItemLink = styled.a`
  padding: 10px 15px;
`;

interface LeftNavBarProps {}

export default function LeftNavBar({}: LeftNavBarProps) {
  return (
    <HorizontalMenu mode="horizontal">
      <MenuItem key="today">
        <MenuItemLink href="/today">Today</MenuItemLink>
      </MenuItem>
      <MenuItem key="week">
        <MenuItemLink href="/schedule">Schedule</MenuItemLink>
      </MenuItem>
      <MenuItem key="queue">
        <MenuItemLink href="/queue">Queue</MenuItemLink>
      </MenuItem>
    </HorizontalMenu>
  );
}
