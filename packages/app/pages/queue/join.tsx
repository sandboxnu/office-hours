import styled from "styled-components";
import QuestionForm from "../../components/Queue/QuestionForm";

const Container = styled.div`
  margin: 32px 64px;
`;

interface JoinProps {}

export default function Join({}: JoinProps) {
  return (
    <Container>
      <QuestionForm />
    </Container>
  );
}
