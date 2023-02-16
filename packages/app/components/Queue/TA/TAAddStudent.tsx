import { ReactElement, useCallback } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button, Form, Collapse, message } from "antd";
import { API } from "@koh/api-client";
import { default as React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Select from "react-select";

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
  onClose
}: EditQueueModalProps): ReactElement {
  //studentState stores all students
  const router = useRouter();
  const courseId = router.query["cid"];
  const [studentsState, setStudentsState] = useState<
    { value: string; id: number }[]
  >([]);
  const [questionsTypeState, setQuestionsTypeState] = useState<string[]>([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(
    "Default grading type"
  );
  const [selectOptions, setSelectOptions] = useState([]);
  //students store all the students
  // let students: { value: string; id: number }[] = [];
  const getQuestions = async () => {
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber));
  };
  useEffect(() => {
    getQuestions();
    populateStudents();
  }, []);
  const courseNumber = Number(courseId);
  const populateStudents = async () => {
    const tempS = [];
    const students = await API.profile.getAllStudents(courseNumber);
    if (!students) {
      console.error("can't get all students");
    }
    students.forEach(async student => {
      const b = await API.profile.inQueue(student.id);
      console.log(b);
      if (b) {
        console.log("student in queue");
        return;
      }
      tempS.push(student);
    });
    setStudentsState(tempS);
    console.log(tempS);
  };
  const handleSubmit = () => {
    selectOptions.forEach((student, i) => {
      addStudent(i);
    });
  };
  const addStudent = async i => {
    const currentStudent = selectOptions[i];
    const b = await API.profile.inQueue(currentStudent.id);
    if (b) {
      message.error("Student already in queue.");
      return;
    }
    await API.questions
      .TAcreate(
        {
          text: "",
          questionType: selectedQuestionType,
          queueId: queueId,
          location: null,
          force: true,
          groupable: false
        },
        currentStudent.id
      )
      .then(() => {
        message.success("Student(s) added");
        setStudentsState(
          studentsState.filter(student => student.id !== currentStudent.id)
        );
        setSelectOptions([]);
      })
      .catch(() => {
        message.error("Can't add student".concat(currentStudent.value));
      });
    return false;
  };

  const handleSelect = data => {
    setSelectOptions(data);
  };
  const onQTclick = useCallback(
    async (s: string) => {
      setSelectedQuestionType(s);
    },
    [courseNumber]
  );
  function toObj(arr) {
    const lst = [];
    for (let i = 0; i < arr.length; ++i)
      lst.push({ value: arr[i].value, label: arr[i].value, id: arr[i].id });
    return lst;
  }
  return (
    <Modal
      title="Add Students to queue"
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        onClose();
      }}
    >
      <h3>
        Current question type:{" "}
        <strong style={{ color: "blue" }}> {selectedQuestionType}</strong>
      </h3>
      <h3>
        Change question type:{" "}
        <Button.Group style={{ marginBottom: 10 }}>
          {questionsTypeState.length > 0 ? (
            questionsTypeState.map(q => {
              return (
                <Button onClick={() => onQTclick(q)} key={q}>
                  {q}
                </Button>
              );
            })
          ) : (
            <p>There are No Question Types</p>
          )}
        </Button.Group>
      </h3>
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
              <Form.Item>
                <Select
                  options={toObj(studentsState)}
                  placeholder="search for student"
                  value={selectOptions}
                  onChange={handleSelect}
                  isSearchable={true}
                  isMulti
                />
                <Button
                  style={{ marginLeft: 15, marginTop: 15 }}
                  htmlType="submit"
                  className="btn"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
            {studentsState.length > 0 ? (
              <p>Search for students to be added</p>
            ) : (
              <p>There are no students or all students are in queue</p>
            )}
          </Collapse.Panel>
        </Collapse>
      </OverrideCollapse>
    </Modal>
  );
}
