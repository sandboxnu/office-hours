import { Card, Row, Avatar, Button, ButtonProps } from 'antd'
import { ReactElement } from 'react'
import styled from 'styled-components'

export const HorizontalStudentCard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  padding-left: 8px;
  padding-right: 8px;
  color: #595959;
  .ant-card-body {
    padding: 10px 8px;
  }
`
export const Text = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`

export const CenterRow = styled(Row)`
  align-items: center;
`

export const Photo = styled(Avatar)`
  margin-right: 16px;

  @media (max-width: 992px) {
    display: none;
  }
`

export const VerticalDivider = styled.div`
  @media (min-width: 650px) {
    border-right: 1px solid #cfd6de;
    margin: 0 16px;
  }
  @media (min-width: 1000px) {
    margin: 0 32px;
  }
`
export const QueueInfoColumnButtonStyle = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #cfd6de;
  border-radius: 6px;
  margin-bottom: 12px;
`
export const QueueInfoColumnButton = (props: ButtonProps): ReactElement => (
  <QueueInfoColumnButtonStyle size="large" block {...props} />
)

export const EditQueueButton = styled(QueueInfoColumnButton)`
  color: #212934;
`
