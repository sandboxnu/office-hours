import { DownOutlined } from "@ant-design/icons";
import { Question } from "@koh/common";
import { ReactElement } from "react";
import styled from "styled-components";
import TAQueueListItem from "./TAQueueListItem";

const Container = styled.div``;

const SectionHeaderRow = styled.div`
  padding-left: 40px;
  display: flex;
  justify-content: space-between;
`;

/**
 * A single section of the list. ie. WaitingInLine
 */
export default function TAQueueListSection({
  title,
  questions,
  onClickQuestion,
  showNumbers = false,
  collapsible = false,
}: {
  title: string;
  questions: Question[];
  onClickQuestion: (question: Question) => void;
  showNumbers?: boolean;
  collapsible?: boolean;
}): ReactElement {
  if (questions.length === 0) {
    return null;
  }
  return (
    <Container>
      <SectionHeaderRow>
        <div>{`${title} (${questions.length})`}</div>
        <DownOutlined />
      </SectionHeaderRow>
      {questions.map((q, i) => (
        <TAQueueListItem
          key={q.id}
          question={q}
          placeInLine={showNumbers && i}
          onClick={() => onClickQuestion(q)}
        />
      ))}
    </Container>
  );
}
