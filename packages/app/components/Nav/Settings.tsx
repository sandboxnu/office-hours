import { isProd } from "@koh/common";
import { Menu, Popover } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "../common/AvatarWithInitials";
import { NotificationSettingsModal } from "./NotificationSettingsModal";

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
  const loginPath = isProd() ? "/login" : "/dev";

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
              <Menu.Item
                onClick={() => {
                  setIsPopoverOpen(false);
                  setIsNotifOpen(true);
                }}
              >
                Notification Settings
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
