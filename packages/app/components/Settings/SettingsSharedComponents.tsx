import React, { ReactElement } from "react";
import SelfAvatar from "../common/SelfAvatar";

interface SettingsPanelAvatarProps {
  avatarSize: number;
}

export function SettingsPanelAvatar({
  avatarSize,
}: SettingsPanelAvatarProps): ReactElement {
  return (
    <SelfAvatar
      size={avatarSize}
      style={{
        marginTop: avatarSize / 6,
        marginBottom: avatarSize / 12,
        marginLeft: avatarSize / 6,
        marginRight: avatarSize / 6,
      }}
    />
  );
}
