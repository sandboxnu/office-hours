import { useWindowWidth } from "@react-hook/window-size";
import React, { ReactElement } from "react";
import SelfAvatar from "../common/SelfAvatar";

export function SettingsPanelAvatar(): ReactElement {
  const avatarSize = useWindowWidth() / 10;

  return (
    <SelfAvatar
      size={avatarSize}
      style={{ marginTop: avatarSize / 6, marginBottom: avatarSize / 12 }}
    />
  );
}
