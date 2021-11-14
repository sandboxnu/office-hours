import React, { ReactElement } from "react";
import styled from "styled-components";
import { Col, Row, Space } from "antd";
import ProfileCard from "./ProfileCard";
import { VerticalDivider } from "../Settings/SettingsPage";

const Title = styled.div`
  text-align: center;
  color: #212934;
  font-weight: 500;
  font-size: 30px;
`;
const Description = styled.div`
  text-align: left;
  color: #5f6b79;
  font-size: 14px;
  margin-top: 15px;
`;
const ProfilesTitle = styled(Title)`
  text-align: left;
  border-bottom: 1px solid #cfd6de;
  font-size: 20px;
  margin-bottom: 10px;
`;
const ProfilesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: 30px;
`;

export default function AboutPage(): ReactElement {
  return (
    <Row style={{ padding: "20px 0px", flexFlow: "unset" }}>
      <Col span={7} style={{ margin: "0px 30px" }}>
        <Title>About Us</Title>
        <Description>
          <p>
            Khoury Office Hours is developed and maintained by a group of
            student developers and designers from
            <a href="https://www.sandboxnu.com/"> Sandbox</a>, the student-led
            software consultancy at Northeastern. Our mission is to enhance the
            student experience by making office hours more efficient and
            transparent.
          </p>
          <p>
            We began developing Khoury Office Hours in May 2020, and first
            launched the app in Fall 2020 to 4 courses. We now support around 20
            courses with over 2,500 registered users. Check us out{" "}
            <a href="https://news.northeastern.edu/2021/02/02/this-app-helps-students-get-more-face-time-with-professors/">
              {" "}
              in the news{" "}
            </a>
            to learn more.
          </p>
          <p>
            Our team is always open to feedback. If you&apos;re interested in
            contributing or have questions, feel free to take a look at our have
            questions, feel free to take a look at our
            <a href="https://github.com/sandboxnu/office-hours"> GitHub</a> or
            email us at
            <a href="mailto:info@khouryofficehours.com">
              {" "}
              info@khouryofficehours.com
            </a>
          </p>
          <p>
            <strong>Contact: </strong>
            <a href="mailto:info@khouryofficehours.com">
              {" "}
              info@khouryofficehours.com
            </a>
          </p>
          <p>
            <strong>GitHub: </strong>
            <a href="https://github.com/sandboxnu/office-hours">
              https://github.com/sandboxnu/office-hours
            </a>
          </p>
          <p>
            <strong>Informational Site: </strong>
            <a href="https://info.khouryofficehours.com/">
              https://info.khouryofficehours.com/
            </a>
          </p>
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

// These images links are generated from a gdrive sharing link using this tool:
// https://buildbrothers.com/gdrive-generator/
// which is described in this article: https://blog.usejournal.com/host-static-images-for-your-apps-or-website-on-google-drive-hotlink-to-gdrive-images-358d6fcf8ef7
// The images are stored in the drive folder Sandbox Members/Office Hours/About Page Images
const PROFILES_CURRENT = [
  {
    name: "Danish Farooq",
    role: "Project Lead",
    image: "https://drive.google.com/uc?id=1RE6r1qjhBqffDNjXyAA78vBYBvOCL8nr",
    linkedin: "https://www.linkedin.com/in/danishfarooq610/",
  },
  {
    name: "Iris Liu",
    role: "Tech Lead",
    image: "https://drive.google.com/uc?id=1ouq2iOsN2q1i6jGSnBcblRyCsAMH8ctX",
    linkedin: "https://www.linkedin.com/in/iris-liu-curiously",
  },
  {
    name: "Brian Yang",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1WPrJCGMedUbGmuLvfBxTpGAonWABrHKT",
    linkedin: "https://www.linkedin.com/in/brianyyang/",
  },
  {
    name: "Vera Kong",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1sNfZAEMKZhjAm9G_hZyOk3d4XAwUfti1",
    linkedin: "https://www.linkedin.com/in/vera-kong/",
    personalSite: "https://vkong6019.github.io/",
  },
  {
    name: "Nicole Danuwidjaja",
    role: "Developer",
    image: "https://drive.google.com/uc?id=14MgtILS0aBKrhk88f5K14sV-tdjpMXkN",
    linkedin: "https://www.linkedin.com/in/nicoledanuwidjaja/",
    personalSite: "https://nicoledanuwidjaja.github.io/",
  },
  {
    name: "Neel Bhalla",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1_rroyrFOaVq-rLKNHAam_mnmzxTLOwP5",
    linkedin: "https://www.linkedin.com/in/neelbhalla2021/",
  },
  {
    name: "Tingwei Shi",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1GrUpNThyLoazwM3RkCNHr2dB2HxDOUTY",
    linkedin: "https://www.linkedin.com/in/tingwei-shi",
  },
  {
    name: "Megan Chong",
    role: "Designer",
    image: "https://drive.google.com/uc?id=1sJ4aEFG_C8WXEkbNa7EcMBKo6B2VfldE",
    linkedin: "https://www.linkedin.com/in/megan-chong-/",
    personalSite: "https://www.megan-chong.com",
  },
];

const PROFILES_PAST = [
  {
    name: "Aislin Black",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1ZFSQxSYKicMSHRr89vUBIxExAm6CD3Wn",
    linkedin: "https://www.linkedin.com/in/aislin-black-0b6b64180/",
    personalSite: "",
  },
  {
    name: "Da-Jin Chu",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1PHdqIBWDXNaZ2oQJq6zWYPkKW-9_m84q",
    linkedin: "https://www.linkedin.com/in/dajinchu/",
    personalSite: "",
  },
  {
    name: "Alex Takayama",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1UNkfm-Rcl7EqAUlfGY0qldLWMxQWWa9n",
    linkedin: "https://www.linkedin.com/in/alexander-takayama/",
    personalSite: "",
  },
  {
    name: "Stanley Liu",
    role: "Project Lead",
    image: "https://drive.google.com/uc?id=1u7sWtqg9g16NZm6Ynzzydn4agED7FPSG",
    linkedin: "https://www.linkedin.com/in/stanleyspliu/",
  },
  {
    name: "Eddy Li",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1ym8FmRbxY05PDqDDMp4_8wsLvS_i26OS",
    linkedin: "https://www.linkedin.com/in/eddy-li/",
    personalSite: "https://eddyli.dev/",
  },
  {
    name: "Will Stenzel",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1nt95VPtubspwRkHxIkxA0dcXme-zhd3Q",
    personalSite: "https://willstenzel.com/",
  },
  {
    name: "Olivia Floody",
    role: "Developer",
    image: "https://drive.google.com/uc?id=1ZwEKAvK2JTZZTXEsi6g3iDdBLaXPq6uu",
    linkedin: "https://www.linkedin.com/in/olivia-floody-a7b5a4154/",
  },
  {
    name: "Alexandra Kopel",
    role: "Designer",
    image: "https://drive.google.com/uc?id=132RC8z0nnhEqSbgZMPw-JauD9ONp87dT",
    personalSite: "https://alexkopel.myportfolio.com/",
  },
];
