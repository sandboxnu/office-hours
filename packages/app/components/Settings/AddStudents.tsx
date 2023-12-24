import { SearchOutlined } from '@ant-design/icons'
import { API } from '@koh/api-client'
import { Role } from '@koh/common'
import { Divider, Input, List, Pagination, Spin } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { useState } from 'react'
import { ReactElement } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

type CourseRosterProps = { courseId: number }

type RenderTableProps = {
  courseId: number
  role: Role
  listTitle: string
  displaySearchBar: boolean
  searchPlaceholder: string
}

const CourseRosterComponent = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const TableBackground = styled.div`
  background-color: white;
`

export default function AddStudents({
  courseId,
}: CourseRosterProps): ReactElement {
  return (
    <div>
      <CourseRosterComponent>
        <h1>Student Roster</h1>
        <RenderTable
          courseId={courseId}
          role={Role.STUDENT}
          listTitle={'Students'}
          displaySearchBar={true}
          searchPlaceholder="Search students"
        />
        <br />
        <Divider />
      </CourseRosterComponent>
    </div>
  )
}

function RenderTable({
  courseId,
  role,
  listTitle,
  displaySearchBar,
  searchPlaceholder,
}: RenderTableProps): ReactElement {
  const [page, setPage] = useState(1)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const handleInput = (event) => {
    event.preventDefault()
    setInput(event.target.value)
  }
  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
    setPage(1)
  }
  const { data } = useSWR(
    `${role}/${page}/${search}`,
    async () => await API.course.getUserInfo(courseId, page, role, search),
  )
  if (!data) {
    return <Spin tip="Loading..." size="large" />
  } else {
    return (
      <>
        <TableBackground>
          <div style={{ backgroundColor: '#f0f0f0', height: '56px' }}>
            <h3
              style={{
                position: 'relative',
                left: '10px',
                top: '14px',
              }}
            >
              {listTitle}
            </h3>
          </div>
          {displaySearchBar && (
            <Input
              placeholder={searchPlaceholder}
              prefix={<SearchOutlined />}
              value={input}
              onChange={handleInput}
              onPressEnter={handleSearch}
            />
          )}
          <List
            dataSource={data.users}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL} />}
                  title={item.name}
                />
              </List.Item>
            )}
            bordered
          />
        </TableBackground>
        <br />
        {data.total > 50 && (
          <Pagination
            style={{ float: 'right' }}
            current={page}
            pageSize={50}
            total={data.total}
            onChange={(page) => setPage(page)}
            showSizeChanger={false}
          />
        )}
      </>
    )
  }
}
