import {
  BellOutlined,
  EditOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { API } from "@koh/api-client";
import { useWindowWidth } from "@react-hook/window-size";
import {
  Avatar,
  Button,
  Col,
  Menu,
  message,
  Row,
  Space,
  Spin,
  Upload,
} from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
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
  const { data: profile, error, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || SettingsOptions.PROFILE
  );
  const [uploading, setUploading] = useState(false);

  const avatarSize = useWindowWidth() / 10;

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPGs or PNGs!");
    }

    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Image must smaller than 1MB!");
    }
    return isJpgOrPng && isLt1M;
  };

  console.log(error);

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center" }}>
        {avatarSize ? (
          <>
            {uploading && <Spin />}
            {!uploading &&
              (profile?.photoURL && error === undefined ? (
                <Avatar
                  icon={<UserOutlined />}
                  src={"/api/v1/profile/get_picture/" + profile.photoURL}
                  size={avatarSize}
                  style={{ marginTop: "60px", marginBottom: "60px" }}
                />
              ) : (
                <AvatarWithInitals
                  style={{ marginTop: "60px", marginBottom: "60px" }}
                  name={profile?.name}
                  size={avatarSize}
                  fontSize={avatarSize * (3 / 7)}
                />
              ))}

            <Upload
              action={"/api/v1/profile/upload_picture"}
              beforeUpload={beforeUpload}
              showUploadList={false}
              onChange={(info) => {
                info.file.status === "uploading"
                  ? setUploading(true)
                  : setUploading(false);
                mutate();
              }}
            >
              <Button icon={<UploadOutlined />}>
                Upload a Profile Picture
              </Button>
            </Upload>
          </>
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
