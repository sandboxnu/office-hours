import { Avatar, Button, Card, Col, PageHeader, Row } from "antd";
import Schedule from "./schedule";
import { Queue } from "../../common/index";
import { MOCK_GET_COURSE_RESPONSE } from "../../server/src/mocks/getCourse";

const Navbar = () => {
  return <PageHeader title={"Khoury Office Hours"}>Wakanda Forever</PageHeader>;
};

type QueueCardProps = {
  queue: Queue;
};

const QueueCard = ({ queue }: QueueCardProps) => {
  const staffList = queue.staffList;
  return (
    <Card
      title={staffList.map((staffMember) => staffMember.name).join(", ")}
      extra={
        <Button type="primary" size={"small"}>
          Join Queue
        </Button>
      }
      style={{ float: "left" }}
    >
      <p>{queue.room}</p>
      {staffList.map((staffMember) => (
        <div style={{ float: "left" }}>
          <Avatar size={128} src={staffMember.photoURL} />
        </div>
      ))}
    </Card>
  );
};

export default function Today() {
  const isTA = true;

  // TODO: this is currently mock data
  return (
    <div>
      <Navbar />
      <Row>
        <Col span={12}>
          {MOCK_GET_COURSE_RESPONSE.queues.map((q) => (
            <QueueCard queue={q} />
          ))}
          {isTA ? (
            <Button
              style={{ bottom: "0%", width: "100%" }}
              type="default"
              size={"large"}
            >
              Create Queue
            </Button>
          ) : null}
        </Col>
        <Col span={12}>
          <Schedule viewType={"day"} />
        </Col>
      </Row>
    </div>
  );
}
