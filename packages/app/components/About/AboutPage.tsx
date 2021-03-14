import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Col, Row, Space } from 'antd';
import ProfileCard from './ProfileCard';
import { VerticalDivider } from '../Settings/SettingsPage';

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

// TODO: test on large monitor

export default function AboutPage(): ReactElement {
  return (
    <Row style={{ padding: '20px 0px', flexFlow: 'unset' }}>
      <Col span={6} style={{ textAlign: 'center', paddingRight: '10px' }}>
        <Title>About Us</Title>
        <Description>Khoury Office Hours is an app made by students at Sandbox. TODO: links, whatev</Description>
      </Col>
      <VerticalDivider />
      <Space direction="vertical" size={40} style={{ flexGrow: 1, paddingTop: '20px' }}>
        <Col span={20} style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%' }}>
          {PROFILES.map((prof, idx) => (
            <ProfileCard
              key={idx}
              name={prof.name}
              role={prof.role}
              imgSrc={prof.image}
              linkedin={prof.linkedin}
              email={prof.email}
            />
          ))}
        </Col>
      </Space>
    </Row>
  );
}

// TODO: store images on front or backend?
// frontend might be good if we also do logo stuff eventually
const sadcat = 'https://i1.sndcdn.com/avatars-000883401889-t1pc2e-t240x240.jpg';

const PROFILES = [
  { name: 'Stanley Liu', role: 'Project Lead', image: sadcat, linkedin: '', email: '' },
  { name: 'Eddy Li', role: 'Developer', image: sadcat, linkedin: '', email: '' },
  { name: 'Will Stenzel', role: 'Developer', image: sadcat, linkedin: '', email: '' },
  { name: 'Danish Farooq', role: 'Developer', image: sadcat, linkedin: '', email: '' },
  { name: 'Olivia Floody', role: 'Developer', image: sadcat, linkedin: '', email: '' },
  {
    name: 'Iris Liu',
    role: 'Developer',
    image: sadcat,
    linkedin: 'https://www.linkedin.com/in/iris-liu-curiously',
    email: 'liu.i@northeastern.edu',
  },
  { name: 'Da-Jin Chu', role: 'Alum', image: sadcat, linkedin: '', email: '' },
  { name: 'Alexandra Kopel', role: 'Designer', image: sadcat, linkedin: '', email: '' },
];
