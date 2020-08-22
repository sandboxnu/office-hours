import Banner from "./Banner";
import styled from "styled-components";
import { Button, Row, Col } from "antd";
import { toOrdinal } from "../../utils/ordinal";
import { useStudentQuestion } from "../../hooks/useStudentQuestion";
import { Text } from "./QueueCardSharedComponents";

const BoldNumber = styled.span`
  font-weight: bold;
`;
const LeaveQueueButton = styled(Button)`
  margin-right: 16px;
  border-radius: 6px;
  border: 0;
  background: #e26567;
  color: #fff;
  &:hover,
  &:focus {
    background: #fc7f81;
    color: #fff;
  }
`;
const EditQuestionButton = styled(Button)`
  margin-right: 16px;
  border-radius: 6px;
  border: 0;
  background: #fff;
`;

const QuestionDetails = styled.div`
  display: flex;
`;
const InfoHeader = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
`;

interface StudentBannerProps {
  queueId: number;
}
export default function StudentBanner({ queueId }: StudentBannerProps) {
  const { studentQuestion, studentQuestionIndex } = useStudentQuestion(queueId);
  if (studentQuestion) {
    return (
      <Banner
        titleColor="#3684C6"
        contentColor="#ABD4F3"
        title={
          <span>
            You are{" "}
            <BoldNumber>{toOrdinal(studentQuestionIndex + 1)}</BoldNumber> in
            queue
          </span>
        }
        buttons={
          <>
            <LeaveQueueButton>Leave Queue</LeaveQueueButton>
            <EditQuestionButton>Edit Question</EditQuestionButton>
          </>
        }
        content={
          <QuestionDetails>
            <Col flex="1 1">
              <InfoHeader>Question</InfoHeader>
              <Text>{studentQuestion.text}</Text>
            </Col>
            <Col flex="0 0 60px">
              <InfoHeader>Type</InfoHeader>
              <Text>
                {studentQuestion.questionType.charAt(0).toUpperCase() +
                  studentQuestion.questionType.substr(1).toLowerCase()}
              </Text>
            </Col>
          </QuestionDetails>
        }
      />
    );
  } else {
    return <div />;
  }
}
