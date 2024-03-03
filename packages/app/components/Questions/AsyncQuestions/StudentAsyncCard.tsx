import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Card, Image } from 'antd'
import { Text } from '../Shared/SharedComponents'
import { QuestionType } from '../Shared/QuestionType'
import { KOHAvatar } from '../../common/SelfAvatar'
import { TAquestionDetailButtons } from './TAquestionDetailButtons'
import { getAsyncWaitTime } from '../../../utils/TimeUtil'
import { AsyncQuestion } from '@koh/common'
import StudentQuestionDetailButtons from './StudentQuestionDetailButtons'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { API } from '@koh/api-client'
import { set } from 'lodash'

interface StudentAsyncCardProps {
  question: AsyncQuestion
  cid: number
  qid: number
  isStaff: boolean
  userId: number
  onQuestionTypeClick: (questionType: any) => void
}

export default function StudentAsyncCard({
  question,
  cid,
  qid,
  isStaff,
  userId,
  onQuestionTypeClick,
}: StudentAsyncCardProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false)
  const [voteCount, setVoteCount] = useState(question.votesSum)
  const [thisUserThisQuestionVote, setThisUserThisQuestionVote] = useState(0)

  const handleImageClick = (event) => {
    event.stopPropagation() // Prevents the click from closing the card
  }

  const setIsExpandedTrue = (event) => {
    event.stopPropagation()
    setIsExpanded(true)
  }
  const handleVote = async (questionId: number, vote: number) => {
    const resp = await API.asyncQuestions.vote(questionId, vote)
    setVoteCount(resp.question.votesSum)
  }

  useEffect(() => {
    async function getVoteForuser() {
      const resp = await API.asyncQuestions.vote(question.id, 0)
      setThisUserThisQuestionVote(resp.vote)
    }
    if (question) {
      getVoteForuser()
    }
  }, [voteCount])

  const upVoteStyle = thisUserThisQuestionVote === 1 ? { color: 'green' } : {}
  const downVoteStyle = thisUserThisQuestionVote === -1 ? { color: 'red' } : {}

  return (
    <div
      className="mb-2 flex rounded-lg bg-white p-4 shadow-lg"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="mr-4 flex flex-col items-center justify-center">
        <Button
          type="text"
          icon={<UpOutlined style={upVoteStyle} />}
          onClick={(e) => {
            e.stopPropagation() // Prevent card expansion
            handleVote(question.id, 1)
          }}
        />
        <div className="my-2 flex items-center justify-center">{voteCount}</div>
        <Button
          type="text"
          icon={<DownOutlined style={downVoteStyle} />}
          onClick={(e) => {
            e.stopPropagation() // Prevent card expansion
            handleVote(question.id, -1)
          }}
        />
      </div>

      <div className="flex w-full flex-grow flex-col">
        <div className="mb-4">
          <div className="justify between flex items-start">
            {isStaff || userId == question.creatorId ? (
              <>
                <KOHAvatar
                  size={46}
                  name={question.creator.name}
                  photoURL={question.creator.photoURL}
                  className="mr-3" // Tailwind margin right
                />
                <div className="flex-grow text-sm italic">
                  {question.creator.name}
                </div>
              </>
            ) : (
              <div className="flex-grow text-sm italic">Anonymous Student</div>
            )}
            <div className="flex items-center">
              <Text className="text-sm">{getAsyncWaitTime(question)}</Text>
              {isStaff && (
                <>
                  <TAquestionDetailButtons
                    courseId={cid}
                    queueId={qid}
                    question={question}
                    hasUnresolvedRephraseAlert={false}
                    setIsExpandedTrue={setIsExpandedTrue}
                  />
                </>
              )}
              {userId == question.creatorId && question.status === 'Waiting' ? (
                <>
                  <StudentQuestionDetailButtons
                    courseId={cid}
                    queueId={qid}
                    question={question}
                    hasUnresolvedRephraseAlert={false}
                    setIsExpandedTrue={setIsExpandedTrue}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-bold">{question.questionAbstract}</h4>
            {isExpanded && (
              <div>
                {question?.images.map((i) => {
                  return (
                    <Image
                      height={300}
                      src={`/api/v1/image/${i.id}`}
                      alt="none"
                      key={i.id}
                      onClick={handleImageClick}
                    />
                  )
                })}
                {question.questionText && <Text>{question.questionText}</Text>}

                {question.answerText ? (
                  <>
                    <br />
                    <div>
                      <strong>Answer:</strong>
                      <Text>{question.answerText}</Text>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap">
            {question.questionTypes?.map((questionType, index) => (
              <QuestionType
                key={index}
                typeName={questionType.name}
                typeColor={questionType.color}
                onClick={() => onQuestionTypeClick(questionType.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
