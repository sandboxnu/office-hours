import { SimpleTableOutputType } from "@koh/common";
import { Pagination, Table } from "antd";
import React, { ReactElement } from "react";
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface SimpleTableTypes {
  output: SimpleTableOutputType;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const SimpleTable = ({
  output,
  currentPage,
  setPage,
}: SimpleTableTypes): ReactElement => {
  return (
    <div>
      <Table
        dataSource={output.dataSource}
        columns={output.columns}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={6}
        total={output.totalStudents}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};
