import { SimpleTableOutputType } from "@koh/common";
import { Table } from "antd";
import React, { ReactElement } from "react";

interface SimpleTableTypes {
  output: SimpleTableOutputType;
}

export const SimpleTable = ({ output }: SimpleTableTypes): ReactElement => {
  return (
    <>
      {output.dataSource.length == 0 && (
        <Table dataSource={output.dataSource} columns={output.columns} />
      )}
    </>
  );
};
