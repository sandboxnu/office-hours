import { ReactElement, useState } from 'react'
import { useOrganization } from '../../../../hooks/useOrganization'
import { useProfile } from '../../../../hooks/useProfile'
import { OrganizationRole } from '@koh/common'
import DefaultErrorPage from 'next/error'
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Table,
  message,
} from 'antd'
import { StandardPageContainer } from '../../../../components/common/PageContainer'
import Head from 'next/head'
import NavBar from '../../../../components/Nav/NavBar'
import { useRouter } from 'next/router'
import { API } from '@koh/api-client'
import useSWR from 'swr'
import { ColumnsType } from 'antd/es/table'

interface CourseType {
  id: string
  name: string
  role: string
}

export default function Edit(): ReactElement {
  const profile = useProfile()
  const router = useRouter()
  const uid = router.query['uid']
  const { organization } = useOrganization(profile?.organization.orgId)

  if (
    profile &&
    profile.organization.organizationRole !== OrganizationRole.ADMIN
  ) {
    return <DefaultErrorPage statusCode={404} />
  }

  function RenderUserInfo(): ReactElement {
    const [formGeneral] = Form.useForm()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys)
      setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    }

    const courseColumns: ColumnsType<CourseType> = [
      {
        title: 'Course Code',
        dataIndex: 'id',
      },
      {
        title: 'Course Name',
        dataIndex: 'name',
      },
      {
        title: 'Course Role',
        dataIndex: 'role',
      },
    ]

    const { data: userData, error } = useSWR(
      `api/v1/organization/[oid]/get_user/[uid]`,
      async () =>
        API.organizations
          .getUser(organization?.id, Number(uid))
          .then((userInfo) => {
            userInfo.courses = userInfo?.courses.map((course) => {
              return {
                ...course,
                // Needed for antd table to fill the keys with course id
                key: course.id,
              }
            })
            return userInfo
          }),
    )

    if (error) {
      router.push('/organization/settings')
    }

    const hasSelected = selectedRowKeys.length > 0

    const deleteProfilePicture = async () => {
      await API.organizations
        .deleteProfilePicture(organization?.id, Number(uid))
        .then(() => {
          message.success('Profile picture was deleted')
        })
        .catch((error) => {
          const errorMessage = error.response.data.message

          message.error(errorMessage)
        })
    }

    const dropCourses = async () => {
      if (!hasSelected) {
        message.error('No courses were selected')
        return
      }

      await API.organizations
        .dropUserCourses(
          organization?.id,
          Number(uid),
          selectedRowKeys as number[],
        )
        .then(() => {
          message.success('User courses were dropped')
          setTimeout(() => {
            router.reload()
          }, 1750)
        })
        .catch((error) => {
          const errorMessage = error.response.data.message

          message.error(errorMessage)
        })
    }

    const updateAccess = async () => {
      await API.organizations
        .updateAccess(organization?.id, Number(uid))
        .then(() => {
          message.success('User access was updated')
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
      const formValues = await formGeneral.validateFields()

      const firstNameField = formValues.firstName
      const lastNameField = formValues.lastName
      const emailField = formValues.email
      const sidField = formValues.sid

      if (
        firstNameField === userData.user.firstName &&
        lastNameField === userData.user.lastName &&
        emailField === userData.user.email &&
        sidField === userData.user.sid
      ) {
        message.info('User was not updated as information has not been changed')
        return
      }

      if (firstNameField.trim().length < 1) {
        message.error('First name must be at least 1 character')
        return
      }

      if (lastNameField.trim().length < 1) {
        message.error('Last name must be at least 1 character')
        return
      }

      if (emailField.trim().length < 4) {
        message.error('Email must be at least 4 characters')
        return
      }

      if (userData.user.sid && sidField.trim().length < 1) {
        message.error('Student number must be at least 1 character')
        return
      }

      await API.organizations
        .patchUserInfo(organization?.id, Number(uid), {
          firstName: firstNameField,
          lastName: lastNameField,
          email: emailField,
          sid: Number(sidField),
        })
        .then(() => {
          message.success('User information was updated')
          setTimeout(() => {
            router.reload()
          }, 1750)
        })
        .catch((error) => {
          const errorMessage = error.response.data.message

          message.error(errorMessage)
        })
    }

    return userData ? (
      <>
        {organization?.ssoEnabled && (
          <Alert
            message="System Notice"
            description="Organizations with SSO/Shibboleth authentication enabled have a limited editing permissions for users. Changes must be made in the SSO provider."
            type="error"
            style={{ marginBottom: 20 }}
          />
        )}
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }}>
            <Card bordered={true} title="General">
              <Form
                form={formGeneral}
                layout="vertical"
                initialValues={{
                  firstName: userData.user.firstName,
                  lastName: userData.user.lastName,
                  email: userData.user.email,
                  sid: userData.user.sid,
                }}
                onFinish={updateGeneral}
              >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      tooltip="First name of the user"
                    >
                      <Input
                        allowClear={true}
                        disabled={organization?.ssoEnabled}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      tooltip="Last name of the user"
                    >
                      <Input
                        allowClear={true}
                        disabled={organization?.ssoEnabled}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Email"
                      name="email"
                      tooltip="Email address of the user"
                    >
                      <Input
                        allowClear={true}
                        type="email"
                        disabled={organization?.ssoEnabled}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Student Number"
                      name="sid"
                      tooltip="Student number of the user"
                    >
                      <Input
                        allowClear={true}
                        disabled={organization?.ssoEnabled}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-auto w-full p-3"
                    disabled={organization?.ssoEnabled}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} style={{ marginTop: 20 }}>
            <Card bordered={true} title="Courses Information">
              <Button
                type="primary"
                danger
                disabled={!hasSelected}
                style={{ marginBottom: 10 }}
                onClick={dropCourses}
                className="h-auto w-full p-3"
              >
                Drop Courses
              </Button>

              <Table
                dataSource={userData.courses}
                columns={courseColumns}
                rowSelection={rowSelection}
              />
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
                    {userData.user.accountDeactivated
                      ? 'Reactivate this account'
                      : 'Deactivate this account'}
                  </strong>
                  <div className="mb-0">
                    {userData.user.accountDeactivated
                      ? 'Once you reactivate an account, the user will be able to access organization resources.'
                      : 'Once you deactivate an account, the user will not be able to access organization resources.'}
                  </div>
                </div>
                <Button
                  danger
                  className="w-full md:w-auto"
                  onClick={updateAccess}
                >
                  {userData.user.accountDeactivated
                    ? 'Reactivate this account'
                    : 'Deactivate this account'}
                </Button>
              </div>

              <div className="mt-2 flex flex-col items-center md:flex-row">
                <div className="mb-2 w-full md:mr-4 md:w-5/6 md:text-left">
                  <strong>Delete profile picture</strong>
                  <div className="mb-0">
                    This will delete the user&lsquo;s profile picture.
                  </div>
                </div>
                <Button
                  danger
                  className="w-full md:w-auto"
                  disabled={!userData.user.photoUrl}
                  onClick={deleteProfilePicture}
                >
                  Delete profile picture
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
          <Breadcrumb.Item href="">User</Breadcrumb.Item>
        </Breadcrumb>
        <RenderUserInfo />
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  )
}
