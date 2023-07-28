import { DeleteOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { GetCourseOverridesRow, Role } from "@koh/common";
import { Button, message, Switch, Table } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useCourse } from "../../hooks/useCourse";
import AddOverrideInput from "./AddOverrideInput";

const { Column } = Table;

type CourseOverrideSettingsProps = { courseId: number };

const OverrideContents = styled.div`
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

  const { course, mutateCourse } = useCourse(courseId);

  const formattedRoles = {
    student: "Student",
    ta: "TA",
    professor: "Professor",
  };

  return (
    <OverrideContents>
      <h1>Course Overrides</h1>
      <br />
      <AddOverrideInput courseId={courseId} onAddOverride={() => mutate()} />
      <Table
        dataSource={data?.data.map((row, i) => ({
          ...row,
          key: i,
          role: formattedRoles[row.role],
        }))}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          title="Delete"
          key="delete"
          render={(text, record: GetCourseOverridesRow) => (
            <Button
              onClick={async () => {
                await API.course.deleteOverride(courseId, {
                  email: record.email,
                  role: record.role as Role,
                });
                message.success(
                  "Successfully deleted the override for " + record.name
                );
                mutate();
              }}
              type="link"
              style={{ textAlign: "center" }}
              icon={<DeleteOutlined style={{ color: "red" }} />}
              data-cy="delete-override-button"
            />
          )}
        />
      </Table>
      <br />
      <div>
        Is Khoury Admin/Banner down? Toggle this to temporarily allow students
        to join your class.{" "}
        <Switch
          onChange={async () => {
            await API.course.toggleSelfEnroll(courseId);
            mutateCourse();
          }}
          defaultChecked={course?.selfEnroll}
        />
      </div>
      <br />
      <b>
        You must manually toggle this feature off later, or any student will be
        allowed to join your class.
      </b>
    </OverrideContents>
  );
}
