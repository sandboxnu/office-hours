import { UndoOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import {
  ClosedQuestionStatus,
  LimboQuestionStatus,
  Question,
  QuestionStatus,
} from "@koh/common";
import { message, Popconfirm, Tooltip } from "antd";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useQuestions } from "../../../hooks/useQuestions";
import { RequeueButton, CantFindButton, FinishHelpingButton } from "../Banner";
import TAQueueDetailButtons from "./TAQueueDetailButtons";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 12px;
  background: #e1e7ec;
`;
const Email = styled.div`
  font-size: 12px;
  color: #8895a6;
`;

/**
 *  Details about the stuent's question
 */
export default function TAQueueDetail({
  queueId,
  question,
}: {
  queueId: number;
  question: Question;
}) {
  const { mutateQuestions } = useQuestions(queueId);
  return (
    <Container>
      <Header>
        <div>
          <strong>{question.creator.name}</strong>
          <Email>{question.creator.email}</Email>
        </div>
        <div>
          <TAQueueDetailButtons queueId={queueId} question={question} />
        </div>
      </Header>
    </Container>
  );
}
