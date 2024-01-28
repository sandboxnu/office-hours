import { HourglassOutlined } from '@ant-design/icons'
import { Badge, Checkbox } from 'antd'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { getAsyncWaitTime } from '../../../utils/TimeUtil'
import { KOHAvatar } from '../../common/SelfAvatar'
import { AsyncQuestion, asyncQuestionStatus } from '@koh/common'
// import { truncate } from "../Queue/QueueUtils";

export const Container = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;

  padding-top: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #cfd6de;
  background: ${({ selected }) => (selected ? '#EFF8FF' : 'white')};

  cursor: pointer;
  &:hover {
    background: ${({ selected }) => (selected ? '#EFF8FF' : '#ECF0F3')};
  }
`
const StyledCheckbox = styled(Checkbox)`
  margin-left: 8px;
`
const BodyContainer = styled.div`
  display: flex;
  align-items: flex-start;
`
const AvatarContainer = styled.div`
  margin: 10px 12px 0 25px;
  display: block;
`
const QuestionInfoContainer = styled.div``

const QuestionText = styled.div`
  padding-right: 8px;
  color: #595959;
`

export default function StudentListItem({
  index,
  selected,
  question,
  onClick,
  showCheckbox,
}: {
  index: number | false
  selected: boolean
  question: AsyncQuestion
  onClick: () => void
  showCheckbox?: boolean
}): ReactElement {
  // const isDrafting = question.status === OpenQuestionStatus.Drafting;

  const metaInfo: [ReactElement, string][] = [
    [<HourglassOutlined key="h" />, getAsyncWaitTime(question)],
  ]
  // if (!isDrafting) {
  //   metaInfo.push([<QuestionOutlined key="q" />, question.questionType]);
  // }
  return (
    <Container selected={selected} onClick={onClick}>
      {showCheckbox && <StyledCheckbox checked={selected} />}
      <BodyContainer>
        <AvatarContainer>
          <Badge
            // 0 is not displayed, hide if no index
            count={index ? `#${index}` : 0}
            style={{ backgroundColor: '#3684c6' }}
            offset={[-40, 0]}
          >
            <KOHAvatar
              size={40}
              name={'Q'}
              photoURL={question.creator.photoURL}
            />
          </Badge>
        </AvatarContainer>
        <QuestionInfoContainer>
          <QuestionText> {question.questionAbstract}</QuestionText>
          {question.status === asyncQuestionStatus.TADeleted ||
          question.status === asyncQuestionStatus.StudentDeleted ? (
            <div style={{ color: 'red' }}>Deleted</div>
          ) : question.status !== asyncQuestionStatus.Resolved ? (
            <QuestionMetaRow info={metaInfo} />
          ) : (
            <div style={{ color: 'green' }}>Answered</div>
          )}
        </QuestionInfoContainer>
      </BodyContainer>
    </Container>
  )
}

/**
 * Row of the meta info. Icon and text pairs separated by dividers.
 */
const RowContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  color: #8895a6;
`
const Divider = styled.div`
  margin-left: 12px;
  margin-right: 8px;
`
const Spacer = styled.div`
  margin-left: 5px;
`
function QuestionMetaRow({
  info,
}: {
  info: [ReactElement, string][]
}): ReactElement {
  return (
    <RowContainer>
      {info
        .map(([icon, text], i) => [
          i > 0 && <Divider key={text}>|</Divider>,
          icon,
          <Spacer key={text + 'space'} />,
          text,
        ])
        .flat()
        .filter((e) => !!e)}
    </RowContainer>
  )
}
