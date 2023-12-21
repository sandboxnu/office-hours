import { ArrowLeftOutlined } from '@ant-design/icons'
import { useWindowWidth } from '@react-hook/window-size'
import { Skeleton, Spin } from 'antd'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { useProfile } from '../../hooks/useProfile'
import TAquestionListSection from './TA/TAquestionListSection'
import { useRoleInCourse } from '../../hooks/useRoleInCourse'
import { Role, AsyncQuestion } from '@koh/common'
import { QuestionDetail } from './QuestionDetail'
import { useAsnycQuestions } from '../../hooks/useAsyncQuestions'
import StudentListSection from './Student/StudentListSection'

// The min screen width at which the list and detail become side-by-side
const SPLIT_DETAIL_BKPT = 900

const Container = styled.div`
  flex: 1;

  background: white;
  border: 1px solid #cfd6de;
  margin-bottom: 30px;

  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    border: none;
    border-left: 1px solid #cfd6de;
    margin-bottom: 0px;
    display: flex;
    flex-direction: row;
    min-height: calc(
      100vh - 46px - 67px
    ); // - (height of footer) - (height of navbar)
  }
`

const List = styled.div`
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    width: 320px;
    overflow-y: scroll;
  }
`

const Detail = styled.div`
  border-left: 1px solid #cfd6de;
  border-right: 1px solid #cfd6de;
  flex: 1;
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    overflow-y: scroll;
  }
`

const BackToQueue = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: #1890ff;
  cursor: pointer;
`

/**
 * this is shared, they all have the same group of students. Middle part student has an extra section for their own questions.
 */
export default function QuestionListDetail({
  courseId,
}: {
  courseId: number
}): ReactElement {
  const role = useRoleInCourse(courseId)
  const profile = useProfile()
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(null)
  const isSideBySide = useWindowWidth() >= SPLIT_DETAIL_BKPT
  const { questions } = useAsnycQuestions(courseId)
  const allQuestionsList: AsyncQuestion[] = questions
    ? [
        ...questions.helpedQuestions,
        ...questions.otherQuestions,
        ...questions.waitingQuestions,
      ]
    : []
  const onSelectQuestion = (qId: number) => {
    setSelectedQuestionId(qId)
  }
  const selectedQuestion = allQuestionsList.find(
    (q) => q.id === selectedQuestionId,
  )
  if (
    !selectedQuestionId &&
    allQuestionsList.length &&
    questions.visibleQuestions.length > 0
  ) {
    onSelectQuestion(questions.visibleQuestions[0].id)
  }
  if (!profile) {
    return <Spin tip="Loading..." size="large" />
  }
  if (!questions) {
    return <Skeleton />
  }

  if (allQuestionsList.length === 0) {
    return (
      <EmptyQueueInfo>
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
      </EmptyQueueInfo>
    )
  }
  //check whether there are questions for students.
  const studentQuestions = allQuestionsList.filter(
    (q) => q.creatorId === profile.id,
  )
  if (
    Role.STUDENT === role &&
    questions.visibleQuestions.length < 1 &&
    studentQuestions.length < 1
  ) {
    return (
      <EmptyQueueInfo>
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
      </EmptyQueueInfo>
    )
  }
  const list = (
    <List>
      {Role.STUDENT === role ? (
        <>
          <div data-cy="your-questions">
            <StudentListSection
              title="Your Questions"
              questions={studentQuestions}
              onClickQuestion={onSelectQuestion}
              selectedQuestionId={selectedQuestionId}
              collapsible
              showNumbers
            />
          </div>
          <div data-cy="visible questions">
            <StudentListSection
              title="Questions visible to all"
              questions={questions.visibleQuestions}
              onClickQuestion={onSelectQuestion}
              selectedQuestionId={selectedQuestionId}
              collapsible
              showNumbers
            />
          </div>
        </>
      ) : (
        <>
          <div data-cy="list-helping">
            <TAquestionListSection
              title="Waiting In Line"
              questions={questions.waitingQuestions}
              onClickQuestion={onSelectQuestion}
              selectedQuestionId={selectedQuestionId}
              collapsible
              showNumbers
            />
          </div>
          <div data-cy="list-resolved">
            <TAquestionListSection
              title="Resolved Questions"
              questions={questions.helpedQuestions}
              onClickQuestion={onSelectQuestion}
              selectedQuestionId={selectedQuestionId}
              collapsible
              showNumbers
            />
          </div>
          <div data-cy="visible questions">
            <TAquestionListSection
              title="Questions visible to all"
              questions={questions.visibleQuestions}
              onClickQuestion={onSelectQuestion}
              selectedQuestionId={selectedQuestionId}
              collapsible
              showNumbers
            />
          </div>
          {/* <div data-cy="list-deleted">
            <TAquestionListSection
              title="Deleted Questions"
              questions={questions.otherQuestions}
              onClickQuestion={onSelectQuestion}
              selectedQuestionId={selectedQuestionId}
              collapsible
              showNumbers
            />
          </div> */}
        </>
      )}
    </List>
  )

  //student side: can edit own question (check creator of question), can only see visible questions. TA can see and edit any question.
  let detail
  if (selectedQuestion) {
    detail = (
      <Detail>
        <QuestionDetail
          userId={profile.id}
          isStudent={Role.STUDENT === role}
          question={selectedQuestion}
        ></QuestionDetail>
      </Detail>
    )
  } else {
    detail = <h1>No Questions in the section</h1>
  }
  if (isSideBySide) {
    return (
      <Container>
        {list}
        {detail}
      </Container>
    )
  } else if (selectedQuestionId) {
    return (
      <Container>
        <BackToQueue onClick={() => onSelectQuestion(null)}>
          <span>
            <ArrowLeftOutlined />
            {' Back To Queue'}
          </span>
        </BackToQueue>
        {detail}
      </Container>
    )
  } else {
    return <Container>{list}</Container>
  }
}

const EmptyQueueInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`

const NoQuestionsText = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
`
