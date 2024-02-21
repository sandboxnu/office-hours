import React, { useEffect, useState } from 'react'
import { Input, Button, Card, Avatar, Spin } from 'antd'
import styled from 'styled-components'
import { API } from '@koh/api-client'
import { UserOutlined, RobotOutlined } from '@ant-design/icons'
import router from 'next/router'
import { useProfile } from '../../hooks/useProfile'
import { Feedback } from './components/Feedback'

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 90vw;
  max-width: 400px;
  zindex: 9999;
`

interface Part {
  pageNumber: number
  source: string
}

interface SourceDocument {
  name: string
  parts: Part[]
}

interface PreDeterminedQuestion {
  question: string
  answer: string
}

export interface Message {
  type: 'apiMessage' | 'userMessage'
  message: string | void
  sourceDocuments?: SourceDocument[]
  questionId?: number
}

export const ChatbotComponent: React.FC = () => {
  const [input, setInput] = useState('')
  const { cid } = router.query
  const profile = useProfile()
  const [isLoading, setIsLoading] = useState(false)
  const [interactionId, setInteractionId] = useState<number | null>(null)
  const [preDeterminedQuestions] = useState<PreDeterminedQuestion[]>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'apiMessage',
      message:
        'Hello, how can I assist you? I can help with anything course related.',
    },
  ])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    return () => {
      setInteractionId(null)
    }
  }, [])

  const query = async () => {
    try {
      const data = {
        question: input,
        history: messages,
      }
      const response = await fetch(`/chat/${cid}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const json = await response.json()
      return json
    } catch (error) {
      console.error('Error fetching from API:', error)
      return null
    }
  }

  const handleAsk = async () => {
    setIsLoading(true)

    const result = await query()

    const answer = result.answer || "Sorry, I couldn't find the answer"
    const sourceDocuments = result.sourceDocuments || []

    let currentInteractionId = interactionId // start with the current state value

    if (!interactionId) {
      const interaction = await API.chatbot.createInteraction({
        courseId: Number(cid),
        userId: profile.id,
      })
      setInteractionId(interaction.id)

      currentInteractionId = interaction.id // Update the current value if a new interaction was created
    }

    const sourceDocumentPages = sourceDocuments.map((sourceDocument) => ({
      ...sourceDocument,
      parts: sourceDocument.parts.map((part) => part.pageNumber),
    }))

    const question = await API.chatbot.createQuestion({
      interactionId: currentInteractionId,
      questionText: input,
      responseText: answer,
      sourceDocuments: sourceDocumentPages,
      vectorStoreId: result.questionId,
    })

    setMessages([
      ...messages,
      { type: 'userMessage', message: input },
      {
        type: 'apiMessage',
        message: answer,
        sourceDocuments: sourceDocuments,
        questionId: question.id,
      },
    ])

    setIsLoading(false)
    setInput('')
  }

  const answerPreDeterminedQuestion = (question: string, answer: string) => {
    setMessages([
      ...messages,
      { type: 'userMessage', message: question },
      {
        type: 'apiMessage',
        message: answer,
      },
    ])
  }

  const handleFeedback = async (questionId: number, userScore: number) => {
    try {
      await API.chatbot.editQuestion({
        data: {
          userScore,
        },
        questionId,
      })
    } catch (e) {
      console.log(e)
    }
  }

  if (!cid) {
    return <></>
  }
  return (
    <ChatbotContainer className="max-h-[90vh]" style={{ zIndex: 1000 }}>
      {isOpen ? (
        <Card
          title="Course chatbot"
          extra={<a onClick={() => setIsOpen(false)}>Close</a>}
        >
          <div className="max-h-[70vh] overflow-y-auto">
            {messages &&
              messages.map((item) => (
                <>
                  {item.type === 'userMessage' ? (
                    <div className="align-items-start m-1 mb-3 flex justify-end">
                      <div className="mr-2 max-w-[300px] rounded-xl bg-blue-900 px-3 py-2 text-white">
                        {' '}
                        {item.message}
                      </div>
                      <Avatar size="small" icon={<UserOutlined />} />
                    </div>
                  ) : (
                    <div className="group mb-3 flex flex-grow items-start">
                      <Avatar size="small" icon={<RobotOutlined />} />
                      <div className="ml-2 flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                          <div className="max-w-[280px] rounded-xl bg-slate-100 px-3 py-2">
                            {' '}
                            {item.message}
                          </div>
                          {item.questionId && (
                            <div className="hidden items-center justify-end gap-2 group-hover:flex">
                              <div className="flex w-fit gap-2 rounded-xl bg-slate-100 px-3 py-2">
                                <Feedback
                                  questionId={item.questionId}
                                  handleFeedback={handleFeedback}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          {item.sourceDocuments &&
                            item.sourceDocuments.map((sourceDocument) => (
                              <div
                                className="align-items-start flex h-fit w-fit max-w-[280px] justify-start gap-3 rounded-xl bg-slate-100 p-1 font-semibold"
                                key={sourceDocument.name}
                              >
                                <p className="px-2 py-1">
                                  {sourceDocument.name}
                                </p>
                                <div className="flex gap-1">
                                  {sourceDocument.parts &&
                                    sourceDocument.parts.map((part) => (
                                      <div
                                        className={`flex flex-grow items-center justify-center rounded-lg bg-blue-100 px-3 py-2 font-semibold transition ${
                                          part.source &&
                                          'cursor-pointer hover:bg-blue-800 hover:text-white'
                                        }`}
                                        key={`${sourceDocument.name}-${part.pageNumber}`}
                                        onClick={() => {
                                          if (part.source) {
                                            window.open(part.source)
                                          }
                                        }}
                                      >
                                        <p className="h-fit w-fit text-xs leading-4">
                                          {`p. ${part.pageNumber}`}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}

            {preDeterminedQuestions &&
              !isLoading &&
              messages.length < 2 &&
              preDeterminedQuestions.map((question) => (
                <div
                  className="align-items-start m-1 mb-1 flex justify-end"
                  key={question.question}
                >
                  <div
                    onClick={() =>
                      answerPreDeterminedQuestion(
                        question.question,
                        question.answer,
                      )
                    }
                    className="mr-2 max-w-[300px] cursor-pointer rounded-xl border-2 border-blue-900 bg-transparent px-3 py-2 text-blue-900 transition hover:bg-blue-900 hover:text-white"
                  >
                    {' '}
                    {question.question}
                  </div>
                </div>
              ))}
            {/* TODO: Remove, answers should stream*/}
            {isLoading && (
              <Spin
                style={{
                  display: 'block',
                  marginBottom: '10px',
                }}
              />
            )}
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onPressEnter={handleAsk}
            suffix={
              <Button
                type="primary"
                className="bg-blue-900"
                onClick={handleAsk}
              >
                Ask
              </Button>
            }
          />
        </Card>
      ) : (
        <Button
          type="primary"
          icon={<RobotOutlined />}
          size="large"
          className="mx-5"
          onClick={() => setIsOpen(true)}
        >
          Chat now!
        </Button>
      )}
    </ChatbotContainer>
  )
}
