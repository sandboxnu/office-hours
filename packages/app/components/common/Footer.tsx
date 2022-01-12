import { ReactElement } from "react";
import styled from "styled-components";

const FullWidth = styled.footer`
  width: 100%;
  background: #ebebeb;

  flex-shrink: 0;
  padding: 12px 64px;

  display: flex;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

export function Footer(): ReactElement {
  return (
    <FullWidth>
      <div>
        Made{" "}
        <a
          onClick={() => {
            window.open("/about");
          }}
        >
          by students
        </a>{" "}
        @{" "}
        <a
          onClick={() => {
            window.open("https://sandboxnu.com");
          }}
        >
          Sandbox
        </a>
        . Source on{" "}
        <a
          onClick={() => {
            window.open("https://github.com/sandboxnu/office-hours");
          }}
        >
          GitHub.
        </a>
      </div>
      <div>
        <a
          onClick={() => {
            window.open(
              "https://github.com/sandboxnu/office-hours/discussions"
            );
          }}
        >
          Give us feedback
        </a>
        <span> or </span>
        <a
          onClick={() => {
            window.open(
              "https://forms.monday.com/forms/06be3745a411353ad295249d43835d38"
            );
          }}
        >
          file a bug report
        </a>
      </div>
    </FullWidth>
  );
}
