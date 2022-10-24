import { ReactElement } from "react";
import styled from "styled-components";

const FullWidth = styled.footer`
  width: 100%;
  background: #ebebeb;

  flex-shrink: 0;
  padding: 12px 64px;

  display: flex;
  justify-content: space-between;
`;

export function Footer(): ReactElement {
  return (
    <FullWidth>
      <div>Made by Khoury College Edited by kevin</div>
    </FullWidth>
  );
}
