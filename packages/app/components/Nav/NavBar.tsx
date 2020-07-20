import styled from "styled-components";
import React, { useState, ReactElement } from "react";
import LeftNavBar from "./LeftNavBar";
import { Drawer, Button, Menu } from "antd";
import Link from "next/link";
import { API } from "@template/api-client";
import useSWR from "swr";
import Settings from ".//Settings";

const Nav = styled.nav`
  padding: 0px 0px;
  background: #fff;
  border-bottom: solid 1px #e8e8e8;
  display: flex;

  @media (max-width: 767px) {
    padding: 0px 16px;
  }
`;

const LogoContainer = styled.div`
  flex: 225px 0 0;
  display: flex;
  align-items: center;
`;

const Logo = styled.a`
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  color: #262626;
  padding-left: 64px;
  text-transform: capitalize;

  @media (max-width: 767px) {
    margin-left: -20px;
    padding: 10px 20px;
  }
`;

const MenuCon = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0px;
`;

const LeftMenu = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const RightMenu = styled.div`
  margin-right: 15px;
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

export default function NavBar({ courseId }: NavBarProps): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  const { data: course, error } = useSWR(
    courseId && `api/v1/courses/${courseId}`,
    async () => API.course.get(courseId)
  );

  const queueId =
    course?.queues && course.queues.length > 0 && course.queues[0].id;

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Nav>
      <LogoContainer>
        {course && (
          <Logo href={`/course/${courseId}/today`}>{course.name}</Logo>
        )}
      </LogoContainer>
      <MenuCon>
        <LeftMenu>
          <LeftNavBar courseId={courseId} queueId={queueId} />
        </LeftMenu>
        <RightMenu>
          <Settings />
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
              <Link href="/course/[cid]/today" as={`/course/${courseId}/today`}>
                <a>Today</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="schedule">
              <Link
                href="/course/[cid]/schedule"
                as={`/course/${courseId}/schedule`}
              >
                <a>Schedule</a>
              </Link>
            </Menu.Item>
            {queueId && (
              <Menu.Item key="queue">
                <Link
                  href="/course/[cid]/queue/[qid]"
                  as={`/course/${courseId}/queue/${queueId}`}
                >
                  <a>Queue</a>
                </Link>
              </Menu.Item>
            )}
            <Settings />
          </Menu>
        </Drawer>
      </MenuCon>
    </Nav>
  );
}
