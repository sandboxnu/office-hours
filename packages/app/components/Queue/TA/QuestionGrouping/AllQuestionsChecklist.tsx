import { PhoneOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { Question, User } from "@koh/common";
import { Checkbox, Tooltip } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useTAInQueueInfo } from "../../../../hooks/useTAInQueueInfo";
import { BannerPrimaryButton } from "../../Banner";
import { Header } from "../TAQueueDetail";
import TAQueueListItem from "../TAQueueListItem";

export const Description = styled.div`
  font-size: 12px;
  color: #8895a6;
`;
const SelectAllContainer = styled.div`
  padding: 3px 8px;
  border-bottom: 1px solid #cfd6de;
`;
const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RedText = styled.span`
  color: red;
`;

export default function AllQuestionsCheckList({
  groupCreator,
  allQuestions,
  queueId,
  onStartCall,
}: {
  groupCreator: User;
  allQuestions: Question[];
  queueId: number;
  onStartCall: () => void;
}): ReactElement {
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(
    new Set()
  );
  const { isCheckedIn, isHelping } = useTAInQueueInfo(queueId);
  const [canHelp, helpTooltip] = ((): [boolean, string] => {
    if (!isCheckedIn) {
      return [false, "You must check in to help students!"];
    } else if (isHelping) {
      return [false, "You are already helping a student"];
    } else {
      return [true, "Create Group & Call"];
    }
  })();

  const onQuestionChecked = (q) => {
    if (!checkedQuestions.has(q.id)) {
      setCheckedQuestions(new Set(checkedQuestions.add(q.id)));
    } else {
      checkedQuestions.delete(q.id);
      setCheckedQuestions(new Set(checkedQuestions));
    }
  };
  const onToggleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedQuestions(new Set(allQuestions.map((q) => q.id)));
    } else {
      setCheckedQuestions(new Set());
    }
  };

  const anyStudentDidNotConsent = allQuestions.some((q) => !q.groupable);

  const usersInLink = allQuestions
    .filter((question) => checkedQuestions.has(question.id))
    .map((question) => question.creator.email)
    .join(",");

  return (
    <div>
      <Header>
        <div>
          <strong>{`${groupCreator.name}'s Group Session`}</strong>
          <Description>
            Select Students to Create Group
            {anyStudentDidNotConsent ? (
              <div>
                <RedText>Note:</RedText> some students may not show up, as they
                did not consent to being grouped
              </div>
            ) : null}
          </Description>
        </div>
        <div>
          <Tooltip title={helpTooltip}>
            <span>
              <BannerPrimaryButton
                icon={<PhoneOutlined />}
                onClick={() => {
                  API.questions.help({
                    questionIds: Array.from(checkedQuestions),
                    queueId: queueId,
                  });
                  onStartCall();
                  window.open(
                    `https://teams.microsoft.com/l/chat/0/0?users=${usersInLink}`
                  );
                }}
                disabled={!canHelp || checkedQuestions.size === 0}
                data-cy="help-student"
              />
            </span>
          </Tooltip>
        </div>
      </Header>
      <SelectAllContainer>
        <Checkbox
          checked={allQuestions.length === checkedQuestions.size}
          indeterminate={
            checkedQuestions.size &&
            checkedQuestions.size !== allQuestions.length
          }
          onChange={onToggleSelectAll}
        >
          <span style={{ paddingLeft: "9px" }}>Select All</span>
        </Checkbox>
      </SelectAllContainer>
      <QuestionsList>
        {allQuestions
          .filter((q) => q.groupable)
          .map((q, i) => (
            <div key={q.id}>
              <TAQueueListItem
                question={q}
                index={i + 1}
                selected={checkedQuestions.has(q.id)}
                onClick={() => onQuestionChecked(q)}
                showCheckbox
              />
            </div>
          ))}
      </QuestionsList>
    </div>
  );
}
