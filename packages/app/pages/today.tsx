import { Avatar, Button, Card, Col, PageHeader, Row, Result } from "antd";
import useSWR from "swr";
import Schedule from "./schedule";
import { Queue, QueuePartial } from "../../common/index";
import { API } from "@template/api-client";
import { MOCK_GET_COURSE_RESPONSE } from "../../server/src/mocks/getCourse";

const Navbar = () => {
  return (
    <PageHeader title={"Khoury Office Hours"}>
      <h1>CS 2500</h1>
    </PageHeader>
  );
};

type QueueCardProps = {
  queue: QueuePartial;
};

const QueueCard = ({ queue }: QueueCardProps) => {
  const staffList = queue.staffList;
  return (
    <div style={{ padding: "25px 15px 25px 15px" }}>
      <Card
        title={staffList.map((staffMember) => staffMember.name).join(", ")}
        extra={
          <Button type="primary" size={"middle"}>
            Join Queue
          </Button>
        }
      >
        <h1>{queue.room}</h1>
        {staffList.map((staffMember) => (
          <div style={{ float: "left", padding: "0px 25px 0px 25px" }}>
            <Avatar size={128} src={staffMember.photoURL} shape="square" />
          </div>
        ))}
      </Card>
    </div>
  );
};

export default function Today() {
  const { data, error } = useSWR(`api/v1/courses/1/queue`, async () =>
    API.course.queues(1)
  );

  const isTA = true; // TODO: temp

  if (error) {
    return (
      <Result
        status="500"
        title="Something went wrong, please ask chinese man"
      />
    );
  }

  return (
    <div>
      <Navbar />
      <Row>
        <Col md={12} sm={24}>
          {data?.map((q) => (
            <QueueCard queue={q} />
          ))}
          {isTA ? (
            <div style={{ padding: "0px 15px 0px 0px" }}>
              <Button
                style={{
                  bottom: "0%",
                  width: "20%",
                  float: "right",
                  backgroundColor: "#4cbb17",
                  color: "white",
                }}
                type="default"
                size={"large"}
              >
                Create Queue
              </Button>
            </div>
          ) : null}
        </Col>
        <Col md={12} sm={24}>
          <Schedule viewType={"day"} />
        </Col>
      </Row>
    </div>
  );
}
