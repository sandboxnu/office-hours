import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { ReactElement } from "react";
import { useProfile } from "../../hooks/useProfile";
import AvatarWithInitals from "./AvatarWithInitials";

type SelfAvatarProps = {
  size: number;
};

type KOHAvatarProps = {
  size: number;
  photoURL: string;
  name: string;
};

export default function SelfAvatar({ size }: SelfAvatarProps): ReactElement {
  const profile = useProfile();

  return (
    <KOHAvatar size={size} photoURL={profile?.photoURL} name={profile?.name} />
  );
}

export function KOHAvatar({
  size,
  photoURL,
  name,
}: KOHAvatarProps): ReactElement {
  return photoURL ? (
    <Avatar
      icon={<UserOutlined />}
      src={"/api/v1/profile/get_picture/" + photoURL}
      size={size}
    />
  ) : (
    <AvatarWithInitals name={name} size={size} fontSize={(3 / 7) * size} />
  );
}
