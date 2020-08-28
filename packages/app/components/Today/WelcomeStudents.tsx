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
    >
      <div>
        Welcome to the Khoury Office Hours app! This project was started by
        students in Sandbox at the beginning of the summer and is still in
        development. We appreciate your patience with any &quot;rough
        edges.&quot;
      </div>
    </Modal>
  );
}
