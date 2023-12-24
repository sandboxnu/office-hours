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
          // src="/ubc_logo.png"
          src="/favicon.ico"
          alt="UBC logo"
          className="mr-4 w-12"
        />
        <h1 style={{ display: 'block', alignItems: 'center' }}>
          Welcome to HelpMe
        </h1>
      </div>

      <p className="m-3">
        HelpMe Course System
        <ul style={{ listStyleType: 'circle', textAlign: 'left' }}>
          <li className="my-2">
            Supports in-person and virtual office hours with instructors and
            teaching assistants
          </li>
          <li className="my-2">
            Chatbot for real-time answers about course content and course
            questions
          </li>
          <li className="my-2">
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
