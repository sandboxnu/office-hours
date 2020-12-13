import { BellOutlined, EditOutlined, BarChartOutlined } from "@ant-design/icons";
import { useWindowWidth } from "@react-hook/window-size";
import { Col, Menu, Row, Space } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "../common/AvatarWithInitials";
import NotificationsSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";
import InsightsSettings from "./InsightsSettings";

export enum SettingsOptions {
  PROFILE = "PROFILE",
  NOTIFICATIONS = "NOTIFICATIONS",
  INSIGHTS = "INSIGHTS",
}

interface SettingsPageProps {
  defaultPage: SettingsOptions;
}

const VerticalDivider = styled.div`
  @media (min-width: 767px) {
    border-right: 1px solid #cfd6de;
    margin-right: 32px;
  }
`;

export default function SettingsPage({
  defaultPage,
}: SettingsPageProps): ReactElement {
  const profile = useProfile();
  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || SettingsOptions.PROFILE
  );

  const avatarSize = useWindowWidth() / 10;

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center" }}>
        {avatarSize ? (
          <AvatarWithInitals
            style={{ marginTop: "60px", marginBottom: "60px" }}
            name={profile?.name}
            size={avatarSize}
            fontSize={avatarSize * (3 / 7)}
          />
        ) : null}
        <Menu
          defaultSelectedKeys={[currentSettings]}
          onClick={(e) => setCurrentSettings(e.key as SettingsOptions)}
          style={{ background: "#f8f9fb" }}
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
          {/* If role == professor or if has insights */}
          { true ? 
          <Menu.Item
            key={SettingsOptions.INSIGHTS}
            icon={<BarChartOutlined />}
          >
            Insights Settings
          </Menu.Item>
          : null}
        </Menu>
      </Col>
      <VerticalDivider />
      <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
        <Col span={20}>
          {currentSettings === SettingsOptions.PROFILE && <ProfileSettings />}
          {currentSettings === SettingsOptions.NOTIFICATIONS && (
            <NotificationsSettings />
            )}
          {currentSettings === SettingsOptions.INSIGHTS && <InsightsSettings />}
        </Col>
      </Space>
    </Row>
  );
}
