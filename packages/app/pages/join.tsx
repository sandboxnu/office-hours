import styled from "styled-components";
import CreateQuestion from "../components/Queue/Join/CreateQuestion";
import QuestionForm from "../components/Queue/QuestionForm";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

export default function Join() {
  return (
    <Container>
      <QuestionForm
        prevQuestion={null}
        leaveQueue={null}
        finishQuestion={null}
      />
    </Container>
  );
}
