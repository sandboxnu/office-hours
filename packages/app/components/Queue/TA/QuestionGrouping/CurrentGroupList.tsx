import React from "react";
import { Question, QuestionGroup, User } from "@koh/common";
import { Header } from "../TAQueueDetail";
import { Description } from "./AllQuestionsChecklist";
import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { FinishHelpingButton } from "../../Banner";
import TAQueueDetailQuestion from "../TAQueueDetailQuestion";
import { API } from "@koh/api-client";

export function CurrentGroupList({
  group,
  queueId,
}: {
  group?: QuestionGroup;
  queueId: number;
}) {
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
              onClick={() => API.questions.resolveGroup({ groupId: group?.id })}
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
