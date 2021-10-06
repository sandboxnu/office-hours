import useSWR from "swr";
import React, { ReactElement, useState } from "react";
import { API } from "@koh/api-client";
import { Button, Dropdown, Form, Menu, message, Modal, Select } from "antd";
import { Role } from "@koh/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function WithdrawCourseSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [toWidthdraw, setWithdraw] = useState<number>(-1);
  const [isValid, setValid] = useState<boolean>(false);

  const { Option } = Select;

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

  const { confirm } = Modal;

  function showConfirm() {
    const course = profile?.courses.find((c) => c.course.id == toWidthdraw);

    confirm({
      title: `Please Confirm!`,
      icon: <ExclamationCircleOutlined />,
      content: `Please confirm that you want to unenroll from ${
        course.course.name
      } as ${roleToString(
        course.role
      )}.  The only way to get back is by contacting a professor!`,
      onOk() {
        return new Promise(async (resolve, reject) => {
          await API.profile.withdrawCourse(course.course.id, {
            email: profile?.email,
            role: course.role as Role,
          });
          message.success(
            "Successfully deleted the override for " + course.course.name
          );
          return resolve;
        });
      },
      onCancel() {
        console.log("Cancel");
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
