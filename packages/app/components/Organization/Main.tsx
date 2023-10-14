import { Card, Col, Row } from "antd";
import { ReactElement } from "react";
import "./styles.css";

export default function Main({ userName }: { userName: string }): ReactElement {
  return (
    <>
      <div>
        <span style={{ fontWeight: 400, color: "#64657c" }}>Welcome Back,</span>
        <h1 style={{ lineHeight: 1 }}>
          <strong>{userName}</strong>
        </h1>
      </div>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: 30 }}>
        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <Card className="firstCard" hoverable={true}>
            <div style={{ textAlign: "right" }}>
              <h2 className="titleCardStatistics">200</h2>
              <span className="cardDescription">Members</span>
            </div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <Card className="secondCard" hoverable={true}>
            <div style={{ textAlign: "right" }}>
              <h2 className="titleCardStatistics">200</h2>
              <span className="cardDescription">Courses</span>
            </div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <Card className="thirdCard" hoverable={true}>
            <div style={{ textAlign: "right" }}>
              <h2 className="titleCardStatistics">1</h2>
              <span className="cardDescription">Professors</span>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
