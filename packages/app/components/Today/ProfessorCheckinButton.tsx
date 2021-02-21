import { API } from "@koh/api-client";
import { QueuePartial, Role } from "@koh/common";
import { Input, Modal, Radio } from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";
import { useProfile } from "../../hooks/useProfile";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import TACheckinButton, { CheckinButton } from "./TACheckinButton";

const ProfessorModalRadio = styled(Radio)`
  display: block;
  height: 30px;
  lineheight: 30px;
`;

export default function TodayPageCheckinButton(): ReactElement {
  const profile = useProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [queueToCheckInto, setQueueToCheckInto] = useState(0);
  const router = useRouter();
  const { cid } = router.query;
  const { course } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id)
  );
  const [queueToBeCreated, setQueueToBeCreated] = useState(
    `Professor ${profile?.lastName}'s Office Hours`
  );

  return (
    <>
      {modalVisible && (
        <Modal
          title="Check-In To Office Hours"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          okText="Check In"
          onOk={async () => {
            let redirectID: QueuePartial;
            if (queueToCheckInto > -1) {
              redirectID = await API.taStatus.checkIn(
                Number(cid),
                course?.queues[queueToCheckInto].room
              );
            } else {
              redirectID = await API.taStatus.checkIn(
                Number(cid),
                queueToBeCreated
              );
            }
            router.push(
              "/course/[cid]/queue/[qid]",
              `/course/${Number(cid)}/queue/${redirectID.id}`
            );
          }}
        >
          <h3>Which queue would you like to check into?</h3>
          <Radio.Group
            value={queueToCheckInto}
            onChange={(e) => setQueueToCheckInto(e.target.value)}
          >
            {course?.queues.map((q, i) => (
              <ProfessorModalRadio key={q.id} value={i}>
                {q.room}
              </ProfessorModalRadio>
            ))}
            <ProfessorModalRadio value={-1}>
              Other...
              {queueToCheckInto === -1 ? (
                <Input
                  defaultValue={`Professor ${profile.lastName}'s Office Hours`}
                  onChange={(e) => setQueueToBeCreated(e.target.value)}
                  style={{ width: 400, marginLeft: 10 }}
                />
              ) : null}
            </ProfessorModalRadio>
          </Radio.Group>
        </Modal>
      )}
      {role === Role.TA && (
        <TACheckinButton
          courseId={Number(cid)}
          room={"Online"}
          state={queueCheckedIn ? "CheckedIn" : "CheckedOut"}
        />
      )}
      {!queueCheckedIn && role === Role.PROFESSOR && (
        <CheckinButton
          type="default"
          size="large"
          onClick={() => setModalVisible(true)}
        >
          Check In
        </CheckinButton>
      )}
      {queueCheckedIn && role === Role.PROFESSOR && (
        <TACheckinButton
          courseId={Number(cid)}
          room={queueCheckedIn.room}
          state="CheckedIn"
        />
      )}
    </>
  );
}
