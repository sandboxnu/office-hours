import { ReactElement } from "react";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { Form, Switch } from "antd";
import { useProfile } from "../../hooks/useProfile";

export default function InsightsSettings(): ReactElement {
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
            key={insight}
            label={insight}
            initialValue={profile?.insights?.includes(insight)}
            valuePropName="checked"
            name={insight}
          >
            <Switch
              onChange={(checked) => {
                if (checked) {
                  API.insights.toggleOn(insight);
                } else {
                  API.insights.toggleOff(insight);
                }
              }}
            />
          </Form.Item>
        ))}
      </Form>
    </>
  );
}
