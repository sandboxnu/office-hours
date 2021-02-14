import React, { ReactElement, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import { Table, Input, Select, Button } from "antd";
import { API } from "@koh/api-client";
import { Role, UpdateCourseOverrideResponse } from "@koh/common";
const { Column } = Table;
const { Option } = Select;

type CourseOverrideSettingsProps = { courseId: number };
type AddOverrideInputProps = {
  courseId: number;
  onAddOverride: (ovr: UpdateCourseOverrideResponse) => void;
};

const OverrideContents = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`;

export default function CourseOverrideSettings({
  courseId,
}: CourseOverrideSettingsProps): ReactElement {
  const { data, mutate } = useSWR(`/api/v1/courses/course_override`, async () =>
    API.course.getCourseOverrides(courseId)
  );

  return (
    <OverrideContents>
      <AddOverrideInput
        courseId={courseId}
        onAddOverride={(r) => console.log(r)}
      />
      <Table dataSource={data?.data.map((row, i) => ({ ...row, key: i }))}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
      </Table>
    </OverrideContents>
  );
}

const OverrideInput = styled.div`
  display: flex;
`;

function AddOverrideInput({
  courseId,
  onAddOverride,
}: AddOverrideInputProps): ReactElement {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(Role.STUDENT);
  const [error, setError] = useState("");

  const addOverride = async () => {
    try {
      const resp = await API.course.addOverride(courseId, { email, role });
      onAddOverride(resp);
      console.log("sent");
      setError("");
    } catch (e) {
      setError(e.response?.data?.message);
      console.log(e);
    }
  };

  return (
    <div>
      <OverrideInput>
        <Input
          placeholder="Email"
          style={{ marginRight: 10 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          style={{ width: 120, marginRight: 10 }}
          value={role}
          onChange={(e) => setRole(e)}
        >
          <Option value={Role.STUDENT}>Student</Option>
          <Option value={Role.TA}>TA</Option>
          <Option value={Role.PROFESSOR}>Professor</Option>
        </Select>
        <Button type="primary" onClick={addOverride}>
          Add Override
        </Button>
      </OverrideInput>
      <div style={{ height: "2rem", color: "#da2028" }}>{error}</div>
    </div>
  );
}
