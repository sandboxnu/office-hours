import { ReactElement } from "react";
import Modal from "antd/lib/modal/Modal";
import { Switch, Input, Form, Select, Tooltip, message } from "antd";
import styled from "styled-components";
import { default as React, useEffect, useState } from "react";
import { useSemester } from "../../hooks/useSemester";
import { API } from "@koh/api-client";
const NotesInput = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #b8c4ce;
`;

interface AddCourseProps {
  visible: boolean;
  onClose: () => void;
}
export function AddCourseModal({
  visible,
  onClose,
}: AddCourseProps): ReactElement {
  const [form] = Form.useForm();
  const [option, setOptions] = useState<{ value: number; label: string }[]>();
  const semesters = useSemester();
  useEffect(() => {
    const temp = semesters?.map((semester) => {
      return { value: semester.id, label: semester.season + semester.year };
    });
    setOptions(temp);
  }, [semesters]);
  async function addCourse(value: any) {
    try {
      const body = {
        name: value.name,
        section: value.section,
        zoomLink: value.zoomlink || null,
        semester: value.semester,
        enabled: value.enabled,
        timezone: value.timezone,
      };
      console.log(body);
      await API.site_admin.createCourse(body);
      message.success("Course added");
    } catch (err) {
      console.log(err.message);
      message.error(
        "Course not added, check whether course has already been added."
      );
    }
  }

  return (
    <Modal
      title="Add Course"
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        const value = await form.validateFields();
        console.log(value);
        addCourse(value);
        onClose();
      }}
    >
      <Form form={form}>
        <Form.Item label="Name" name="name" required={true}>
          <NotesInput placeholder={"COSC 404"} />
        </Form.Item>
        <Form.Item label="Section name" name="section" required={true}>
          <NotesInput placeholder={"001"} />
        </Form.Item>
        <Tooltip title="Use timezone identifiers">
          <Form.Item label="Timezone" name="timezone" required={true}>
            <NotesInput placeholder={"America/Vancouver"} />
          </Form.Item>
        </Tooltip>
        <Form.Item
          label="Enabled"
          name="enabled"
          valuePropName="checked"
          required={true}
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Semester" name="semester" required={true}>
          <Select options={option}></Select>
        </Form.Item>
        <Form.Item label="zoom link" name="zoomlink">
          <NotesInput placeholder={""} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
