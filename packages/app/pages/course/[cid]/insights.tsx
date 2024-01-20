import React, { ReactElement, useState } from 'react'

import { API } from '@koh/api-client'
import useSWR from 'swr'
import {
  Tooltip,
  Card,
  Space,
  Drawer,
  Button,
  DatePicker,
  Divider,
  Row,
  Spin,
} from 'antd'
import { CardSize } from 'antd/lib/card'
import DefaultErrorPage from 'next/error'
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useProfile } from '../../../hooks/useProfile'
import {
  BarChartOutputType,
  DateRangeType,
  InsightComponent,
  InsightDisplayInfo,
  Role,
  SimpleDisplayOutputType,
  SimpleTableOutputType,
} from '@koh/common'

import BarChartComponent from '../../../components/Insights/components/BarChartComponent'
import SimpleDisplayComponent from '../../../components/Insights/components/SimpleDisplayComponent'
import InsightsDisplayOptions from '../../../components/Insights/components/InsightsDisplayOptions'
import { SimpleTable } from '../../../components/Insights/components/SimpleTable'
import NavBar from '../../../components/Nav/NavBar'
import { StandardPageContainer } from '../../../components/common/PageContainer'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { SetStateAction } from 'react'
import { Dispatch } from 'react'
import { useRoleInCourse } from '../../../hooks/useRoleInCourse'

const InsightsRowContainer = styled.div`
  display: flex;
  direction: ltr;
  margin-left: -0.5%;
  margin-right: -0.5%;
`

export default function Insights(): ReactElement {
  const profile = useProfile()
  const router = useRouter()
  const { cid } = router.query
  const role = useRoleInCourse(Number(cid))

  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [mostActiveStudentsPage, setMostActiveStudentsPage] = useState(1)

  const { data: allInsights } = useSWR(`api/v1/insights/listAll`, async () =>
    API.insights.list(),
  )
  const [settingsVisible, setSettingsVisible] = useState(false)

  if (!allInsights || !profile?.insights) {
    return null
  }
  // Group users insights by size (small | default) so they can be rendered correctly
  const [smallInsights, defaultInsights] = profile.insights.reduce(
    ([smallInsights, defaultInsights], insight) =>
      allInsights[insight].size === 'small'
        ? [[...smallInsights, insight], defaultInsights]
        : [smallInsights, [...defaultInsights, insight]],
    [[], []],
  )

  const { RangePicker } = DatePicker

  if (role !== Role.PROFESSOR && role !== Role.TA) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <>
      <StandardPageContainer>
        <NavBar courseId={Number(cid)} />
        <Row
          align={'middle'}
          justify={'space-between'}
          style={{ margin: '12px 0px' }}
        >
          <h1 style={{ display: 'inline', margin: '0px' }}>
            Insights Dashboard
          </h1>
          <Row>
            <div style={{ maxWidth: '200 px' }}>
              <Tooltip
                title={
                  'If no date range is selected results are from the data for the full semester so far'
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
              <b
                style={{
                  display: 'inline-block',
                  marginRight: '12px',
                  marginLeft: '8px',
                }}
              >
                Date Range
              </b>
              <RangePicker
                onChange={(_, dateString) =>
                  setDateRange({ start: dateString[0], end: dateString[1] })
                }
              />
            </div>
            <Button
              style={{ marginLeft: '24px' }}
              onClick={() => setSettingsVisible(true)}
            >
              Edit Insights
            </Button>
          </Row>
        </Row>
        <Divider style={{ margin: '0 0 16px 0' }} />
        <Drawer
          title="Display Options"
          placement="left"
          closable={true}
          destroyOnClose={true}
          onClose={() => setSettingsVisible(false)}
          visible={settingsVisible}
          width={400}
        >
          <InsightsDisplayOptions />
        </Drawer>
        <InsightsRowContainer>
          {smallInsights?.map((insightName: string) => {
            return (
              <MemoizedRenderInsight
                key={insightName}
                insightName={insightName}
                insightDisplay={allInsights[insightName]}
                dateRange={dateRange}
                mostActiveStudentsPage={mostActiveStudentsPage}
                setMostActiveStudentsPage={setMostActiveStudentsPage}
              />
            )
          })}
        </InsightsRowContainer>
        <InsightsRowContainer>
          {defaultInsights?.map((insightName: string) => {
            return (
              <MemoizedRenderInsight
                key={insightName}
                insightName={insightName}
                insightDisplay={allInsights[insightName]}
                dateRange={dateRange}
                mostActiveStudentsPage={mostActiveStudentsPage}
                setMostActiveStudentsPage={setMostActiveStudentsPage}
              />
            )
          })}
        </InsightsRowContainer>
      </StandardPageContainer>
    </>
  )
}

interface RenderInsightProps {
  insightName: string
  insightDisplay: InsightDisplayInfo
  dateRange: DateRangeType
  mostActiveStudentsPage: number
  setMostActiveStudentsPage: Dispatch<SetStateAction<number>>
}

const equalRenderInsights = (
  prevProps: RenderInsightProps,
  nextProps: RenderInsightProps,
): boolean => {
  if (
    prevProps.insightName === 'MostActiveStudents' &&
    nextProps.insightName === 'MostActiveStudents'
  ) {
    return (
      prevProps.mostActiveStudentsPage === nextProps.mostActiveStudentsPage &&
      prevProps.dateRange.start === nextProps.dateRange.start &&
      prevProps.dateRange.end === nextProps.dateRange.end
    )
  } else {
    return (
      prevProps.insightName === nextProps.insightName &&
      prevProps.dateRange.start === nextProps.dateRange.start &&
      prevProps.dateRange.end === nextProps.dateRange.end
    )
  }
}
const MemoizedRenderInsight = React.memo(RenderInsight, equalRenderInsights)

function RenderInsight({
  insightName,
  insightDisplay,
  dateRange,
  mostActiveStudentsPage,
  setMostActiveStudentsPage,
}: RenderInsightProps): ReactElement {
  const router = useRouter()
  const { cid } = router.query
  const limit = insightName === 'MostActiveStudents' ? 6 : null
  const offset =
    insightName === 'MostActiveStudents'
      ? (mostActiveStudentsPage - 1) * limit
      : null
  const { data: insightOutput } = useSWR(
    cid &&
      `api/v1/insights/${cid}/${insightName}?start=${dateRange.start}&end=${
        dateRange.end
      }${limit ? 'limit&6' : ''}${offset ? `offset&${offset}` : ''}`,
    async () =>
      await API.insights.get(Number(cid), insightName, {
        start: dateRange.start,
        end: dateRange.end,
        limit,
        offset,
      }),
  )

  let insightComponent
  if (insightOutput === undefined) {
    insightComponent = <Spin style={{ margin: '10% 45%' }} />
  } else {
    switch (insightDisplay.component) {
      case InsightComponent.SimpleDisplay:
        insightComponent = (
          <SimpleDisplayComponent
            key={insightName}
            output={insightOutput as SimpleDisplayOutputType}
          />
        )
        break
      case InsightComponent.BarChart:
        insightComponent = (
          <BarChartComponent
            key={insightName}
            output={insightOutput as BarChartOutputType}
          />
        )
        break
      case InsightComponent.SimpleTable:
        insightComponent = (
          <SimpleTable
            key={insightName}
            output={insightOutput as SimpleTableOutputType}
            currentPage={mostActiveStudentsPage}
            setPage={setMostActiveStudentsPage}
          />
        )
        break
      default:
        // Line below will show error if switch is not exhaustive of all enum values
        componentDoesNotExist(insightDisplay.component)
    }
  }

  return (
    <Card
      size={insightDisplay.size as CardSize}
      title={insightDisplay.displayName}
      style={{
        margin: '0.5%',
        padding: '2px',
        width: insightDisplay.size === 'default' ? '50%' : '16.66%',
        maxWidth: insightDisplay.size === 'default' ? '625px' : '200px',
      }}
      bodyStyle={{ position: 'relative' }}
      extra={
        <Space>
          <Tooltip title={insightDisplay.description}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      }
    >
      {insightComponent}
    </Card>
  )
}

function componentDoesNotExist(componentName: never): never {
  throw new Error(`Component ${componentName} was unable to be rendered`)
}
