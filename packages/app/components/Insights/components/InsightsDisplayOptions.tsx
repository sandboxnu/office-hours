import React, { ReactElement } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { Divider, Switch } from "antd";
import { useProfile } from "../../../hooks/useProfile";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
  margin-bottom: 16px;
`;
interface InsightsDisplayOptionsProps {
  toggleInsightOn: (insightName: string) => void;
  toggleInsightOff: (insightName: string) => void;
}

export default function InsightsDisplayOptions({
  toggleInsightOn,
  toggleInsightOff,
}: InsightsDisplayOptionsProps): ReactElement {
  const profile = useProfile();
  const { data: insightsList } = useSWR(
    `api/v1/insights`,
    async () => API.insights.list()
  );

  return (
    <>
      <div>
        {insightsList &&
          Object.entries(insightsList)?.map(([insightName, insightPartial]) => (
            <div  key={insightName}>
            <Row>
              <div>{insightPartial.displayName}</div>
              <Switch
                checked={profile?.insights?.includes(insightName)}
                onChange={(checked) => {
                  if (checked) {
                    toggleInsightOn(insightName);
                  } else {
                    toggleInsightOff(insightName);
                  }
                }}
              />
              </Row>
              <Divider />
              </div>
          ))}
      </div>
    </>
  );
}
