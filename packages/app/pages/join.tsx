import styled from "styled-components";
import CreateQuestion from "../components/Queue/Join/CreateQuestion";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

export default function Join() {
  return (
    <Container>
      <CreateQuestion place={12} />
    </Container>
  );
}
