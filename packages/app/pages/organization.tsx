import { Card, Col, Image, Row, Spin } from 'antd'
import { ReactElement } from 'react'
import { useProfile } from '../hooks/useProfile'
import Head from 'next/head'
import NavBar from '../components/Nav/NavBar'
import { StandardPageContainer } from '../components/common/PageContainer'
import styled from 'styled-components'
import useSWR from 'swr'
import { API } from '@koh/api-client'
import Meta from 'antd/lib/card/Meta'

const OrganizationCard = styled.div`
  margin-top: -100px;
  z-index: 2;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  @media (min-width: 320px) {
    padding: 15px;
    text-align: center;
  }
  @media (min-width: 750px) {
    padding: 10px 20px;
    text-align: left;
  }
  @media (min-width: 1000px) {
    padding: 50px 32px;
  }
  @media (min-width: 1500px) {
    max-width: 1500px;
    padding: 24px 100px;
  }
`

const CoursesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
  gap: 15px;
`

export default function Organization(): ReactElement {
  const profile = useProfile()

  function RenderCourses(): ReactElement {
    const { data } = useSWR(`/api/v1/courses`, async () =>
      API.course.getOrganizationCourses(profile?.organization.orgId),
    )

    return data ? (
      <>
        <CoursesSection>
          {data?.coursesPartial.map((course) => (
            <Card
              key={course.id}
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              }}
              cover={
                <img
                  alt="example"
                  style={{ objectFit: 'cover', height: '15vh' }}
                  src="https://open-2021.sites.olt.ubc.ca/files/2020/10/OSIP-2020-Slider.jpg"
                />
              }
            >
              <div
                style={{
                  display: 'flex',
                  verticalAlign: 'middle',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Meta title={course.name} />
              </div>
            </Card>
          ))}
        </CoursesSection>
      </>
    ) : (
      <></>
    )
  }

  return profile ? (
    <>
      <Head>
        <title>{profile?.organization.organizationName}</title>
      </Head>
      <StandardPageContainer style={{ flex: 'none' }}>
        <NavBar />
      </StandardPageContainer>
      <Image
        preview={false}
        src={`/api/v1/organization/${profile?.organization.orgId}/get_banner/${profile?.organization.organizationBannerUrl}`}
        style={{
          width: '100%',
          height: '40vh',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <StandardPageContainer>
        <OrganizationCard>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ alignItems: 'center' }}
          >
            <Col xs={{ span: 24 }} sm={{ span: 3 }}>
              <Image
                preview={false}
                src={`/api/v1/organization/${profile?.organization.orgId}/get_logo/${profile?.organization.organizationLogoUrl}`}
                style={{
                  width: '100%',
                  height: '10vh',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 21 }}>
              <h1>{profile?.organization.organizationName}</h1>
              <p>{profile?.organization.organizationDescription}</p>
            </Col>
          </Row>
        </OrganizationCard>

        <div style={{ marginTop: 20 }}>
          <h2>Courses Available</h2>
          <RenderCourses />
        </div>
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  )
}
