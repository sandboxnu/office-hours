import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { API } from '@koh/api-client'
import { AsyncQuestion, asyncQuestionStatus } from '@koh/common'
import { message, Popconfirm, Tooltip } from 'antd'
import React, { ReactElement, useState } from 'react'
import { AnswerQuestionModal } from './TAanswerQuestionModal'
import { CantFindButton, FinishHelpingButton } from '../Queue/Banner'

export function TAquestionDetailButtons({
  question,
}: {
  question: AsyncQuestion
}): ReactElement {
  const [answerQuestionVisible, setAnswerQuestionVisbile] = useState(false)

  return (
    <>
      <Popconfirm
        title="Are you sure you want to delete the question?"
        okText="Yes"
        cancelText="No"
        onConfirm={async () => {
          message.success('Removed Question')
          await API.asyncQuestions.update(question.id, {
            status: asyncQuestionStatus.TADeleted,
          })
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
  )
}
