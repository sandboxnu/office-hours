import {
  AsyncQuestion,
  AsyncQuestionResponse,
  QuestionTypeParams,
  Role,
} from '@koh/common'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRoleInCourse } from '../../../hooks/useRoleInCourse'
import { SettingsLeftPanel } from './SettingsLeftPanel'
import { Select } from 'antd'
import { useAsnycQuestions } from '../../../hooks/useAsyncQuestions'
import StudentAsyncCard from './StudentAsyncCard'
import { VerticalDivider, EditQueueButton } from '../Shared/SharedComponents'
import { AsyncQuestionForm } from './AsyncQuestionForm'
import PropTypes from 'prop-types'
import { EditAsyncQuestionsModal } from './EditAsyncQuestions'
import { QuestionType } from '../Shared/QuestionType'

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
  onClose: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
}

export default function AsyncQuestionsPage({
  courseId,
}: {
  courseId: number
}): ReactElement {
  const role = useRoleInCourse(courseId)
  const [studentQuestionModal, setStudentQuestionModal] = useState(false)
  const [editAsyncQuestionsModal, setEditAsyncQuestionsModal] = useState(false)
  const [filter, setFilter] = useState('all')

  const [questionTypeInput, setQuestionTypeInput] = useState([])

  const [questionsTypeState, setQuestionsTypeState] = useState<
    QuestionTypeParams[]
  >([])

  const [displayedQuestions, setDisplayedQuestions] = useState<AsyncQuestion[]>(
    [],
  )

  const onTypeChange = (selectedTypes) => {
    setQuestionTypeInput(selectedTypes)
  }

  const { questions } = useAsnycQuestions(courseId)

  useEffect(() => {
    const allQuestionsList: AsyncQuestion[] = questions
      ? [...questions.helpedQuestions, ...questions.waitingQuestions]
      : []

    let displayedQuestions = []

    if (filter === 'helped') {
      displayedQuestions = questions.helpedQuestions
    } else if (filter === 'unhelped') {
      displayedQuestions = questions.waitingQuestions
    } else {
      displayedQuestions = allQuestionsList
    }

    if (questionTypeInput.length > 0) {
      displayedQuestions = displayedQuestions.filter((question) => {
        const questionTypes = question.questionTypes.map((type) => type.id)
        return questionTypeInput.every((type) => questionTypes.includes(type))
      })
    }
    setDisplayedQuestions(displayedQuestions)
    const shownQuestionTypes = displayedQuestions
      .map((question) => question.questionTypes)
      .flat()
    setQuestionsTypeState(shownQuestionTypes)
  }, [filter, questions, questionTypeInput])

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
                <EditQueueButton
                  onClick={() => setEditAsyncQuestionsModal(true)}
                >
                  Edit Queue
                </EditQueueButton>
                <div style={{ marginBottom: '12px' }}></div>
              </>
            }
          />
        )}
      </>
    )
  }

  const RenderQuestionList = ({ questions }) => {
    if (!questions) {
      return (
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
      )
    }

    return (
      <>
        {questions.map((question) => (
          <StudentAsyncCard
            key={question.id}
            question={question}
            cid={courseId}
            qid={undefined}
            isStaff={isStaff}
            onQuestionTypeClick={(questionType) => {
              setQuestionTypeInput((prevInput) => {
                const index = prevInput.indexOf(questionType)
                if (index > -1) {
                  // questionType is in the array, remove it
                  return prevInput.filter((qt) => qt !== questionType)
                } else {
                  // questionType is not in the array, add it
                  return [...prevInput, questionType]
                }
              })
            }}
          />
        ))}
      </>
    )
  }

  const RenderQuestionTypeFilter = () => {
    return (
      <Select
        mode="multiple"
        placeholder="Select question types"
        onChange={onTypeChange}
        style={{ width: '100%' }}
        value={questionTypeInput}
        tagRender={(props) => {
          const type = questionsTypeState.find(
            (type) => type.id === props.value,
          )
          return (
            <QuestionType
              typeName={type ? type.name : ''}
              typeColor={type ? type.color : ''}
              onClick={props.onClose}
            />
          )
        }}
      >
        {questionsTypeState.map((type) => (
          <Select.Option value={type.id} key={type.id}>
            {type.name}
          </Select.Option>
        ))}
      </Select>
    )
  }

  return (
    <>
      <Container>
        <RenderQueueInfoCol />
        <VerticalDivider />
        <QueueListContainer>
          <div className="mb-4">
            <Select
              id="filter-select"
              value={filter}
              onChange={(value) => setFilter(value)}
              className="select-filter"
            >
              <Select.Option value="all">All Questions</Select.Option>
              <Select.Option value="helped">Answered</Select.Option>
              <Select.Option value="unhelped">Unanswered</Select.Option>
            </Select>
            <RenderQuestionTypeFilter />
          </div>
          <RenderQuestionList questions={displayedQuestions} />
        </QueueListContainer>
      </Container>
      {isStaff ? (
        <EditAsyncQuestionsModal
          visible={editAsyncQuestionsModal}
          onClose={() => setEditAsyncQuestionsModal(false)}
          courseId={courseId}
        />
      ) : (
        <AsyncQuestionForm
          question={undefined}
          visible={studentQuestionModal}
          onClose={() => setStudentQuestionModal(false)}
        />
      )}
    </>
  )
}
