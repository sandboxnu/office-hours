import React, { Component } from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface RightNavBarProps {}

export default function RightNavBar({}: RightNavBarProps) {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <a href="/login">Sign out</a>
      </Menu.Item>
    </Menu>
  );
}
