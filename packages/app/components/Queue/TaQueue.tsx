import { useMemo, useCallback, useState } from "react";
import QueueList from "./QueueList";
import { open } from "inspector";
import StudentPopupCard from "./StudentPopupCard";

const TaQueue = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const onOpenClick = useCallback((name: string): void => {
    setOpenPopup(true);
  }, []);

  const onCloseClick = useCallback((): void => {
    setOpenPopup(false);
  }, []);

  return useMemo(() => {
    return (
      <div>
        <QueueList onOpenClick={onOpenClick} />
        {openPopup && (
          <StudentPopupCard
            onClose={onCloseClick}
            name="Alex Takayama"
            email="takayama.a@northeastern.edu"
            wait={20}
            type="Concept"
            question="Help with working out how to use an accumulator for problem 1"
            location="Outside room, by the couches"
            status="WAITING"
          />
        )}
      </div>
    );
  }, [openPopup]);
};

export default TaQueue;
