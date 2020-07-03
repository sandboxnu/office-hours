import React, { Component } from "react";
import styled from "styled-components";
import { Avatar, Button, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Settings from "./Settings/Profile";

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

<Link href="/login" as="/login">
  <Avatar size={32} icon={<UserOutlined />} />
</Link>;

export default function RightNavBar() {
  return (
    <HorizontalMenu mode="horizontal">
      <Settings />
    </HorizontalMenu>
  );
}
