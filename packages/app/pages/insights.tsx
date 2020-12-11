import { ReactElement } from "react";
import { StandardPageContainer } from "../components/common/PageContainer";
import { API } from "@koh/api-client";
import useSWR from "swr";
import SimpleDisplayComponent from "../components/Insights/components/SimpleDisplayComponent";


export default function Insights(): ReactElement {
    const { data: insights, error, mutate } = useSWR(`api/v1/insights`, async () =>
        API.insights.get()
    );

    const insightsComponents = {
        SimpleDisplay: SimpleDisplayComponent,
    }

    return (
        <StandardPageContainer>
            {insights?.map((insight) => {
                const InsightComponent = insightsComponents[insight.component];
                return <InsightComponent key={insight.name} insight={insight} />
            })}
        </StandardPageContainer>
    )
}
