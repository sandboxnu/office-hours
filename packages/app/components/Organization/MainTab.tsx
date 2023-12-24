import { Card, Col, Row, Spin } from 'antd'
import { ReactElement } from 'react'
import './styles.css'
import useSWR from 'swr'
import { API } from '@koh/api-client'

export default function MainTab({
  userName,
  organizationId,
}: {
  userName: string
  organizationId: number
}): ReactElement {
  const { data } = useSWR(
    organizationId ? `/api/v1/organization/${organizationId}/stats` : null,
    async () => await API.organizations.getStats(organizationId),
  )

  return !data || organizationId === undefined ? (
    <Spin tip="Loading..." />
  ) : (
    <>
      <div>
        <span style={{ fontWeight: 400, color: '#64657c' }}>Welcome Back,</span>
        <h1 style={{ lineHeight: 1, fontWeight: 500 }}>
          <strong>{userName}</strong>
        </h1>
      </div>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: 30 }}>
        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <Card className="firstCard">
            <div style={{ textAlign: 'right' }}>
              <h2 className="titleCardStatistics">{data.members}</h2>
              <span className="cardDescription">Members</span>
            </div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <Card className="secondCard">
            <div style={{ textAlign: 'right' }}>
              <h2 className="titleCardStatistics">{data.courses}</h2>
              <span className="cardDescription">Courses</span>
            </div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <Card className="thirdCard">
            <div style={{ textAlign: 'right' }}>
              <h2 className="titleCardStatistics">{data.membersProfessors}</h2>
              <span className="cardDescription">Professors</span>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}
