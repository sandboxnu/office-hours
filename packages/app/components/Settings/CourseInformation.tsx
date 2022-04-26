import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { Form, Input, InputNumber, Tag, Button, Space, message } from "antd";
import React, { ReactElement, useState } from "react";
import { useCourse } from "../../hooks/useCourse";

type CourseOverrideSettingsProps = { courseId: number };

export default function CourseInfo({
  courseId,
}: CourseOverrideSettingsProps): ReactElement {
  const [form] = Form.useForm();
  const [showCRNInput, setShowCRNInput] = useState(false);
  const { course } = useCourse(courseId);
  const [crns, setCrns] = useState(
    course.crns.map((c) => c.toString().padStart(5, "0"))
  );
  const [inputCRN, setInputCRN] = useState<string | null>(null);

  const showInput = () => {
    setShowCRNInput(true);
  };

  const handleDiscardChanges = async () => {
    form.setFieldsValue({ ...course });
    setCrns(course.crns.map((c) => c.toString().padStart(5, "0")));
  };

  const handleSaveChanges = async () => {
    const value = await form.validateFields();
    value.crns = Array.from(new Set(crns));

    try {
      await API.course.editCourseInfo(course.id, value);
      message.success("Successfully updated course information.");
    } catch (e) {
      message.error(e.response?.data?.message);
    }
  };

  const handleCRNAdd = () => {
    if (inputCRN) {
      setCrns([...crns, inputCRN]);
    }
    setShowCRNInput(false);
    setInputCRN(null);
  };

  const handleCRNDelete = (crn) => {
    crns.splice(crns.indexOf(crn), 1);
    setCrns(crns);
  };

  return (
    <div>
      <Space style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Button onClick={handleDiscardChanges}>Discard Changes</Button>

        <Button onClick={handleSaveChanges} type="primary">
          Save Changes
        </Button>
      </Space>

      <Form form={form} layout="vertical" initialValues={course}>
        <Form.Item
          name="name"
          label="Course Display Name"
          tooltip="This is the course name that will be displayed within the app"
          rules={[{ required: true, message: "Please input a display name." }]}
        >
          <Input placeholder="ex: CS 2500" maxLength={20} />
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

        <Form.Item label="Registered CRNs" name="crns">
          {crns.map((crn) => (
            <Tag
              closeIcon={<DeleteOutlined />}
              key={crn}
              closable={true}
              onClose={() => handleCRNDelete(crn)}
            >
              {crn}
            </Tag>
          ))}
          {showCRNInput ? (
            <InputNumber<string>
              size="large"
              className="tag-input"
              value={inputCRN}
              maxLength={5}
              min={"00000"}
              onChange={(evt) => setInputCRN(evt.padStart(5, "0"))}
              onBlur={handleCRNAdd}
              onPressEnter={handleCRNAdd}
              stringMode
            />
          ) : (
            <Tag
              icon={<PlusCircleOutlined />}
              color="#108ee9"
              className="add-crn"
              onClick={showInput}
            >
              Add CRN
            </Tag>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
