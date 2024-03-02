import { ReactElement, useCallback, useEffect, useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Input, Form, message, Select, Checkbox } from 'antd'
import styled from 'styled-components'
import { API } from '@koh/api-client'

import { default as React } from 'react'
import { useRouter } from 'next/router'
import { QuestionTypeParams, AsyncQuestion } from '@koh/common'
import PropTypes from 'prop-types'
import { QuestionType } from '../Shared/QuestionType'

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

interface EditQueueModalProps {
  question: AsyncQuestion
  visible: boolean
  onClose: () => void
}

AsyncQuestionForm.propTypes = {
  value: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
}

export function AsyncQuestionForm({
  question,
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  const router = useRouter()
  const courseId = Number(router.query['cid'])
  const [form] = Form.useForm()
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState<string>()
  const [questionsTypeState, setQuestionsTypeState] = useState<
    QuestionTypeParams[]
  >([])
  const [questionTypeInput, setQuestionTypeInput] = useState<
    QuestionTypeParams[]
  >(question?.questionTypes || [])

  const [isVisible, setIsVisible] = useState(true)

  //image stuff
  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined)
      return
    }
    const objectURL = window.URL.createObjectURL(selectedImage)
    setPreview(objectURL)
    return () => window.URL.revokeObjectURL(objectURL)
  }, [selectedImage])
  //create function to update question. if question undefined create, if question, update. if question and has new image, update image too.
  const getAiAnswer = async (questionText: string) => {
    try {
      const data = {
        question: questionText,
        history: [],
      }
      const response = await fetch(`/chat/${courseId}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const json = await response.json()
      return json.answer
    } catch (e) {
      return ''
    }
  }

  const createQuestion = async (value) => {
    const aiAnswer = await getAiAnswer(
      value.QuestionAbstract + ' ' + value.questionText,
    )
    await API.asyncQuestions
      .create(
        {
          questionTypes: questionTypeInput,
          questionText: value.questionText,
          aiAnswerText: aiAnswer,
          answerText: aiAnswer,
          questionAbstract: value.QuestionAbstract,
          visible: isVisible,
        },
        courseId,
      )
      .then((response) => {
        if (selectedImage && response) {
          const data = new FormData()
          data.append('AsyncQuestionId', String(response.id))
          data.append('file', selectedImage)
          fetch('/api/v1/image', {
            method: 'POST',
            body: data,
          }).catch((err) => {
            message.warning(err + ': Image failed to upload')
          })
        }
      })
    message.success('Question Posted')
  }

  const updateQuestion = async (value) => {
    const aiAnswer = await getAiAnswer(
      value.QuestionAbstract + ' ' + value.questionText,
    )

    await API.asyncQuestions
      .update(question.id, {
        questionTypes: questionTypeInput,
        questionText: value.questionText,
        aiAnswerText: aiAnswer,
        answerText: aiAnswer,
        questionAbstract: value.QuestionAbstract,
        visible: isVisible,
      })
      .then((response) => {
        if (selectedImage && response) {
          const data = new FormData()
          data.append('ImageId', String(response.images[0].id))
          data.append('file', selectedImage)
          fetch(`/api/v1/image/${response.images[0].id}/update`, {
            method: 'PATCH',
            body: data,
          }).catch((err) => {
            message.warning(err + ': Image failed to upload')
          })
        }
      })
    message.success('Question Posted')
  }

  const onFinish = (value) => {
    console.log(value)
    if (!question) {
      createQuestion(value)
    } else {
      updateQuestion(value)
    }
  }

  const onTypeChange = (selectedIds: number[]) => {
    const newQuestionTypeInput: QuestionTypeParams[] =
      questionsTypeState.filter((questionType) =>
        selectedIds.includes(questionType.id),
      )
    setQuestionTypeInput(newQuestionTypeInput)
  }

  const getQuestions = useCallback(() => {
    let isCancelled = false

    const fetchQuestions = async () => {
      const questions = await API.questions.questionTypes(courseId)
      if (!isCancelled) {
        setQuestionsTypeState(questions)
      }
    }

    fetchQuestions()

    return () => {
      isCancelled = true
    }
  }, [courseId])

  useEffect(() => {
    const cleanup = getQuestions()

    return () => {
      cleanup()
    }
  }, [getQuestions])

  return (
    <Modal
      title="Question Form"
      open={visible}
      onCancel={onClose}
      onOk={async () => {
        const value = await form.validateFields()
        onFinish(value)
        onClose()
      }}
    >
      <Container>
        <Form
          form={form}
          initialValues={{
            QuestionAbstract: question?.questionAbstract,
            questionText: question?.questionText,
            images: question?.images[0],
          }}
        >
          <QuestionText>What do you need help with?</QuestionText>
          <Form.Item name="QuestionAbstract" rules={[{ required: true }]}>
            <Input placeholder="Question abstract" maxLength={50}></Input>
          </Form.Item>
          <Form.Item name="questionText">
            <Input.TextArea
              allowClear={true}
              placeholder="Question details(optional)"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
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
          <Form.Item name="images">
            <Input
              type="file"
              onChange={(event) => {
                setSelectedImage(event.target.files[0])
              }}
              name="questionImage"
            ></Input>
            {preview ? (
              <img
                src={preview}
                style={{ maxWidth: '100%', padding: '10px' }}
                alt="none"
              />
            ) : (
              <></>
            )}
          </Form.Item>
          <Form.Item
            name="isHidden"
            label="Only visible to me and teaching staff"
            valuePropName="checked"
          >
            <Checkbox onChange={(e) => setIsVisible(!e.target.checked)} />
          </Form.Item>
          <br></br>
          <br></br>
          <QuestionText>Your question will be anonymous.</QuestionText>
          <QuestionText>
            Other students will not see your name or profile image.
          </QuestionText>
        </Form>
      </Container>
    </Modal>
  )
}
