import styled from "styled-components";
import { Popover, Switch, Row, Input, Button } from "antd";
import Link from "next/link";

const content = (
  <div>
    <Row>
      Web Notifications
      <Switch defaultChecked={false} />
    </Row>
    <Row>
      Text Notifications
      <Switch defaultChecked={false} />
    </Row>
    <Row>
      Phone
      <Input value=""></Input>
    </Row>
    <Row>
      {/* <Link href="/login" as="/login">
        <a>Login</a>
      </Link> */}
    </Row>
  </div>
);

interface SettingsProps {}

export default function Settings({}: SettingsProps) {
  return <Popover content={content} placement={"bottomRight"} />;
}
