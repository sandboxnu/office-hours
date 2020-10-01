import { PROD_URL } from "@koh/common";
import { Menu, Popover } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "../common/AvatarWithInitials";
import { NotificationSettingsModal } from "./NotificationSettingsModal";
import {
  SettingOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  // UserOutlined,
} from "@ant-design/icons";

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

export default function Settings(): ReactElement {
  const profile = useProfile();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const loginPath = PROD_URL === process.env.DOMAIN ? "/login" : "/dev";

  return (
    <>
      <NotificationSettingsModal
        visible={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
      <NoPaddingPopover
        content={
          isPopoverOpen && (
            <Menu mode="inline">
              <Menu.ItemGroup title="Settings">
                {/* Uncomment when we implement profile settings */}
                {/* <Menu.Item icon={<UserOutlined />}>
                Profile Settings
              </Menu.Item> */}
                <Menu.Item
                  onClick={() => {
                    setIsPopoverOpen(false);
                    setIsNotifOpen(true);
                  }}
                  icon={<SettingOutlined />}
                >
                  Notification Settings
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g1" title="External Pages">
                <Menu.Item
                  key="1"
                  icon={<QuestionCircleOutlined />}
                  onClick={() => {
                    window.open(
                      "https://www.notion.so/Office-Hours-Help-Guide-a89c73dd53204cc3970ac44d61917417"
                    )
                    setIsPopoverOpen(false);
                  }
                  }
                >
                  Help Guide
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<FileTextOutlined />}
                  onClick={() => {
                    window.open(
                      "https://www.notion.so/Release-Notes-abba246bfa0847baa2706ab30d0c6c7d"
                    )
                    setIsPopoverOpen(false);
                  }
                  }
                >
                  Release Notes
                </Menu.Item>
              </Menu.ItemGroup>
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
