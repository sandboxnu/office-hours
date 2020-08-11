import { ReactElement } from "react";
import { Card, Avatar, Row, Col } from "antd";
import { Question, UserPartial } from "@template/common";
import Meta from "antd/lib/card/Meta";
import { RenderEvery } from "../RenderEvery";
import styled from "styled-components";

interface StatusRowProps {
  questions: Question[];
  taList: UserPartial[];
}
/**
 * Row of ta statuses
 */
export function StatusRow({ questions, taList }: StatusRowProps): ReactElement {
  const taToQuestion: Record<number, Question> = {};
  const taIds = taList.map((t) => t.id);
  for (const question of questions) {
    if (taIds.includes(question.taHelped?.id)) {
      taToQuestion[question.taHelped.id] = question;
    }
  }
  return (
    <Row gutter={24}>
      {taList.map((ta) => (
        <Col key={ta.id}>
          <StatusCard
            taName={ta.name}
            taPhotoURL={ta.photoURL}
            studentName={taToQuestion[ta.id]?.creator?.name}
            helpedAt={taToQuestion[ta.id]?.helpedAt}
          />
        </Col>
      ))}
    </Row>
  );
}

export const HorizontalTACard = styled(Card)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
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
  return (
    <Card>
      <Meta
        avatar={<Avatar src={taPhotoURL} />}
        title={taName}
        description={
          studentName ? (
            <HelpingFor studentName={studentName} helpedAt={helpedAt} />
          ) : (
            <span>Looking for my next student...</span>
          )
        }
      />
    </Card>
  );
}

interface HelpingForProps {
  studentName: string;
  helpedAt: Date;
}
function HelpingFor({ studentName, helpedAt }: HelpingForProps): ReactElement {
  return (
    <RenderEvery
      render={() => (
        <span>
          Helping {studentName} for{" "}
          {Math.round((Date.now() - helpedAt.getTime()) / 60000)}m
        </span>
      )}
      interval={60 * 1000}
    />
  );
}
