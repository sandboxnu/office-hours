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
      <div>
        Made by students @ <a href="https://sandboxnu.com">Sandbox</a>. Source
        on <a href="https://github.com/sandboxnu/office-hours">GitHub.</a>
      </div>
      <div>
        <a href="https://forms.monday.com/forms/06be3745a411353ad295249d43835d38">
          File a bug report
        </a>
      </div>
    </FullWidth>
  );
}
