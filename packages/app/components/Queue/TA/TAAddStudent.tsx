import { ReactElement, useCallback } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Form, Collapse, message, Radio, Checkbox } from 'antd'
import { API } from '@koh/api-client'
import { default as React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Select from 'react-select'
import { OpenQuestionStatus } from '@koh/common'

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
  const [questionsTypeState, setQuestionsTypeState] = useState<string[]>([])
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(
    'Default grading type',
  )
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

  //students store all the students
  // let students: { value: string; id: number }[] = [];
  const getQuestions = async () => {
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber))
  }

  useEffect(() => {
    getQuestions()
    populateStudents()
  }, [])

  const courseNumber = Number(courseId)
  const populateStudents = async () => {
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
  }

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
          questionType: selectedQuestionType,
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

  const onQTclick = useCallback(
    async (s: string) => {
      setSelectedQuestionType(s)
    },
    [courseNumber],
  )

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
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        handleSubmit()
        onClose()
      }}
    >
      <h3>
        Current question type:{' '}
        <strong style={{ color: 'blue' }}> {selectedQuestionType}</strong>
      </h3>
      <h3> Change question type: </h3>
      <Radio.Group buttonStyle="solid">
        {questionsTypeState.length > 0 ? (
          questionsTypeState.map((q) => {
            return (
              <Radio.Button
                style={{ color: 'white' }}
                onClick={() => onQTclick(q)}
                key={q}
              >
                {q}
              </Radio.Button>
            )
          })
        ) : (
          <p>There are No Question Types</p>
        )}
      </Radio.Group>
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
                  isMulti
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
            {studentsState.length > 0 ? (
              <p>Search for students to be added</p>
            ) : (
              <p>There are no students or all students are in queue</p>
            )}
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
                        <input
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
