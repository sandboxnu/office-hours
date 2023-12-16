import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'

interface FeedbackProps {
  questionId: number
  handleFeedback: (questionId: number, userScore: number) => Promise<void>
}

export const Feedback: React.FC<FeedbackProps> = ({
  questionId,
  handleFeedback,
}) => {
  const [userScore, setUserScore] = useState(0)

  const handleClick = (newUserScore: number) => {
    const updatedUserScore = newUserScore == userScore ? 0 : newUserScore
    setUserScore(updatedUserScore)
    handleFeedback(questionId, updatedUserScore)
  }

  return (
    <>
      <ThumbsDown
        size={16}
        color="#1E38A8"
        fill={userScore === -1 ? '#1E38A8' : 'transparent'}
        onClick={() => handleClick(-1)}
        className="cursor-pointer"
      />
      <ThumbsUp
        size={16}
        color="#1E38A8"
        fill={userScore === 1 ? '#1E38A8' : 'transparent'}
        onClick={() => handleClick(1)}
        className="cursor-pointer"
      />
    </>
  )
}
