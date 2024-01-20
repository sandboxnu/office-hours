import React, { ReactElement } from 'react'
import './index.css'
import { UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import Router from 'next/router'
export default function ForgetPassword(): ReactElement {
  const onSend = (values: any) => {
    console.log('Received values of form: ', values)
    //find user, if found output
    reset(values.email)
  }
  function reset(email: string) {
    const loginRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
      }),
    }
    fetch(`/api/v1/profile/forgetpassword/${email}`, loginRequest)
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText
          if (data.message === 'Invalid credential') {
            message.error('Invalid password.')
          } else {
            message.error('Email Not Found')
          }
          return Promise.reject(error)
        } else {
          message.success('Email has been sent!')
          Router.push(
            `/api/v1/profile/enter_resetpassword/?token=${data.token}`,
          )
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSend}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        className="email-input"
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Send email
        </Button>
      </Form.Item>
    </Form>
  )
}
