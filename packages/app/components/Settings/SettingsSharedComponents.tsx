import { useWindowWidth } from "@react-hook/window-size";
import React, { ReactElement } from "react";
import SelfAvatar from "../common/SelfAvatar";

export function SettingsPanelAvatar(props): ReactElement {
  const { avatarSize } = props;

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
