import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, Row, Col, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  Question,
  QuestionStatus,
  ClosedQuestionStatus,
  OpenQuestionStatus,
} from "@template/common";

const HelpCard = styled(Card)`
  margin-bottom: 16px;
`;

const Email = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #bfbfbf;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

const HeadingText = styled.div`
  color: #bfbfbf;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  font-variant: small-caps;
`;

const BodyText = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #595959;
  margin-bottom: 16px;
`;

const HalfButton = styled(Button)`
  width: 48%;
`;

const FinishButton = styled(Button)`
  margin-top: 12px;
`;

interface StudentInfoCardProps {
  updateQuestion: (question: Question, status: QuestionStatus) => void;
  alertStudent: (question: Question) => void;
}

const StudentInfoCard = ({
  updateQuestion,
  alertStudent,
}: StudentInfoCardProps) => {
  return useMemo(() => {
    return (
      <HelpCard
        headStyle={{ padding: "0 16px" }}
        bodyStyle={{ padding: "16px" }}
        title={
          <Row justify="space-between">
            <Name>Alex Takayama</Name>
            <Email>takayama.a@northeastern.edu</Email>
          </Row>
        }
      >
        <Row>
          <Col span={6}>
            <Avatar size={64} icon={<UserOutlined />} />
          </Col>
          <Col span={18}>
            <HeadingText>question</HeadingText>
            <BodyText>
              Help with working out how to use an accumulator for problem 1
            </BodyText>
            <HeadingText>location</HeadingText>
            <BodyText>Outside room, by the couches</BodyText>
          </Col>
        </Row>

        <Row justify="space-between">
          <HalfButton
            onClick={
              // TODO: replace w question
              () => alertStudent(null)
            }
          >
            Alert
          </HalfButton>
          <HalfButton
            danger
            onClick={
              // TODO: replace w question
              () => updateQuestion(null, ClosedQuestionStatus.NoShow)
            }
          >
            Can't Find
          </HalfButton>
        </Row>
        <FinishButton
          block
          type="primary"
          onClick={
            // TODO: replace w question
            () => updateQuestion(null, ClosedQuestionStatus.Resolved)
          }
        >
          Finish Helping
        </FinishButton>
      </HelpCard>
    );
  }, []);
};

export default StudentInfoCard;
