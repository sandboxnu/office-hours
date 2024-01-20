import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR, { mutate } from 'swr'
import {
  Button,
  Card,
  Col,
  Input,
  List,
  Pagination,
  Row,
  Space,
  Spin,
} from 'antd'
import { API } from '@koh/api-client'
import { SearchOutlined } from '@ant-design/icons'

const TableBackground = styled.div`
  background-color: white;
`

interface CourseData {
  courseId: number
  courseName: string
}

export default function CoursesTab({
  organizationId,
}: {
  organizationId: number
}): ReactElement {
  function RenderTable(): ReactElement {
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

    useEffect(() => {
      return () => {
        // Clear the cache for the "CoursesTab" component
        mutate(`courses/${page}/${search}`)
      }
    }, [page, search])

    const { data: courses } = useSWR(
      `courses/${page}/${search}`,
      async () =>
        await API.organizations.getCourses(organizationId, page, search),
    )

    if (!courses) {
      return (
        <Spin
          tip="Loading..."
          style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}
          size="large"
        />
      )
    } else {
      return (
        <>
          <TableBackground>
            <Row>
              <Col sm={{ span: 18 }}>
                <Input
                  placeholder="Search Courses"
                  prefix={<SearchOutlined />}
                  value={input}
                  onChange={handleInput}
                  onPressEnter={handleSearch}
                />
              </Col>
              <Col sm={{ span: 1 }}>
                <Space></Space>
              </Col>
              <Col>
                <Button type="primary" href={`/organization/course/add`}>
                  Add New Course
                </Button>
              </Col>
            </Row>

            <List
              style={{ marginTop: 20 }}
              dataSource={courses}
              renderItem={(item: CourseData) => (
                <>
                  <List.Item
                    style={{ borderBottom: '1px solid #f0f0f0', padding: 10 }}
                    key={item.courseId}
                    actions={[
                      <Button
                        key=""
                        type="primary"
                        href={`/organization/course/${item.courseId}/edit`}
                      >
                        Edit
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta title={item.courseName} />
                  </List.Item>
                </>
              )}
            />
          </TableBackground>
          {courses.total > 50 && (
            <Pagination
              style={{ float: 'right' }}
              current={page}
              pageSize={50}
              total={courses.total}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
            />
          )}
        </>
      )
    }
  }

  return (
    <>
      <Card title="Courses">
        <RenderTable />
      </Card>
    </>
  )
}
