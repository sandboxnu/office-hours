import Banner from "./Banner";
import styled from "styled-components";
import { Button, Row, Col } from "antd";
import { toOrdinal } from "../../utils/ordinal";
import { useStudentQuestion } from "../../hooks/useStudentQuestion";

const BoldNumber = styled.span`
  font-weight: bold;
`;
const LeaveQueueButton = styled(Button)`
  margin-right: 16px;
  border-radius: 6px;
  border: 0;
  background: #e26567;
  color: #fff;
`;
const EditQuestionButton = styled(Button)`
  margin-right: 16px;
  border-radius: 6px;
  border: 0;
  background: #fff;
`;

const QuestionDetails = styled.div`
  display: grid;
`;
const InfoColumn = styled.div``;

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
          <Row>
            <Col>Question</Col>
            <Col>Type</Col>
          </Row>
        }
      />
    );
  } else {
    return <div />;
  }
}
