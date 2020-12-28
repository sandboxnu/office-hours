import { Modal, Radio } from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useCourse } from "../../hooks/useCourse";
import { CheckinButton } from "./TACheckinButton";

export default function ProfessorCheckinButton(): ReactElement {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const { cid } = router.query;
  const course = useCourse(Number(cid));

  return (
    <>
      {modalVisible && (
        <Modal title="Check-In To Office Hours" visible={modalVisible}>
          <h3>Which queue would you like to check into?</h3>
          <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
            {course.course.queues.map((q, i) => (
              <Radio key={q.id} value={i}>
                {q.room}
              </Radio>
            ))}
          </Radio.Group>
        </Modal>
      )}
      <CheckinButton type="default" size="large" />
    </>
  );
}
