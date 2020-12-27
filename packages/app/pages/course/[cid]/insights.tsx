import React, { ReactElement } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { Tooltip, Card, Space } from "antd";
import { CloseSquareOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import SimpleDisplayComponent from "../../../components/Insights/components/SimpleDisplayComponent";
import SimpleChartComponent from "../../../components/Insights/components/SimpleChartComponent";
import { InsightDisplay } from "@koh/common";
import NavBar from "../../../components/Nav/NavBar";

export default function Insights(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;
  const { data: profile, error, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const toggleInsightOff = async (insightName) => {
    await API.insights.toggleOff(insightName);
    mutate();
  };

  return (
    <>
      <StandardPageContainer>
        <NavBar courseId={Number(cid)} />
        <h1 style={{ margin: "20px" }}>Insights Dashboard</h1>
        <div style={{ display: "flex", direction: "ltr" }}>
          {profile?.insights?.map((insightName: string) => {
            return (
              <RenderInsight
                key={insightName}
                insightName={insightName}
                toggleInsightOff={toggleInsightOff}
              />
            );
          })}
        </div>
      </StandardPageContainer>
    </>
  );
}

interface RenderInsightProps {
  insightName: string;
  toggleInsightOff: (insightName: string) => void;
}

function RenderInsight({
  insightName,
  toggleInsightOff,
}: RenderInsightProps): ReactElement {
  const router = useRouter();
  const { cid } = router.query;

  const { data: insight, error, mutate } = useSWR(
    cid && `api/v1/insights/${cid}/${insightName}`,
    async () => API.insights.get(Number(cid), insightName)
  );

  if (!insight) {
    // TODO: Create loading shell
    return null;
  }

  // Determine which insight component to render
  let InsightComponent;
  switch (insight.component) {
    case InsightDisplay.SimpleDisplay:
      InsightComponent = SimpleDisplayComponent;
      break;
    case InsightDisplay.SimpleChart:
      InsightComponent = SimpleChartComponent;
      break;
    default:
      // Line below will show error if switch is not exhaustive of all enum values
      componentDoesNotExist(insight.component);
  }

  return (
    <Card
      size="small"
      title={insight.displayName}
      extra={
        <Space>
          <Tooltip placement="topRight" title="Hide">
            <CloseSquareOutlined
              onClick={() => toggleInsightOff(insightName)}
            />
          </Tooltip>
          <Tooltip placement="topRight" title={insight.description}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      }
      style={{ width: "200px", margin: "10px" }}
    >
      <InsightComponent key={insight.name} {...insight} />
    </Card>
  );
}

function componentDoesNotExist(componentName: never): never {
  throw new Error(`Component ${componentName} was unable to be rendered`);
}
