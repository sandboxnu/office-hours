import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
const { Meta } = Card;

const StyledCard = styled(Card)`
    margin: 5px;
    cursor: auto;
`;

export default function ProfileCard({
  name,
  role,
  linkedin,
  email,
  imgSrc,
}: {
  name: string;
  role: string;
  linkedin: string;
  email: string;
  imgSrc: string;
}): ReactElement {
  return (
    <StyledCard hoverable style={{ width: 200 }} cover={<img alt={`${name}'s profile image`} src={imgSrc} />}>
      <Meta title={name} description={role} />
    </StyledCard>
  );
}
