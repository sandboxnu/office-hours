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
        backgroundColor: nameToRGB(name),
        fontSize,
      }}
      {...props}
    >
      {getInitialsFromName(name)}
    </Avatar>
  );
}
