import Router from 'next/router'
import { ReactElement, useState } from 'react'
import { LeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  message,
  Button,
  Form,
  Input,
  Card,
  Row,
  Col,
  Select,
  Spin,
  Alert,
} from 'antd'
import styled from 'styled-components'
import Head from 'next/head'
import { API } from '@koh/api-client'
import useSWR from 'swr'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-top: 100px;
  width: 60%;
  border-radius: 15px;
  height: auto;

  @media (max-width: 650px) {
    width: 90%;
  }

  @media (max-width: 992px) {
    width: 80%;
  }
`

export default function Login(): ReactElement {
  const [pass, setPass] = useState('')
  const [uname, setUname] = useState('')
  const [accountActiveResponse, setAccountActiveResponse] = useState(true)
  const [loginMenu, setLoginMenu] = useState(false)
  const [organization, setOrganization] = useState(null)

  const { data: organizations } = useSWR(`api/v1/organization`, async () =>
    API.organizations.getOrganizations(),
  )

  const loginWithGoogle = async () => {
    await API.auth
      .loginWithGoogle(Number(organization.id))
      .then((res) => {
        Router.push(res.redirectUri)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const loginWithInstitution = async () => {
    const lastVisited = encodeURIComponent(localStorage.getItem('lastVisited'))
    localStorage.removeItem('lastVisited')
    Router.push(
      `/api/v1/auth/shibboleth/${organization.id}?lastVisited=${lastVisited}`,
    )
  }

  function login() {
    if (organization && !organization.legacyAuthEnabled) {
      message.error('Organization does not support legacy authentication')
      return
    }

    const loginRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: uname,
        password: pass,
      }),
    }
    fetch(`/api/v1/ubc_login`, loginRequest)
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText
          switch (response.status) {
            case 401:
              message.error(data.message)
              break
            case 403:
              setAccountActiveResponse(false)
              break
            case 404:
              message.error('User Not Found')
              break
            default:
              message.error(error)
              break
          }
          return Promise.reject(error)
        } else {
          const lastVisited = localStorage.getItem('lastVisited')

          let redirectURL = `/api/v1/login/entry?token=${data.token}`

          if (lastVisited) {
            redirectURL += `&redirect=${encodeURIComponent(lastVisited)}`
            localStorage.removeItem('lastVisited')
          }

          Router.push(redirectURL)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  const onPassChange = (e) => {
    setPass(e.target.value)
  }

  const onUserNameChange = (e) => {
    setUname(e.target.value)
  }

  const showLoginMenu = (value) => {
    const organization = organizations.find((org) => org.id === value)

    if (!organization) {
      message.error('Organization not found')
      return
    }

    setOrganization(organization)
    setLoginMenu(true)
  }

  return organizations ? (
    <>
      <Head>
        <title>Login | HelpMe</title>
      </Head>
      <Container>
        <Card className="mx-auto max-w-md sm:px-2 md:px-6">
          <h2 className="text-left">Login</h2>

          {!loginMenu && (
            <>
              <p className="text-left text-stone-400">
                Select your organization.
              </p>

              <Select
                className="mt-2 w-full text-left"
                placeholder="Available Organizations"
                options={organizations.map((organization) => {
                  return {
                    label: organization.name,
                    value: organization.id,
                  }
                })}
                onChange={(value) => {
                  showLoginMenu(value)
                }}
              />
            </>
          )}

          {loginMenu && (
            <>
              <Button
                className="flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-5 text-left"
                onClick={() => setLoginMenu(false)}
              >
                <LeftOutlined />
                <span className="font-semibold"> Go Back</span>
              </Button>

              {organization && organization.googleAuthEnabled && (
                <Button
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-5 text-left"
                  onClick={() => loginWithGoogle()}
                >
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span className="font-semibold">Log in with Google</span>
                </Button>
              )}

              {organization && organization.ssoEnabled && (
                <Button
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-5 text-left"
                  onClick={() => loginWithInstitution()}
                >
                  <span className="font-semibold">Log in with Institution</span>
                </Button>
              )}

              {organization && organization.legacyAuthEnabled && (
                <p className="my-5 font-medium uppercase text-stone-400">
                  Or login with email
                </p>
              )}

              {!accountActiveResponse && (
                <Alert
                  message="System Notice"
                  description="Your account has been deactivated. Please contact your organization admin for more information."
                  type="error"
                  style={{ marginBottom: 20, textAlign: 'left' }}
                />
              )}
              {organization && organization.legacyAuthEnabled && (
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={login}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a valid username.',
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      onChange={onUserNameChange}
                      className="rounded-lg border px-2 py-2"
                      placeholder="Username"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a valid password.',
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      onChange={onPassChange}
                      type="password"
                      className="rounded-lg border px-2 py-2"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="h-auto w-full items-center justify-center rounded-lg border px-2 py-2 "
                    >
                      <span className="font-semibold">Log in</span>
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <a
                      style={{ marginTop: '-10px' }}
                      href="/forgetpassword/forget"
                    >
                      Forgot password
                    </a>
                  </Form.Item>
                </Form>
              )}
            </>
          )}
        </Card>
      </Container>
    </>
  ) : (
    <Spin />
  )
}
