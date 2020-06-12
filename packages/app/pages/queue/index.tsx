import styled from "styled-components";
import QueueList from "../../components/Queue/QueueList";
import EditableQuestion from "../../components/Queue/EditableQuestion";
import { QuestionType } from "@template/common";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

interface QueueProps {}

export default function Queue({}: QueueProps) {
  return (
    <Container>
      <QueueList />
      <EditableQuestion
        position={1}
        type={QuestionType.Bug}
        text={"How to change the font"}
      />
    </Container>
  );
}
