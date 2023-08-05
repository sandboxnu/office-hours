import React, { ReactElement, useEffect, useRef, useState } from "react";
import { API } from "@koh/api-client";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { GetCourseResponse, questions } from "@koh/common";
import { pick } from "lodash";
import styled from "styled-components";
import { AddCourseModal } from "./addCourseModal";

const CourseRosterPageComponent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`;

const possibleStatus = [
  { value: "CantFind" },
  { value: "TADeleted" },
  { value: "Resolved" },
  { value: "ConfirmedDeleted" },
  { value: "Stale" },
];
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {title === "Status" ? <Select options={possibleStatus} /> : <Input />}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function Courses(): ReactElement {
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [editingKey, setEditingKey] = useState(-1);
  const [data, setData] = useState<GetCourseResponse[]>();
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const getData = async () => {
    return await API.site_admin.getCourses();
  };
  useEffect(() => {
    getData().then((d) => {
      setData(d);
      console.log(data);
    });
  }, [addCourseModal]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const del = async (id: number) => {
    await API.site_admin.deleteCourse(id);
  };
  const save = async (id: number) => {
    try {
      const row = await form.validateFields();
      console.log(row);
      console.log(id);
      await API.course.editCourseInfo(id, {
        courseId: id,
        timezone: row.timezone,
      });
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      console.log(pick(newData[index], []));
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey(-1);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(-1);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const edit = (record: any) => {
    form.setFieldsValue({ timezone: "", ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const isEditing = (record: GetCourseResponse) => record.id === editingKey;
  //for search bars
  const getColumnSearchProps = (dataIndex: string): ColumnType<questions> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.creatorName.length - b.creatorName.length,
      width: "15%",
      editable: false,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Section",
      dataIndex: "sectionGroupName",
      key: "sectionGroupName",
      width: 150,
      editable: false,
      ...getColumnSearchProps("sectionGroupName"),
    },
    {
      title: "Semester Id",
      dataIndex: "semesterId",
      key: "semesterId",
      width: 150,
      editable: false,
      ...getColumnSearchProps("semesterId"),
    },
    {
      title: "Timezone",
      dataIndex: "timezone",
      key: "timezone",
      width: 150,
      editable: true,
      ...getColumnSearchProps("timezone"),
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      render: (text) => String(text),
      width: 150,
      editable: false,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      width: 100,
      editable: false,
      // render: (_: any, record) =>
      //   <a onClick={() => editQuestion(record.id)}>Edit</a>
      render: (_: any, record: GetCourseResponse) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== -1}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: 100,
      render: (text, record) => (
        <span>
          <Typography.Link
            onClick={() => del(record.id)}
            style={{ marginRight: 8 }}
          >
            Delete
          </Typography.Link>
        </span>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: GetCourseResponse) => ({
        record,
        inputType: col.dataIndex === "enabled" ? "boolean" : "text",
        dataIndex: col.dataIndex,
        title: String(col.title),
        editing: isEditing(record),
      }),
    };
  });
  function showModal(): void {
    setAddCourseModal(true);
  }

  return (
    <CourseRosterPageComponent>
      <Form form={form} component={false}>
        {/* prettier-ignore */}
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
      <Button onClick={showModal}> Add course</Button>
      <AddCourseModal
        visible={addCourseModal}
        onClose={() => setAddCourseModal(false)}
      />
    </CourseRosterPageComponent>
  );
}
