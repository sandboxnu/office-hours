import { BellOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Menu, Row, Space } from "antd";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import CourseOverrideSettings from "./CourseOverrideSettings";
import { SettingsPanelAvatar } from "./SettingsSharedComponents";
import TACheckInCheckOutTimes from "./TACheckInCheckOutTimes";

export enum CourseAdminOptions {
  CHECK_IN = "CHECK_IN",
  OVERRIDES = "OVERRIDES",
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
  const profile = useProfile();
  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || CourseAdminOptions.CHECK_IN
  );

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center" }}>
        <SettingsPanelAvatar />
        <CenteredText>
          Welcome back {profile?.firstName} {profile?.lastName}
        </CenteredText>
        {!profile?.photoURL && (
          <CenteredText>
            You should consider uploading a{" "}
            <Link
              href={{
                pathname: "/settings",
                query: { cid: courseId },
              }}
            >
              Profile Picture
            </Link>{" "}
            to make yourself more recognizable to students
          </CenteredText>
        )}
        <Menu
          defaultSelectedKeys={[currentSettings]}
          onClick={(e) => setCurrentSettings(e.key as CourseAdminOptions)}
          style={{ background: "#f8f9fb", paddingTop: "20px" }}
        >
          <Menu.Item key={CourseAdminOptions.CHECK_IN} icon={<EditOutlined />}>
            TA Check In/Out Times
          </Menu.Item>
          <Menu.Item key={CourseAdminOptions.OVERRIDES} icon={<BellOutlined />}>
            Course Overrides
          </Menu.Item>
        </Menu>
      </Col>
      <VerticalDivider />
      <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
        <Col span={20}>
          {currentSettings === CourseAdminOptions.CHECK_IN && (
            <TACheckInCheckOutTimes courseId={courseId} />
          )}
          {currentSettings === CourseAdminOptions.OVERRIDES && (
            <CourseOverrideSettings courseId={courseId} />
          )}
        </Col>
      </Space>
    </Row>
  );
}
