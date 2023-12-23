import { ReactElement } from 'react'
import { useProfile } from '../../../../hooks/useProfile'
// import { useRouter } from "next/router";
import { useOrganization } from '../../../../hooks/useOrganization'
import { OrganizationRole } from '@koh/common'
import DefaultErrorPage from 'next/error'
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
import { StandardPageContainer } from '../../../../components/common/PageContainer'
import NavBar from '../../../../components/Nav/NavBar'
import { API } from '@koh/api-client'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSemester } from '../../../../hooks/useSemester'

export default function Edit(): ReactElement {
  const profile = useProfile()
  const router = useRouter()
  const { cid } = router.query

  const { organization } = useOrganization(profile?.organization.orgId)

  if (
    profile &&
    profile.organization.organizationRole !== OrganizationRole.ADMIN
  ) {
    return <DefaultErrorPage statusCode={404} />
  }

  function RenderCourseInfo(): ReactElement {
    const [formGeneral] = Form.useForm()
    const semesters = useSemester()

    const { data: courseData, error } = useSWR(
      `api/v1/organization/[oid]/course/[cid]`,
      async () =>
        await API.organizations.getCourse(organization.id, Number(cid)),
    )

    if (error) {
      router.push('/organization/settings')
    }

    const updateCourseAccess = async () => {
      await API.organizations
        .updateCourseAccess(organization.id, Number(cid))
        .then(() => {
          message.success('Course access was updated')
          setTimeout(() => {
            router.reload()
          }, 1750)
        })
        .catch((error) => {
          const errorMessage = error.response.data.message

          message.error(errorMessage)
        })
    }

    const updateGeneral = async () => {
      const formValues = formGeneral.getFieldsValue()

      const courseNameField = formValues.courseName
      const coordinatorEmailField = formValues.coordinatorEmail
      const sectionGroupNameField = formValues.sectionGroupName
      const zoomLinkField = formValues.zoomLink
      const courseTimezoneField = formValues.courseTimezone
      const semesterIdField = formValues.semesterId

      if (
        courseNameField === courseData.course.name &&
        coordinatorEmailField === courseData.course.coordinatorEmail &&
        sectionGroupNameField === courseData.course.sectionGroupName &&
        zoomLinkField === courseData.course.zoomLink &&
        courseTimezoneField === courseData.course.timezone &&
        semesterIdField === courseData.course.semesterId
      ) {
        message.info(
          'Course was not updated as information has not been changed',
        )
        return
      }

      if (courseNameField.length < 1) {
        message.error('Course name cannot be empty')
        return
      }

      if (
        courseData.course.coordinatorEmail &&
        coordinatorEmailField.length < 1
      ) {
        message.error('Coordinator email cannot be empty')
        return
      }

      if (
        courseData.course.sectionGroupName &&
        sectionGroupNameField.length < 1
      ) {
        message.error('Section group name cannot be empty')
        return
      }

      if (courseData.course.zoomLink && zoomLinkField.length < 1) {
        message.error('Zoom link cannot be empty')
        return
      }

      if (courseData.course.timezone && courseTimezoneField.length < 1) {
        message.error('Course timezone cannot be empty')
        return
      }

      // if semesterIdField is not a number or not in semesters
      if (
        isNaN(semesterIdField) ||
        !semesters.find((semester) => semester.id === semesterIdField)
      ) {
        message.error('Semester is invalid')
        return
      }

      await API.organizations
        .updateCourse(organization.id, Number(cid), {
          name: courseNameField,
          coordinatorEmail: coordinatorEmailField ?? '',
          sectionGroupName: sectionGroupNameField,
          zoomLink: zoomLinkField ?? '',
          timezone: courseTimezoneField,
          semesterId: semesterIdField,
        })
        .then(() => {
          message.success('Course was updated')
          setTimeout(() => {
            router.reload()
          }, 1750)
        })
        .catch((error) => {
          const errorMessage = error.response.data.message

          message.error(errorMessage)
        })
    }

    return semesters && courseData ? (
      <>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }}>
            <Card bordered={true} title="General">
              <Form
                form={formGeneral}
                layout="vertical"
                initialValues={{
                  courseName: courseData.course.name,
                  coordinatorEmail: courseData.course.coordinator_email,
                  sectionGroupName: courseData.course.sectionGroupName,
                  zoomLink: courseData.course.zoomLink,
                  courseTimezone: courseData.course.timezone,
                  semesterId: courseData.course.semesterId,
                }}
                onFinish={updateGeneral}
              >
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
                        <Select.Option value="America/New_York">
                          America/New York
                        </Select.Option>
                        <Select.Option value="America/Los_Angeles">
                          America/Los Angeles
                        </Select.Option>
                        <Select.Option value="America/Chicago">
                          America/Chicago
                        </Select.Option>
                        <Select.Option value="America/Denver">
                          America/Denver
                        </Select.Option>
                        <Select.Option value="America/Phoenix">
                          America/Phoenix
                        </Select.Option>
                        <Select.Option value="America/Anchorage">
                          America/Anchorage
                        </Select.Option>
                        <Select.Option value="America/Honolulu">
                          America/Honolulu
                        </Select.Option>
                        <Select.Option value="Europe/London">
                          Europe/London
                        </Select.Option>
                        <Select.Option value="Europe/Paris">
                          Europe/Paris
                        </Select.Option>
                        <Select.Option value="Asia/Tokyo">
                          Asia/Tokyo
                        </Select.Option>
                        <Select.Option value="Asia/Shanghai">
                          Asia/Shanghai
                        </Select.Option>
                        <Select.Option value="Australia/Sydney">
                          Australia/Sydney
                        </Select.Option>
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
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Update
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <Card
              bordered={true}
              title="Danger Zone"
              className="border-2 border-rose-500/[.35]"
            >
              <div className="flex flex-col items-center md:flex-row">
                <div className="mb-2 w-full md:mr-4 md:w-5/6 md:text-left">
                  <strong>
                    {courseData.course.enabled
                      ? 'Archive Course'
                      : 'Re-archive Course'}
                  </strong>
                  <div className="mb-0">
                    {courseData.course.enabled
                      ? 'Once you archive a course, the course will only be visible to course professor and TA, and admin.'
                      : 'Once you re-archive a course, the course will be visible to all members of the organization.'}
                  </div>
                </div>
                <Button
                  danger
                  className="w-full md:w-auto"
                  onClick={updateCourseAccess}
                >
                  {courseData.course.enabled
                    ? 'Archive Course'
                    : 'Re-archive Course'}
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </>
    ) : (
      <Spin />
    )
  }

  return profile &&
    profile.organization.organizationRole == OrganizationRole.ADMIN &&
    organization ? (
    <>
      <Head>
        <title>{organization?.name} | Admin Panel</title>
      </Head>

      <StandardPageContainer>
        <NavBar />
        <Breadcrumb separator=">" style={{ marginTop: 10, marginBottom: 20 }}>
          <Breadcrumb.Item href="/organization/settings">
            Organization Settings
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">Course</Breadcrumb.Item>
        </Breadcrumb>

        <RenderCourseInfo />
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  )
}
