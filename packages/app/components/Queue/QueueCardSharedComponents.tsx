import { QuestionStatus, QuestionStatusKeys } from "@template/common";
import { Avatar, Card, Row, Tag } from "antd";
import styled from "styled-components";

export const HorizontalTACard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  color: #595959;

  &:hover {
    cursor: pointer;
  }
`;

export const Photo = styled(Avatar)`
  margin-right: 16px;

  @media (max-width: 992px) {
    display: none;
  }
`;

export const Rank = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: #595959;
`;

export const Text = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`;

export const StatusTag = styled(Tag)`
  width: 96px;
  text-align: center;
  float: right;
  margin-right: 0;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const CenterRow = styled(Row)`
  align-items: center;
`;

export function questionStatusToColor(status: QuestionStatus): string {
  switch (status) {
    case QuestionStatusKeys.Helping:
      return "gold";
    case QuestionStatusKeys.CantFind:
      return "red";
    case QuestionStatusKeys.Drafting:
      return "blue";
    default:
      return "purple";
  }
}
