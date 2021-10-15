import useSWR from "swr";
import React, { ReactElement, useState } from "react";
import { API } from "@koh/api-client";
import { Button, message, Modal, Select } from "antd";
import { UserCourse } from "@koh/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Router from "next/router";

const { Option } = Select;
const { confirm } = Modal;

export default function WithdrawCourseSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [toWithdraw, setWithdraw] = useState<number>(undefined);

  const formattedRoles = {
    student: "Student",
    ta: "TA",
    professor: "Professor",
  };

  function onWithdrawChange(newCourseId: number) {
    setWithdraw(newCourseId);
  }

  async function withdraw(course: UserCourse) {
    await API.course.withdrawCourse(course.course.id);
    message.success("Successfully withdrew from " + course.course.name);
    setWithdraw(undefined);
    await mutate();
    await Router.push("/");
  }

  function showConfirm() {
    const course = profile?.courses.find((c) => c.course.id === toWithdraw);

    confirm({
      title: `Please Confirm!`,
      icon: <ExclamationCircleOutlined />,
      content: `Please confirm that you want to unenroll from ${
        course.course.name
      } as a ${
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
          placeholder="Select a Course"
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
            <Option key={c.course.id} value={c.course.id}>
              {`${c.course.name} (${formattedRoles[c.role]})`}
            </Option>
          ))}
        </Select>
        <Button
          style={{ marginLeft: "20px" }}
          type="primary"
          disabled={toWithdraw === undefined}
          onClick={showConfirm}
          danger
        >
          Withdraw
        </Button>
      </div>
    )
  );
}
