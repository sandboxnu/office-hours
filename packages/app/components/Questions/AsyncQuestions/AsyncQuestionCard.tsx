import { RightOutlined } from '@ant-design/icons'
import { Card, Divider, Row, Skeleton } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const CustomCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 25px;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  // make the box shadow more pronounced on mobile to make it look more clickable
  @media (max-width: 650px) {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  }

  .ant-card-body {
    padding-top: 16px;
  }

  // hover effect
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.45);

    .ant-card-head {
      background: rgb(70, 76, 121) !important;
      transition: color 0.3s ease-in-out !important;
    }

    // make the green arrow right on hover (still uncertain on whether to keep this)
    .anticon.anticon-right {
      color: lightgreen;
      transition: color 0.3s ease-in-out;
    }
  }
`

const QueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const QueueCardDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 0;
`

const NotesSkeleton = styled(Skeleton)`
  width: 60%;
`

const AsyncQuestionCard = (): ReactElement => {
  const router = useRouter()
  const { cid } = router.query
  return (
    <Link
      href="/course/[cid]/async_question"
      as={`/course/${cid}/async_question`}
    >
      <CustomCard
        headStyle={{
          background: 'rgb(60, 66, 111)',
          color: '#FFFFFF',
          borderRadius: '6px 6px 0 0',
        }}
        className={'open-queue-card'}
        title="Async Question Centre"
        extra={<RightOutlined className=" text-3xl text-gray-100" />}
      >
        <QueueInfoRow>
          <h4 className="italic text-gray-600">Ask your questions any time!</h4>
        </QueueInfoRow>

        <Row justify="space-between" align="middle"></Row>
      </CustomCard>
    </Link>
  )
}

export default AsyncQuestionCard

export function QueueCardSkeleton(): ReactElement {
  return (
    <CustomCard
      headStyle={{
        background: '#25426C',
        color: '#FFFFFF',
        borderRadius: '6px 6px 0 0',
      }}
      className={'open-queue-card'}
      title={<Skeleton title={false} paragraph={{ rows: 1 }} />}
    >
      <QueueInfoRow>
        <Skeleton title paragraph={{ rows: 0 }} />
        <Skeleton.Button size="large" />
      </QueueInfoRow>
      <Skeleton.Avatar size={96} />
      <QueueCardDivider />
      <Row justify="space-between" align="bottom">
        <NotesSkeleton title={false} paragraph={{ rows: 1 }} />
        <Skeleton.Button size="large" style={{ marginTop: '12px' }} />
      </Row>
    </CustomCard>
  )
}
