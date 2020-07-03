import styled from "styled-components";
import { Popover, Switch, Row, Input, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const PopoverContainer = styled.div`
  width: 300px;
  height: 200px;
`;

const LableText = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin-bottom: 10px;
`;

export default function Settings() {
  return (
    <div>
      <Popover
        content={
          <PopoverContainer>
            <Row>
              <LableText> Web Notifications </LableText>
              <Switch defaultChecked={false} />
            </Row>
            <Row>
              <LableText> Text Notifications </LableText>
              <Switch defaultChecked={false} />
            </Row>
            <Row>
              <LableText> Phone </LableText>
              <Input></Input>
            </Row>
          </PopoverContainer>
        }
        title="User Settings"
        placement={"bottomRight"}
        trigger="click"
      >
        <Button type="link">
          <Avatar size={47} icon={<UserOutlined />} />
        </Button>
      </Popover>
    </div>
  );
}
