import { ReactElement, useEffect } from 'react'
import { Button, Spin } from 'antd'
import useSWR from 'swr'
import { API } from '@koh/api-client'
import Router from 'next/router'

export default function Home(): ReactElement {
  // check if logged in
  const { data, error } = useSWR(
    `api/v1/profile`,
    async () => await API.profile.index(),
  )

  // if logged in, redirect to courses page
  useEffect(() => {
    if (data && !error) {
      // if data is not undefined and there's no error, it means the user is logged in
      Router.push('/courses')
    }
  }, [data, error])

  // only show landing page if there was an error (not logged in, resource forbidden, api down, etc.)
  if (error) {
    return (
      <div className="ml-auto mr-auto max-w-[500px] pt-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <img src="/ubc_logo.png" alt="UBC logo" className="mb-4 mr-4 w-12" />
          <h1>Welcome to HelpMe</h1>
        </div>

        <p className="m-3">
          HelpMe Course System
          <ul className="list-disc text-left">
            <li className="m-2">
              Supports in-person and virtual office hours with instructors and
              teaching assistants
            </li>
            <li className="m-2">
              Chatbot for real-time answers about course content and course
              questions
            </li>
            <li className="m-2">
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

  // (show a spinner while waiting for response from useSWR)
  return <Spin />
}
