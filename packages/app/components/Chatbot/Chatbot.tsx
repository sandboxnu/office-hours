import React, {
  ReactComponentElement,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Input, Button, Card, Avatar, List, Spin } from "antd";
import styled from "styled-components";
import { API } from "@koh/api-client";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import router from "next/router";
import { useProfile } from "../../hooks/useProfile";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Feedback } from "./components/Feedback";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  zindex: 9999;
`;

interface SourceDocument {
  name: string;
  parts: string[];
}

interface PreDeterminedQuestion {
  question: string;
  answer: string;
}

export interface Message {
  type: "apiMessage" | "userMessage";
  message: string | void;
  sourceDocuments?: SourceDocument[];
  questionId?: number;
}

interface ChatbotComponentProps {
  cid: string;
}

export const ChatbotComponent: React.FC<ChatbotComponentProps> = ({
  cid,
}: ChatbotComponentProps) => {
  const [input, setInput] = useState("");
  const profile = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [interactionId, setInteractionId] = useState<number | null>(null);
  const [preDeterminedQuestions, setPreDeterminedQuestions] = useState<
    PreDeterminedQuestion[]
  >([
    {
      question: "Can each table have have multiple foreigns keys?",
      answer: "Yes, each table can have multiple foreign keys.",
    },
    {
      question: "What is cardinality, explain related information too",
      answer:
        "Cardinality refers to the maximum number of relationship instances that an entity can have in a relationship. It can be one-to-one (1:1), one-to-many (1:* or 1:N), or many-to-many (*:* or N:M) depending on the relationship type.",
    },
    {
      question: "When and where is the final?",
      answer: "December 16, 2023 8:30AM	in COM 201",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      type: "apiMessage",
      message: "Hello, how can I assist you?",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return () => {
      setInteractionId(null);
    };
  }, []);

  const query = async () => {
    try {
      const data = {
        question: input,
        history: messages,
      };
      const response = await fetch("/chat/ask/COSC304", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error("Error fetching from Flowise API:", error);
      return null;
    }
  };

  const addQuestionVector = async (questionId: number, query: string) => {
    try {
      const data = {
        questionId,
        query,
      };
      console.log(data);
      const response = await fetch("/chat/question/COSC304", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error creating vector entry", error);
      return null;
    }
  };

  const handleAsk = async () => {
    setIsLoading(true);

    const result = await query();
    console.log(query);
    const answer = result.answer || "Sorry, I couldn't find the answer";
    const sourceDocuments = result.sourceDocuments || [];

    let currentInteractionId = interactionId; // start with the current state value

    if (!interactionId) {
      console.log({
        courseId: Number(cid),
        userId: profile.id,
      });
      const interaction = await API.chatbot.createInteraction({
        courseId: Number(cid),
        userId: profile.id,
      });
      setInteractionId(interaction.id);

      currentInteractionId = interaction.id; // Update the current value if a new interaction was created
    }

    const formattedSourceDocument = sourceDocuments.map((sourceDocument) => ({
      ...sourceDocument,
      parts: sourceDocument.parts.map((part) => part.toString()),
    }));

    console.log({
      interactionId: currentInteractionId,
      questionText: input,
      responseText: answer,
      sourceDocuments: formattedSourceDocument,
    });

    // Use currentInteractionId for the createQuestion call
    const question = await API.chatbot.createQuestion({
      interactionId: currentInteractionId,
      questionText: input,
      responseText: answer,
      sourceDocuments: formattedSourceDocument,
    });

    await addQuestionVector(question.id, input);

    setMessages([
      ...messages,
      { type: "userMessage", message: input },
      {
        type: "apiMessage",
        message: answer,
        sourceDocuments: sourceDocuments,
        questionId: question.id,
      },
    ]);

    setIsLoading(false);
    setInput("");
  };

  const answerPreDeterminedQuestion = (question: string, answer: string) => {
    setMessages([
      ...messages,
      { type: "userMessage", message: question },
      {
        type: "apiMessage",
        message: answer,
      },
    ]);
  };

  const handleFeedback = async (questionId: number, userScore: number) => {
    try {
      await API.chatbot.editQuestion({
        data: {
          userScore,
        },
        questionId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (!cid) {
    return <></>;
  }
  return (
    <ChatbotContainer style={{ zIndex: 1000 }}>
      {isOpen ? (
        <Card
          title="CS304 chatbot"
          extra={<a onClick={() => setIsOpen(false)}>Close</a>}
        >
          <div className="overflow-y-auto max-h-[600px]">
            {messages &&
              messages.map((item) => (
                <>
                  {item.type === "userMessage" ? (
                    <div className="flex justify-end align-items-start m-1 mb-3">
                      <div className="max-w-[300px] bg-blue-900 text-white px-3 py-2 rounded-xl mr-2">
                        {" "}
                        {item.message}
                      </div>
                      <Avatar size="small" icon={<UserOutlined />} />
                    </div>
                  ) : (
                    <div className="flex flex-grow mb-3 group items-start">
                      <Avatar size="small" icon={<RobotOutlined />} />
                      <div className="flex flex-col gap-1 ml-2">
                        <div className="flex gap-2 items-start">
                          <div className="max-w-[280px] bg-slate-100 px-3 py-2 rounded-xl">
                            {" "}
                            {item.message}
                          </div>
                          {item.questionId && (
                            <div className="hidden justify-end gap-2 items-center group-hover:flex">
                              <div className="px-3 py-2 bg-slate-100 rounded-xl flex gap-2 w-fit">
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
                                className="font-semibold flex justify-start align-items-start gap-3 bg-slate-100 rounded-xl p-1 w-fit h-fit max-w-[280px]"
                                key={sourceDocument.name}
                              >
                                <p className="px-2 py-1">
                                  {sourceDocument.name}
                                </p>
                                <div className="flex gap-1">
                                  {sourceDocument.parts &&
                                    sourceDocument.parts.map((part) => (
                                      <div
                                        className="flex-grow cursor-pointer transition bg-blue-100 rounded-lg flex justify-center items-center font-semibold px-3 py-2 hover:bg-blue-800 hover:text-white"
                                        key={`${sourceDocument.name}-${part}`}
                                      >
                                        <p className="leading-4 text-xs h-fit w-fit">
                                          {`p. ${part}`}
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
                  className="flex justify-end align-items-start m-1 mb-1"
                  key={question.question}
                >
                  <div
                    onClick={() =>
                      answerPreDeterminedQuestion(
                        question.question,
                        question.answer
                      )
                    }
                    className="transition max-w-[300px] border-2 border-blue-900 text-blue-900 px-3 py-2 rounded-xl mr-2 hover:text-white hover:bg-blue-900 bg-transparent cursor-pointer"
                  >
                    {" "}
                    {question.question}
                  </div>
                </div>
              ))}
            {/* TODO: Remove, answers should stream*/}
            {isLoading && (
              <Spin
                style={{
                  display: "block",
                  marginBottom: "10px",
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
          onClick={() => setIsOpen(true)}
        >
          Chat now!
        </Button>
      )}
    </ChatbotContainer>
  );
};

export default ChatbotComponent;
