import React, { useState } from "react";
import { Input, Button, Card, Avatar, List, Spin } from "antd";
import styled from "styled-components";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  zindex: 9999;
`;
const UserMessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px;
`;

const UserMessage = styled.span`
  margin-right: 10px;
  max-width: 300px;
`;

const ApiMessage = styled.span`
  margin-left: 10px;
  max-width: 300px;
`;

const ApiMessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
`;

interface Message {
  type: "apiMessage" | "userMessage";
  message: string | void;
}

export const ChatbotComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "apiMessage",
      message: "Hello, how can I assist you?"
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const query = async (data: { question: string; history: Message[] }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/prediction/a4ca60fe-cba1-4b37-8099-b540b18026f1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      if (response.ok) {
        // this ensures the response was successful
        const json = await response.json();
        return json;
      } else {
        throw new Error("Failed to fetch from Flowise API.");
      }
    } catch (error) {
      console.error("Error fetching from Flowise API:", error);
      return null;
    }
  };

  const handleAsk = async () => {
    setIsLoading(true);
    setMessages([...messages, { type: "userMessage", message: input }]);

    const result = await query({ question: input, history: messages });
    setIsLoading(false);
    if (result != null) {
      setMessages([
        ...messages,
        { type: "userMessage", message: input },
        { type: "apiMessage", message: result }
      ]);
    } else {
      setMessages([
        ...messages,
        { type: "userMessage", message: input },
        { type: "apiMessage", message: "Sorry, I couldn't fetch the answer." }
      ]);
    }
    setInput("");
  };

  return (
    <ChatbotContainer style={{ zIndex: 1000 }}>
      {isOpen ? (
        <Card
          title="Chatbot"
          extra={<a onClick={() => setIsOpen(false)}>Close</a>}
        >
          <List
            dataSource={messages}
            renderItem={item => (
              <List.Item style={{ padding: "5px 0" }}>
                {item.type === "userMessage" ? (
                  <UserMessageContainer>
                    <UserMessage> {item.message}</UserMessage>
                    <Avatar size="small" icon={<UserOutlined />} />
                  </UserMessageContainer>
                ) : (
                  <ApiMessageContainer>
                    <Avatar size="small" icon={<RobotOutlined />} />
                    <ApiMessage> {item.message}</ApiMessage>
                  </ApiMessageContainer>
                )}
              </List.Item>
            )}
          />

          {isLoading && (
            <Spin style={{ display: "block", marginBottom: "10px" }} />
          )}
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask something..."
            onPressEnter={handleAsk}
            suffix={
              <Button type="primary" onClick={handleAsk}>
                Ask
              </Button>
            }
          />
        </Card>
      ) : (
        <Button
          type="primary"
          icon={<RobotOutlined />}
          onClick={() => setIsOpen(true)}
        >
          Chat with us!
        </Button>
      )}
    </ChatbotContainer>
  );
};
