import { ReactElement } from "react";
import styled from "styled-components";

const APPS_OPEN = new Date("May 30, 2022 8:00:00").getTime();
const APPS_CLOSE = new Date("June 8, 2022 23:59:59").getTime();
const TODAY = Date.now();

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
      {APPS_OPEN < TODAY && TODAY < APPS_CLOSE && (
        <div>
          <a
            onClick={() => {
              window.open("https://www.sandboxnu.com/apply/developer/");
            }}
          >
            👩🏻‍💻 Apply to Sandbox
          </a>{" "}
          today! Applications close June 5th 2022.
        </div>
      )}
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
          File a bug report
        </a>
      </div>
    </FullWidth>
  );
}
