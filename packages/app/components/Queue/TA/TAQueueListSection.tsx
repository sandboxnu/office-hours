import { Question } from "@koh/common";
import { Collapse } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import TAQueueListItem from "./TAQueueListItem";

const OverrideCollapse = styled.div`
  & .ant-collapse-header {
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-bottom: 1px solid #cfd6de;
  }
  // Prevent the not-allowed cursor which is hella agressive
  & .ant-collapse-item-disabled > .ant-collapse-header {
    cursor: initial !important;
  }
  & .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const Title = styled.div`
  font-size: 16px;
  color: #212934;
  margin-left: 40px;
`;
/**
 * A single section of the list. ie. WaitingInLine
 */
export default function TAQueueListSection({
  title,
  questions,
  onClickQuestion,
  currentQuestion,
  showNumbers = false,
  collapsible = false,
}: {
  title: string;
  questions: Question[];
  onClickQuestion: (question: Question) => void;
  currentQuestion?: Question;
  showNumbers?: boolean;
  collapsible?: boolean;
}): ReactElement {
  if (questions.length === 0) {
    return null;
  }
  return (
    <OverrideCollapse>
      <Collapse defaultActiveKey={[title]} ghost expandIconPosition="right">
        <Collapse.Panel
          style={{ padding: 0 }}
          key={title}
          header={<Title>{`${title} (${questions.length})`}</Title>}
          showArrow={collapsible}
          disabled={!collapsible}
        >
          <div>
            {questions.map((q, i) => (
              <TAQueueListItem
                key={q.id}
                question={q}
                index={showNumbers && i + 1}
                selected={currentQuestion?.id === q.id}
                onClick={() => onClickQuestion(q)}
              />
            ))}
          </div>
        </Collapse.Panel>
      </Collapse>
    </OverrideCollapse>
  );
}
