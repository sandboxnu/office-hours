import Banner, { BannerDangerButton, BannerButton } from "./Banner";
import {
  Question,
  QuestionStatus,
  ClosedQuestionStatus,
} from "@template/common";
import { ReactElement } from "react";
import { Row, Col, Avatar, Popconfirm } from "antd";
import {
  UserOutlined,
  QuestionOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

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
  updateQuestion: (question: Question, status: QuestionStatus) => void;
}
export default function TABanner({
  helpingQuestion,
  updateQuestion,
}: TABannerProps): ReactElement {
  return (
    <Banner
      title={
        <span>
          You are helping <Bold>{helpingQuestion.creator.name}</Bold>
        </span>
      }
      content={
        <Row>
          <Col flex="88px">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={helpingQuestion.creator.photoURL}
            />
          </Col>
          <Col>
            <InfoHeader>question</InfoHeader>
            <Info>{helpingQuestion.text ?? ""}</Info>
            <InfoHeader>type</InfoHeader>
            <Info>{helpingQuestion.questionType ?? ""}</Info>
          </Col>
        </Row>
      }
      buttons={
        <>
          <Popconfirm
            title={`Are you sure you want to mark this question as "Can't find"?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              updateQuestion(helpingQuestion, ClosedQuestionStatus.NoShow);
            }}
          >
            <BannerDangerButton icon={<QuestionOutlined />}>
              Can&apos;t Find
            </BannerDangerButton>
          </Popconfirm>
          <BannerButton
            icon={<CheckOutlined />}
            onClick={() =>
              updateQuestion(helpingQuestion, ClosedQuestionStatus.Resolved)
            }
          >
            Finish Helping
          </BannerButton>
        </>
      }
    />
  );
}
