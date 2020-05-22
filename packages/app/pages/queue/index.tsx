import styled from "styled-components";
import QueueList from "../../components/Queue/QueueList";

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
    </Container>
  );
}
