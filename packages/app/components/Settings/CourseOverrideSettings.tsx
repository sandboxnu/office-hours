import React, { ReactElement, useEffect, useState } from "react";
import { Table } from "antd";
import { API } from "@koh/api-client";
const { Column } = Table;

export default function CourseOverrideSettings(): ReactElement {
  const [overrides, setOverrides] = useState(null);

  const fetchOverridesData = () => {
    API.course.getCourseOverrides(1).then((resp) => setOverrides(resp.data));
  };

  useEffect(fetchOverridesData, []);

  return (
    <Table dataSource={overrides}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Role" dataIndex="role" key="role" />
    </Table>
  );
}
