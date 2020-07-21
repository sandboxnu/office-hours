import { Question } from "@template/common";
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
  background: #f9f0ff;
  border: 1px solid #d3adf7;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const CenterRow = styled(Row)`
  align-items: center;
`;
