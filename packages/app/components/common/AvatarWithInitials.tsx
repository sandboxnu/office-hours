import { Avatar } from "antd";
import React, { ReactElement, Ref } from "react";
import nameToRGB from "../../utils/ColorUtils";
import getInitialsFromName from "../../utils/NameUtils";

type AvatarWithInitalsProps = {
  name: string;
  fontSize?: number;
  style?: any;
  [x: string]: any;
};

export const AvatarWithInitals = React.forwardRef(
  (
    { name, fontSize, style, ...props }: AvatarWithInitalsProps,
    ref: Ref<HTMLElement>
  ): ReactElement => {
    return (
      <Avatar
        {...props}
        ref={ref}
        style={{
          backgroundColor: name ? nameToRGB(name) : "#1abc9c",
          fontSize,
          ...style,
        }}
      >
        {getInitialsFromName(name)}
      </Avatar>
    );
  }
);

AvatarWithInitals.displayName = "AvatarWithInitials";
