import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { API } from '@koh/api-client'
import { AsyncQuestion, asyncQuestionStatus } from '@koh/common'
import { message, Popconfirm, Tooltip } from 'antd'
import React, { ReactElement, useState } from 'react'
// import { useTAInQueueInfo } from "../../../hooks/useTAInQueueInfo";
import { CantFindButton, FinishHelpingButton } from '../Queue/Banner'
import { AsyncQuestionForm } from './AsyncQuestionForm'
//import { useTeams } from "../../../hooks/useTeams";

export default function StudentQuestionDetailButtons({
  question,
  setIsExpandedTrue,
}: {
  question: AsyncQuestion
  setIsExpandedTrue: (event) => void
}): ReactElement {
  const [answerQuestionVisible, setAnswerQuestionVisbile] = useState(false)
  // const handleCancel = () => {
  //   setAnswerQuestionVisbile(false);
  // };
  // const [form] = Form.useForm();

  if (question.status !== asyncQuestionStatus.Waiting) {
    return <></>
  }
  return (
    <>
      <Popconfirm
        title="Are you sure you want to delete the question?"
        okText="Yes"
        cancelText="No"
        onConfirm={async () => {
          message.success('Question is removed')
          await API.asyncQuestions.update(question.id, {
            status: asyncQuestionStatus.StudentDeleted,
          })
        }}
      >
        <Tooltip title="Delete Question">
          <CantFindButton
            shape="circle"
            icon={<CloseOutlined />}
            data-cy="cant-find-button"
            onClick={(event) => setIsExpandedTrue(event)}
          />
        </Tooltip>
      </Popconfirm>
      <Tooltip title="Edit Your Question">
        <FinishHelpingButton
          icon={<EditOutlined />}
          onClick={(event) => {
            setAnswerQuestionVisbile(true)
            setIsExpandedTrue(event)
          }}
          data-cy="edit-question-button"
        />
      </Tooltip>
      <AsyncQuestionForm
        question={question}
        visible={answerQuestionVisible}
        onClose={() => setAnswerQuestionVisbile(false)}
      />
    </>
  )
}
