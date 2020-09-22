import { Avatar } from "antd";
import React, { ReactElement } from "react";
import nameToRGB from "../../utils/ColorUtils";
import getInitialsFromName from "../../utils/NameUtils";

type AvatarWithInitalsProps = {
  name: string;
  fontSize?: number;
  [x: string]: any;
};

export default function AvatarWithInitals({
  name,
  fontSize,
  ...props
}: AvatarWithInitalsProps): ReactElement {
  return (
    <Avatar
      style={{
        backgroundColor: name ? nameToRGB(name) : "#1abc9c",
        fontSize,
      }}
      {...props}
    >
      {getInitialsFromName(name)}
    </Avatar>
  );
}
