import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import Linkify from 'react-linkify'
import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const NotesText = styled.div`
  font-size: 16px;
  color: #5f6b79;
`

// New queue styled components start here
const InfoColumnContainer = styled.div`
  flex-shrink: 0;
  padding-bottom: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 650px) {
    margin-top: 32px;
    width: 290px;
  }
`

const QueueInfoColumnButtonStyle = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #cfd6de;
  border-radius: 6px;
  margin-bottom: 12px;
`

export const QueueInfoColumnButton = (props: ButtonProps): ReactElement => (
  <QueueInfoColumnButtonStyle size="large" block {...props} />
)

const QueuePropertyRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; // This kinda funky, not sure how to align the tops of the row
  margin-bottom: 20px;
  color: #5f6b79;
  font-size: 20px;
`

const QueueInfo = styled.div`
  margin-bottom: 24px;
`

const QueueText = styled.div`
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
`

interface QueueInfoColumnProps {
  isStaff: boolean
  buttons: ReactNode
}

export function SettingsLeftPanel({
  buttons,
}: QueueInfoColumnProps): ReactElement {
  return (
    <InfoColumnContainer>
      <QueueInfo>
        <h2>Asynchronous question center</h2>
      </QueueInfo>
      {
        <QueuePropertyRow>
          <QueueText>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={decoratedHref}
                  key={key}
                >
                  {decoratedText}
                </a>
              )}
            ></Linkify>
          </QueueText>
        </QueuePropertyRow>
      }
      {buttons}
    </InfoColumnContainer>
  )
}
