import useSWR from "swr";
import React, { ReactElement } from "react";
import { API } from "@koh/api-client";
import { Button, message, Modal, Table } from "antd";
import { UserCourse } from "@koh/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Router from "next/router";
import { HeaderTitle } from "./Styled";
import { useCourse } from "../../hooks/useCourse";
import styled from "styled-components";

const { confirm } = Modal;

// table gets transposed in mobile view
const ResponsiveTable = styled(Table)`
  @media screen and (max-width: 650px) {
    table thead {
      display: none;
    }
    table td {
      display: flex;
      padding: 10px 16px;
    }

    table td::before {
      content: attr(label);
      font-weight: bold;
      width: 120px;
      min-width: 120px;
    }

    table tr {
      background: #fafafa;
      margin-bottom: 10px;
      display: block;
    }
  }
`;
const WithdrawButton = styled(Button)`
  @media (min-width: 650px) {
    margin-left: 20px;
  }
`;

export default function CoursePreferenceSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const formattedRoles = {
    student: "Student",
    ta: "TA",
    professor: "Professor",
  };

  async function withdraw(course: UserCourse) {
    await API.course.withdrawCourse(course.course.id);
    message.success("Successfully withdrew from " + course.course.name);
    await mutate();
    await Router.push("/");
  }

  function showConfirm(courseId) {
    const course = profile?.courses.find((c) => c.course.id === courseId);

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

  const InstructorCell = ({ courseId }: { courseId: number }) => {
    const course = useCourse(courseId);

    return <>{course.course?.coordinator_email}</>;
  };

  const columns = [
    {
      title: "Course name",
      dataIndex: "name",
      key: "name",
      onCell: () => ({
        label: "Course name", // label is used to display header in transposed mobile view
      }),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      onCell: () => ({
        label: "Role",
      }),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      render: function createInstructorCell(courseId) {
        return <InstructorCell courseId={courseId} />;
      },
      onCell: () => ({
        label: "Instructor",
      }),
    },
    {
      title: "",
      key: "courseId",
      dataIndex: "courseId",
      render: function withdrawButton(courseId) {
        return (
          <WithdrawButton
            type="primary"
            shape="round"
            onClick={() => {
              showConfirm(courseId);
            }}
            danger
          >
            Withdraw
          </WithdrawButton>
        );
      },
      onCell: () => ({
        label: "",
      }),
    },
  ];

  function createCourseDataSource() {
    return profile?.courses.map((c) => ({
      key: c.course.id,
      name: c.course.name,
      role: formattedRoles[c.role],
      instructor: c.course.id,
      courseId: c.course.id,
    }));
  }

  return (
    profile && (
      <div>
        <HeaderTitle>
          <h1>Course Preferences</h1>
        </HeaderTitle>
        <ResponsiveTable
          columns={columns}
          dataSource={createCourseDataSource()}
        />
      </div>
    )
  );
}
