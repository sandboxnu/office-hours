import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { AsyncQuestion, asyncQuestionStatus } from "@koh/common";
import { message, Popconfirm, Tooltip } from "antd";
import React, { ReactElement, useState } from "react";
import { AnswerQuestionModal } from "./TAanswerQuestionModal";
// import { useTAInQueueInfo } from "../../../hooks/useTAInQueueInfo";
import { CantFindButton, FinishHelpingButton } from "../../Queue/Banner";
//import { useTeams } from "../../../hooks/useTeams";

export default function TAquestionDetailButtons({
  question,
}: {
  question: AsyncQuestion;
}): ReactElement {
  //const defaultMessage = useDefaultMessage();
  // const [helped, setHelped] = useState(false);
  const [answerQuestionVisible, setAnswerQuestionVisbile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendRephraseAlert = async () => {
    // const payload: RephraseQuestionPayload = {
    //   queueId,
    //   questionId: question.id,
    //   courseId
    // };
    // try {
    //   await API.alerts.create({
    //     alertType: AlertType.REPHRASE_QUESTION,
    //     courseId,
    //     payload,
    //     targetUserId: question.creator.id
    //   });
    //   await mutateQuestions();
    //   message.success("Successfully asked student to rephrase their question.");
    // } catch (e) {
    //   //If the ta creates an alert that already exists the error is caught and nothing happens
    // }
  };

  // const deleteQuestion = async () => {
  //   // await changeStatus(
  //   //   question.status === OpenQuestionStatus.Drafting
  //   //     ? ClosedQuestionStatus.DeletedDraft
  //   //     : LimboQuestionStatus.TADeleted
  //   // );
  //   // await API.questions.notify(question.id);
  //   console.log("deleted");
  // };

  return (
    <>
      {/* <Popconfirm
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
        </Popconfirm> */}
      <Popconfirm
        title="Are you sure you want to delete the question?"
        okText="Yes"
        cancelText="No"
        onConfirm={async () => {
          message.success("Removed student");
          await API.asyncQuestions.update(question.id, {
            status: asyncQuestionStatus.TADeleted,
          });
          // await API.questions.notify(question.id);
        }}
      >
        <Tooltip title="Delete Question">
          <CantFindButton
            shape="circle"
            icon={<CloseOutlined />}
            data-cy="cant-find-button"
          />
        </Tooltip>
      </Popconfirm>
      <Tooltip title="Post response">
        <FinishHelpingButton
          icon={<EditOutlined />}
          onClick={() => setAnswerQuestionVisbile(true)}
          data-cy="finish-helping-button"
        />
      </Tooltip>
      <AnswerQuestionModal
        visible={answerQuestionVisible}
        question={question}
        onClose={() => setAnswerQuestionVisbile(false)}
      />
    </>
  );
}
