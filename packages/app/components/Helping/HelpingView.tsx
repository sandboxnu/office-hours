import React, { useMemo } from "react";
import StudentInfoCard from "./StudentInfoCard";

const HelpingView = ({}) => {
  return useMemo(() => {
    return (
      <div>
        <h1>Helping</h1>
        <StudentInfoCard />
      </div>
    );
  }, []);
};

export default HelpingView;
