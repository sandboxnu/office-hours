import React, { ReactElement } from "react";
import styled from "styled-components";
import { Col, Row, Space } from "antd";
import ProfileCard from "./ProfileCard";
import { VerticalDivider } from "../Settings/SettingsPage";

const Title = styled.div`
  color: #212934;
  font-weight: 500;
  font-size: 30px;
`;
const Description = styled.div`
  color: #5f6b79;
  font-size: 14px;
  margin-top: 15px;
`;

export default function AboutPage(): ReactElement {
  return (
    <Row style={{ padding: "20px 0px", flexFlow: "unset" }}>
      <Col span={6} style={{ textAlign: "center", paddingRight: "10px" }}>
        <Title>About Us</Title>
        <Description>
          Khoury Office Hours is an app made by students at Sandbox. TODO:
          links, whatev
        </Description>
      </Col>
      <VerticalDivider />
      <Space
        direction="vertical"
        size={40}
        style={{ flexGrow: 1, paddingTop: "20px" }}
      >
        <Col
          span={20}
          style={{ display: "flex", flexWrap: "wrap", maxWidth: "100%" }}
        >
          {PROFILES.map((prof, idx) => (
            <ProfileCard
              key={idx}
              name={prof.name}
              role={prof.role}
              imgSrc={prof.image}
              linkedin={prof.linkedin}
            />
          ))}
        </Col>
      </Space>
    </Row>
  );
}

// TODO: change image urls to be ones to the actual repo?
// are these all the people we want
const sadcat =
  "https://www.vettedpetcare.com/vetted-blog/wp-content/uploads/2017/09/How-To-Travel-With-a-Super-Anxious-Cat-square.jpeg";

const PROFILES = [
  { name: "Stanley Liu", role: "Project Lead", image: sadcat, linkedin: "" },
  { name: "Eddy Li", role: "Developer", image: sadcat, linkedin: "" },
  { name: "Will Stenzel", role: "Developer", image: sadcat, linkedin: "" },
  { name: "Danish Farooq", role: "Developer", image: sadcat, linkedin: "" },
  { name: "Olivia Floody", role: "Developer", image: sadcat, linkedin: "" },
  {
    name: "Iris Liu",
    role: "Developer",
    image:
      "https://user-images.githubusercontent.com/56804180/112553637-3eeb7e00-8d9b-11eb-90f5-4d8790e41cab.jpg",
    linkedin: "https://www.linkedin.com/in/iris-liu-curiously",
  },
  { name: "Da-Jin Chu", role: "Alum", image: sadcat, linkedin: "" },
  { name: "Alexandra Kopel", role: "Designer", image: sadcat, linkedin: "" },
];
