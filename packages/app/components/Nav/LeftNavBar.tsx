import React, { Component } from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface LeftNavBarProps {}

export default function LeftNavBar({}: LeftNavBarProps) {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="today">
        <a href="/today">Today</a>
      </Menu.Item>
      <Menu.Item key="week">
        <a href="/schedule">Week</a>
      </Menu.Item>
      <Menu.Item key="queue">
        <a href="/queue">Queue</a>
      </Menu.Item>
    </Menu>
  );
}
