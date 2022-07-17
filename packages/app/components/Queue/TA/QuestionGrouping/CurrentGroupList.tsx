import { CheckOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { QuestionGroup } from "@koh/common";
import { Tooltip } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { FinishHelpingButton } from "../../Banner";
import { Header } from "../TAQueueDetail";
import TAQueueDetailButtons from "../TAQueueDetailButtons";
import TAQueueDetailQuestion from "../TAQueueDetailQuestion";
import { Description, GroupingButtonContainer } from "./AllQuestionsChecklist";

const QuestionContainer = styled.div`
  @media (max-width: 650px) {
    padding: 1px;
    border-bottom: 1px solid #cfd6de;
  }
`;

export function CurrentGroupList({
  group,
  queueId,
  courseId,
}: {
  group?: QuestionGroup;
  queueId: number;
  courseId: number;
}): ReactElement {
  const isMobile = useIsMobile();

  const FinishButton = ({ children }: { children?: React.ReactChild }) => (
    <FinishHelpingButton
      icon={<CheckOutlined />}
      onClick={() => API.questions.resolveGroup(group?.id, queueId)}
      data-cy="finish-helping-button"
    >
      {children}
    </FinishHelpingButton>
  );

  return (
    <div>
      <Header>
        <div>
          <strong>{`${group?.creator.name}'s Group Session`}</strong>
          <Description>
            {group?.questions.map((q) => q.creator.name).join(", ")}
          </Description>
        </div>
        {!isMobile && (
          <div>
            <Tooltip title="Finish Helping">
              <FinishButton />
            </Tooltip>
          </div>
        )}
      </Header>
      {isMobile && (
        <GroupingButtonContainer>
          <FinishButton>Finish Helping All</FinishButton>
        </GroupingButtonContainer>
      )}
      {group?.questions.map((q) => (
        <QuestionContainer key={q.id}>
          <TAQueueDetailQuestion
            courseId={courseId}
            question={q}
            queueId={queueId}
            showName
            showButtons={!isMobile}
            hasUnresolvedRephraseAlert={false}
          />
          {isMobile && (
            <TAQueueDetailButtons
              courseId={courseId}
              queueId={queueId}
              question={q}
              hasUnresolvedRephraseAlert={false}
            />
          )}
        </QuestionContainer>
      ))}
    </div>
  );
}
