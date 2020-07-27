import React, { ReactElement } from "react";
import styled from "styled-components";
import { Menu } from "antd";
import { MenuProps, MenuItemProps } from "antd/lib/menu";
import Link from "next/link";

const HorizontalMenu = styled(Menu)<MenuProps>`
  ${(props) => (props.mode === "horizontal" ? "border-bottom: none" : "")}
`;

const MenuItem = styled(Menu.Item)<{ horizontal: boolean }>`
  ${(props) =>
    props.mode === "horizontal"
      ? `
  padding: 10px 50px;
  font-size: 16px;
  color: #262626;

  @media (max-width: 767px) {
    padding: 1px 20px;
  }
  `
      : ""}
`;

export interface NavBarTabsItem {
  href: string;
  as: string;
  text: string;
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
  return (
    <HorizontalMenu
      selectedKeys={[currentHref]}
      mode={horizontal ? "horizontal" : "vertical"}
    >
      {tabs.map((tab) => (
        <MenuItem horizontal={horizontal} key={tab.href}>
          <Link href={tab.href} as={tab.as}>
            <a>{tab.text}</a>
          </Link>
        </MenuItem>
      ))}
    </HorizontalMenu>
  );
}
