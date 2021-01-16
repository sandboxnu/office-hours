import React, { ReactElement, useState } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { Tooltip, Card, Space, Drawer, Button } from "antd";
import { CardSize } from "antd/lib/card";
import { InfoCircleOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import { InsightDisplay } from "@koh/common";
import NavBar from "../../../components/Nav/NavBar";
import SimpleChartComponent from "../../../components/Insights/components/SimpleChartComponent";
import SimpleDisplayComponent from "../../../components/Insights/components/SimpleDisplayComponent";
import InsightsDisplayOptions from "../../../components/Insights/components/InsightsDisplayOptions";

export default function Insights(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;
  const { data: profile, mutate: mutateProfile } = useSWR(
    `api/v1/profile`,
    async () => API.profile.index()
  );
  const { data: allInsights } = useSWR(`api/v1/insights/listAll`, async () =>
    API.insights.list()
  );
  const [settingsVisible, setSettingsVisible] = useState(false);

  const toggleInsightOn = async (insightName) => {
    await API.insights.toggleOn(insightName);
    mutateProfile();
  };

  const toggleInsightOff = async (insightName) => {
    await API.insights.toggleOff(insightName);
    mutateProfile();
  };

  if (!allInsights || !profile?.insights) {
    return null;
  }
  // Group users insights by size (small | default) so they can be rendered correctly
  const [smallInsights, defaultInsights] = profile.insights.reduce(
    ([s, d], i) =>
      allInsights[i].size === "small" ? [[...s, i], d] : [s, [...d, i]],
    [[], []]
  );

  return (
    <>
      <StandardPageContainer>
        <NavBar courseId={Number(cid)} />
        <h1 style={{ margin: "24px" }}>Insights Dashboard</h1>
        <Drawer
          title="Display Options"
          placement="left"
          closable={true}
          destroyOnClose={true}
          onClose={() => setSettingsVisible(false)}
          visible={settingsVisible}
          width={400}
        >
          <InsightsDisplayOptions
            toggleInsightOn={toggleInsightOn}
            toggleInsightOff={toggleInsightOff}
          />
        </Drawer>
        <div style={{ display: "flex", direction: "ltr" }}>
          {smallInsights?.map((insightName: string) => {
            return (
              <RenderInsight
                key={insightName}
                insightName={insightName}
                toggleInsightOff={toggleInsightOff}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", direction: "ltr" }}>
          {defaultInsights?.map((insightName: string) => {
            return (
              <RenderInsight
                key={insightName}
                insightName={insightName}
                toggleInsightOff={toggleInsightOff}
              />
            );
          })}
        </div>
        <Button
          style={{ marginLeft: "24px", width: "256px" }}
          onClick={() => setSettingsVisible(true)}
        >
          Open Insights Display Options
        </Button>
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
      size={insight.size as CardSize}
      title={insight.displayName}
      style={{
        margin: "8px",
        width: insight.size === "default" ? "50%" : "20%",
        maxWidth: insight.size === "default" ? "" : "200px",
      }}
      extra={
        <Space>
          <Tooltip placement="topRight" title="Hide">
            <MinusSquareOutlined
              onClick={() => toggleInsightOff(insightName)}
            />
          </Tooltip>
          <Tooltip placement="topRight" title={insight.description}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      }
    >
      <InsightComponent key={insight.name} {...insight} />
    </Card>
  );
}

function componentDoesNotExist(componentName: never): never {
  throw new Error(`Component ${componentName} was unable to be rendered`);
}
