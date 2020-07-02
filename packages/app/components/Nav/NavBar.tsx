import styled from "styled-components";
import React, { Component, useState, useEffect } from "react";
import LeftNavBar from "./LeftNavBar";
import { Drawer, Button, Menu } from "antd";
import RightNavBar from "./RightNavBar";
import { Course, User, UserCourse, CoursePartial } from "@template/common";
import Link from "next/link";
import { API } from "@template/api-client";
import useSWR from "swr";
import { useProfile } from "../../hooks/useProfile";
import Settings from "./Settings/Profile";

const Container = styled.div`
  width: 1440px;
  height: 64px;
`;

const Nav = styled.nav`
  padding: 0px 0px;
  background: #fff;
  border-bottom: solid 1px #e8e8e8;
  overflow: auto;

  @media (max-width: 767px) {
    padding: 0px 16px;
  }
`;

const LogoContainer = styled.div`
  width: 225px;
  float: left;
`;

const Logo = styled.a`
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  color: #262626;
  padding: 19px 0px;
  padding-left: 64px;
  text-transform: capitalize;

  @media (max-width: 767px) {
    margin-left: -20px;
    padding: 10px 20px;
  }
`;

const MenuCon = styled.div`
  width: calc(100% - 225px);
  padding-left: 0px;
  float: left;
`;

const LeftMenu = styled.div`
  float: left;
  @media (max-width: 767px) {
    display: none;
  }
`;

const RightMenu = styled.div`
  float: right;
  @media (max-width: 767px) {
    display: none;
  }
`;

const BarsMenu = styled(Button)`
  float: right;
  height: 32px;
  padding: 6px;
  margin-top: 8px;
  display: none;
  background: none;

  @media (max-width: 767px) {
    display: inline-block;
  }
`;

const BarsButton = styled.span`
  display: block;
  width: 20px;
  height: 2px;
  background: #1890ff;
  position: relative;

  &:after,
  :before {
    content: attr(x);
    width: 20px;
    position: absolute;
    top: -6px;
    left: 0;
    height: 2px;
    background: #1890ff;
  }

  &:after {
    top: auto;
    bottom: -6px;
  }
`;

interface NavBarProps {
  courseId: number;
}

export default function NavBar({ courseId }: NavBarProps) {
  const profile = useProfile();
  const [visible, setVisible] = useState<boolean>(false);

  const { data, error } = useSWR(`api/v1/courses/${courseId}/queue`, async () =>
    API.course.queues(courseId)
  );

  const course = profile.courses.find((c) => c.course.id === courseId).course;
  const queueId = data && data.length > 0 && data[0].id;

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  if (course) {
    return (
      <Nav>
        <LogoContainer>
          <Logo href={`/class/${courseId}/today`}>{course.name}</Logo>
        </LogoContainer>
        <MenuCon>
          <LeftMenu>
            <LeftNavBar courseId={courseId} queueId={queueId} />
          </LeftMenu>
          <RightMenu>
            <RightNavBar />
          </RightMenu>
          <BarsMenu type="primary" onClick={showDrawer}>
            <BarsButton></BarsButton>
          </BarsMenu>
          <Drawer
            title="Course"
            placement="right"
            visible={visible}
            closable={false}
            onClose={onClose}
            bodyStyle={{ padding: "12px" }}
          >
            <Menu>
              <Menu.Item key="today">
                <Link href="/class/[cid]/today" as={`/class/${courseId}/today`}>
                  <a>Today</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="schedule">
                <Link
                  href="/class/[cid]/schedule"
                  as={`/class/${courseId}/schedule`}
                >
                  <a>Schedule</a>
                </Link>
              </Menu.Item>
              {queueId && (
                <Menu.Item key="queue">
                  <Link
                    href="/class/[cid]/queue/[qid]"
                    as={`/class/${courseId}/queue/${queueId}`}
                  >
                    <a>Queue</a>
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key="login">
                <Link href="/login" as="/login">
                  <a>Login</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </MenuCon>
      </Nav>
    );
  } else {
    return null;
  }
}
