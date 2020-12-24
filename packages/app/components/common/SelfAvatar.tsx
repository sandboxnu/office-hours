import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { ReactElement } from "react";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "./AvatarWithInitials";

type SelfAvatarProps = {
  size: number;
  style?: any;
};

type KOHAvatarProps = {
  size: number;
  photoURL: string;
  name: string;
  style?: any;
};

export default function SelfAvatar({
  size,
  style,
}: SelfAvatarProps): ReactElement {
  const profile = useProfile();

  return (
    <KOHAvatar
      size={size}
      photoURL={profile?.photoURL}
      name={profile?.name}
      style={style}
    />
  );
}

export function KOHAvatar({
  size,
  photoURL,
  name,
  style,
}: KOHAvatarProps): ReactElement {
  return photoURL ? (
    <Avatar
      icon={<UserOutlined />}
      src={"/api/v1/profile/get_picture/" + photoURL}
      size={size}
      style={style}
    />
  ) : (
    <AvatarWithInitals name={name} size={size} fontSize={(3 / 7) * size} />
  );
}
