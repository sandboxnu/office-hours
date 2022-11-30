import { ReactElement } from "react";
import Modal from "antd/lib/modal/Modal";
import { AutoComplete, Button, Form, Collapse } from "antd";
import { API } from "@koh/api-client";
import { default as React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const OverrideCollapse = styled.div`
  & .ant-collapse-header {
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-bottom: 1px solid #cfd6de;
  }
  // Prevent the not-allowed cursor which is hella agressive
  & .ant-collapse-item-disabled > .ant-collapse-header {
    cursor: initial !important;
  }
  & .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const Title = styled.div`
  font-size: 16px;
  color: #212934;
  margin-left: 40px;
`;
interface EditQueueModalProps {
  queueId: number;
  visible: boolean;
  onClose: () => void;
}
export function AddStudentsModal({
  queueId,
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  //studentState stores all students
  const router = useRouter();
  const courseId = router.query["cid"];
  const [studentsState, setStudentsState] = useState([]);
  const [studentsIdState, setStudentsIdState] = useState([]);
  const [optionsState, setOptionsState] = useState<{ value: string }[]>([]);
  const [optionState, setOptionState] = useState("");
  //add condition of when student not in array
  let students: { value: string; id: number }[] = [];

  useEffect(() => {
    fetchData()
      .then((response) => {
        students = response;
        const tempS = [];
        const tempId = [];
        const tempO = [];
        students.forEach(async (student) => {
          const b = await API.profile.inQueue(student.id);
          if (!b) {
            console.log("student not in queue");
            tempS.push(student.value);
            tempId.push(student.id);
            tempO.push({ value: student.value });
          }
        });
        setStudentsState(tempS);
        setStudentsIdState(tempId);
        setOptionsState(tempO);
        console.log(students);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  useEffect(() => {
    return;
  }, [studentsState]);
  const handleSubmit = () => {
    studentsState.forEach((student, i) => {
      console.log(student);
      if (student === optionState) {
        addStudent(i);
      }
    });
  };
  const courseNumber = Number(courseId);
  const fetchData = async () => {
    const response = await fetch(`/api/v1/profile/${courseNumber}/id`);
    if (!response.ok) {
      throw new Error("Data could not be fetched!");
    } else {
      return response.json();
    }
  };

  const addStudent = async (i) => {
    console.log("gonna add students");
    await API.questions
      .TAcreate(
        {
          text: "For grading",
          questionType: "Grading",
          queueId: queueId,
          location: null,
          force: true,
          groupable: false,
        },
        studentsIdState[i]
      )
      .then(() => {
        console.log(studentsState);
        setStudentsState(
          studentsIdState.filter((_, index) => {
            index === i;
          })
        );
        setStudentsIdState(
          studentsState.filter((_, index) => {
            index === i;
          })
        );
        setOptionsState(
          optionsState.filter((_, index) => {
            index === i;
          })
        );
        console.log(studentsState);
      });
  };

  return (
    <Modal
      title="Add Students to queue"
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        onClose();
      }}
    >
      <p>Available Student to be added: </p>
      <OverrideCollapse>
        <Collapse defaultActiveKey={[1]} ghost expandIconPosition="right">
          <Collapse.Panel
            style={{ padding: 0 }}
            key={1}
            header={
              <Title>
                Add Students to queue
                <span>{`(${studentsState.length})`}</span>
              </Title>
            }
            showArrow={true}
          >
            <Form onFinish={handleSubmit}>
              <Form.Item name="name">
                <AutoComplete
                  style={{ marginTop: 10, width: 200 }}
                  options={optionsState}
                  placeholder="search for student"
                  onChange={(value) => setOptionState(value)}
                  filterOption={(inputValue, option) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
                <Button
                  style={{ marginLeft: 15 }}
                  htmlType="submit"
                  className="btn"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
            {studentsState.length > 0 ? (
              studentsState.map((q, i) => {
                return (
                  <div style={{ marginTop: 5 }} key={q}>
                    {q}
                    <Button
                      onClick={() => addStudent(i)}
                      style={{ marginLeft: 30 }}
                      key={q}
                    >
                      Add
                    </Button>
                  </div>
                );
              })
            ) : (
              <p>There are No Students</p>
            )}
          </Collapse.Panel>
        </Collapse>
      </OverrideCollapse>
    </Modal>
  );
}
