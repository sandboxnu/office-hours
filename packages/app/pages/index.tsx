import { ReactElement } from 'react'
import { Button } from 'antd'

export default function Home(): ReactElement {
  return (
    <div className="ml-auto mr-auto w-[500px] pt-10 text-center">
      <div className="flex flex-col items-center justify-center">
        <img src="/ubc_logo.png" alt="UBC logo" className="mb-4 mr-4 w-12" />
        <h1>Welcome to HelpMe</h1>
      </div>

      <p className="m-3">
        HelpMe Course System
        <ul className="list-disc text-left">
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
      <Button type="primary" className="rounded-lg" href="/login">
        Login &gt;
      </Button>
    </div>
  )
}
