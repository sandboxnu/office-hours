import { ReactElement, useEffect, useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Input, Form, message, Radio } from 'antd'
import styled from 'styled-components'
import { API } from '@koh/api-client'

import { default as React } from 'react'
import { useRouter } from 'next/router'
import { AsyncQuestion } from '@koh/common'

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

export function AsyncQuestionForm({
  question,
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  const router = useRouter()
  const cid = router.query['cid']
  const [form] = Form.useForm()
  // image stuff
  const [selectedImage, setSelectedImage] = useState(null)

  const [preview, setPreview] = useState<string>()
  const [questionTypeInput, setQuestionTypeInput] = useState<string>(
    question?.questionType || 'general question',
  )
  const [questionTypes, setQuestionTypes] = useState(null)
  const onCategoryChange = (e) => {
    setQuestionTypeInput(e.target.value)
  }
  // const courseId=Number(cid);
  useEffect(() => {
    getQuestions()
  }, [])
  const getQuestions = async () => {
    await API.questions.questionTypes(Number(cid)).then((result) => {
      setQuestionTypes(result)
    })
  }
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
  const createQuestion = async (value) => {
    await API.asyncQuestions
      .create(
        {
          questionType: questionTypeInput,
          questionText: value.questionText,
          questionAbstract: value.QuestionAbstract,
        },
        Number(cid),
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
    await API.asyncQuestions
      .update(question.id, {
        questionType: questionTypeInput,
        questionText: value.questionText,
        questionAbstract: value.QuestionAbstract,
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
    if (!question) {
      createQuestion(value)
    } else {
      updateQuestion(value)
    }
  }
  return (
    <Modal
      title="Question Form"
      visible={visible}
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
          <QuestionCaption>
            Your question will not be visible to other students unless
            professors manually changes it
          </QuestionCaption>

          <QuestionText>
            What category does your question fall under?
          </QuestionText>
          <Radio.Group
            value={questionTypeInput}
            onChange={onCategoryChange}
            buttonStyle="solid"
            style={{ marginBottom: 48 }}
          >
            {questionTypes !== null ? (
              questionTypes.map((q) => (
                <Radio.Button key={q} value={q}>
                  {' '}
                  {q}
                </Radio.Button>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Radio.Group>
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
        </Form>
      </Container>
    </Modal>
  )
}
