import { API } from "@koh/api-client";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatus,
} from "@koh/common";
import { Button, Card, Col, Popconfirm, Row } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import getInitialsFromName from "../../../utils/NameUtils";
import AvatarWithInitals from "../../common/AvatarWithInitials";

const HelpCard = styled(Card)`
  margin-bottom: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
`;

const Email = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #8895a6;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #212934;
`;

const HeadingText = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  color: #8895a6;
  font-variant: small-caps;
`;

const BodyText = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #212934;
  margin-bottom: 16px;
`;

const AlertButton = styled(Button)`
  width: 48%;
  font-weight: 500;
  font-size: 14px;
  color: #5f6b79;
  border: 1px solid #cfd6de;
  border-radius: 6px;
`;

const CantFindButton = styled(Button)`
  width: 48%;
  font-weight: 500;
  font-size: 14px;
  color: #da3236;
  background: #f8f9fa;
  border: 1px solid #cfd6de;
  border-radius: 6px;
`;

const FinishButton = styled(Button)`
  margin-top: 12px;
  font-weight: 500;
  font-size: 14px;
  background: #3684c6;
  border-radius: 6px;
`;

interface StudentInfoCardProps {
  updateQuestion: (question: Question, status: QuestionStatus) => void;
  question: Question;
}

const StudentInfoCard = ({
  updateQuestion,
  question,
}: StudentInfoCardProps): ReactElement => {
  const alertStudent = async () => await API.questions.notify(question.id);
  return (
    <HelpCard
      headStyle={{ padding: "0 16px", borderStyle: "none" }}
      bodyStyle={{ padding: "16px" }}
      title={
        <Row justify="space-between">
          <Name>{question.creator.name}</Name>
          <Email>{question.creator.email}</Email>
        </Row>
      }
    >
      <Row>
        <Col span={6}>
          {
            //TODO: bring back photo URL && get rid of RegeX
            //icon={<UserOutlined />}
            //src={question.creator.photoURL}
          }
          <AvatarWithInitals size={64} name={question.creator.name} />
        </Col>
        <Col span={18}>
          <HeadingText>question</HeadingText>
          <BodyText>{question.text ?? ""}</BodyText>
          <HeadingText>location</HeadingText>
          <BodyText>
            {question.isOnline ? "online" : question.location}
          </BodyText>
        </Col>
      </Row>

      <Row justify="space-between">
        <Popconfirm
          title={`Are you sure you want to mark this question as "Can't find"?`}
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            updateQuestion(question, OpenQuestionStatus.CantFind);
            alertStudent();
          }}
        >
          <CantFindButton danger>Can&apos;t Find</CantFindButton>
        </Popconfirm>
      </Row>
      <FinishButton
        block
        type="primary"
        onClick={() => updateQuestion(question, ClosedQuestionStatus.Resolved)}
      >
        Finish Helping
      </FinishButton>
    </HelpCard>
  );
};

export default StudentInfoCard;
