import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { StandardPageContainer } from '../components/common/PageContainer'
import NavBar from '../components/Nav/NavBar'
import SettingsPage, {
  SettingsOptions,
} from '../components/Settings/SettingsPage'

export default function Settings(): ReactElement {
  const router = useRouter()
  const courseId = router.query['cid']
  const defaultPage = router.query['defaultPage']
  return (
    <StandardPageContainer>
      <Head>
        <title>Settings</title>
      </Head>
      <NavBar courseId={Number(courseId)} />

      <SettingsPage defaultPage={defaultPage as SettingsOptions} />
    </StandardPageContainer>
  )
}
