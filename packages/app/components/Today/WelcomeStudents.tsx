import { Modal } from "antd";
import { ReactElement } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function WelcomeStudents(): ReactElement {
  const [firstTime, setFirstTime] = useLocalStorage("firstTime", true);

  return (
    <Modal
      visible={firstTime}
      footer={null}
      onCancel={() => setFirstTime(false)}
      width={625}
    >
      <div>
        <h1> Welcome to the Khoury Office Hours app! 🎉</h1>
        This project was started by students in{" "}
        <a href="https://www.sandboxnu.com/">Sandbox</a> at the beginning of the
        summer and is still in development.
        <br />
        <br />
        We appreciate your patience with any &quot;rough edges.&quot; 😅
      </div>
    </Modal>
  );
}
