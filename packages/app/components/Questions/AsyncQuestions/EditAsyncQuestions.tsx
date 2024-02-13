import Modal from 'antd/lib/modal/Modal'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Input, Form, Button, message, Checkbox } from 'antd'
import { BgColorsOutlined } from '@ant-design/icons'
import { QuestionTypeParams } from '@koh/common'
import { QuestionType } from '../Shared/QuestionType'
import { SketchPicker } from 'react-color'
import { useCourse } from '../../../hooks/useCourse'
import { API } from '@koh/api-client'

interface EditAsyncQuestionsModalProps {
  courseId: number
  visible: boolean
  onClose: () => void
}

export function EditAsyncQuestionsModal({
  courseId,
  visible,
  onClose,
}: EditAsyncQuestionsModalProps): ReactElement {
  const [form] = Form.useForm()
  const course = useCourse(Number(courseId))

  const [questionsTypeState, setQuestionsTypeState] = useState<
    QuestionTypeParams[]
  >([])
  const [questionTypeAddState, setQuestionTypeAddState] = useState()
  const [color, setColor] = useState(
    '#' + Math.floor(Math.random() * 16777215).toString(16),
  )
  const [pickerVisible, setPickerVisible] = useState(false)
  const [isInputEmpty, setIsInputEmpty] = useState(true)

  const getQuestions = async () => {
    const temp = await API.questions.questionTypes(courseId)
    setQuestionsTypeState(temp)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  const onAddChange = (e) => {
    const inputValue = e.target.value.trim()
    if (inputValue !== '') {
      setIsInputEmpty(false)
      setQuestionTypeAddState(inputValue)
    } else {
      setIsInputEmpty(true)
    }
  }

  const handleColorChange = (color) => {
    setColor(color.hex)
  }

  const onclick = useCallback(
    async (s: string) => {
      await API.questions.deleteQuestionType(courseId, s)
      const temp = await API.questions.questionTypes(courseId)
      await setQuestionsTypeState(temp)
    },
    [courseId],
  )

  const addQuestionType = useCallback(async () => {
    if (isInputEmpty) {
      message.error('Please enter a question type name')
      return
    }
    try {
      await API.questions.addQuestionType(courseId, {
        name: questionTypeAddState,
        color: color,
      })
    } catch (e) {
      message.error('Question type already exists')
    }
    setQuestionsTypeState(await API.questions.questionTypes(courseId))
    setQuestionTypeAddState(null)
  }, [course, questionTypeAddState, color])

  const editAsyncQueue = async (updateQueue: any) => {
    message.success('Queue updated successfully')
  }

  return (
    <Modal
      title="Edit Queue"
      open={visible}
      onCancel={onClose}
      onOk={async () => {
        const value = await form.validateFields()
        await editAsyncQueue(value)
        onClose()
      }}
    >
      <Form form={form} initialValues={{ courseId: courseId }}>
        <Form.Item name="courseId" hidden>
          <Input />
        </Form.Item>
        <h4>Current Question Types: (click to delete)</h4>
        {questionsTypeState.length > 0 ? (
          questionsTypeState.map((questionType, index) => (
            <QuestionType
              key={index}
              typeName={questionType.name}
              typeColor={questionType.color}
              onClick={() => onclick(questionType.name)}
            />
          ))
        ) : (
          <p>No Questions types</p>
        )}
        <Form.Item name="add">
          <Input
            allowClear={true}
            placeholder="Enter New Question type name"
            onChange={onAddChange}
            maxLength={15}
            style={{ marginBottom: '10px' }}
          />
          <Button onClick={() => setPickerVisible(!pickerVisible)}>
            <BgColorsOutlined />
          </Button>

          {pickerVisible && (
            <SketchPicker color={color} onChangeComplete={handleColorChange} />
          )}

          <Button
            onClick={() => {
              setPickerVisible(false)
              const randomColor =
                '#' + Math.floor(Math.random() * 16777215).toString(16)
              handleColorChange({ hex: randomColor })
              addQuestionType()
            }}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
