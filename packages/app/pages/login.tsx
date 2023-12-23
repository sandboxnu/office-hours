import Router from 'next/router'
import { ReactElement, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { message, Button, Form, Input, Alert } from 'antd'
import styled from 'styled-components'
import Head from 'next/head'
import { User } from '@koh/common'
import { useHomePageRedirect } from '../hooks/useHomePageRedirect'
import { useProfile } from '../hooks/useProfile'
import { Spin } from 'antd'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 350px;
  padding-top: 100px;
`

export default function Login(): ReactElement {
  const [pass, setPass] = useState('')
  const [uname, setUname] = useState('')
  const [accountActiveResponse, setAccountActiveResponse] = useState(true)

  function login() {
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
              message.error('Invalid password.')
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

  // if the user is logged in, redirect them to the courses page
  const profile: User = useProfile()
  const didRedirect = useHomePageRedirect()
  if (profile && !didRedirect) {
    Router.push('/courses')
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    )
  } else {
    // user not logged in
    return (
      <>
        <Head>
          <title>Login | HelpMe</title>
        </Head>
        <Container>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={login}
          >
            <h1>HelpMe</h1>
            {!accountActiveResponse && (
              <Alert
                message="System Notice"
                description="Your account has been deactivated. Please contact your organization admin for more information."
                type="error"
                style={{ marginBottom: 20, textAlign: 'left' }}
              />
            )}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
              style={{ marginTop: 20 }}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                onChange={onUserNameChange}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                onChange={onPassChange}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <a
                style={{ float: 'right', marginTop: '-10px' }}
                href="/forgetpassword/forget"
              >
                Forgot password
              </a>
            </Form.Item>

            <Form.Item style={{ marginTop: '-15px' }}>
              <Button
                style={{ width: '100%', marginTop: '-15px' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="/signup/signup">register now!</a>
            </Form.Item>
          </Form>
        </Container>
      </>
    )
  }
}
