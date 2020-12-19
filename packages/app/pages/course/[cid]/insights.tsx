import React, { ReactElement } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { Tooltip, Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useProfile } from "../../../hooks/useProfile";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import SimpleDisplayComponent from "../../../components/Insights/components/SimpleDisplayComponent";
import SimpleChartComponent from "../../../components/Insights/components/SimpleChartComponent";

export default function Insights(): ReactElement {
  const profile = useProfile();

  return (
    <>
      <StandardPageContainer>
        {profile?.insights && profile.insights?.map((insightName) => {
          return <RenderInsight key={insightName} insightName={insightName} />;
        })}
      </StandardPageContainer>
    </>
  );
}

interface RenderInsightProps {
  insightName: string;
}

function RenderInsight({ insightName }: RenderInsightProps): ReactElement {
  const router = useRouter();
  const { cid } = router.query;
  
  const {
    data: insight,
    error,
    mutate,
  } = useSWR(`api/v1/insights/${cid}/${insightName}`, async () =>
    API.insights.get(Number(cid), insightName)
  );

  if (!insight) {
    // TODO: Create loading shell
    return null;
  }

  // Determine which insight component to render
  let InsightComponent;
  switch (insight.component) {
    case "SimpleDisplay":
      InsightComponent = SimpleDisplayComponent;
      break;
    case "SimpleChart":
      InsightComponent = SimpleChartComponent;
      break;
    default:
      // Return an error component
      // Log error
  };

  return (
    <Card
      size="small"
      title={insight.displayName}
      extra={
        <Tooltip placement="topRight" title={insight.description}>
          <InfoCircleOutlined />
        </Tooltip>
      }
      style={{ width: '300px', margin: '10px' }}
    >
      <InsightComponent key={insight.name} {...insight} />
    </Card>
  );
}
