import React from "react";
import styled from "styled-components";
import {
  Question,
  User,
} from "@koh/common";
import {
  Header
} from "../TAQueueDetail";
import { Description } from "./AllQuestionsChecklist";
import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { FinishHelpingButton } from "../../Banner";
import TAQueueDetailQuestion from "../TAQueueDetailQuestion";

export function CurrentGroupList({
  groupCreator,
  questions,
  queueId,
}: {
  groupCreator: User;
  questions: Question[];
  queueId: number;
}) {
  return (
    <div>
      <Header>
        <div>
          <strong>{`${groupCreator.name}'s Group Session`}</strong>
          <Description>
            {questions.map((q) => q.creator.name).join(", ")}
          </Description>
        </div>
        <div>
          <Tooltip title="Finish Helping">
            <FinishHelpingButton
              icon={<CheckOutlined />}
              // TODO:  onClick={() => changeStatus(ClosedQuestionStatus.Resolved)}
              data-cy="finish-helping-button"
            />
          </Tooltip>
        </div>
      </Header>
      {questions.map((q) => (
        <div key={q.id}>
          <TAQueueDetailQuestion question={q} queueId={queueId} showName showButtons />
        </div>
      ))}
    </div>
  );
}
