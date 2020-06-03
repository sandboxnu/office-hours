import { Card, PageHeader } from "antd";
import Schedule from "./schedule";
import { Queue } from "../../common/index";

const Navbar = () => {
  return <PageHeader title={"Khoury Office Hours"}>Wakanda Forever</PageHeader>;
};

type QueueCardProps = {
  queue: Queue;
};

const QueueCard = ({ queue }: QueueCardProps) => {
  const staffList = queue.staffList.join(" ");

  return (
    <Card
      title={queue.room}
      extra={<a href="#">Join Queue</a>} // todo: make this a button or something idk
      style={{ width: 300 }}
    >
      <p>{staffList}</p>
      <p>pictures</p>
      <p>something else</p>
    </Card>
  );
};

export default function Today() {
  return (
    <div>
      <Navbar />
      <div>
        <p>Lorem Ipsum</p>
      </div>
      <div style={{ float: "right" }}>
        <Schedule viewType={"day"} />
      </div>
    </div>
  );
}
