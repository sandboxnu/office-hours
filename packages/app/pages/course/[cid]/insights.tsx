import React, { ReactElement, useState } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
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
} from "antd";
import { CardSize } from "antd/lib/card";
import { InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useProfile } from "../../../hooks/useProfile";
import { useRouter } from "next/router";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import {
  DateRangeType,
  InsightComponent,
  InsightDisplayInfo,
} from "@koh/common";
import NavBar from "../../../components/Nav/NavBar";
import BarChartComponent from "../../../components/Insights/components/BarChartComponent";
import SimpleDisplayComponent from "../../../components/Insights/components/SimpleDisplayComponent";
import InsightsDisplayOptions from "../../../components/Insights/components/InsightsDisplayOptions";
import { SimpleTable } from "../../../components/Insights/components/SimpleTable";
import styled from "styled-components";

const InsightsRowContainer = styled.div`
  display: flex;
  direction: ltr;
  margin-left: -0.5%;
  margin-right: -0.5%;
`;

export default function Insights(): ReactElement {
  const profile = useProfile();
  const router = useRouter();
  const { cid } = router.query;

  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const { data: allInsights } = useSWR(`api/v1/insights/listAll`, async () =>
    API.insights.list()
  );
  const [settingsVisible, setSettingsVisible] = useState(false);

  if (!allInsights || !profile?.insights) {
    return null;
  }
  // Group users insights by size (small | default) so they can be rendered correctly
  const [smallInsights, defaultInsights] = profile.insights.reduce(
    ([smallInsights, defaultInsights], insight) =>
      allInsights[insight].size === "small"
        ? [[...smallInsights, insight], defaultInsights]
        : [smallInsights, [...defaultInsights, insight]],
    [[], []]
  );

  const { RangePicker } = DatePicker;

  return (
    <>
      <StandardPageContainer>
        <NavBar courseId={Number(cid)} />
        <Row
          align={"middle"}
          justify={"space-between"}
          style={{ margin: "12px 0px" }}
        >
          <h1 style={{ display: "inline", margin: "0px" }}>
            Insights Dashboard
          </h1>
          <Row>
            <div style={{ maxWidth: "200 px" }}>
              <Tooltip
                title={
                  "If no date range is selected results are from the data for the full semester so far"
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
              <b
                style={{
                  display: "inline-block",
                  marginRight: "12px",
                  marginLeft: "8px",
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
              style={{ marginLeft: "24px" }}
              onClick={() => setSettingsVisible(true)}
            >
              Edit Insights
            </Button>
          </Row>
        </Row>
        <Divider style={{ margin: "0 0 16px 0" }} />
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
              <RenderInsight
                key={insightName}
                insightName={insightName}
                insightDisplay={allInsights[insightName]}
                dateRange={dateRange}
              />
            );
          })}
        </InsightsRowContainer>
        <InsightsRowContainer>
          {defaultInsights?.map((insightName: string) => {
            return (
              <RenderInsight
                key={insightName}
                insightName={insightName}
                insightDisplay={allInsights[insightName]}
                dateRange={dateRange}
              />
            );
          })}
        </InsightsRowContainer>
      </StandardPageContainer>
    </>
  );
}

interface RenderInsightProps {
  insightName: string;
  insightDisplay: InsightDisplayInfo;
  dateRange: DateRangeType;
}

function RenderInsight({
  insightName,
  insightDisplay,
  dateRange,
}: RenderInsightProps): ReactElement {
  const router = useRouter();
  const { cid } = router.query;

  const { data: insightOutput } = useSWR(
    cid &&
      `api/v1/insights/${cid}/${insightName}?start=${dateRange.start}&end=${dateRange.end}`,
    async () =>
      await API.insights.get(Number(cid), insightName, {
        start: dateRange.start,
        end: dateRange.end,
      })
  );

  let DataComponent;
  switch (insightDisplay.component) {
    case InsightComponent.SimpleDisplay:
      DataComponent = SimpleDisplayComponent;
      break;
    case InsightComponent.BarChart:
      DataComponent = BarChartComponent;
      break;
    case InsightComponent.SimpleTable:
      DataComponent = SimpleTable;
      break;
    default:
      // Line below will show error if switch is not exhaustive of all enum values
      componentDoesNotExist(insightDisplay.component);
  }

  return (
    <Card
      size={insightDisplay.size as CardSize}
      title={insightDisplay.displayName}
      style={{
        margin: "0.5%",
        padding: "2px",
        width: insightDisplay.size === "default" ? "50%" : "16.66%",
        maxWidth: insightDisplay.size === "default" ? "625px" : "200px",
      }}
      bodyStyle={{ position: "relative" }}
      extra={
        <Space>
          <Tooltip title={insightDisplay.description}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      }
    >
      {/* {true ? <Spin style={{ margin: '20% 45%' }} /> : <DataComponent key={insightName} output={insightOutput} />} */}
      {insightOutput === undefined ? (
        <Spin style={{ margin: "10% 45%" }} />
      ) : (
        <DataComponent key={insightName} output={insightOutput} />
      )}
    </Card>
  );
}

function componentDoesNotExist(componentName: never): never {
  throw new Error(`Component ${componentName} was unable to be rendered`);
}
