import {
  BellOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row, Space, Tooltip } from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import CourseRosterPage from "./CourseRosterPage";
import { SettingsPanelAvatar } from "./SettingsSharedComponents";
import TACheckInCheckOutTimes from "./TACheckInCheckOutTimes";
import AddStudentsToCourse from "./AddStudentsToCourse";
import ExportQuestions from "./ExportQuestions";
import EditQuestions from "./EditQuestions";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { Role } from "@koh/common";
import ChatbotSettings from "./ChatbotSettings";
import ChatbotQuestions from "./ChatbotQuestions";
//import EditCourse from "./EditCourse";
export enum CourseAdminOptions {
  CHECK_IN = "CHECK_IN",
  ROSTER = "ROSTER",
  ADD = "ADD",
  EXPORT = "EXPORT",
  EDIT = "EDIT",
  EDIT_COURSE = "EDIT_COURSE",
  CHATBOT_SETTINGS = "CHATBOT_SETTINGS",
}

interface CourseAdminPageProps {
  defaultPage: CourseAdminOptions;
  courseId: number;
}

const VerticalDivider = styled.div`
  @media (min-width: 767px) {
    border-right: 1px solid #cfd6de;
    margin-right: 32px;
  }
`;

const CenteredText = styled.p`
  text-align: center;
`;

export default function CourseAdminPanel({
  defaultPage,
  courseId,
}: CourseAdminPageProps): ReactElement {
  const role = useRoleInCourse(Number(courseId));
  const profile = useProfile();
  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || CourseAdminOptions.CHECK_IN
  );

  const router = useRouter();

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center" }}>
        <SettingsPanelAvatar avatarSize={20} />
        <CenteredText>
          Welcome back
          <br />
          {profile?.firstName} {profile?.lastName}
          {!profile?.photoURL && (
            <Tooltip
              title={
                "You should consider uploading a profile picture to make yourself more recognizable to students"
              }
            >
              <span>
                <QuestionCircleOutlined
                  style={{ marginLeft: "5px" }}
                  onClick={() => {
                    router.push(`/settings?cid=${courseId}`);
                  }}
                />
              </span>
            </Tooltip>
          )}
        </CenteredText>
        <Menu
          defaultSelectedKeys={[currentSettings]}
          onClick={(e) => setCurrentSettings(e.key as CourseAdminOptions)}
          style={{ background: "#f8f9fb", paddingTop: "20px" }}
        >
          {role === Role.PROFESSOR && (
            <>
              <Menu.Item
                key={CourseAdminOptions.CHECK_IN}
                icon={<EditOutlined />}
              >
                TA Check In/Out Times
              </Menu.Item>
              {/* <Menu.Item key={CourseAdminOptions.EDIT_COURSE} icon={<EditOutlined />}>
              Edit course details
            </Menu.Item> */}
              <Menu.Item
                key={CourseAdminOptions.ROSTER}
                icon={<BellOutlined />}
              >
                Course Roster
              </Menu.Item>
              <Menu.Item key={CourseAdminOptions.ADD} icon={<UploadOutlined />}>
                Add students to course
              </Menu.Item>
            </>
          )}
          <Menu.Item
            key={CourseAdminOptions.EXPORT}
            icon={<DownloadOutlined />}
          >
            Export questions
          </Menu.Item>
          <Menu.Item key={CourseAdminOptions.EDIT} icon={<EditOutlined />}>
            Edit questions
          </Menu.Item>
          {/* <Menu.Item
                        key={CourseAdminOptions.CHATBOT_SETTINGS}
                        icon={<EditOutlined />}
                    >
                        Chatbot
                    </Menu.Item> */}
        </Menu>
      </Col>
      <VerticalDivider />
      <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
        <Col span={20}>
          {/* {currentSettings === CourseAdminOptions.EDIT_COURSE && (
            <EditCourse courseId={courseId} />
          )} */}
          {currentSettings === CourseAdminOptions.CHECK_IN && (
            <TACheckInCheckOutTimes courseId={courseId} />
          )}
          {currentSettings === CourseAdminOptions.ROSTER && (
            <CourseRosterPage courseId={courseId} />
          )}
          {currentSettings === CourseAdminOptions.ADD && (
            <AddStudentsToCourse courseId={courseId} />
          )}
          {currentSettings === CourseAdminOptions.EXPORT && (
            <ExportQuestions courseId={courseId} />
          )}
          {currentSettings === CourseAdminOptions.EDIT && (
            <EditQuestions courseId={courseId} />
          )}
          {/* {currentSettings ===
                        CourseAdminOptions.CHATBOT_SETTINGS && (
                        <ChatbotQuestions courseId={courseId} />
                    )} */}
        </Col>
      </Space>
    </Row>
  );
}
