import { ReactNode, ReactElement } from "react";
import styled from "styled-components";
import { Button, Space } from "antd";

const BannerContainer = styled.div`
  width: 100%;
`;

const TitleContainer = styled.div`
  background: ${({ color }) => color || "#8895A6"};
  padding-left: 24px;
  padding-right: 16px;
  min-height: 60px;
  border-radius: 6px 6px 0 0;
  position: relative;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: 300;
  font-size: 24px;
  color: white;
`;
const ButtonContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  background: ${({ color }) => color || "#CFD6DE"};
  padding: 12px 24px;
  border-radius: 0 0 6px 6px;
`;

interface BannerProps {
  title?: string | ReactNode;
  content?: string | ReactNode;
  titleColor?: string;
  contentColor?: string;
  buttons?: ReactNode;
}
/**
 * Presentation-only component
 */
export default function Banner(props: BannerProps): ReactElement {
  return (
    <BannerContainer>
      <TitleContainer color={props.titleColor}>
        <Title>{props.title}</Title>
        <Space size={16}>{props.buttons}</Space>
      </TitleContainer>
      <ContentContainer color={props.contentColor}>
        {props.content}
      </ContentContainer>
    </BannerContainer>
  );
}

/**
 * Buttons to be used in the banner
 */
export const BannerButton = styled(Button)`
  border-radius: 6px;
  border: 0;
  background: #fff;
`;

export const BannerDangerButton = styled(BannerButton)`
  background: #e26567;
  color: #fff;
  &:hover,
  &:focus {
    background: #fc7f81;
    color: #fff;
  }
`;
