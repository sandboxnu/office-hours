import styled from "styled-components";
import { Space } from "antd";

export const HeaderTitle = styled(Space)`
  display: none;

  @media (min-width: 768px) {
    display: block;
    flex-grow: 1;
    padding-top: 50px;
    padding-bottom: 20px;
  }
`;
