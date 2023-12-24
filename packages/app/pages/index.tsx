import { ReactElement } from 'react'
import { Button, Image, List } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 500px;
  padding-top: 100px;
`

export default function Home(): ReactElement {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/ubc_logo.png"
          alt="UBC logo"
          style={{ width: '3em', margin: '0 1em 0 0' }}
        />
        <h1 style={{ display: 'block', alignItems: 'center' }}>
          Welcome to HelpMe
        </h1>
      </div>

      <p style={{ margin: '15px' }}>
        HelpMe Course System
        <ul style={{ listStyleType: 'circle', textAlign: 'left' }}>
          <li style={{ margin: '10px 0' }}>
            Supports in-person and virtual office hours with instructors and
            teaching assistants
          </li>
          <li style={{ margin: '10px 0' }}>
            Chatbot for real-time answers about course content and course
            questions
          </li>
          <li style={{ margin: '10px 0' }}>
            For more information, contact Ramon Lawrence,{' '}
            <a href="mailto:ramon.lawrence@ubc.ca">ramon.lawrence@ubc.ca</a>
          </li>
        </ul>
      </p>
      <Button type="primary" href="/login">
        Login &gt;
      </Button>
    </Container>
  )
}
