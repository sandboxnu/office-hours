import { HourglassOutlined, QuestionOutlined } from "@ant-design/icons";
import { OpenQuestionStatus, Question } from "@koh/common";
import { Badge } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { getWaitTime } from "../../../utils/TimeUtil";
import { KOHAvatar } from "../../common/SelfAvatar";

function truncate(string: string, length: number) {
  if (string.length > length) {
    return string.substring(0, length - 3) + "...";
  }
  return string;
}

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: flex-start;

  padding-top: 16px;
  return string;
}

const Container = styled.div<{ selected: boolean }>\`
  display: flex;
  align-items: flex-start;

  padding-top: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #cfd6de;
  background: ${({ selected }) => (selected ? "#EFF8FF" : "white")};

  cursor: pointer;
  &:hover {
    background: ${({ selected }) => (selected ? "#EFF8FF" : "#ECF0F3")};
  }
  padding-bottom: 12px;
  border-bottom: 1px solid #cfd6de;
  background: ${({ selected }) => (selected ? "#EFF8FF" : "white")};

  cursor: pointer;
  &:hover {
    background: ${({ selected }) => (selected ? "#EFF8FF" : "#ECF0F3")};
  }
`;
const AvatarContainer = styled.div`
  margin: 10px 12px 0 25px;
  display: block;
`;
const QuestionInfoContainer = styled.div``;

const Name = styled.div`
  color: #212934;
`;
const QuestionText = styled.div`
  padding-right: 8px;
  color: #595959;
`;

export default function TAQueueListItem({
  index,
  selected,
  question,
  onClick,
}: {
  index: number | false;
  selected: boolean;
  question: Question;
  onClick: () => void;
}): ReactElement {
  const isDrafting = question.status === OpenQuestionStatus.Drafting;

  const metaInfo: [ReactElement, string][] = [
    [<HourglassOutlined key="h" />, getWaitTime(question)],
  ];
  if (!isDrafting) {
    metaInfo.push([<QuestionOutlined key="q" />, question.questionType]);
  }
  return (
    <Container
      onClick={onClick}
      selected={selected}
      data-cy={`queue-list-item-${question.id}`}
    >
      <AvatarContainer>
        <Badge
          // position in queue ---  0 is not displayed, hide if no index
          count={index ? `#${index}` : 0}
          style={{ backgroundColor: "#3684c6" }}
          offset={[-40, 0]}
        >
          <KOHAvatar
            size={40}
            name={question.creator.name}
            photoURL={question.creator.photoURL}
          />
        </Badge>
      </AvatarContainer>
      <QuestionInfoContainer>
        <Name>{question.creator.name}</Name>
        <QuestionText>
          {isDrafting ? <i>Still Drafting...</i> : truncate(question.text, 80)}
        </QuestionText>
        <QuestionMetaRow info={metaInfo} />
      </QuestionInfoContainer>
    </Container>
  );
}

/**
 * Row of the meta info. Icon and text pairs separated by dividers.
 */
const RowContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  color: #8895a6;
`;
const Divider = styled.div`
  margin-left: 12px;
  margin-right: 8px;
`;
const Spacer = styled.div`
  margin-left: 5px;
`;
function QuestionMetaRow({
  info,
}: {
  info: [ReactElement, string][];
}): ReactElement {
  return (
    <RowContainer>
      {info
        .map(([icon, text], i) => [
          i > 0 && <Divider key={text}>|</Divider>,
          icon,
          <Spacer key={text + "space"} />,
          text,
        ])
        .flat()
        .filter((e) => !!e)}
    </RowContainer>
  );
}
