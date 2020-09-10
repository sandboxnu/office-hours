import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatus,
} from "@koh/common";
import { Avatar, Col, Popconfirm, Row } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import nameToRGB from "../../../utils/ColorUtils";
import getInitialsFromName from "../../../utils/NameUtils";
import Banner, { BannerButton, BannerDangerButton } from "../Banner";

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
            <Avatar
              size={64}
              style={{
                backgroundColor: nameToRGB(helpingQuestion.creator.name),
              }}
            >
              {getInitialsFromName(helpingQuestion.creator.name)}
            </Avatar>
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
            title="Are you sure you want to delete this question from the queue?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              await updateQuestion(
                helpingQuestion,
                OpenQuestionStatus.TADeleted
              );
              await alertStudent();
            }}
          >
            <BannerDangerButton icon={<CloseOutlined />}>
              Remove from Queue
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
