import { DownOutlined } from "@ant-design/icons";
import { Role } from "@koh/common";
import { Modal, Button, Drawer, Dropdown, Menu, Image, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useProfile } from "../../hooks/useProfile";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import AlertsContainer from "./AlertsContainer";
import NavBarTabs, { NavBarTabsItem } from "./NavBarTabs";
import ProfileDrawer from "./ProfileDrawer";
import { API } from "@koh/api-client";

const Nav = styled.nav`
  padding: 0px 0px;
  display: flex;
  align-items: center;
  height: 67px;
  z-index: 1;
`;

// A hack to get the white stripe edge to edge, even when Nav is narrower.
const NavBG = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 67px;
  background: #fff;
  border-bottom: solid 1px #e8e8e8;
`;

const LogoContainer = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #262626;
  text-transform: capitalize;
`;

const MenuCon = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0px;
`;

const LeftMenu = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
  flex-grow: 1;
`;

const RightMenu = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
`;

const BarsMenu = styled(Button)`
  height: 32px;
  padding: 6px;
  margin-top: 8px;
  display: none;
  background: none;

  @media (max-width: 650px) {
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

const CoursesMenuItem = styled(Menu.Item)`
  z-index: 1;
  background: #ffffff;
`;

interface NavBarProps {
  courseId: number;
}

export default function NavBar({ courseId }: NavBarProps): ReactElement {
  const profile = useProfile();
  if (!courseId) {
    courseId = profile?.courses[0]?.course?.id;
  }

  const [_defaultCourse, setDefaultCourse] = useLocalStorage(
    "defaultCourse",
    null
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(true);
  const { pathname } = useRouter();
  const { course } = useCourse(courseId);
  const role = useRoleInCourse(courseId);

  const openQueues = course?.queues?.filter((queue) => queue.isOpen);

  const addMember = async () => {
    setUpdateModalVisible(false);
    await API.organizations.addMember(profile.id, 1);

    const courseProfile = profile.courses.find((c) => c.course.id === courseId);

    if (courseProfile.role == "professor") {
      await API.organizations.addCourse(courseId, 1);
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const courseSelector = (
    <Menu>
      {profile?.courses?.map((c) => (
        <CoursesMenuItem
          key={c.course.id}
          onClick={() => setDefaultCourse(c.course)}
        >
          <Link href="/course/[cid]/today" as={`/course/${c.course.id}/today`}>
            <a>{c.course.name}</a>
          </Link>
        </CoursesMenuItem>
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

  if (role === Role.PROFESSOR || role === Role.TA) {
    tabs.push({
      href: "/course/[cid]/course_admin_panel",
      as: `/course/${courseId}/course_admin_panel`,
      text: "Admin Panel",
    });
  }

  if (openQueues?.length > 0) {
    tabs.push({
      text: "Queue",
      queues: openQueues,
      courseId: courseId,
    });
  }

  if (role === Role.PROFESSOR) {
    tabs.push({
      href: "/course/[cid]/insights",
      as: `/course/${courseId}/insights`,
      text: "Insights",
    });
  }

  const [messageApi, easterEggHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Okay... maybe there was one easter egg 🥚🥚🥚",
    });
  };
  return courseId ? (
    <>
      {easterEggHolder}
      <NavBG />
      <AlertsContainer courseId={courseId} />
      <Nav>
        <LogoContainer>
          {profile?.courses.length > 1 ? (
            <Dropdown
              overlay={courseSelector}
              trigger={["click"]}
              placement="bottomLeft"
            >
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
            </Dropdown>
          ) : (
            <Logo>
              {course?.organizationCourse && (
                <Image
                  width={40}
                  preview={false}
                  src={course.organizationCourse.logoUrl}
                />
              )}
              <span>{course?.name}</span>
            </Logo>
          )}
        </LogoContainer>
        <MenuCon>
          <LeftMenu>
            <NavBarTabs horizontal currentHref={pathname} tabs={tabs} />
          </LeftMenu>
          <RightMenu>
            <ProfileDrawer courseId={courseId} />
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
          <ProfileDrawer courseId={courseId} />
        </Drawer>
      </Nav>

      {profile.organizationRole === null && (
        <Modal
          title="[System Message] Exciting News: Introducing Organizations!"
          open={updateModalVisible}
          closable={false}
          footer={[
            <Button key="ok" type="primary" onClick={addMember}>
              OK
            </Button>,
          ]}
        >
          <p>
            🎉 We&lsquo;re thrilled to announce a new feature that we are
            working on: Organizations 🏢
            <br />
            <br />
            As part of this work, we need to add your account to one of the
            existing organizations. <br />
            <br />
            Before adding you to your organization, we just wanted to share this
            update with you before we automatically migrate your account when
            you click the button below.
            <br />
            <br />
            Once you click the button below, this message will no longer appear.
            <br />
            <br />
            <small
              style={{ fontSize: "3px", cursor: "none" }}
              onClick={success}
            >
              No easter egss here 🥚🥚🥚
            </small>
          </p>
        </Modal>
      )}
    </>
  ) : null;
}
