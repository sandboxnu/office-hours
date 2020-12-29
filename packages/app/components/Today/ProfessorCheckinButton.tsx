import { API } from "@koh/api-client";
import { Modal, Radio } from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";
import { CheckinButton } from "./TACheckinButton";

const ProfessorModalRadio = styled(Radio)`
  display: block;
  height: 30px;
  lineheight: 30px;
`;

export default function ProfessorCheckinButton(): ReactElement {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const { cid } = router.query;
  const course = useCourse(Number(cid));

  return (
    <>
      {modalVisible && (
        <Modal
          title="Check-In To Office Hours"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          okText="Check In"
          onOk={async () => {
            const redirectID = await API.taStatus.checkIn(
              Number(cid),
              course.course?.queues[value].room
            );

            router.push(
              "/course/[cid]/queue/[qid]",
              `/course/${Number(cid)}/queue/${redirectID.id}`
            );
          }}
        >
          <h3>Which queue would you like to check into?</h3>
          <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
            {course.course.queues.map((q, i) => (
              <ProfessorModalRadio key={q.id} value={i}>
                {q.room}
              </ProfessorModalRadio>
            ))}
          </Radio.Group>
        </Modal>
      )}
      {
        <CheckinButton
          type="default"
          size="large"
          onClick={() => setModalVisible(true)}
        >
          Check In
        </CheckinButton>
      }
    </>
  );
}
