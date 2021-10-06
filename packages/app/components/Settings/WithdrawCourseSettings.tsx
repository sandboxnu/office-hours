import useSWR from "swr";
import React, { ReactElement, useState } from "react";
import { API } from "@koh/api-client";
import { Button, message, Modal, Select } from "antd";
import { Role, UserCourse } from "@koh/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function WithdrawCourseSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [toWithdraw, setWithdraw] = useState<number>(undefined);
  const [isValid, setValid] = useState<boolean>(false);

  const { Option } = Select;
  const { confirm } = Modal;

  function onWithdrawChange(newCourseId: number) {
    setWithdraw(newCourseId);
    setValid(true);
  }

  function roleToString(role: Role) {
    switch (role) {
      case Role.PROFESSOR:
        return "Professor";
      case Role.STUDENT:
        return "Student";
      case Role.TA:
        return "TA";
      default:
        return "unknown role";
    }
  }

  async function withdraw(course: UserCourse) {
    await API.profile.withdrawCourse(course.course.id, {
      email: profile?.email,
      role: course.role as Role,
    });
    message.success("Successfully deleted the course: " + course.course.name);
    setWithdraw(undefined);
    setValid(false);
    mutate();
  }

  function showConfirm() {
    const course = profile?.courses.find((c) => c.course.id == toWithdraw);

    confirm({
      title: `Please Confirm!`,
      icon: <ExclamationCircleOutlined />,
      content: `Please confirm that you want to unenroll from ${
        course.course.name
      } as ${roleToString(
        course.role
      )}.  The only way to get back is by contacting a professor!`,
      onOk() {
        withdraw(course);
      },
      onCancel() {},
    });
  }

  return (
    profile && (
      <div style={{ paddingTop: "50px" }}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a course"
          optionFilterProp="children"
          onChange={onWithdrawChange}
          value={toWithdraw}
          filterOption={(input, option) => {
            return (
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {profile?.courses.map((c) => (
            <Option value={`${c.course.id}`}>{`${c.course.name} (${roleToString(
              c.role
            )})`}</Option>
          ))}
        </Select>
        <Button type="primary" disabled={!isValid} onClick={showConfirm} danger>
          withdraw
        </Button>
      </div>
    )
  );
}
