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

export default function InsightsDisplayOptions(): ReactElement {
  const { data: profile, mutate: mutateProfile } = useSWR(
    `api/v1/profile`,
    async () => API.profile.index()
  );
  const { data: insightsList } = useSWR(
    `api/v1/insights`,
    async () => API.insights.list()
  );

  const toggleInsightOn = async (insightName: string) => {
    await API.insights.toggleOn(insightName);
    mutateProfile();
  };

  const toggleInsightOff = async (insightName: string) => {
    await API.insights.toggleOff(insightName);
    mutateProfile();
  };

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
