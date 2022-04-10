import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { Form, Input, Tag, Button, message } from "antd";
import React, { ReactElement, useState } from "react";
import { useCourse } from "../../hooks/useCourse";
import { EditCourseInfoParams } from "@koh/common";

type CourseOverrideSettingsProps = { courseId: number };

// const OverrideContents = styled.div`
//   width: 90%;
//   margin-left: auto;
//   margin-right: auto;
//   padding-top: 50px;
// `;

export default function CourseInfo({
  courseId,
}: CourseOverrideSettingsProps): ReactElement {
  const [form] = Form.useForm();
  const [showCRNInput, setShowCRNInput] = useState(false);
  const { course } = useCourse(courseId);
  const [patchBody, setPatchBody] = useState<EditCourseInfoParams>({
    ...course,
    courseId: course.id,
  });
  const [inputCRN, setInputCRN] = useState<number | null>(null);

  const showInput = () => {
    setShowCRNInput(true);
  };

  // const handleSubmitCourse = () => {
  //   form
  //   .validateFields()
  //   .then((value) => onSubmitCourse(value))
  //   .catch(() => {
  //     // don't submit if the fields are not valid
  //   });
  // };

  const handleSaveChanges = async () => {
    patchBody.courseId = courseId;
    patchBody.name = course.name;
    patchBody.coordinator_email = course.coordinator_email;
    patchBody.icalURL = course.icalURL;
    patchBody.crns = course.crns;
    setPatchBody(patchBody);
    try {
      await API.course.editCourseInfo(course.id, patchBody);
      message.success("Successfully updated course information.");
    } catch (e) {
      message.error(e.response?.data?.message);
    }
  };

  const handleCRNAdd = () => {
    const newPatchBody = {
      ...patchBody,
      crns: patchBody.crns.concat([inputCRN]),
    };
    setPatchBody(newPatchBody);
    setShowCRNInput(false);
  };

  return (
    <div>
      <Button
        onClick={handleSaveChanges}
        type="primary"
        style={{ marginTop: "30px" }}
      >
        Save Changes
      </Button>
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
          {patchBody.crns.map((crn) => (
            <Tag closeIcon={<DeleteOutlined />} key={crn} closable={true}>
              {crn}
            </Tag>
          ))}
          {showCRNInput ? (
            <Input
              type="number"
              size="small"
              className="tag-input"
              value={inputCRN}
              onChange={(evt) => setInputCRN(parseInt(evt.target.value))}
              onBlur={handleCRNAdd}
              onPressEnter={handleCRNAdd}
            />
          ) : (
            <Tag className="add-crn" onClick={showInput}>
              <PlusOutlined /> Add CRN
            </Tag>
          )}
          {/*{!inputVisible && (*/}
          {/*    <Tag className="site-tag-plus" onClick={this.showInput}>*/}
          {/*      <PlusOutlined /> New Tag*/}
          {/*    </Tag>*/}
          {/*)}*/}
          {/*  <Button onClick={onBack}>Back</Button>*/}

          {/*  <Button onClick={handleSubmitCourse} type="primary">*/}
          {/*    Next*/}
          {/*  </Button>*/}
        </Form.Item>
      </Form>
    </div>
  );
}
