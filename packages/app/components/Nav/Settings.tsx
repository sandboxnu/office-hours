import { PROD_URL } from "@koh/common";
import { Avatar, Menu, Popover } from "antd";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import nameToRGB from "../../utils/ColorUtils";
import { NotificationSettingsModal } from "./NotificationSettingsModal";
import getInitialsFromName from "../../utils/NameUtils";

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
              <Avatar
                style={{ backgroundColor: nameToRGB(profile?.name) }}
                size={40}
              >
                {getInitialsFromName(profile?.name)}
              </Avatar>
            )
          }
        </AvatarButton>
      </NoPaddingPopover>
    </>
  );
}
