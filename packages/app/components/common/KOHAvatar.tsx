import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { ReactElement } from "react";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "./AvatarWithInitials";

type KOHAvatarProps = {
  size: number;
};

export default function KOHAvatar({ size }: KOHAvatarProps): ReactElement {
  const profile = useProfile();

  return profile?.photoURL ? (
    <Avatar
      icon={<UserOutlined />}
      src={"/api/v1/profile/get_picture/" + profile.photoURL}
      size={size}
    />
  ) : (
    <AvatarWithInitals
      style={{ marginTop: "60px", marginBottom: "60px" }}
      name={profile?.name}
      size={size}
    />
  );
}
