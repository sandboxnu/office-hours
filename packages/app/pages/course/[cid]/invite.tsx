import { Card, Spin, Button, Space } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { StandardPageContainer } from '../../../components/common/PageContainer'
import Head from 'next/head'
import Meta from 'antd/lib/card/Meta'
import { API } from '@koh/api-client'
import { useProfile } from '../../../hooks/useProfile'
import { UBCOuserParam } from '@koh/common'

export default function Invite(): ReactElement {
  const router = useRouter()
  const { cid, code } = router.query
  const profile = useProfile()
  const [course, setCourse] = useState(null)
  const [_courseError, setCourseError] = useState(null)

  const isLoading = !profile || !course

  const cardMetaTitle = `You have been invited to join '${course?.name}'`
  const cardMetaDescription = `This course is managed by ${course?.organizationCourse.name}`

  useEffect(() => {
    if (!profile) {
      localStorage.setItem('lastVisited', window.location.href)
    }

    const fetchData = async () => {
      try {
        const response = await API.course.getLimitedCourseResponse(
          Number(cid),
          String(code),
        )
        setCourse(response)
      } catch (error) {
        setCourseError(error)
      }
    }
    if (cid) {
      fetchData()
    }
  }, [cid, code, profile])

  const addStudent = async (userData: UBCOuserParam) => {
    await API.course.enrollByInviteCode(userData, String(code))
    localStorage.removeItem('lastVisited')
    router.push('/courses')
  }

  if (
    profile &&
    profile.courses.some((userCourse) => userCourse.course.id === Number(cid))
  ) {
    localStorage.removeItem('lastVisited')
    router.push('/courses')
  }

  const renderCard = (
    title,
    description,
    buttonLabel,
    buttonAction,
    cover = null,
  ) => (
    <Card style={{ width: 600, textAlign: 'center' }} cover={cover}>
      <h1>{title}</h1>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Meta title={description.title} description={description.text} />
        <Button
          type="primary"
          style={{ width: '100%', height: 50, borderRadius: '5px' }}
          onClick={buttonAction}
        >
          {buttonLabel}
        </Button>
      </Space>
    </Card>
  )

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    )
  }

  let cardElement

  if (profile?.organization.orgId !== course?.organizationCourse.id) {
    cardElement = renderCard(
      'You cannot join a course that is not in your organization',
      {},
      'Back to my courses',
      () => {
        localStorage.removeItem('lastVisited')
        router.push('/courses')
      },
    )
  } else if (code !== course?.courseInviteCode) {
    cardElement = renderCard(
      'Invalid Course Code',
      {},
      'Back to my courses',
      () => {
        localStorage.removeItem('lastVisited')
        router.push('/courses')
      },
    )
  } else {
    cardElement = renderCard(
      `Invitation to join '${course?.name}'`,
      { title: cardMetaTitle, text: cardMetaDescription },
      'Accept Invitation',
      async () => {
        const userData: UBCOuserParam = {
          email: profile.email,
          first_name: profile.firstName ?? '',
          password: '',
          last_name: profile.lastName ?? '',
          selected_course: course.id,
          sid: profile.sid,
          photo_url: profile.photoURL,
        }
        await addStudent(userData)
      },
      <img
        alt="course-image"
        height="200"
        style={{ objectFit: 'cover' }}
        src="https://open-2021.sites.olt.ubc.ca/files/2020/10/OSIP-2020-Slider.jpg"
      />,
    )
  }

  return (
    <StandardPageContainer>
      <Head>
        <title>
          {course ? `Invitation to join '${course?.name}'` : 'Invalid Invite'}
        </title>
      </Head>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 200,
        }}
      >
        {cardElement}
      </div>
    </StandardPageContainer>
  )
}
