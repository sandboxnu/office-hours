import React, { ReactElement } from "react";
import useSWR from "swr";
import { Table } from "antd";
import { API } from "@koh/api-client";
const { Column } = Table;

type CourseOverrideSettingsProps = { courseId: number };

export default function CourseOverrideSettings({
  courseId,
}: CourseOverrideSettingsProps): ReactElement {
  const { data, mutate } = useSWR(`/api/v1/courses/course_override`, async () =>
    API.course.getCourseOverrides(courseId)
  );

  console.log(data);
  return (
    <div></div>
    // <Table dataSource={null}>
    //   <Column title="Name" dataIndex="name" key="name" />
    //   <Column title="Email" dataIndex="email" key="email" />
    //   <Column title="Role" dataIndex="role" key="role" />
    // </Table>
  );
}
