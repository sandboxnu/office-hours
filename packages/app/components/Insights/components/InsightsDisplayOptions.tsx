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
        {insightsList?.map((insight) => (
          <Form.Item
            key={insight.name}
            label={insight.displayName}
            initialValue={profile?.insights?.includes(insight.name)}
            valuePropName="checked"
            name={insight.name}
          >
            <Switch
              onChange={(checked) => {
                if (checked) {
                  toggleInsightOn(insight.name);
                } else {
                  toggleInsightOff(insight.name);
                }
              }}
            />
          </Form.Item>
        ))}
      </Form>
    </>
  );
}
