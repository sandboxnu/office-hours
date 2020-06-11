import styled from "styled-components";
import React, { Component, useState } from "react";
import LeftNavBar from "./LeftNavBar";
import { Drawer, Button } from "antd";
import RightNavBar from "./RightNavBar";

const Container = styled.div`
  width: 1440px;
  height: 64px;
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
    //<Container>
    <nav className="menuBar">
      <div className="logo">
        <a href="">Course</a>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftNavBar />
        </div>
        <div className="rightMenu">
          <RightNavBar />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="left"
          visible={visible}
          closable={false}
          onClose={onClose}
        >
          <LeftNavBar />
        </Drawer>
      </div>
    </nav>
  );
}
