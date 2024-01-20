import Head from 'next/head'
import React, { ReactElement } from 'react'
import { StandardPageContainer } from '../components/common/PageContainer'
import { Button, Card, Empty, Spin, Tag, Row, Col } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useProfile } from '../hooks/useProfile'
import { OrganizationRole, Role, User } from '@koh/common'
import styled from 'styled-components'
import NavBar from '../components/Nav/NavBar'

const CoursesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: 30px;
  gap: 15px;
`
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
export default function Courses(): ReactElement {
  const profile: User = useProfile()

  function RenderCourses(): ReactElement {
    return profile ? (
      <>
        <h1>My Courses</h1>
        {(profile.organization.organizationRole ===
          OrganizationRole.PROFESSOR ||
          profile.organization.organizationRole === OrganizationRole.ADMIN) && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              marginTop: 100,
              marginRight: 40,
            }}
          >
            <Button type="primary" href={`organization/course/add`}>
              Add New Course
            </Button>
          </div>
        )}
        {profile?.courses.length === 0 ? (
          <Empty description="You are not enrolled in any course" />
        ) : (
          <CoursesSection>
            {profile?.courses.map((course) => (
              <Card
                key={course.course.id}
                style={{
                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                  margin: '7px',
                  width: '350px',
                }}
                cover={
                  <img
                    alt="example"
                    style={{ objectFit: 'cover', height: '20vh' }}
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
                  <Meta title={course.course.name} />
                  <Tag color="success" style={{ textTransform: 'capitalize' }}>
                    {course.role}
                  </Tag>
                </div>
                <Button
                  type="primary"
                  block
                  style={{ marginTop: 15 }}
                  href={`course/${course.course.id}/today`}
                >
                  Course page
                </Button>
                {course.role === Role.PROFESSOR && (
                  <Button
                    type="primary"
                    block
                    style={{ marginTop: 15 }}
                    href={`organization/course/${course.course.id}/edit`}
                  >
                    Edit Course
                  </Button>
                )}
              </Card>
            ))}
          </CoursesSection>
        )}
      </>
    ) : (
      <Spin />
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
      <img
        src={`/api/v1/organization/${profile?.organization.orgId}/get_banner/${profile?.organization.organizationBannerUrl}`}
        style={{
          width: '100%',
          height: '40vh',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        alt="Organization Banner"
      />
      <StandardPageContainer style={{ position: 'relative' }}>
        <OrganizationCard>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ alignItems: 'center' }}
          >
            <Col xs={{ span: 24 }} sm={{ span: 3 }}>
              <img
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
          <RenderCourses />
        </div>
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  )
}
