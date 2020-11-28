import { DownOutlined } from "@ant-design/icons";
import { Question } from "@koh/common";
import { ReactElement } from "react";
import styled from "styled-components";
import TAQueueListItem from "./TAQueueListItem";

const Container = styled.div``;

const SectionHeaderRow = styled.div`
  padding-left: 40px;
  padding-right: 12px;
  height: 55px;
  border-bottom: 1px solid #cfd6de;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  font-size: 16px;
  color: #212934;
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
        <Title>{`${title} (${questions.length})`}</Title>
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
