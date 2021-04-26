import { SubmitCourseParams } from "@koh/common";
import { API } from "@koh/api-client";
import React, { ReactElement, useState } from "react";
import { Form, Input, Tooltip, Row, Select, Button, Result } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";

const HalfFormItem = styled(Form.Item)`
  width: 48%;
`;

const { Option } = Select;

export default function ApplyPage(): ReactElement {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: semesters } = useSWR("/api/v1/semesters", async () =>
    API.semesters.get()
  );

  const handleSubmit = async () => {
    const value = await form.validateFields();
    value.sections = value.sections.replace(/\s+/g, "").split(",").map(Number);
    await API.course.submitCourse(value as SubmitCourseParams);
    setSubmitted(true);
  };

  const resubmit = () => {
    form.resetFields();
    setSubmitted(false);
  };

  const validateSections = (value: string): boolean => {
    const values = value.replace(/\s+/g, "").split(",");
    for (const val of values) {
      if (isNaN(Number(val))) return false;
    }
    return true;
  };

  const validateCourseName = (value: string): boolean => {
    const split = value.split(" ");
    const subject =
      split[0] == "CS" ||
      split[0] == "DS" ||
      split[0] == "CY" ||
      split[0] == "IS";
    return split.length == 2 && subject && /^\d+$/.test(split[1]);
  };

  if (router.query[process.env.APPLY_KEY] !== "") {
    return <div>{process.env.APPLY_KEY}</div>;
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="Application successfully submitted!"
        subTitle={
          <div>
            Thanks for applying to use Khoury Office Hours, we&apos;ll email you
            with next steps as the semester gets closer.
            <br />
            If you have any questions, feel free to email us at
            help@khouryofficehours.com
          </div>
        }
        extra={[
          <Button
            type="primary"
            key="info"
            href="https://info.khouryofficehours.com"
          >
            Go to Info Site
          </Button>,
          <Button key="submit" onClick={resubmit}>
            Submit another course
          </Button>,
        ]}
      />
    );
  }

  return (
    <div style={{ padding: "3% 12%" }}>
      <h1>Apply for Khoury Office Hours</h1>

      <div>
        Please submit an application for each course you want to use Khoury
        Office Hours for.
      </div>
      <br />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          remember: true,
          semester: "Summer_1 2021",
          timezone: "America/New_York",
        }}
      >
        <Form.Item
          label="Email"
          name="coordinator_email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email.",
            },
          ]}
        >
          <Input placeholder="example@northeastern.edu" />
        </Form.Item>

        <Row justify="space-between">
          <HalfFormItem
            label="Course Name"
            name="name"
            rules={[
              { required: true, message: "Please input your course name." },
              {
                validator: (_, value) =>
                  validateCourseName(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Please enter a valid course format (e.g. CS 2500)."
                        )
                      ),
              },
            ]}
          >
            <Input placeholder="Ex: CS 2500" />
          </HalfFormItem>

          <HalfFormItem
            label="Section Number(s)"
            name="sections"
            rules={[
              {
                required: true,
                message: "Please input your section number(s).",
              },
              {
                validator: (_, value) =>
                  validateSections(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Please enter a comma separated list of section numbers."
                        )
                      ),
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
              {semesters &&
                semesters.map((semester) => (
                  <Option
                    key={semester.id}
                    value={`${semester.season} ${semester.year}`}
                  >
                    {`${semester.season} ${semester.year}`.replaceAll("_", " ")}
                  </Option>
                ))}
            </Select>
          </HalfFormItem>

          <HalfFormItem
            label="Campus"
            name="timezone"
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
                      rel="noreferrer"
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
          name="icalURL"
          rules={[
            {
              required: true,
              type: "url",
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
