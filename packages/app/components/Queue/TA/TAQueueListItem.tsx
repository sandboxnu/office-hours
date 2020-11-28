import { HourglassOutlined, QuestionOutlined } from "@ant-design/icons";
import { Question } from "@koh/common";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { getWaitTime } from "../../../utils/TimeUtil";
import AvatarWithInitals from "../../common/AvatarWithInitials";

const Container = styled.div`
  display: flex;
  align-items: flex-start;

  padding-top: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #cfd6de;
`;
const NumberAndAvatarContainer = styled.div`
  flex-basis: 50px;
  display: flex;
  align-items: center;
  margin-right: 12px;
`;
const PlaceInLine = styled.span`
  width: 40px;
  text-align: center;
  font-size: 18px;
`;
const QuestionInfoContainer = styled.div``;

const Name = styled.div`
  color: #212934;
`;
//TODO: elipsis if long
const QuestionText = styled.div`
  color: #595959;
`;

export default function TAQueueListItem({
  placeInLine,
  question,
  onClick,
}: {
  placeInLine: number | false;
  question: Question;
  onClick: () => void;
}): ReactElement {
  return (
    <Container onClick={onClick}>
      <NumberAndAvatarContainer>
        <PlaceInLine>{placeInLine}</PlaceInLine>
        <AvatarWithInitals size={40} name={question.creator.name} />
      </NumberAndAvatarContainer>
      <QuestionInfoContainer>
        <Name>{question.creator.name}</Name>
        <QuestionText>{question.text}</QuestionText>
        <QuestionMetaRow
          info={[
            [<HourglassOutlined key="0" />, getWaitTime(question)],
            [<QuestionOutlined key="1" />, question.questionType],
          ]}
        />
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
      {info.map(([icon, text], i) => (
        <>
          {i > 0 && <Divider key={text}>|</Divider>}
          {icon}
          <Spacer />
          {text}
        </>
      ))}
    </RowContainer>
  );
}
