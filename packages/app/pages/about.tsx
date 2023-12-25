import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import AboutPage from '../components/About/AboutPage'
import { StandardPageContainer } from '../components/common/PageContainer'
import NavBar from '../components/Nav/NavBar'

export default function About(): ReactElement {
  const router = useRouter()
  const courseId = router.query['cid']

  return (
    <StandardPageContainer>
      <Head>
        <title>About | HelpMe</title>
      </Head>
      <NavBar courseId={Number(courseId)} />
      <AboutPage />
    </StandardPageContainer>
  )
}
