import {
  UndoOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { API } from "@koh/api-client";
import {
  LimboQuestionStatus,
  ClosedQuestionStatus,
  Question,
  QuestionStatus,
  OpenQuestionStatus,
} from "@koh/common";
import { message, Popconfirm, Tooltip } from "antd";
import React, { ReactElement, useCallback } from "react";
import { useQuestions } from "../../../hooks/useQuestions";
import { useTAInQueueInfo } from "../../../hooks/useTAInQueueInfo";
import {
  RequeueButton,
  CantFindButton,
  FinishHelpingButton,
  BannerDangerButton,
  BannerPrimaryButton,
} from "../Banner";

const PRORITY_QUEUED_MESSAGE_TEXT =
  "This student has been temporarily removed from the queue. They must select to rejoin the queue and will then be placed in the Priority Queue.";

export default function TAQueueDetailButtons({
  queueId,
  question,
}: {
  queueId: number;
  question: Question;
}): ReactElement {
  const { mutateQuestions } = useQuestions(queueId);
  const changeStatus = useCallback(
    async (status: QuestionStatus) => {
      await API.questions.update(question.id, { status });
      mutateQuestions();
    },
    [question.id, mutateQuestions]
  );
  const { isCheckedIn, isHelping } = useTAInQueueInfo(queueId);
  if (question.status === OpenQuestionStatus.Helping) {
    return (
      <>
        <Popconfirm
          title="Are you sure you want to send this student back to the queue?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            message.success(PRORITY_QUEUED_MESSAGE_TEXT, 2);
            await changeStatus(LimboQuestionStatus.ReQueueing);
          }}
        >
          <Tooltip title="Requeue Student">
            <RequeueButton
              icon={<UndoOutlined />}
              data-cy="requeue-student-button"
            />
          </Tooltip>
        </Popconfirm>
        <Popconfirm
          title="Are you sure you can't find this student?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            message.success(PRORITY_QUEUED_MESSAGE_TEXT, 2);
            await changeStatus(LimboQuestionStatus.CantFind);
            await API.questions.notify(question.id);
          }}
        >
          <Tooltip title="Can't Find">
            <CantFindButton
              shape="circle"
              icon={<CloseOutlined />}
              data-cy="cant-find-button"
            />
          </Tooltip>
        </Popconfirm>
        <Tooltip title="Finish Helping">
          <FinishHelpingButton
            icon={<CheckOutlined />}
            onClick={() => changeStatus(ClosedQuestionStatus.Resolved)}
            data-cy="finish-helping-button"
          />
        </Tooltip>
      </>
    );
  } else {
    return (
      <>
        <Popconfirm
          title="Are you sure you want to delete this question from the queue?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            await changeStatus(LimboQuestionStatus.TADeleted);
            await API.questions.notify(question.id);
          }}
        >
          <Tooltip title="Remove From Queue">
            <BannerDangerButton
              shape="circle"
              icon={<DeleteOutlined />}
              data-cy="remove-from-queue"
            />
          </Tooltip>
        </Popconfirm>
        <Tooltip
          title={
            !isCheckedIn
              ? "You must check in to help students!"
              : isHelping && "You are already helping a student"
          }
        >
          <BannerPrimaryButton
            icon={<PhoneOutlined />}
            onClick={() => {
              changeStatus(OpenQuestionStatus.Helping);
              if (question.isOnline) {
                window.open(
                  `https://teams.microsoft.com/l/chat/0/0?users=${question.creator.email}`
                );
              }
            }}
            disabled={
              !isCheckedIn || question.status === "Drafting" || isHelping
            }
            data-cy="help-student"
          />
        </Tooltip>
      </>
    );
  }
}
