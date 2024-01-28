import { Question } from '@koh/common'
import { Collapse } from 'antd'
import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import TAQueueListItem from './TAQueueListItem'

const OverrideCollapse = styled.div`
  & .ant-collapse-header {
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-bottom: 1px solid #cfd6de;
  }
  // Prevent the not-allowed cursor which is hella agressive
  & .ant-collapse-item-disabled > .ant-collapse-header {
    cursor: initial !important;
  }
  & .ant-collapse-content-box {
    padding: 0 !important;
  }
`

const Title = styled.div`
  font-size: 16px;
  color: #212934;
  margin-left: 40px;
`
/**
 * A single section of the list. ie. WaitingInLine
 */
export default function TAQueueListSection({
  title,
  questions,
  onClickQuestion,
  selectedQuestionId,
  showNumbers = false,
  collapsible = false,
  emptyDisplay = null,
}: {
  title: ReactNode
  questions: Question[]
  onClickQuestion: (questionId: number) => void
  selectedQuestionId?: number
  showNumbers?: boolean
  collapsible?: boolean
  emptyDisplay?: ReactElement
}): ReactElement {
  if (questions.length === 0 && !emptyDisplay) {
    return null
  }
  return (
    <OverrideCollapse>
      <Collapse defaultActiveKey={[1]} ghost expandIconPosition="right">
        <Collapse.Panel
          style={{ padding: 0 }}
          key={1}
          header={
            <Title>
              {title}
              <span>{` (${questions.length})`}</span>
            </Title>
          }
          showArrow={collapsible}
        >
          {questions.length === 0 ? (
            emptyDisplay
          ) : (
            <div>
              {questions.map((q, i) => (
                <TAQueueListItem
                  key={q.id}
                  question={q}
                  index={showNumbers && i + 1}
                  selected={selectedQuestionId === q.id}
                  onClick={() => onClickQuestion(q.id)}
                />
              ))}
            </div>
          )}
        </Collapse.Panel>
      </Collapse>
    </OverrideCollapse>
  )
}
