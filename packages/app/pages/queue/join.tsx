import styled from "styled-components";
import QuestionForm from "../../components/Queue/QuestionForm";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

interface JoinProps {}

export default function Join({}: JoinProps) {
  return (
    <Container>
      <QuestionForm />
    </Container>
  );
}
