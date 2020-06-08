import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, Row, Col, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Email = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #bfbfbf;
`;

const Name = styled.p`
  padding: 0.25;
  margin: 0;
  font-weight: 400;
  font-size: 12px;
`;

const HeadingText = styled.p`
  color: #bfbfbf;
  font-weight: 600;
  font-size: 10px;
`;

const BodyText = styled.p`
  font-weight: 500;
  font-size: 10px;
`;

const StudentInfoCard = () => {
  return useMemo(() => {
    return (
      <Card
        title={
          <Row>
            <Col span={11}>
              <Name>Alex Takayama</Name>
            </Col>
            <Col span={13}>
              <Email>takayama.a@northeastern.edu</Email>
            </Col>
          </Row>
        }
      >
        <Row>
          <Col span={6}>
            <Avatar size={48} icon={<UserOutlined />} />
          </Col>
          <Col span={18}>
            <HeadingText>Question Type</HeadingText>
            <BodyText>
              Help with working out how to use an accumulator for problem 1
            </BodyText>
            <HeadingText>Location</HeadingText>
            <BodyText>Outside room, by the couches</BodyText>
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={11}>
            <Button block>Alert</Button>
          </Col>
          <Col span={11}>
            <Button block danger>
              Can't Find
            </Button>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Button block type="primary">
              Finish Helping
            </Button>
          </Col>
          <Col span={1}></Col>
        </Row>
      </Card>
    );
  }, []);
};

export default StudentInfoCard;
