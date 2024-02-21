import { ReactElement, useCallback } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Form, Collapse, message, Checkbox, Input } from 'antd'
import { API } from '@koh/api-client'
import { default as React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { QuestionTypeParams, OpenQuestionStatus } from '@koh/common'
import { QuestionType } from '../Shared/QuestionType'
import Select from 'react-select'
import { Select as AntdSelect } from 'antd'
import PropTypes from 'prop-types'

const OverrideCollapse = styled.div`
  & .ant-collapse-header {
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-bottom: 1px solid #cfd6de;
  }
  // Prevent the not-allowed cursor which is hella agressive
  & .ant-collapse-item-disabled > .ant-collapse-header {
    cursor: initial !important;
  }
  & .ant-collapse-content-box {
    padding: 0 !important;
  }
`
const QuestionText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
`
const Title = styled.div`
  font-size: 16px;
  color: #212934;
  margin-left: 40px;
`
interface EditQueueModalProps {
  queueId: number
  visible: boolean
  onClose: () => void
}

AddStudentsModal.propTypes = {
  value: PropTypes.any.isRequired,
}

export function AddStudentsModal({
  queueId,
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  //studentState stores all students
  const router = useRouter()
  const courseId = router.query['cid']
  const [studentsState, setStudentsState] = useState<
    { value: string; id: number }[]
  >([])

  const [questionsTypeState, setQuestionsTypeState] = useState<
    QuestionTypeParams[]
  >([])
  const [questionTypeInput, setQuestionTypeInput] = useState<
    QuestionTypeParams[]
  >([])

  const [selectOptions, setSelectOptions] = useState([])

  // invert the help status of selected option and set others to false
  const handleCheckboxChange = (id) => {
    const newSelectOptions = selectOptions.map((option) => {
      return {
        ...option,
        help: option.id === id ? !option.help : false,
      }
    })
    setSelectOptions(newSelectOptions)
  }

  const onTypeChange = (selectedIds: number[]) => {
    const newQuestionTypeInput: QuestionTypeParams[] =
      questionsTypeState.filter((questionType) =>
        selectedIds.includes(questionType.id),
      )

    setQuestionTypeInput(newQuestionTypeInput)
  }

  const courseNumber = Number(courseId)

  const getQuestions = useCallback(async () => {
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber))
  }, [courseNumber])

  const populateStudents = useCallback(async () => {
    const tempS = []
    const students = await API.profile.getAllStudents(courseNumber)
    if (!students) {
      console.error("can't get all students")
    }
    students.forEach(async (student) => {
      const b = await API.profile.inQueue(student.id)
      if (b) {
        return
      }
      tempS.push(student)
    })
    setStudentsState(tempS)
  }, [courseNumber])

  useEffect(() => {
    getQuestions()
    populateStudents()
  }, [getQuestions, populateStudents])

  const handleSubmit = () => {
    selectOptions.forEach((student, i) => {
      addStudent(i)
    })
  }

  const addStudent = async (i) => {
    const currentStudent = selectOptions[i]
    const b = await API.profile.inQueue(currentStudent.id)
    if (b) {
      message.error('Student already in queue.')
      return
    }
    await API.questions
      .TAcreate(
        {
          text: currentStudent.question ?? '',
          queueId: queueId,
          location: null,
          force: true,
          groupable: false,
          questionTypes: questionTypeInput,
        },
        currentStudent.id,
      )
      .then(async (response) => {
        message.success('Student(s) added')
        setStudentsState(
          studentsState.filter((student) => student.id !== currentStudent.id),
        )
        setSelectOptions([])
        if (selectOptions[i].help == true) {
          await API.questions.update(response.id, {
            status: OpenQuestionStatus.Helping,
          })
        }
      })
      .catch(() => {
        message.error("Can't add student".concat(currentStudent.value))
      })
    return false
  }

  const handleSelect = (data) => {
    if (data[0]) {
      data[0].help = true
    }
    setSelectOptions(data ?? [])
  }

  function toObj(arr) {
    const lst = []
    for (let i = 0; i < arr.length; ++i)
      lst.push({ value: arr[i].value, label: arr[i].value, id: arr[i].id })
    return lst
  }

  const handleChange = (value, id) => {
    setSelectOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, question: value } : option,
      ),
    )
  }

  return (
    <Modal
      title="Add Students to queue"
      open={visible}
      onCancel={onClose}
      onOk={async () => {
        handleSubmit()
        onClose()
      }}
    >
      {questionsTypeState.length > 0 ? (
        <>
          <QuestionText>
            What category(s) does your question fall under?
          </QuestionText>
          <AntdSelect
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
              <AntdSelect.Option value={type.id} key={type.id}>
                {type.name}
              </AntdSelect.Option>
            ))}
          </AntdSelect>
        </>
      ) : (
        <p>
          There are no question types. Add them in &apos;Edit Queue
          Details&apos;
        </p>
      )}
      <OverrideCollapse>
        <Collapse defaultActiveKey={[1]} ghost expandIconPosition="right">
          <Collapse.Panel
            style={{ padding: 0 }}
            key={1}
            header={
              <Title>
                Add Students to queue
                <span>{`(${studentsState.length})`}</span>
              </Title>
            }
            showArrow={true}
          >
            <Form onFinish={handleSubmit}>
              <Form.Item>
                <Select
                  options={toObj(studentsState)}
                  placeholder="search for student"
                  value={selectOptions}
                  onChange={handleSelect}
                  isSearchable={true}
                  isMulti={true}
                />
                {/* <Button
                  style={{ marginLeft: 15, marginTop: 15 }}
                  htmlType="submit"
                  className="btn"
                >
                  Add
                </Button> */}
              </Form.Item>
            </Form>
            {studentsState.length == 0 ? (
              <p>There are no students or all students are in queue</p>
            ) : null}
            {selectOptions.length > 0 ? (
              <>
                <br />
                <Form onFinish={handleSubmit}>
                  {selectOptions.map((option, index) => (
                    <div key={index}>
                      <strong>
                        <p>{option.value}</p>
                      </strong>
                      <Form.Item>
                        <Input
                          placeholder={`Enter ${option.value}'s question`}
                          style={{ width: '100%', height: '40px' }}
                          onChange={(e) =>
                            handleChange(e.target.value, option.id)
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Checkbox
                          style={{ fontSize: '18px' }} // Increase the font size to make it bigger
                          checked={option.help}
                          onChange={() => handleCheckboxChange(option.id)}
                        >
                          Help {option.value} (optional)
                        </Checkbox>
                      </Form.Item>
                    </div>
                  ))}
                </Form>
              </>
            ) : null}
          </Collapse.Panel>
        </Collapse>
      </OverrideCollapse>
    </Modal>
  )
}
