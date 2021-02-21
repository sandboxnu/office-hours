import { ReactElement } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { Form, Switch } from "antd";
import { useProfile } from "../../../hooks/useProfile";

interface InsightsDisplayOptionsProps {
  toggleInsightOn: (insightName: string) => void;
  toggleInsightOff: (insightName: string) => void;
}

export default function InsightsDisplayOptions({
  toggleInsightOn,
  toggleInsightOff,
}: InsightsDisplayOptionsProps): ReactElement {
  const profile = useProfile();
  const { data: insightsList, error, mutate } = useSWR(
    `api/v1/insights`,
    async () => API.insights.list()
  );

  return (
    <>
      <br />
      <Form form={null} initialValues={null}>
        {insightsList &&
          Object.entries(insightsList)?.map(([insightName, insightPartial]) => (
            <Form.Item
              key={insightName}
              label={insightPartial.displayName}
              initialValue={profile?.insights?.includes(insightName)}
              valuePropName="checked"
              name={insightName}
            >
              <Switch
                onChange={(checked) => {
                  if (checked) {
                    toggleInsightOn(insightName);
                  } else {
                    toggleInsightOff(insightName);
                  }
                }}
              />
            </Form.Item>
          ))}
      </Form>
    </>
  );
}
