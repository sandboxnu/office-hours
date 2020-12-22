import { BellOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useWindowWidth } from "@react-hook/window-size";
import { Button, Col, Menu, Row, Space, Upload } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "../common/AvatarWithInitials";
import NotificationsSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";

export enum SettingsOptions {
  PROFILE = "PROFILE",
  NOTIFICATIONS = "NOTIFICATIONS",
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
          <>
            <AvatarWithInitals
              style={{ marginTop: "60px", marginBottom: "60px" }}
              name={profile?.name}
              size={avatarSize}
              fontSize={avatarSize * (3 / 7)}
            />

            <Upload action={"/api/v1/profile/upload_picture"}>
              <Button icon={<UploadOutlined />}>
                Upload a Profile Picture
              </Button>
            </Upload>
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
            </Menu>
          </>
        ) : null}
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
