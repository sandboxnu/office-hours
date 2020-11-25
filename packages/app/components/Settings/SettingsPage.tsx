import { BellOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Menu, Row, Space } from "antd";
import React, { ReactElement, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "../common/AvatarWithInitials";
import { VerticalDivider } from "../Queue/QueueListSharedComponents";
import NotificationsSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";

enum SettingsOptions {
  PROFILE,
  NOTIFICATIONS,
}

export default function SettingsPage(): ReactElement {
  const profile = useProfile();
  const [currentSettings, setCurrentSettings] = useState(
    SettingsOptions.PROFILE
  );

  return (
    <Row>
      <Col span={6} style={{ textAlign: "center" }}>
        <AvatarWithInitals
          style={{ marginTop: "60px", marginBottom: "60px" }}
          name={profile?.name}
          size={350}
          fontSize={128}
        />
        <Menu
          onClick={(e) => setCurrentSettings(Number(e.key))}
          style={{ textAlign: "center" }}
        >
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
        <Col span={18}>
          {currentSettings === SettingsOptions.PROFILE && <ProfileSettings />}
          {currentSettings === SettingsOptions.NOTIFICATIONS && (
            <NotificationsSettings />
          )}
        </Col>
      </Space>
    </Row>
  );
}
