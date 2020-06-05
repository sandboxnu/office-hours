import { useMemo } from "react";
import { Row, Button, Avatar, Typography, Tag, Col } from "antd";
import styled from "styled-components";
import { IconMap } from "antd/lib/result";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";

const PopupDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 33%;
  height: 100%;
  background-color: white;
  border-left: 0.5px solid #eceef4;
  display: block;
`;

const CancelDiv = styled.div`
  width: 100%;
`;

const FullWidth = styled.div`
  width: 100%;
`;

const StudentDataDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Email = styled.p`
  padding: 0.25;
  margin: 0;
  color: #bfbfbf;
`;

const Title = styled.h1`
  padding: 0;
  margin: 0;
`;

const InfoTextDiv = styled.div`
  text-align: center;
`;

const StatusTag = styled(Tag)`
  width: 96px;
  text-align: center;
  float: right;
  margin-right: 0;
`;

const StatusDiv = styled.div`
  padding: 1%;
  margin: 1%;
`;

const WaitDiv = styled.div`
  margin-left: 20%;
`;

const HeadingText = styled.p`
  color: #bfbfbf;
  font-weight: 600;
`;

const StyledRow = styled(Row)`
  width: 100%;
`;

const QuestionTypeDiv = styled.div`
  margin-right: 20%;
  float: right;
`;

const MarginLeft = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
`;

interface StudentPopupCardProps {
  onClose: () => void;
  name: string;
  email: string;
  wait: number;
  type: string;
  question: string;
  location: string;
  status: string;
}

const StudentPopupCard = ({
  onClose,
  name,
  email,
  wait,
  type,
  question,
  location,
  status,
}: StudentPopupCardProps) => {
  return useMemo(() => {
    return (
      <PopupDiv>
        <FullWidth>
          <Button icon={<CloseOutlined />} onClick={onClose} />
        </FullWidth>
        <StudentDataDiv>
          <Avatar size={96} icon={<UserOutlined />} />
          <InfoTextDiv>
            <Title>{name}</Title>
            <Email>{email}</Email>
          </InfoTextDiv>
          <StatusDiv>
            <StatusTag color="purple">{status}</StatusTag>
          </StatusDiv>
          <StyledRow gutter={[8, 0]}>
            <Col span={12}>
              <WaitDiv>
                <HeadingText>Wait</HeadingText>
              </WaitDiv>
            </Col>
            <Col span={12}>
              <QuestionTypeDiv>
                <HeadingText>Question Type</HeadingText>
              </QuestionTypeDiv>
            </Col>
          </StyledRow>
          <StyledRow gutter={[8, 0]}>
            <Col span={12}>
              <WaitDiv>{wait}</WaitDiv>
            </Col>
            <Col span={12}>
              <QuestionTypeDiv>{type}</QuestionTypeDiv>
            </Col>
          </StyledRow>
          <FullWidth>
            <MarginLeft>
              <HeadingText>Questions</HeadingText>
              {question}
            </MarginLeft>
          </FullWidth>
          <FullWidth>
            <MarginLeft>
              <HeadingText>Location</HeadingText>
              {location}
            </MarginLeft>
          </FullWidth>
        </StudentDataDiv>
      </PopupDiv>
    );
  }, []);
};

export default StudentPopupCard;
