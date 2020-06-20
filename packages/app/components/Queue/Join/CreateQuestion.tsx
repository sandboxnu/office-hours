import React from "react";
import { Row, Alert } from "antd";
import styled from "styled-components";

interface CreateQuestionProps {
  place: number;
}

const PlaceInLineAlert = styled(Alert)`
  width: 100%;
`;

export default function CreateQuestion({ place }: CreateQuestionProps) {
  return (
    <div>
      <Row>
        <PlaceInLineAlert
          message={`You are currently ${place}rd in queue`}
          type="success"
          description="Your spot in queue has been temporarily reserved. Please describe your question to finish joining the queue."
          showIcon
        />
      </Row>
    </div>
  );
}
