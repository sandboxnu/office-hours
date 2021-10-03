import useSWR from "swr";
import React, { ReactElement } from "react";
import { API } from "@koh/api-client";
import { Button, Dropdown, Form, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function WithdrawCourseSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );
  const [form] = Form.useForm();

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  //profile.courses
  return (
    profile && (
      <div style={{ paddingTop: "50px" }}>
        <Form form={form}>
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Select a Course <DownOutlined />
            </a>
          </Dropdown>
          <Button type="primary" danger>
            stranger danger
          </Button>
        </Form>
      </div>
    )
  );
}
