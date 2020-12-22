import { TACheckInTimesOutputType } from "@koh/common";
import { Table } from "antd";
import React, { ReactElement } from "react";

interface TACheckInTimesComponentProps {
  name: string;
  output: TACheckInTimesOutputType;
}

export default function TACheckInTimesComponent({
  name,
  output,
}: TACheckInTimesComponentProps): ReactElement {
  return (
    <>
      <Table />
    </>
  );
}
