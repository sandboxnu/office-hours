import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { ReactElement, Ref } from "react";
import { useProfile } from "../../hooks/useProfile";
import { AvatarWithInitals } from "./AvatarWithInitials";

type SelfAvatarProps = {
  size: number;
  style?: any;
};

type KOHAvatarProps = {
  size: number;
  photoURL: string;
  name: string;
  style?: any;
  className?: string;
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

export const KOHAvatar = React.forwardRef(
  (
    { size, photoURL, name, style, className, ...props }: KOHAvatarProps,
    ref: Ref<HTMLElement>
  ): ReactElement => {
    return photoURL ? (
      <Avatar
        {...props}
        ref={ref}
        icon={<UserOutlined />}
        src={"/api/v1/profile/get_picture/" + photoURL}
        size={size}
        style={style}
        className={className}
      />
    ) : (
      <AvatarWithInitals
        {...props}
        ref={ref}
        name={name}
        size={size}
        fontSize={(3 / 7) * size}
        style={style}
        className={className}
      />
    );
  }
);

KOHAvatar.displayName = "KOHAvatar";
