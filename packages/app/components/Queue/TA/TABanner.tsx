import { CheckOutlined, CloseOutlined, UndoOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import {
  ClosedQuestionStatus,
  LimboQuestionStatus,
  Question,
  QuestionStatus,
} from "@koh/common";
import { Col, Popconfirm, Row, Tooltip } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import AvatarWithInitals from "../../common/AvatarWithInitials";
import Banner, {
  CantFindButton,
  FinishHelpingButton,
  RequeueButton,
} from "../Banner";

const Bold = styled.span`
  font-weight: bold;
`;
const InfoHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
  font-variant: small-caps;
  line-height: 1;
`;
const Info = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
`;

interface TABannerProps {
  helpingQuestion: Question;
  updateQuestion: (question: Question, status: QuestionStatus) => Promise<void>;
}
export default function TABanner({
  helpingQuestion,
  updateQuestion,
}: TABannerProps): ReactElement {
  const alertStudent = async () =>
    await API.questions.notify(helpingQuestion.id);

  return (
    <Banner
      titleColor="#3684C6"
      contentColor="#ABD4F3"
      title={
        <span>
          You are helping <Bold>{helpingQuestion.creator.name}</Bold>
        </span>
      }
      content={
        <Row>
          <Col flex="88px">
            {
              //TODO: bring back photo URL && get rid of RegeX
              //icon={<UserOutlined />}
              //src={helpingQuestion.creator.photoURL}
            }
            <AvatarWithInitals
              size={64}
              fontSize={36}
              name={helpingQuestion.creator.name}
            />
          </Col>
          <Col>
            <InfoHeader>question</InfoHeader>
            <Info>{helpingQuestion.text ?? ""}</Info>
            <InfoHeader>type</InfoHeader>
            <Info>{helpingQuestion.questionType ?? ""}</Info>
            <InfoHeader>email</InfoHeader>
            <Info>{helpingQuestion.creator.email ?? ""}</Info>
          </Col>
        </Row>
      }
      buttons={
        <>
          <Popconfirm
            title="Are you sure you want to send this student back to the queue?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              await updateQuestion(
                helpingQuestion,
                LimboQuestionStatus.ReQueueing
              );
            }}
          >
            <Tooltip title="Requeue Student">
              <RequeueButton
                icon={<UndoOutlined />}
                data-cy="requeue-student-button"
              />
            </Tooltip>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you can't find this student?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              await updateQuestion(
                helpingQuestion,
                LimboQuestionStatus.CantFind
              );
              await alertStudent();
            }}
          >
            <Tooltip title="Can't Find">
              <CantFindButton
                shape="circle"
                icon={<CloseOutlined />}
                data-cy="cant-find-button"
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Finish Helping">
            <FinishHelpingButton
              icon={<CheckOutlined />}
              onClick={() =>
                updateQuestion(helpingQuestion, ClosedQuestionStatus.Resolved)
              }
              data-cy="finish-helping-button"
            />
          </Tooltip>
        </>
      }
    />
  );
}
