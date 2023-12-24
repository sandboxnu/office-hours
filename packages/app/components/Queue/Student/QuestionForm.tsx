import { OpenQuestionStatus, Question } from '@koh/common'
import { Alert, Button, Input, Modal, Radio } from 'antd'
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
//import { createReadStream } from "fs";

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
    questionType: string,
    groupable: boolean,
    router: NextRouter,
    courseId: number,
    location: string,
  ) => void
  position: number
  cancel: () => void
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
  const [questionsTypeState, setQuestionsTypeState] = useState<string[]>([])
  const [questionTypeInput, setQuestionTypeInput] = useState<string>(
    question?.questionType || null,
  )
  const [questionText, setQuestionText] = useState<string>(question?.text || '')
  const [questionGroupable, setQuestionGroupable] = useState<boolean>(
    question?.groupable !== undefined && question?.groupable,
  )

  const [inperson, setInperson] = useState<boolean>(false)
  useEffect(() => {
    if (question && !visible) {
      setQuestionText(question.text)
      setQuestionTypeInput(question.questionType)
    }
  }, [question, visible])
  useEffect(() => {
    getQuestions()
  }, [])

  // on question type change, update the question type state
  const onCategoryChange = (e: RadioChangeEvent) => {
    setQuestionTypeInput(e.target.value)

    const questionFromStorage = storageQuestion ?? {}

    setStoredQuestion({
      id: question?.id,
      ...questionFromStorage,
      questionType: e.target.value,
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

  // on question groupable change, update the question groupable state
  const onGroupableChange = (e: RadioChangeEvent) => {
    setQuestionGroupable(e.target.value)
    const questionFromStorage = storageQuestion ?? {}

    setStoredQuestion({
      id: question?.id,
      ...questionFromStorage,
      groupable: e.target.value,
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
        questionGroupable,
        router,
        Number(courseId),
        inperson ? 'In Person' : 'Online',
      )
    }
  }

  useHotkeys('enter', () => onClickSubmit(), { enableOnTags: ['TEXTAREA'] }, [
    questionTypeInput,
    questionText,
    questionGroupable,
    router,
    courseId,
  ])
  // all possible questions, use courseId
  const courseNumber = Number(courseId)
  const getQuestions = useCallback(async () => {
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber))
  }, [])

  return (
    <Modal
      visible={visible}
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

        <QuestionText>
          What category does your question fall under?
        </QuestionText>
        <Radio.Group
          value={questionTypeInput}
          onChange={onCategoryChange}
          buttonStyle="solid"
          style={{ marginBottom: 48 }}
        >
          {questionsTypeState.length > 0 ? (
            questionsTypeState.map((q) => (
              <Radio.Button key={q} value={q}>
                {' '}
                {q}
              </Radio.Button>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Radio.Group>

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
