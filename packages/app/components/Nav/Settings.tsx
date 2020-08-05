import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Menu } from "antd";
import styled from "styled-components";
import { NotificationSettingsModal } from "./NotificationSettingsModal";
import { useState, ReactElement } from "react";
import Link from "next/link";
import { useProfile } from "../../hooks/useProfile";

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
              <Menu.Item>
                <Link href="/login" as="/login">
                  <a>Logout</a>
                </Link>
              </Menu.Item>
            </Menu>
          )
        }
        placement="bottomRight"
        trigger="click"
        visible={isPopoverOpen}
        onVisibleChange={setIsPopoverOpen}
      >
        <AvatarButton>
          {profile && (
            <Avatar size={40} icon={<UserOutlined />} src={profile.photoURL} />
          )}
        </AvatarButton>
      </NoPaddingPopover>
    </>
  );
}
