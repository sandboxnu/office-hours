import styled from "styled-components";
import React, { Component, useState } from "react";
import LeftNavBar from "./LeftNavBar";
import { Drawer, Button, Menu } from "antd";
import RightNavBar from "./RightNavBar";

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
  width: 150px;
  float: left;
`;

const Logo = styled.a`
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  color: #262626;
  padding: 19px 60px;
  text-transform: capitalize;

  @media (max-width: 767px) {
    margin-left: -20px;
    padding: 10px 20px;
  }
`;

const MenuCon = styled.div`
  width: calc(100% - 150px);
  padding-left: 200px;
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
  course: Course;
}

export default function NavBar({ course }: NavBarProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Nav>
      <LogoContainer>
        <Logo href="">Course</Logo>
      </LogoContainer>
      <MenuCon>
        <LeftMenu>
          <LeftNavBar />
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
              <a href="/today">Today</a>
            </Menu.Item>
            <Menu.Item key="schedule">
              <a href="/schedule">Schedule</a>
            </Menu.Item>
            <Menu.Item key="queue">
              <a href="/queue">Queue</a>
            </Menu.Item>
            <Menu.Item key="login">
              <a href="/login">Login</a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </MenuCon>
    </Nav>
  );
}
