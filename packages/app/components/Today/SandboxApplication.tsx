import { Modal, Button } from "antd";
import { ReactElement } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const APPS_OPEN = new Date("May 30, 2022 8:00:00").getTime();
const APPS_CLOSE = new Date("June 8, 2022 23:59:59").getTime();
const TODAY = Date.now();

export default function ApplyToSandbox(): ReactElement {
  const [firstTime, setFirstTime] = useLocalStorage("seenApplyModal", true);

  return (
    <Modal
      visible={firstTime && APPS_OPEN < TODAY && TODAY < APPS_CLOSE}
      footer={null}
      onCancel={() => setFirstTime(false)}
      width={625}
      className="hide-in-percy"
    >
      <div>
        <h1> Sandbox Applications Are Now Open! 🎉</h1>
        <a
          href={"https://www.sandboxnu.com/"}
          target={"_blank"}
          rel={"noreferrer"}
        >
          Sandbox
        </a>{" "}
        is Northeastern&#39;s student-led software consultancy that aims to
        unleash the power of student-driven software. Not only do we engineer
        solutions to accelerate our clients&#39; research, but we also develop
        in-house tools for the Northeastern community, such as{" "}
        <a
          href={"https://searchneu.com/NEU"}
          target={"_blank"}
          rel={"noreferrer"}
        >
          SearchNEU
        </a>{" "}
        and Khoury Office Hours.
        <br />
        <br />
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <div>Applications close June 5th 2022.</div>
          <a
            href={"https://www.sandboxnu.com/apply/developer/"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <Button type="primary">Apply Now!</Button>
          </a>
        </div>
      </div>
    </Modal>
  );
}
