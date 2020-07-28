import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Menu } from "antd";
import styled from "styled-components";
import { NotificationSettingsModal } from "./NotificationSettingsModal";
import { useState, ReactElement } from "react";
import Link from "next/link";

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
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
        visible={isPopoverOpen}
        onVisibleChange={setIsPopoverOpen}
      >
        <AvatarButton>
          <Avatar size={47} icon={<UserOutlined />} />
        </AvatarButton>
      </NoPaddingPopover>
    </>
  );
}
