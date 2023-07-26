import { DeleteTwoTone, PlusCircleOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { Form, Input, InputNumber, Tag, Button, Space, message } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";

type CourseOverrideSettingsProps = { courseId: number };

const CRNTag = styled(Tag)`
  font-size: 15px;
  padding: 5px 10px;
`;

const AddCRNTag = styled(CRNTag)`
  cursor: pointer;
`;

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
      if (crns.includes(inputCRN)) {
        message.error(`The CRN ${inputCRN} already exists.`);
      } else {
        setCrns([...crns, inputCRN]);
      }
    }
    setShowCRNInput(false);
    setInputCRN(null);
  };

  const handleCRNDelete = (crn) => {
    setCrns(crns.filter((c) => c !== crn));
  };

  return (
    <div>
      <Form form={form} layout="vertical" initialValues={course}>
        <Space style={{ marginTop: "25px" }}>
          <Form.Item
            name="name"
            label="Course Display Name"
            tooltip="This is the course name that will be displayed within the app"
            rules={[
              { required: true, message: "Please input a display name." },
            ]}
          >
            <Input placeholder="ex: CS 2500" maxLength={20} />
          </Form.Item>
        </Space>

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
                rel="noopener noreferrer"
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
              pattern: new RegExp("https://.*.ics"),
              message: "Please input your office hours calendar URL.",
            },
          ]}
        >
          <Input placeholder="https://calendar.google.com/calendar/ical/.../basic.ics" />
        </Form.Item>

        <Form.Item label="Registered CRNs">
          {crns.map((crn) => (
            <CRNTag
              closeIcon={
                <DeleteTwoTone
                  twoToneColor="#F76C6C"
                  style={{ fontSize: "18px" }}
                />
              }
              key={crn}
              closable={true}
              onClose={() => handleCRNDelete(crn)}
            >
              {crn}
            </CRNTag>
          ))}
          {showCRNInput ? (
            <InputNumber<string>
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
            <AddCRNTag
              icon={<PlusCircleOutlined style={{ fontSize: "15px" }} />}
              color="#408FEA"
              className="add-crn"
              onClick={showInput}
            >
              Add CRN
            </AddCRNTag>
          )}
        </Form.Item>
      </Form>

      <Space style={{ marginTop: "5px" }}>
        <Button onClick={handleDiscardChanges}>Discard Changes</Button>

        <Button onClick={handleSaveChanges} type="primary">
          Save Changes
        </Button>
      </Space>
    </div>
  );
}
