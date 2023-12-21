import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  message,
} from 'antd'
import Head from 'next/head'
import { ReactElement } from 'react'
import NavBar from '../../../components/Nav/NavBar'
import { StandardPageContainer } from '../../../components/common/PageContainer'
import { useSemester } from '../../../hooks/useSemester'
import { useRouter } from 'next/router'
import { useOrganization } from '../../../hooks/useOrganization'
import { useProfile } from '../../../hooks/useProfile'
import { COURSE_TIMEZONES, OrganizationRole } from '@koh/common'
import DefaultErrorPage from 'next/error'
import { API } from '@koh/api-client'
import useSWR from 'swr'

export default function Add(): ReactElement {
  const profile = useProfile()
  const router = useRouter()
  const { organization } = useOrganization(profile?.organization.orgId)
  const isAdmin =
    profile?.organization.organizationRole === OrganizationRole.ADMIN
  const isProfessor =
    profile?.organization.organizationRole === OrganizationRole.PROFESSOR

  if (profile && !isAdmin && !isProfessor) {
    return <DefaultErrorPage statusCode={401} />
  }

  function RenderAddCourse(): ReactElement {
    const [formGeneral] = Form.useForm()
    const semesters = useSemester()

    const { data: professors } = useSWR(
      isAdmin ? `/api/v1/organization/[oid]/get_professors` : null,
      async () => await API.organizations.getProfessors(organization.id),
    )

    const addCourse = async () => {
      const formValues = formGeneral.getFieldsValue()
      const courseNameField = formValues.courseName
      const coordinatorEmailField = formValues.coordinatorEmail
      const sectionGroupNameField = formValues.sectionGroupName
      const zoomLinkField = formValues.zoomLink
      const courseTimezoneField = formValues.courseTimezone
      const semesterIdField = formValues.semesterId
      const profIds = isAdmin ? formValues.professorsUserId : [profile.id]

      // if semesterIdField is not a number or not in semesters
      if (
        isNaN(semesterIdField) ||
        !semesters.find((semester) => semester.id === semesterIdField)
      ) {
        message.error('Semester is invalid')
        return
      }
      await API.organizations
        .createCourse(organization.id, {
          name: courseNameField,
          coordinator_email: coordinatorEmailField ?? '',
          sectionGroupName: sectionGroupNameField,
          zoomLink: zoomLinkField ?? '',
          timezone: courseTimezoneField,
          semesterId: semesterIdField,
          profIds: profIds,
        })
        .then(() => {
          message.success('Course was created')
          router.reload()
          router.back()
        })
        .catch((error) => {
          const errorMessage = error.response.data.message
          message.error(errorMessage)
        })
    }

    return semesters &&
      profile &&
      (profile.organization.organizationRole !== OrganizationRole.ADMIN ||
        professors) ? (
      <>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }}>
            <Card bordered={true} title="Add Course">
              <Form form={formGeneral} layout="vertical" onFinish={addCourse}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Course Name"
                      name="courseName"
                      tooltip="Name of the course"
                    >
                      <Input allowClear={true} />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Coordinator Email"
                      name="coordinatorEmail"
                      tooltip="Email of the coordinator of the course"
                    >
                      <Input allowClear={true} />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Section Group Name"
                      name="sectionGroupName"
                      tooltip="Name of the section group"
                    >
                      <Input allowClear={true} />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Zoom Link"
                      name="zoomLink"
                      tooltip="Link to the zoom meeting"
                    >
                      <Input allowClear={true} />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Course Timezone"
                      name="courseTimezone"
                      tooltip="Timezone of the course"
                    >
                      <Select>
                        {COURSE_TIMEZONES.map((timezone) => (
                          <Select.Option value={timezone} key={timezone}>
                            {timezone}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Semester"
                      name="semesterId"
                      tooltip="Semester of the course"
                    >
                      <Select>
                        {semesters.map((semester) => (
                          <Select.Option value={semester.id} key={semester.id}>
                            {semester.season + semester.year}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    {profile.organization.organizationRole ===
                      OrganizationRole.ADMIN && (
                      <Form.Item
                        label="Professors"
                        name="professorsUserId"
                        tooltip="Professors teaching the course"
                      >
                        <Select mode="multiple" placeholder="Select professors">
                          {professors.map((prof) => (
                            <Select.Option
                              value={prof.organizationUser.id}
                              key={prof.organizationUser.id}
                            >
                              {prof.organizationUser.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add Course
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    ) : (
      <Spin
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      />
    )
  }
  return profile && (isAdmin || isProfessor) && organization ? (
    <>
      <Head>
        <title>{organization?.name} | Edit Course</title>
      </Head>

      <StandardPageContainer>
        <NavBar />
        {isAdmin && (
          <Breadcrumb separator=">" style={{ marginTop: 10, marginBottom: 20 }}>
            <Breadcrumb.Item href="/organization/settings">
              Organization Settings
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">Course</Breadcrumb.Item>
          </Breadcrumb>
        )}
        <RenderAddCourse />
      </StandardPageContainer>
    </>
  ) : (
    <Spin
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    />
  )
}
