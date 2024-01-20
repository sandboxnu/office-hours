import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import AddStudents from './AddStudents'
type CourseRosterPageProps = { courseId: number }
import { API } from '@koh/api-client'
import { message } from 'antd'

const CourseRosterPageComponent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`

export default function AddStudentsToCourse({
  courseId,
}: CourseRosterPageProps): ReactElement {
  const [file, setFile] = useState()
  const fileReader = new FileReader()

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput: string = event.target.result.toString()
        addStudents(csvOutput)
      }
      fileReader.readAsText(file)
    }
  }
  const addStudents = async (students: string) => {
    const lines = students.split('\r\n')
    for (let i = 0; i < lines.length; i++) {
      const student = lines[i]

      if (student.includes(',')) {
        message.error(
          `Error on line ${i + 1}. File can only contain one column.`,
        )
        return
      }

      try {
        await API.course.addStudent(courseId, Number(student))
      } catch (err) {
        message.error(`Error on line ${i + 1}. ${err.response.data.message}`)
      }
    }
  }
  return (
    <div>
      <CourseRosterPageComponent>
        <div style={{ textAlign: 'center' }}>
          <h1>Import student file </h1>
          <form>
            <input
              type={'file'}
              id={'csvFileInput'}
              accept={'.csv'}
              onChange={handleOnChange}
            />
            <button
              onClick={(e) => {
                handleOnSubmit(e)
              }}
            >
              Add students
            </button>
          </form>
        </div>
        <AddStudents courseId={courseId} />
      </CourseRosterPageComponent>
    </div>
  )
}
