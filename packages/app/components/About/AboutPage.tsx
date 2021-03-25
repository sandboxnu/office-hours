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
const ProfilesTitle = styled(Title)`
  border-bottom: 1px solid #cfd6de;
  font-size: 20px;
  margin-bottom: 10px;
}`;
const ProfilesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: 30px;
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
        <Col span={20} style={{ maxWidth: "100%" }}>
          <ProfilesTitle>Current Members</ProfilesTitle>
          <ProfilesSection>
            {PROFILES_CURRENT.map((prof, idx) => (
              <ProfileCard
                key={idx}
                name={prof.name}
                role={prof.role}
                imgSrc={prof.image}
                linkedin={prof.linkedin}
                personalSite={prof.personalSite}
              />
            ))}
          </ProfilesSection>
          <ProfilesTitle>Past Members</ProfilesTitle>
          <ProfilesSection>
            {PROFILES_PAST.map((prof, idx) => (
              <ProfileCard
                key={idx}
                name={prof.name}
                role={prof.role}
                imgSrc={prof.image}
                linkedin={prof.linkedin}
                personalSite={prof.personalSite}
              />
            ))}
          </ProfilesSection>
        </Col>
      </Space>
    </Row>
  );
}

const sadcat =
  "https://www.vettedpetcare.com/vetted-blog/wp-content/uploads/2017/09/How-To-Travel-With-a-Super-Anxious-Cat-square.jpeg";

// these images links are generated from a gdrive sharing link using this tool:
// https://buildbrothers.com/gdrive-generator/
// which is described in this article: https://blog.usejournal.com/host-static-images-for-your-apps-or-website-on-google-drive-hotlink-to-gdrive-images-358d6fcf8ef7
const PROFILES_CURRENT = [
  {
    name: "Stanley Liu",
    role: "Project Lead",
    image: sadcat,
    linkedin: "https://www.linkedin.com/in/stanleyspliu/",
  },
  { name: "Eddy Li", role: "Developer", image: sadcat, linkedin: "" },
  {
    name: "Will Stenzel",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1r7yxjcxGYWClgb8ps48Ov2KKsHP55H3C",
    personalSite: "https://willstenzel.com/",
  },
  { name: "Danish Farooq", role: "Developer", image: sadcat, linkedin: "" },
  { name: "Olivia Floody", role: "Developer", image: sadcat, linkedin: "" },
  {
    name: "Iris Liu",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1ouq2iOsN2q1i6jGSnBcblRyCsAMH8ctX",
    linkedin: "https://www.linkedin.com/in/iris-liu-curiously",
  },
  { name: "Alexandra Kopel", role: "Designer", image: sadcat, linkedin: "" },
];

// TODO: past members ashlynn, dj, tak
const PROFILES_PAST = [
  {
    name: "Da-Jin Chu",
    role: "Alum",
    image: sadcat,
    linkedin: "",
    personalSite: "",
  },
];
