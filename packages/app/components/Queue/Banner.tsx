import { ButtonProps } from "antd/lib/button";
import { ReactNode, ReactElement } from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
`;

const TitleContainer = styled.div`
  color: ${({ color }) => color || "#8895A6"};
`;

interface BannerProps {
  title?: string;
  content?: string | ReactNode;
  titleColor?: string;
  contentColor?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
  onPrimary?: () => void;
  onSecondary?: () => void;
}
export default function Banner(props: BannerProps): ReactElement {
  return (
    <BannerContainer>
      <TitleContainer color={props.titleColor}>{props.title}</TitleContainer>
    </BannerContainer>
  );
}
