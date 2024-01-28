import { QuestionStatus, QuestionStatusKeys } from '@koh/common'
import { Card, Tag } from 'antd'
import styled from 'styled-components'

export const HorizontalTACard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  color: #595959;

  &:hover {
    cursor: pointer;
  }
`

export const Rank = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: #595959;
`

export const StatusTag = styled(Tag)`
  width: 96px;
  text-align: center;
  float: right;
  margin-right: 0;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 4px;
`

export function questionStatusToColor(status: QuestionStatus): string {
  switch (status) {
    case QuestionStatusKeys.Helping:
      return 'gold'
    case QuestionStatusKeys.CantFind:
    case QuestionStatusKeys.TADeleted:
      return 'red'
    case QuestionStatusKeys.Drafting:
      return 'blue'
    case QuestionStatusKeys.PriorityQueued:
      return 'green'
    default:
      return 'purple'
  }
}

export function questionStatusToText(status: QuestionStatus): string {
  switch (status) {
    case QuestionStatusKeys.CantFind:
      return "Can't Find"
    case QuestionStatusKeys.PriorityQueued:
      return 'Priority'
    default:
      return status
  }
}
