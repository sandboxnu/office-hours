import { Button } from 'antd'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const BannerContainer = styled.div`
  width: 100%;
  @media (max-width: 650px) {
    margin-bottom: 1em;
  }
`

const TitleContainer = styled.div`
  background: ${({ color }) => color || '#8895A6'};
  padding-left: 24px;
  padding-right: 16px;
  min-height: 60px;
  border-radius: 6px 6px 0 0;
  position: relative;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div`
  font-weight: 300;
  font-size: 24px;
  color: white;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-right: 10px;
`

const ContentContainer = styled.div`
  background: ${({ color }) => color || '#CFD6DE'};
  padding: 12px 24px;
  border-radius: 0 0 6px 6px;
`

interface BannerProps {
  title?: string | ReactNode
  content?: string | ReactNode
  titleColor?: string
  contentColor?: string
  buttons?: ReactNode
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
  )
}

/**
 * Buttons to be used in the banner
 */
export const BannerButton = styled(Button).attrs({
  size: 'large',
  shape: 'circle',
})`
  margin-left: 0.75rem;
  border: 0;
  background: #fff;

  @media (max-width: 650px) {
    margin-left: 0.5rem;
    margin-top: 0.35rem;
  }
`

export const BannerPrimaryButton = styled(BannerButton)`
  ${({ disabled }) => disabled && 'pointer-events: none'};
  background: #3684c6;
  color: #fff;
  &:hover,
  &:focus {
    background: #3c93dd;
    color: #fff;
  }
`

export const BannerDangerButton = styled(BannerButton)`
  ${({ disabled }) => disabled && 'pointer-events: none'};
  background: #e26567;
  color: #fff;
  &:hover,
  &:focus {
    background: #fc7f81;
    color: #fff;
  }
`

export const BannerOrangeButton = styled(BannerButton)`
  ${({ disabled }) => disabled && 'pointer-events: none'};
  background: #ff8c00;
  color: #fff;
  &:hover,
  &:focus {
    background: #ffa700;
    color: #fff;
  }
`

export const FinishHelpingButton = styled(BannerButton)`
  border: 0;
  background: #66bb6a;
  color: #fff;
  &:hover,
  &:focus {
    background: #82c985;
    color: #fff;
  }
`

export const CantFindButton = styled(BannerButton)`
  background: #fff;
  border: 1px solid #e26567;
  color: #e26567;
  &:hover,
  &:focus {
    background: #fc7f81;
    color: #fff;
  }
`

export const RequeueButton = styled(BannerButton)`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  color: #000000;
  &:hover,
  &:focus {
    background: #f0f0f0;
    color: #000000;
  }
`
