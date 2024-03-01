import { ReactElement } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Input, Form, Button, message, Popconfirm, Switch } from 'antd'
import styled from 'styled-components'
import { API } from '@koh/api-client'
import { useQueue } from '../../../hooks/useQueue'
import { QuestionTypeParams, UpdateQueueParams } from '@koh/common'
import { pick } from 'lodash'
import { default as React, useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useCourse } from '../../../hooks/useCourse'
import { QuestionType } from '../../Questions/Shared/QuestionType'
import {
  DisableQueueButton,
  ClearQueueButton,
  clearQueue,
  confirmDisable,
} from '../../Questions/Queue/QueueInfoColumn'
import { SketchPicker } from 'react-color'
import { BgColorsOutlined } from '@ant-design/icons'

const NotesInput = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #b8c4ce;
`

const CustomFormItem = styled(Form.Item)`
  padding-bottom: 1.75rem;
  margin-bottom: 1.75rem;

  @media (max-width: 650px) {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    &:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }

  @media (min-width: 650px) {
    // the last child on desktop is actually the second last child (since the last child is the delete and clear queue buttons)
    &:nth-last-child(2) {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
`

interface EditQueueModalProps {
  queueId: number
  visible: boolean
  onClose: () => void
}

export function EditQueueModal({
  queueId,
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  const { queue, mutateQueue } = useQueue(queueId)
  const [form] = Form.useForm()
  const [questionsTypeState, setQuestionsTypeState] = useState<
    QuestionTypeParams[]
  >([])
  const [questionTypeAddState, setQuestionTypeAddState] = useState()
  const router = useRouter()
  const courseId = router.query['cid']
  const course = useCourse(Number(courseId))
  const [currentZoomLink, setCurrentZoomLink] = useState(
    course.course?.zoomLink,
  )
  const [color, setColor] = useState(
    '#' + Math.floor(Math.random() * 16777215).toString(16),
  )
  const [pickerVisible, setPickerVisible] = useState(false)
  const [isInputEmpty, setIsInputEmpty] = useState(true)

  const handleColorChange = (color) => {
    setColor(color.hex)
  }
  const [zoomLink, setZoomLink] = useState('')
  useEffect(() => {
    getQuestions()
  }, [])

  const editQueue = async (updateQueue: UpdateQueueParams) => {
    const newQueue = { ...queue, ...updateQueue }
    mutateQueue(newQueue, false)
    await API.queues.update(
      newQueue.id,
      pick(newQueue, ['notes', 'allowQuestions']),
    )
    mutateQueue()
  }

  const courseNumber = Number(courseId)
  const getQuestions = async () => {
    const temp = await API.questions.questionTypes(courseNumber)
    setQuestionsTypeState(temp)
  }

  const onclick = useCallback(
    async (s: string) => {
      await API.questions.deleteQuestionType(courseNumber, s)
      const temp = await API.questions.questionTypes(courseNumber)
      await setQuestionsTypeState(temp)
    },
    [courseNumber],
  )

  const onAddChange = (e) => {
    const inputValue = e.target.value.trim()
    if (inputValue !== '') {
      setIsInputEmpty(false)
      setQuestionTypeAddState(inputValue)
    } else {
      setIsInputEmpty(true)
    }
  }

  const onZoomLinkChange = (e) => {
    setZoomLink(e.target.value)
  }

  const addQuestionType = useCallback(async () => {
    if (isInputEmpty) {
      message.error('Please enter a question type name')
      return
    }
    try {
      await API.questions.addQuestionType(courseNumber, {
        name: questionTypeAddState,
        color: color,
      })
    } catch (e) {
      message.error('Question type already exists')
    }
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber))
    setQuestionTypeAddState(null)
  }, [courseNumber, questionTypeAddState, color, isInputEmpty])

  const changeZoomLink = async () => {
    await API.course
      .editCourseInfo(Number(courseId), {
        courseId: Number(courseId),
        zoomLink: zoomLink,
      })
      .then(() => {
        message.success('Zoom link Changed')
        setCurrentZoomLink(zoomLink)
      })
  }
  return (
    <Modal
      title="Edit Queue Details"
      open={visible}
      onCancel={onClose}
      onOk={async () => {
        const value = await form.validateFields()
        await editQueue(value)
        onClose()
      }}
    >
      {queue && (
        <Form form={form} initialValues={queue}>
          <CustomFormItem
            label="Queue Notes"
            className="font-medium"
            name="notes"
          >
            <NotesInput
              className="font-normal"
              allowClear={true}
              placeholder={''}
            />
          </CustomFormItem>

          <CustomFormItem
            label="Allow New Questions"
            className="font-medium"
            name="allowQuestions"
            valuePropName="checked"
          >
            <Switch />
          </CustomFormItem>
          <h4 className="font-medium">
            Current Question Types: (click to delete)
          </h4>
          <div className="my-1">
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
          </div>
          <CustomFormItem name="add">
            <div className="flex justify-between">
              <Button onClick={() => setPickerVisible(!pickerVisible)}>
                <BgColorsOutlined />
              </Button>

              <Input
                allowClear={true}
                placeholder="Enter New Question type name"
                onChange={onAddChange}
                maxLength={15}
                className="mx-2 mb-2"
              />

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
            </div>

            {pickerVisible && (
              <SketchPicker
                className=""
                color={color}
                onChangeComplete={handleColorChange}
              />
            )}
          </CustomFormItem>
          <h4 className="mt-2 font-medium">Current Zoom link:</h4>
          {currentZoomLink ? (
            <a className="block text-sky-800" href={currentZoomLink}>
              {currentZoomLink}
            </a>
          ) : (
            <p> Zoomlink not Available</p>
          )}
          <CustomFormItem>
            <Input
              className="my-1"
              allowClear={true}
              onChange={onZoomLinkChange}
            />
            <Button className="my-1" onClick={changeZoomLink}>
              Change Link
            </Button>
          </CustomFormItem>
          {/* Delete Queue and Clear Queue buttons for mobile only (normally shown on QueueListShareComponents.tsx) */}
          <CustomFormItem className="block sm:hidden">
            <div className="flex flex-row space-x-4">
              <DisableQueueButton
                onClick={() => confirmDisable(queueId, queue)}
                data-cy="queue-disable-button"
                disabled={queue?.isDisabled}
                className="!w-fit"
              >
                {queue?.isDisabled ? `Queue deleted` : `Delete Queue`}
              </DisableQueueButton>
              <Popconfirm
                title={
                  'Are you sure you want to clear all students from the queue?'
                }
                okText="Yes"
                cancelText="No"
                placement="top"
                arrowPointAtCenter={true}
                onConfirm={() => clearQueue(queueId, queue)}
              >
                <ClearQueueButton className="!w-fit">
                  Clear Queue
                </ClearQueueButton>
              </Popconfirm>
            </div>
          </CustomFormItem>
        </Form>
      )}
    </Modal>
  )
}
