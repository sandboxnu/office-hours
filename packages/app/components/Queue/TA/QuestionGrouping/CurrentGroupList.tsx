import { CheckOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { QuestionGroup } from "@koh/common";
import { Tooltip } from "antd";
import React, { ReactElement } from "react";
import { FinishHelpingButton } from "../../Banner";
import { Header } from "../TAQueueDetail";
import TAQueueDetailQuestion from "../TAQueueDetailQuestion";
import { Description } from "./AllQuestionsChecklist";

export function CurrentGroupList({
  group,
  queueId,
}: {
  group?: QuestionGroup;
  queueId: number;
}): ReactElement {
  console.log(`HELLOOOOO`, group);
  return (
    <div>
      <Header>
        <div>
          <strong>{`${group?.creator.name}'s Group Session`}</strong>
          <Description>
            {group?.questions.map((q) => q.creator.name).join(", ")}
          </Description>
        </div>
        <div>
          <Tooltip title="Finish Helping">
            <FinishHelpingButton
              icon={<CheckOutlined />}
              onClick={() => API.questions.resolveGroup(group?.id, queueId)}
              data-cy="finish-helping-button"
            />
          </Tooltip>
        </div>
      </Header>
      {group?.questions.map((q) => (
        <div key={q.id}>
          <TAQueueDetailQuestion
            question={q}
            queueId={queueId}
            showName
            showButtons
          />
        </div>
      ))}
    </div>
  );
}
