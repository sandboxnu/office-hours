import React, { ReactElement, useState } from "react";
import { Form, Input, Tooltip, Row, Select, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const HalfFormItem = styled(Form.Item)`
  width: 48%;
`;

const { Option } = Select;

export default function ApplyPage(): ReactElement {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const value = await form.validateFields();
    console.log(value);
  };

  return (
    <div style={{ padding: "3% 12%" }}>
      <h1>Apply for Khoury Office Hours</h1>

      <div>
        Please submit an application for each course you want to use Khoury
        Office Hours for.
      </div>
      <br />
      <Form form={form} layout="vertical" initialValues={{ remember: true }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email." }]}
        >
          <Input placeholder="example@northeastern.edu" />
        </Form.Item>

        <Row justify="space-between">
          <HalfFormItem
            label="Course Name"
            name="courseName"
            rules={[
              { required: true, message: "Please input your course name." },
            ]}
          >
            <Input placeholder="Ex: CS 2500" />
          </HalfFormItem>

          <HalfFormItem
            label="Section Number(s)"
            name="sectionNumbers"
            rules={[
              {
                required: true,
                message: "Please input your section number(s).",
              },
            ]}
          >
            <Input placeholder="Ex: 1, 2, 3" />
          </HalfFormItem>
        </Row>

        <Row justify="space-between">
          <HalfFormItem
            label="Semester"
            name="semester"
            rules={[{ required: true, message: "Please select a semester." }]}
          >
            <Select>
              <Option value="Summer_1 2021">Summer 1 2021</Option>
              <Option value="Summer_2 2021">Summer 2 2021</Option>
              <Option value="Summer_Full 2021">Summer Full 2021</Option>
            </Select>
          </HalfFormItem>

          <HalfFormItem
            label="Campus"
            name="campus"
            rules={[
              {
                required: true,
                message:
                  "Please select a Northeastern campus (for purpose of timezone).",
              },
            ]}
          >
            <Select>
              <Option value="America/New_York">Boston / Charlotte</Option>
              <Option value="America/Los_Angeles">
                San Francisco / Seattle
              </Option>
              <Option value="America/Toronto">Toronto</Option>
              <Option value="America/Vancouver">Vancouver</Option>
            </Select>
          </HalfFormItem>
        </Row>

        <Form.Item
          label={
            <Row align="middle">
              <span style={{ marginRight: 8 }}>Office Hours Calendar URL</span>{" "}
              <Tooltip
                title={
                  <div>
                    See{" "}
                    <a
                      target="_blank"
                      href="https://info.khouryofficehours.com/coordinators-manual"
                    >
                      here
                    </a>{" "}
                    to create your office hours calendar
                  </div>
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            </Row>
          }
          name="calendar"
          rules={[
            {
              required: true,
              message: "Please input your office hours calendar URL.",
            },
          ]}
        >
          <Input placeholder="https://calendar.google.com/calendar/ical/.../basic.ics" />
        </Form.Item>

        <br />

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
