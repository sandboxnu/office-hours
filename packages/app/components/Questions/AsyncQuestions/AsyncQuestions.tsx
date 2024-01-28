import { AsyncQuestionResponse, Role } from '@koh/common'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { useRoleInCourse } from '../../../hooks/useRoleInCourse'
import { SettingsLeftPanel } from './SettingsLeftPanel'
import { API } from '@koh/api-client'
import { message } from 'antd'
import { useAsnycQuestions } from '../../../hooks/useAsyncQuestions'
import { Question } from '@koh/common'
import StudentAsyncCard from './StudentAsyncCard'
import { VerticalDivider, EditQueueButton } from '../Shared/SharedComponents'
import { AsyncQuestionForm } from './AsyncQuestionForm'
import PropTypes from 'prop-types'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: 650px) {
    flex-direction: row;
  }
`
const QueueListContainer = styled.div`
  flex-grow: 1;
  @media (min-width: 650px) {
    margin-top: 32px;
  }
`
const NoQuestionsText = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
`

AsyncQuestionsPage.propTypes = {
  questions: PropTypes.instanceOf(AsyncQuestionResponse),
}

export default function AsyncQuestionsPage({
  courseId,
}: {
  courseId: number
}): ReactElement {
  const role = useRoleInCourse(courseId)
  const [studentQuestionModal, setStudentQuestionModal] = useState(false)
  const { questions } = useAsnycQuestions(courseId)
  // const allQuestionsList: AsyncQuestion[] = questions
  // ? [
  //     ...questions.helpedQuestions,
  //     ...questions.otherQuestions,
  //     ...questions.waitingQuestions,
  //   ]
  // : []

  const changeDisplayTypes = async () => {
    await API.course.editCourseInfo(Number(courseId), {
      courseId: Number(courseId),
      asyncQuestionDisplayTypes: ['all'],
    })
    message.success('Display types updated')
  }

  const isStaff = role === Role.TA || role === Role.PROFESSOR

  function RenderQueueInfoCol(): ReactElement {
    return (
      <>
        {role === Role.STUDENT ? (
          <SettingsLeftPanel
            isStaff={false}
            buttons={
              <>
                <EditQueueButton onClick={() => setStudentQuestionModal(true)}>
                  Post your Question
                </EditQueueButton>
                <div style={{ marginBottom: '12px' }}></div>
              </>
            }
          />
        ) : (
          <SettingsLeftPanel
            isStaff={true}
            buttons={
              <>
                {/* <EditQueueButton
              onClick={() => setTAeditDetails(true)}
            >
              Edit displayed question types
            </EditQueueButton> */}
                <EditQueueButton onClick={() => changeDisplayTypes()}>
                  Show all questions
                </EditQueueButton>

                <div style={{ marginBottom: '12px' }}></div>
              </>
            }
          />
        )}
      </>
    )
  }

  function RenderQuestionList({ questions }): ReactElement {
    return (
      <>
        {questions ? (
          <>
            {questions.waitingQuestions.map((question: Question) => {
              return (
                <StudentAsyncCard
                  key={question.id}
                  question={question}
                  cid={courseId}
                  qid={undefined}
                  isStaff={isStaff}
                />
              )
            })}
          </>
        ) : (
          <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
        )}
      </>
    )
  }

  return (
    // <>
    //   <Container>

    //     <AsyncQuestionForm
    //       question={undefined}
    //       visible={studentQuestionModal}
    //       onClose={() => setStudentQuestionModal(false)}
    //     />
    //     <EditAsyncQuestionModal
    //       visible={TAeditDetails}
    //       onClose={() => setTAeditDetails(false)}
    //     />
    //     <MiddleSpacer />
    //     <QuestionListDetail courseId={courseId} />
    //   </Container>
    // </>
    <>
      <Container>
        <RenderQueueInfoCol />
        <VerticalDivider />
        <QueueListContainer>
          <RenderQuestionList questions={questions} />
        </QueueListContainer>
      </Container>
      {isStaff ? (
        <>
          {/* <EditAsyncQuestionModal
            visible={false}
            onClose={}
          /> 
         */}
        </>
      ) : (
        <>
          <AsyncQuestionForm
            question={undefined}
            visible={studentQuestionModal}
            onClose={() => setStudentQuestionModal(false)}
          />
        </>
      )}
    </>
  )
}
