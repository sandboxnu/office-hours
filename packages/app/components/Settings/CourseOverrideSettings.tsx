import React, { ReactElement } from "react";
import useSWR from "swr";
import { Table, Input, Select, Button } from "antd";
import { API } from "@koh/api-client";
const { Column } = Table;
const { Option } = Select;

type CourseOverrideSettingsProps = { courseId: number };

export default function CourseOverrideSettings({
  courseId,
}: CourseOverrideSettingsProps): ReactElement {
  const { data, mutate } = useSWR(`/api/v1/courses/course_override`, async () =>
    API.course.getCourseOverrides(courseId)
  );

  return (
    <div>
      <div>
        <Input placeholder="Email" />
        <Select defaultValue="Student" style={{ width: 120 }}>
          <Option value="Student">Student</Option>
          <Option value="TA">TA</Option>
          <Option value="Professor">Professor</Option>
        </Select>
        <Button type="primary">Add Override</Button>
      </div>
      <Table dataSource={data?.data.map((row, i) => ({ ...row, key: i }))}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
      </Table>
    </div>
  );
}
