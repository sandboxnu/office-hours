import { Button } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

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
  flex-flow: row wrap;
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
    <BannerContainer data-cy="banner">
      <TitleContainer color={props.titleColor}>
        <Title>{props.title}</Title>
        <ButtonContainer>{props.buttons}</ButtonContainer>
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
  margin-left: 16px;
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

export const TABannerButton = styled(Button)`
  margin-left: 16px;
  border-radius: 6px;
  border: 0;
  background: #66bb6a;
  color: #fff;
  &:hover,
  &:focus {
    background: #82c985;
    color: #fff;
  }
`;

export const TABannerDangerButton = styled(BannerButton)`
  background: #fff;
  border: 1px solid #e26567;
  color: #e26567;
  &:hover,
  &:focus {
    background: #fc7f81;
    color: #fff;
  }
`;

export const RequeueButton = styled(BannerButton)`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  color: #000000;
  &:hover,
  &:focus {
    background: #f0f0f0;
    color: #000000;
  }
`;
