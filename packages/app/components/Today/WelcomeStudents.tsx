import Link from "next/link";
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
        If you run into any issues while using the app, the help guide can be
        found in the menu by clicking on the circular profile in the nav bar.
        <br />
        <br />
        Take a look at our <Link href={"/about"}>About Page</Link> to learn more
        about the team behind the app.
      </div>
    </Modal>
  );
}
