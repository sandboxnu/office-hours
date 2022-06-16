import {
  FileTextOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Popover } from "antd";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import styled from "styled-components";
import SelfAvatar from "../common/SelfAvatar";

const { SubMenu } = Menu;

const StyleablePopover = ({ className, ...props }: { className: string }) => (
  <Popover {...props} overlayClassName={className} />
);

const NoPaddingPopover: typeof Popover = styled(StyleablePopover)`
  & .ant-popover-inner-content {
    padding: 0px;
  }
`;

const BorderlessMenu = styled(Menu)`
  border: none;
`;

const NoPaddingSubMenu = styled(SubMenu)`
  &&& .ant-menu-submenu-title {
    padding: 0 16px !important;
  }
  color: green;
`;

const AvatarButton = styled.div`
  cursor: pointer;
`;

interface ProfileDrawerProps {
  courseId: number;
}

export default function ProfileDrawer({
  courseId,
}: ProfileDrawerProps): ReactElement {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isMobile = useIsMobile();

  const renderMenuItems = () => (
    <>
      <Menu.Item icon={<SettingOutlined />}>
        <Link href={{ pathname: "/settings", query: { cid: courseId } }}>
          <a>Settings</a>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="1"
        icon={<QuestionCircleOutlined />}
        onClick={() => {
          window.open("https://info.khouryofficehours.com/help");
        }}
      >
        Help Guide
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<FileTextOutlined />}
        onClick={() => {
          window.open(
            "https://info.khouryofficehours.com/release-notes-archive"
          );
        }}
      >
        Release Notes
      </Menu.Item>
      <Menu.Item key="3" icon={<ReadOutlined />}>
        <Link href={"/about"}>
          <a>About Us</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<LogoutOutlined />}>
        <Link href={"/api/v1/logout"}>
          <a data-cy="logout-button">Logout</a>
        </Link>
      </Menu.Item>
    </>
  );

  return (
    <>
      {isMobile ? (
        <BorderlessMenu mode="inline">
          <NoPaddingSubMenu title="Profile" key="Profile">
            {renderMenuItems()}
          </NoPaddingSubMenu>
        </BorderlessMenu>
      ) : (
        <NoPaddingPopover
          content={
            isPopoverOpen && <Menu mode="inline">{renderMenuItems()}</Menu>
          }
          placement="bottomRight"
          trigger="click"
          visible={isPopoverOpen}
          onVisibleChange={setIsPopoverOpen}
        >
          <AvatarButton>
            <SelfAvatar size={40} />
          </AvatarButton>
        </NoPaddingPopover>
      )}
    </>
  );
}
