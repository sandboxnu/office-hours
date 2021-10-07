import useSWR from "swr";
import React, { ReactElement, useState } from "react";
import { API } from "@koh/api-client";
import { Button, message, Modal, Select } from "antd";
import { Role, UserCourse } from "@koh/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { confirm } = Modal;

export default function WithdrawCourseSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [toWithdraw, setWithdraw] = useState<number>(undefined);
  const [isValid, setValid] = useState<boolean>(false);

  const formattedRoles = {
    student: "Student",
    ta: "TA",
    professor: "Professor",
  };

  function onWithdrawChange(newCourseId: number) {
    setWithdraw(newCourseId);
    setValid(true);
  }

  async function withdraw(course: UserCourse) {
    await API.profile.withdrawCourse(course.course.id, {
      email: profile?.email,
      role: course.role as Role,
    });
    message.success("Successfully withdrew from " + course.course.name);
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
      } as ${
        formattedRoles[course.role]
      }.  The only way to get back is by contacting a professor!`,
      onOk() {
        withdraw(course);
      },
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
            <Option key={c.course.id} value={`${c.course.id}`}>
              {`${c.course.name} (${formattedRoles[c.role]})`}
            </Option>
          ))}
        </Select>
        <Button type="primary" disabled={!isValid} onClick={showConfirm} danger>
          Withdraw
        </Button>
      </div>
    )
  );
}