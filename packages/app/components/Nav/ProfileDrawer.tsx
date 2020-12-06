import {
  FileTextOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { isProd } from "@koh/common";
import { Menu, Popover } from "antd";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "../common/AvatarWithInitials";

const StyleablePopover = ({ className, ...props }: { className: string }) => (
  <Popover {...props} overlayClassName={className} />
);
const NoPaddingPopover: typeof Popover = styled(StyleablePopover)`
  & .ant-popover-inner-content {
    padding: 0px;
  }
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
  const profile = useProfile();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const loginPath = isProd() ? "/login" : "/dev";

  return (
    <>
      <NoPaddingPopover
        content={
          isPopoverOpen && (
            <Menu mode="inline">
              <Menu.Item
                icon={
                  <SettingOutlined /> /* Food for thought, do we want to turn this into a profile outline or settings outline*/
                }
              >
                <Link
                  href={{ pathname: "/settings", query: { cid: courseId } }}
                >
                  <a>Settings</a>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="1"
                icon={<QuestionCircleOutlined />}
                onClick={() => {
                  window.open("https://info.khouryofficehours.com/help");
                  setIsPopoverOpen(false);
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
                  setIsPopoverOpen(false);
                }}
              >
                Release Notes
              </Menu.Item>
              {/* 
              TODO: Add this back when we add logout endpoint
              <Menu.Item>
                <Link href={loginPath} as={loginPath}>
                  <a>Logout</a>
                </Link>
              </Menu.Item> */}
            </Menu>
          )
        }
        placement="bottomRight"
        trigger="click"
        visible={isPopoverOpen}
        onVisibleChange={setIsPopoverOpen}
      >
        <AvatarButton>
          {
            //TODO: bring back photo URL && get rid of RegeX
            //icon={<UserOutlined />} src={profile?.photoURL}
            profile && (
              <AvatarWithInitals name={profile?.name} size={40} fontSize={16} />
            )
          }
        </AvatarButton>
      </NoPaddingPopover>
    </>
  );
}
