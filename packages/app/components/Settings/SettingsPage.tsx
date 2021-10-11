import {
  BellOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { API } from "@koh/api-client";
import { useWindowWidth } from "@react-hook/window-size";
import { Button, Col, Menu, message, Row, Skeleton, Space, Upload } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import NotificationsSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";
import { SettingsPanelAvatar } from "./SettingsSharedComponents";

export enum SettingsOptions {
  PROFILE = "PROFILE",
  NOTIFICATIONS = "NOTIFICATIONS",
}

interface SettingsPageProps {
  defaultPage: SettingsOptions;
}

export const VerticalDivider = styled.div`
  @media (min-width: 767px) {
    border-right: 1px solid #cfd6de;
    margin-right: 32px;
  }
`;

const ProfilePicButton = styled(Button)`
  width: 207px;
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

  if (error) {
    message.error(error);
  }

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center" }}>
        {avatarSize ? (
          <>
            {uploading ? (
              <Skeleton.Avatar
                active={true}
                size={avatarSize}
                shape="circle"
                style={{
                  marginTop: avatarSize / 6,
                  marginBottom: avatarSize / 12,
                }}
              />
            ) : (
              <SettingsPanelAvatar />
            )}
            <Upload
              action={"/api/v1/profile/upload_picture"}
              beforeUpload={beforeUpload}
              showUploadList={false}
              onChange={(info) => {
                setUploading(info.file.status === "uploading");
                mutate();
              }}
            >
              <ProfilePicButton icon={<UploadOutlined />}>
                Upload a Profile Picture
              </ProfilePicButton>
            </Upload>
            {profile?.photoURL && (
              <ProfilePicButton
                icon={<DeleteOutlined />}
                style={{ marginTop: "10px" }}
                onClick={async () => {
                  try {
                    await API.profile.deleteProfilePicture();
                    message.success(
                      "You've successfully deleted your profile picture"
                    );
                    mutate();
                  } catch (e) {
                    message.error(
                      "There was an error with deleting your profile picture, please contact the Khoury Office Hours team for assistance"
                    );
                    throw e;
                  }
                }}
              >
                Delete my Profile Picture
              </ProfilePicButton>
            )}
            <div style={{ marginTop: "60px" }} />
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
