import { ReactElement } from "react";
import { Avatar, Row, Col, Badge } from "antd";
import { Question } from "@template/common";
import { RenderEvery } from "../RenderEvery";
import styled from "styled-components";
import { useQuestions } from "../../hooks/useQuestions";
import { useQueue } from "../../hooks/useQueue";

interface StatusRowProps {
  queueId: number;
}
/**
 * Row of ta statuses
 */
export function TAStatuses({ queueId }: StatusRowProps): ReactElement {
  const { questions } = useQuestions(queueId);
  const {
    queue: { staffList },
  } = useQueue(queueId);
  const taToQuestion: Record<number, Question> = {};
  const taIds = staffList.map((t) => t.id);
  for (const question of questions) {
    if (taIds.includes(question.taHelped?.id)) {
      taToQuestion[question.taHelped.id] = question;
    }
  }
  return (
    <Col>
      {staffList.map((ta) => (
        <Col key={ta.id}>
          <StatusCard
            taName={ta.name}
            taPhotoURL={ta.photoURL}
            studentName={taToQuestion[ta.id]?.creator?.name}
            helpedAt={taToQuestion[ta.id]?.helpedAt}
          />
        </Col>
      ))}
    </Col>
  );
}

const StyledCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 16px;
  display: flex;
  margin-bottom: 16px;
`;
const AvatarNoShrink = styled(Avatar)`
  flex-shrink: 0;
`;
const CardContent = styled.div`
  margin-left: 16px;
`;
const TAName = styled.div`
  font-weight: bold;
  color: #212934;
`;
const HelpingInfo = styled.div`
  margin-top: 5px;
  font-style: italic;
`;

interface StatusCardProps {
  taName: string;
  taPhotoURL: string;
  studentName?: string;
  helpedAt?: Date;
}
/**
 * View component just renders TA status
 */
function StatusCard({
  taName,
  taPhotoURL,
  studentName,
  helpedAt,
}: StatusCardProps): ReactElement {
  const isBusy = !!studentName;
  return (
    <StyledCard>
      <AvatarNoShrink size={48} src={taPhotoURL} />
      <CardContent>
        <Row justify="space-between">
          <TAName>{taName}</TAName>
          <span>
            <Badge status={isBusy ? "processing" : "success"} />
            {isBusy ? "Busy" : "Available"}
          </span>
        </Row>
        <HelpingInfo>
          {isBusy ? (
            <HelpingFor studentName={studentName} helpedAt={helpedAt} />
          ) : (
            "Looking for my next student..."
          )}
        </HelpingInfo>
      </CardContent>
    </StyledCard>
  );
}

const BlueSpan = styled.span`
  color: #66a3d6;
`;
interface HelpingForProps {
  studentName: string;
  helpedAt: Date;
}
function HelpingFor({ studentName, helpedAt }: HelpingForProps): ReactElement {
  return (
    <RenderEvery
      render={() => (
        <span>
          Helping <BlueSpan>{studentName}</BlueSpan> for{" "}
          <BlueSpan>
            {Math.round((Date.now() - helpedAt.getTime()) / 60000) + " min"}
          </BlueSpan>
        </span>
      )}
      interval={60 * 1000}
    />
  );
}
