import styled from "styled-components";
import {
  Popover,
  Switch,
  Row,
  Input,
  Button,
  Avatar,
  Menu,
  InputNumber,
} from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const PopoverContainer = styled.div`
  width: 270px;
  height: 215px;
`;

const LableText = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 14px;
`;

const SwitchContainer = styled.div`
  float: right;
  margin-left: 30px;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 150px;
  margin-left: 30px;
  margin-top: 10px;
`;

const CenteredIcon = styled.div`
  margin-left: 125px;
  margin-top: 25px;
`;

export default function Settings() {
  return (
    <div>
      <Popover
        content={
          <PopoverContainer>
            <Row>
              <LableText> Web Notifications </LableText>
              <SwitchContainer>
                {" "}
                <Switch defaultChecked={false} />{" "}
              </SwitchContainer>
            </Row>
            <Row>
              <LableText> Text Notifications </LableText>
              <SwitchContainer>
                {" "}
                <Switch defaultChecked={false} />{" "}
              </SwitchContainer>
            </Row>
            <Row>
              <LableText> Phone </LableText>
              <InputContainer>
                {" "}
                <Input placeholder={"XXX-XXX-XXXX"} />{" "}
              </InputContainer>
            </Row>
            <Row>
              <Link href="/login" as="/login">
                <CenteredIcon>
                  {" "}
                  <Avatar size={44} icon={<LogoutOutlined />} />{" "}
                </CenteredIcon>
              </Link>
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
