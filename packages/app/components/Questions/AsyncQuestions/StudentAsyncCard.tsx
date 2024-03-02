import React, { ReactElement, useState } from 'react'
import { Card, Image } from 'antd'
import { Text } from '../Shared/SharedComponents'
import { QuestionType } from '../Shared/QuestionType'
import { KOHAvatar } from '../../common/SelfAvatar'
import { TAquestionDetailButtons } from './TAquestionDetailButtons'
import { getAsyncWaitTime } from '../../../utils/TimeUtil'
import { AsyncQuestion } from '@koh/common'
import { useProfile } from '../../../hooks/useProfile'
import StudentQuestionDetailButtons from './StudentQuestionDetailButtons'

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

  const handleImageClick = (event) => {
    event.stopPropagation() // Prevents the click from closing the card
  }

  const setIsExpandedTrue = (event) => {
    event.stopPropagation()
    setIsExpanded(true)
  }

  return (
    <Card
      className="mb-2 rounded-lg bg-white p-2 shadow-lg"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="mb-4 flex items-start justify-between">
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
      <div className="mb-4">
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
    </Card>
  )
}
