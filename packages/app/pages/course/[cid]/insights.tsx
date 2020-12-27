import React, { ReactElement } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { Tooltip, Card, Space } from "antd";
import { CardSize } from "antd/lib/card";
import { CloseSquareOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import { InsightDisplay } from "@koh/common";
import NavBar from "../../../components/Nav/NavBar";
import Link from "next/link";
import { SettingsOptions } from "../../../components/Settings/SettingsPage";
import SimpleChartComponent from "../../../components/Insights/components/SimpleChartComponent";
import SimpleDisplayComponent from "../../../components/Insights/components/SimpleDisplayComponent";

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
        <h1 style={{ margin: "24px" }}>Insights Dashboard</h1>
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
        <Link
          href={{
            pathname: "/settings",
            query: { cid, defaultPage: SettingsOptions.INSIGHTS },
          }}
        >
          <a style={{ marginLeft: "24px" }}>View Insights Settings</a>
        </Link>
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
      size={insight.size as CardSize}
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
      style={insight.style}
    >
      <InsightComponent key={insight.name} {...insight} />
    </Card>
  );
}

function componentDoesNotExist(componentName: never): never {
  throw new Error(`Component ${componentName} was unable to be rendered`);
}
