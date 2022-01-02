import { ReactElement } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, Space } from "antd";
import { useEffect } from "react";

export interface EditCourseInfo {
  displayName: string;
  iCalURL: string;
  coordinator_email: string;
  timezone: string;
}

type EditCourseProps = {
  courseInfo: { name: string; crns: number[] };
  onSubmitCourse: (courseInfo: EditCourseInfo) => any;
  onBack: () => any;
};

const Highlight = styled.span`
  color: #1890ff;
`;

const { Option } = Select;

function createSGString(name: string, crns: number[]) {
  return `${name} (CRNs: ${crns.join(", ")})`;
} // TODO: centralize

export default function EditCourse({
  courseInfo,
  onSubmitCourse,
  onBack,
}: EditCourseProps): ReactElement {
  const [form] = Form.useForm();
  const sectionGroupString = createSGString(courseInfo.name, courseInfo.crns);

  useEffect(() => {
    form.resetFields();
  }, [courseInfo]);

  const handleSubmitCourse = () => {
    form
      .validateFields()
      .then((value) => onSubmitCourse(value))
      .catch(() => {
        // don't submit if the fields are not valid
      });
  };

  return (
    <div>
      <h3 style={{ marginBottom: "1.5em" }}>
        Please fill out the following course information for{" "}
        <Highlight>{sectionGroupString}</Highlight>
      </h3>

      <Form form={form} layout="vertical" initialValues={courseInfo}>
        <Form.Item
          name="displayName"
          label="Course Display Name"
          tooltip="This is the course name that will be displayed within the app"
          rules={[{ required: true, message: "Please input a display name." }]}
        >
          <Input placeholder="ex: CS 2500" />
        </Form.Item>

        <Form.Item
          name="timezone"
          label="Campus"
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
            <Option value="America/Los_Angeles">San Francisco / Seattle</Option>
            <Option value="America/Toronto">Toronto</Option>
            <Option value="America/Vancouver">Vancouver</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="coordinator_email"
          label="Coordinator Email"
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

        <Form.Item
          label="Office Hours Calendar URL"
          tooltip={
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
          name="iCalURL"
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
      </Form>
      <Space>
        <Button onClick={onBack}>Back</Button>

        <Button onClick={handleSubmitCourse} type="primary">
          Next
        </Button>
      </Space>
    </div>
  );
}
