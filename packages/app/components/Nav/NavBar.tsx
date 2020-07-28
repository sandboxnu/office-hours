import styled from "styled-components";
import React, { useState, ReactElement } from "react";
import NavBarTabs, { NavBarTabsItem } from "./NavBarTabs";
import { Drawer, Button, Menu, Dropdown } from "antd";
import Link from "next/link";
import { API } from "@template/api-client";
import useSWR from "swr";
import Settings from ".//Settings";
import { useRouter } from "next/router";
import { useProfile } from "../../hooks/useProfile";
import { DownOutlined } from "@ant-design/icons";
import SimpleDropdown from "./SimpleDropdown";

const Nav = styled.nav`
  padding: 0px 0px;
  background: #fff;
  border-bottom: solid 1px #e8e8e8;
  display: flex;
  height: 67px;

  @media (max-width: 767px) {
    padding: 0px 16px;
    height: 50px;
  }
`;

const LogoContainer = styled.div`
  flex: 225px 0 0;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
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
  const profile = useProfile();
  const { pathname } = useRouter();

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

  const courseSelector = (
    <Menu>
      {profile?.courses.map((c) => (
        <Menu.Item key={c.course.id}>
          <Link href="/course/[cid]/today" as={`/course/${c.course.id}/today`}>
            {c.course.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const tabs: NavBarTabsItem[] = [
    {
      href: "/course/[cid]/today",
      as: `/course/${courseId}/today`,
      text: "Today",
    },
    {
      href: "/course/[cid]/schedule",
      as: `/course/${courseId}/schedule`,
      text: "Schedule",
    },
  ];
  if (queueId) {
    tabs.push({
      href: "/course/[cid]/queue/[qid]",
      as: `/course/${courseId}/queue/${queueId}`,
      text: "Queue",
    });
  }

  return (
    <Nav>
      <LogoContainer>
        {profile?.courses.length > 1 ? (
          <SimpleDropdown overlay={courseSelector}>
            {course && (
              <a>
                <Logo>
                  <span>{course?.name}</span>
                  <DownOutlined
                    style={{
                      fontSize: "16px",
                      verticalAlign: "-0.125em",
                      marginLeft: "5px",
                    }}
                  />
                </Logo>
              </a>
            )}
          </SimpleDropdown>
        ) : (
          <Logo>
            <span>{course?.name}</span>
          </Logo>
        )}
      </LogoContainer>
      <MenuCon>
        <LeftMenu>
          <NavBarTabs horizontal currentHref={pathname} tabs={tabs} />
        </LeftMenu>
        <RightMenu>
          <Settings />
        </RightMenu>
      </MenuCon>
      <BarsMenu type="primary" onClick={showDrawer}>
        <BarsButton />
      </BarsMenu>
      <Drawer
        title="Course"
        placement="right"
        visible={visible}
        closable={false}
        onClose={onClose}
        bodyStyle={{ padding: "12px" }}
      >
        <NavBarTabs currentHref={pathname} tabs={tabs} />
        <Settings />
      </Drawer>
    </Nav>
  );
}
