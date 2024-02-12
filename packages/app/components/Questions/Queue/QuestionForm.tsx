import { QuestionTypeParams, OpenQuestionStatus, Question } from '@koh/common'
import { Alert, Button, Input, Modal, Radio, Select } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { NextRouter, useRouter } from 'next/router'
import {
  default as React,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { toOrdinal } from '../../../utils/ordinal'
import { useHotkeys } from 'react-hotkeys-hook'
import { API } from '@koh/api-client'
import { QuestionType } from '../Shared/QuestionType'
import PropTypes from 'prop-types'

const Container = styled.div`
  max-width: 960px;
`

const QuestionText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
`

const QuestionCaption = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;
  color: #8c8c8c;
  margin-bottom: 32px;
`

const FormButton = styled(Button)`
  margin-left: 8px;
`

const SaveChangesButton = styled(Button)`
  margin-left: 8px;
  background: #3684c6;
`

interface QuestionFormProps {
  visible: boolean
  question: Question
  leaveQueue: () => void
  finishQuestion: (
    text: string,
    questionType: QuestionTypeParams[],
    router: NextRouter,
    courseId: number,
    location: string,
  ) => void
  position: number
  cancel: () => void
}

QuestionForm.propTypes = {
  value: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default function QuestionForm({
  visible,
  question,
  leaveQueue,
  finishQuestion,
  position,
  cancel,
}: QuestionFormProps): ReactElement {
  const [storageQuestion, setStoredQuestion] = useLocalStorage(
    'draftQuestion',
    null,
  )
  const router = useRouter()
  const courseId = router.query['cid']

  const drafting = question?.status === OpenQuestionStatus.Drafting
  const helping = question?.status === OpenQuestionStatus.Helping
  const [questionsTypeState, setQuestionsTypeState] = useState<
    QuestionTypeParams[]
  >([])
  const [questionTypeInput, setQuestionTypeInput] = useState<
    QuestionTypeParams[]
  >(question?.questionTypes || [])
  const [questionText, setQuestionText] = useState<string>(question?.text || '')

  const [inperson, setInperson] = useState<boolean>(false)

  useEffect(() => {
    if (question && !visible) {
      setQuestionText(question.text)
      setQuestionTypeInput(question.questionTypes)
    }
  }, [question, visible])

  const onTypeChange = (selectedIds: number[]) => {
    const newQuestionTypeInput: QuestionTypeParams[] =
      questionsTypeState.filter((questionType) =>
        selectedIds.includes(questionType.id),
      )

    setQuestionTypeInput(newQuestionTypeInput)

    const questionFromStorage = storageQuestion ?? {}

    setStoredQuestion({
      id: question?.id,
      ...questionFromStorage,
      questionTypes: newQuestionTypeInput,
    })
  }

  // on question text change, update the question text state
  const onQuestionTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setQuestionText(event.target.value)

    const questionFromStorage = storageQuestion ?? {}
    setStoredQuestion({
      id: question?.id,
      ...questionFromStorage,
      text: event.target.value,
    })
  }

  const onLocationChange = (e: RadioChangeEvent) => {
    setInperson(e.target.value)
    const questionFromStorage = storageQuestion ?? {}
    setStoredQuestion({
      id: question?.id,
      ...questionFromStorage,
      location: inperson ? 'In Person' : 'Online',
    })
  }
  // on button submit click, conditionally choose to go back to the queue
  const onClickSubmit = () => {
    if (questionTypeInput) {
      finishQuestion(
        questionText,
        questionTypeInput,
        router,
        Number(courseId),
        inperson ? 'In Person' : 'Online',
      )
    }
  }

  useHotkeys('enter', () => onClickSubmit(), { enableOnTags: ['TEXTAREA'] }, [
    questionTypeInput,
    questionText,
    router,
    courseId,
  ])
  // all possible questions, use courseId
  const courseNumber = Number(courseId)
  const getQuestions = useCallback(() => {
    let isCancelled = false

    const fetchQuestions = async () => {
      const questions = await API.questions.questionTypes(courseNumber)
      if (!isCancelled) {
        setQuestionsTypeState(questions)
      }
    }

    fetchQuestions()

    return () => {
      isCancelled = true
    }
  }, [courseNumber])

  useEffect(() => {
    const cleanup = getQuestions()

    return () => {
      cleanup()
    }
  }, [getQuestions])

  return (
    <Modal
      open={visible}
      closable={true}
      onCancel={() => {
        setStoredQuestion(question)
        cancel()
      }}
      title={drafting ? 'Describe your question' : 'Edit your question'}
      footer={
        <div>
          {drafting ? (
            <FormButton danger onClick={leaveQueue}>
              Leave Queue
            </FormButton>
          ) : (
            <FormButton onClick={cancel}>Cancel</FormButton>
          )}
          <SaveChangesButton
            data-cy="finishQuestion"
            type="primary"
            disabled={!questionTypeInput}
            onClick={onClickSubmit}
          >
            {drafting ? 'Finish' : 'Save Changes'}
          </SaveChangesButton>
        </div>
      }
    >
      <Container>
        {drafting && (
          <Alert
            style={{ marginBottom: '32px' }}
            message={`You are currently ${toOrdinal(position)} in queue`}
            description="Your spot in queue has been temporarily reserved. Please describe your question to finish joining the queue."
            type="success"
            showIcon
          />
        )}
        {helping && (
          <Alert
            style={{ marginBottom: '32px' }}
            message={`A TA is coming to help you`}
            description="Please click 'Save Changes' to submit what you've filled out"
            type="info"
            showIcon
          />
        )}
        {questionsTypeState.length > 0 ? (
          <>
            <QuestionText>
              What category(s) does your question fall under?
            </QuestionText>
            <Select
              mode="multiple"
              placeholder="Select question types"
              onChange={onTypeChange}
              style={{ width: '100%' }}
              value={questionTypeInput.map((type) => type.id)}
              tagRender={(props) => {
                const type = questionsTypeState.find(
                  (type) => type.id === props.value,
                )
                return (
                  <QuestionType
                    typeName={type.name}
                    typeColor={type.color}
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
          </>
        ) : (
          <p>No Question types found</p>
        )}
        <QuestionText>What do you need help with?</QuestionText>
        <Input.TextArea
          data-cy="questionText"
          value={questionText}
          placeholder="I’m having trouble understanding list abstractions, particularly in Assignment 5."
          autoSize={{ minRows: 3, maxRows: 6 }}
          onChange={onQuestionTextChange}
        />
        <QuestionCaption>
          Be as descriptive and specific as possible in your answer. Your name
          will be hidden to other students, but your question will be visible so
          don&apos;t frame your question in a way that gives away the answer.
        </QuestionCaption>

        <QuestionText>Are you joining in person office hours?</QuestionText>
        <Radio.Group
          value={inperson}
          onChange={onLocationChange}
          style={{ marginBottom: 5 }}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
        {/* <QuestionText>
          Would you like the option of being helped in a group session?
        </QuestionText>
        <Radio.Group
          value={questionGroupable}
          onChange={onGroupableChange}
          style={{ marginBottom: 5 }}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
        <QuestionCaption>
          Clicking Yes may result in a shorter wait time if others have the same
          question as you.
        </QuestionCaption> */}
      </Container>
    </Modal>
  )
}
