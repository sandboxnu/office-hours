import {
  BellOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { API } from "@koh/api-client";
import { Role } from "@koh/common";
import { useWindowWidth } from "@react-hook/window-size";
import { Button, Col, Menu, message, Row, Skeleton, Space, Upload } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import NotificationsSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";
import TeamsSettings from "./TeamsSettings";
import { SettingsPanelAvatar } from "./SettingsSharedComponents";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { useRouter } from "next/router";

export enum SettingsOptions {
  PROFILE = "PROFILE",
  NOTIFICATIONS = "NOTIFICATIONS",
  TEAMS_SETTINGS = "TEAMS_SETTINGS",
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
  const router = useRouter();
  const { cid } = router.query;
  const role = useRoleInCourse(Number(cid));
  const isTAOrProfessor = role === Role.TA || role === Role.PROFESSOR;

  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || SettingsOptions.PROFILE
  );
  const [uploading, setUploading] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const [avatarSize, setAvatarSize] = useState(windowWidth / 2);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
    let widthDivider = isMobile ? 6 : 10;
    setAvatarSize(windowWidth / widthDivider);
  });

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

  const AvatarSettings = () => (
    <Col>
      {avatarSize ? (
        <Row
          style={{
            marginTop: avatarSize / 6,
            justifyContent: "center",
          }}
        >
          {uploading ? (
            <Skeleton.Avatar
              active={true}
              size={avatarSize}
              shape="circle"
              style={{
                marginTop: avatarSize / 6,
                marginBottom: avatarSize / 12,
                marginLeft: avatarSize / 6,
                marginRight: avatarSize / 6,
              }}
            />
          ) : (
            <SettingsPanelAvatar avatarSize={avatarSize} />
          )}
          <Col>
            {profile && (
              <h2>
                {profile.firstName} {profile.lastName}
              </h2>
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
                Edit profile picture
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
          </Col>
        </Row>
      ) : null}
    </Col>
  );

  const SettingsMenu = () => (
    <Menu
      defaultSelectedKeys={[currentSettings]}
      onClick={(e) => setCurrentSettings(e.key as SettingsOptions)}
      style={{ background: "#f8f9fb" }}
    >
      <Menu.Item key={SettingsOptions.PROFILE} icon={<UserOutlined />}>
        Personal information
      </Menu.Item>
      {isTAOrProfessor && (
        <Menu.Item
          key={SettingsOptions.TEAMS_SETTINGS}
          icon={<WindowsOutlined />}
        >
          Teams settings
        </Menu.Item>
      )}
      <Menu.Item key={SettingsOptions.NOTIFICATIONS} icon={<BellOutlined />}>
        Notifications
      </Menu.Item>
    </Menu>
  );

  const SettingsSubpage = () => (
    <Col>
      {currentSettings === SettingsOptions.PROFILE && <ProfileSettings />}
      {currentSettings === SettingsOptions.NOTIFICATIONS && (
        <NotificationsSettings />
      )}
      {currentSettings === SettingsOptions.TEAMS_SETTINGS && <TeamsSettings />}
    </Col>
  );

  return (
    <div>
      {isMobile ? (
        <Col>
          <AvatarSettings />
          <Button onClick={() => setPopUpOpen(!isPopUpOpen)}>
            Toggle Menu
          </Button>
          {isPopUpOpen && <SettingsMenu />}
          <SettingsSubpage />
        </Col>
      ) : (
        <Row>
          <Col span={5} style={{ textAlign: "center" }}>
            <AvatarSettings />
            <SettingsMenu />
          </Col>
          <VerticalDivider />
          <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
            <SettingsSubpage />
          </Space>
        </Row>
      )}
    </div>
  );
}
