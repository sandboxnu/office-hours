import { ButtonProps, Popconfirm, PopconfirmProps } from "antd";
import { ReactElement } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

/**
 * Wrapper around antd popconfirm with some more mobile-friendly features.
 */
export const ResponsivePopconfirm = (props: PopconfirmProps): ReactElement => {
  const isMobile = useIsMobile();

  const PopconfirmButtonProps: {
    cancelButtonProps?: ButtonProps;
    okButtonProps?: ButtonProps;
  } = isMobile
    ? { cancelButtonProps: { size: "large" }, okButtonProps: { size: "large" } }
    : {};

  return <Popconfirm {...PopconfirmButtonProps} {...props} />;
};
