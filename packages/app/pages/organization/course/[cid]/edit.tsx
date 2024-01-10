import { ReactElement, useState, useEffect } from 'react'
import { useProfile } from '../../../../hooks/useProfile'
// import { useRouter } from "next/router";
import { useOrganization } from '../../../../hooks/useOrganization'
import { COURSE_TIMEZONES, OrganizationRole, Role } from '@koh/common'
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
  const router = useRouter()
  const { cid } = router.query

  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const profile = useProfile()
  const { organization } = useOrganization(profile?.organization.orgId)

  const isAdmin =
    profile && profile.organization.organizationRole === OrganizationRole.ADMIN

  useEffect(() => {
    if (profile && organization) {
      const isProfessorInCourse = profile?.courses.some(
        (course) =>
          course.role === Role.PROFESSOR && course.course.id === Number(cid),
      )

      setIsAuthorized(isAdmin || isProfessorInCourse)
      setIsLoading(false)
    }
  }, [profile, organization, cid, isAdmin])

  if (isLoading) {
    return (
      <>
        <Spin
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        />
      </>
    )
  }

  if (!isAuthorized) {
    return <DefaultErrorPage statusCode={401} />
  }

  function RenderCourseInfo(): ReactElement {
    const [formGeneral] = Form.useForm()
    const semesters = useSemester()

    const { data: courseData, error } = useSWR(
      `api/v1/organization/[oid]/course/[cid]`,
      async () =>
        await API.organizations.getCourse(organization.id, Number(cid)),
    )
    const { data: professors } = useSWR(
      isAdmin ? `/api/v1/organization/[oid]/get_professors` : null,
      async () => await API.organizations.getProfessors(organization.id),
    )

    const updateCourseAccess = async () => {
      await API.organizations
        .updateCourseAccess(organization.id, Number(cid))
        .then(() => {
          message.success('Course access was updated')
          router.back()
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
      const profIdsField = isAdmin ? formValues.professorsUserId : [profile.id]

      if (
        courseNameField === courseData.course.name &&
        coordinatorEmailField === courseData.course.coordinator_email &&
        sectionGroupNameField === courseData.course.sectionGroupName &&
        zoomLinkField === courseData.course.zoomLink &&
        courseTimezoneField === courseData.course.timezone &&
        semesterIdField === courseData.course.semesterId &&
        profIdsField === courseData.profIds
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
        courseData.course.coordinator_email &&
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

      if (
        !Array.isArray(profIdsField) ||
        (professors &&
          !profIdsField.every(
            (profId) =>
              typeof profId === 'number' &&
              professors.find((prof) => prof.userId === profId),
          ))
      ) {
        message.error('One or more selected professors are invalid')
        return
      }

      await API.organizations
        .updateCourse(organization.id, Number(cid), {
          name: courseNameField,
          coordinator_email: coordinatorEmailField ?? '',
          sectionGroupName: sectionGroupNameField,
          zoomLink: zoomLinkField ?? '',
          timezone: courseTimezoneField,
          semesterId: semesterIdField,
          profIds: profIdsField,
        })
        .then(() => {
          message.success('Course was updated')
          router.reload()
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
            <Card bordered={true} title="Edit Course">
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
                  professorsUserId: courseData.profIds,
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
                      OrganizationRole.ADMIN && professors ? (
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
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
                <Row>
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

  return profile && isAuthorized && organization ? (
    <>
      <Head>
        <title>{organization?.name} | Admin Panel</title>
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

        <RenderCourseInfo />
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
