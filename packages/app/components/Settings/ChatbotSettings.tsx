import { SearchOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { Role } from "@koh/common";
import {
  Divider,
  Input,
  List,
  Pagination,
  Spin,
  Button,
  Popconfirm,
  Space
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useState } from "react";
import { ReactElement } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
// import { EditStudentModal } from "./EditStudentModal";

type CourseRosterProps = { courseId: number };

type RenderTableProps = {
  courseId: number;
  role: Role;
  listTitle: string;
  displaySearchBar: boolean;
  searchPlaceholder: string;
  // modifyFunction: (newValue: UBCOuserParam) => void;
};

const CourseRosterComponent = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const TableBackground = styled.div`
  background-color: white;
`;

export default function ChatbotSettings({
  courseId
}: CourseRosterProps): ReactElement {
  const [editStudentModal, setEditStudentModal] = useState(null);

  const modifyEditStudentModal = newValue => {
    setEditStudentModal(newValue);
  };

  return (
    <div>
      <CourseRosterComponent>
        <h1>Student Roster</h1>
        <RenderTable
          courseId={courseId}
          role={Role.STUDENT}
          listTitle={"Students"}
          displaySearchBar={true}
          searchPlaceholder="Search students"
          // modifyFunction={modifyEditStudentModal}
        />
        <br />
        <Divider />
      </CourseRosterComponent>
      {/* <EditStudentModal
                courseId={courseId}
                student={editStudentModal}
                onClose={() => setEditStudentModal(null)}
            /> */}
    </div>
  );
}

function RenderTable({
  courseId,
  role,
  listTitle,
  displaySearchBar,
  searchPlaceholder
}: // modifyFunction,
RenderTableProps): ReactElement {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(null);

  const showPopconfirm = itemId => {
    setIsVisible(itemId);
  };

  // const handleConfirm = (itemId) => {
  //     handleDelete(itemId);
  //     setIsVisible(null);
  // };

  const handleCancel = () => {
    setIsVisible(null);
  };

  const handleInput = event => {
    event.preventDefault();
    setInput(event.target.value);
  };
  const handleSearch = event => {
    event.preventDefault();
    setSearch(event.target.value);
    setPage(1);
  };
  // const handleDelete = async (userId) => {
  //     try {
  //         await API.profile.deleteStudent(userId);
  //         mutate(`${role}/${page}/${search}`);
  //     } catch (error) {
  //         console.error("Failed to delete user:", error);
  //     }
  // };
  const { data } = useSWR(
    `${role}/${page}/${search}`,
    async () => await API.course.getUserInfo(courseId, page, role, search)
  );
  if (!data) {
    return <Spin tip="Loading..." size="large" />;
  } else {
    return (
      <>
        <TableBackground>
          <div style={{ backgroundColor: "#f0f0f0", height: "56px" }}>
            <h3
              style={{
                position: "relative",
                left: "10px",
                top: "14px"
              }}
            >
              {listTitle}
            </h3>
          </div>
          {displaySearchBar && (
            <Input
              placeholder={searchPlaceholder}
              prefix={<SearchOutlined />}
              value={input}
              onChange={handleInput}
              onPressEnter={handleSearch}
            />
          )}
          <List
            dataSource={data.users}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL} />}
                  title={item.name}
                />
                <Space>
                  <div>{item.email}</div>
                  <Button
                    type="primary"
                    onClick={async e => {
                      e.currentTarget.blur();
                      const student = await API.profile.getStudent(item.id);
                      // modifyFunction(student);
                    }}
                  >
                    Edit
                  </Button>
                  <Button type="danger" onClick={() => showPopconfirm(item.id)}>
                    Delete
                  </Button>
                </Space>
                {/* {isVisible && (
                                    <Popconfirm
                                        title="Are you sure?"
                                        onConfirm={() => handleConfirm(item.id)}
                                        onCancel={handleCancel}
                                        visible={isVisible === item.id}
                                    ></Popconfirm>
                                )} */}
              </List.Item>
            )}
            bordered
          />
        </TableBackground>
        <br />
        {data.total > 50 && (
          <Pagination
            style={{ float: "right" }}
            current={page}
            pageSize={50}
            total={data.total}
            onChange={page => setPage(page)}
            showSizeChanger={false}
          />
        )}
      </>
    );
  }
}
