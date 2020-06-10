import styled from "styled-components";
import { Role } from "@template/common";
import QueueList from "../../components/Queue/QueueList";
import StudentPopupCard from "../../components/Queue/StudentPopupCard";
import { useCallback, useState } from "react";

// TODO: replace this with profile role from endpoint
const ROLE: Role = "ta";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

interface QueueProps {}

export default function Queue({}: QueueProps) {
  const [openPopup, setOpenPopup] = useState(false);

  const onOpenClick = useCallback((name: string): void => {
    setOpenPopup(true);
  }, []);

  const onCloseClick = useCallback((): void => {
    setOpenPopup(false);
  }, []);

  return (
    <Container>
      <QueueList role={ROLE} onOpenClick={onOpenClick} />
      {ROLE === "ta" && (
        <StudentPopupCard
          onClose={onCloseClick}
          name="Alex Takayama"
          email="takayama.a@northeastern.edu"
          wait={20}
          type="Concept"
          question="Help with working out how to use an accumulator for problem 1"
          location="Outside room, by the couches"
          status="WAITING"
          visible={openPopup}
        />
      )}
    </Container>
  );
}
