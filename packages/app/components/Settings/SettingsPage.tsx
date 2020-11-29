import { BellOutlined, EditOutlined } from "@ant-design/icons";
import { useWindowSize } from "@react-hook/window-size";
import { Col, Menu, Row, Space } from "antd";
import React, { ReactElement, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "../common/AvatarWithInitials";
import { VerticalDivider } from "../Queue/QueueListSharedComponents";
import NotificationsSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";

export enum SettingsOptions {
  PROFILE = "PROFILE",
  NOTIFICATIONS = "NOTIFICATIONS",
}

interface SettingsPageProps {
  defaultPage: SettingsOptions;
}

export default function SettingsPage({
  defaultPage,
}: SettingsPageProps): ReactElement {
  const profile = useProfile();
  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || SettingsOptions.PROFILE
  );

  const [width, height] = useWindowSize();
  const avatarSize = width / 10;

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center" }}>
        <AvatarWithInitals
          style={{ marginTop: "60px", marginBottom: "60px" }}
          name={profile?.name}
          size={avatarSize}
          fontSize={avatarSize * (3 / 7)}
        />
        <Menu onClick={(e) => setCurrentSettings(e.key as SettingsOptions)}>
          <Menu.Item key={SettingsOptions.PROFILE} icon={<EditOutlined />}>
            Edit Profile
          </Menu.Item>
          <Menu.Item
            key={SettingsOptions.NOTIFICATIONS}
            icon={<BellOutlined />}
          >
            Notifications Settings
          </Menu.Item>
        </Menu>
      </Col>
      <VerticalDivider />
      <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
        <Col span={20}>
          {currentSettings === SettingsOptions.PROFILE && <ProfileSettings />}
          {currentSettings === SettingsOptions.NOTIFICATIONS && (
            <NotificationsSettings />
          )}
        </Col>
      </Space>
    </Row>
  );
}
