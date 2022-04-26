import {
  BellOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row, Space, Tooltip } from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import ResponsiveRowCol from "../common/ResponsiveRowCol";
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

const CenteredText = styled.h2`
  text-align: center;
`;

export default function CourseAdminPanel({
  defaultPage,
  courseId,
}: CourseAdminPageProps): ReactElement {
  const profile = useProfile();
  const router = useRouter();

  const [currentSettings, setCurrentSettings] = useState(
    defaultPage || CourseAdminOptions.CHECK_IN
  );

  return (
    <Row>
      {/* { isMobile ?

        : */}
      <ResponsiveRowCol style={{ textAlign: "center" }}>
        <SettingsPanelAvatar avatarSize={50} />
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
      </ResponsiveRowCol>
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
