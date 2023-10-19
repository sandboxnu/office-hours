import { Checkbox, Form, Table } from "antd";
import { FormInstance } from "antd/es/form";
import { ColumnType, ColumnsType } from "antd/es/table";
import React, { ReactElement, useState } from "react";
import { API } from "@koh/api-client";

interface ChatQuestion {
  id: string;
  question: string;
  answer: string;
  user: string;
  sourceDocuments: {
    title: string;
    type: string;
    parts: string[];
  }[];
  suggested: boolean;
}

export default function ChatbotQuestions(): ReactElement {
  const [chatQuestions, setChatQuestions] = useState([
    {
      id: "1",
      question: "What are indices",
      answer: "These are indices",
      user: "John Doe",
      sourceDocuments: [
        {
          title: "Slide 3",
          type: "PDF",
          parts: ["1", "12", "19", "42"],
        },
      ],
      suggested: true,
    },
    {
      id: "2",
      question: "What are indices?",
      answer: "These are indices...",
      user: "Mary Doe",
      sourceDocuments: [
        {
          title: "Slide 8",
          type: "PDF",
          parts: ["1", "11", "39", "44"],
        },
      ],
      suggested: false,
    },
  ]);

  const columns: ColumnsType<ChatQuestion> = [
    {
      title: "Question ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Asked By",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Source Documents",
      dataIndex: "sourceDocuments",
      key: "sourceDocuments",
      render: (_, { sourceDocuments }) => (
        <>
          {sourceDocuments.map((sourceDocument) => (
            // TODO: Create component and refactor into this one
            <p key={sourceDocument.title}>{sourceDocument.title}</p>
          ))}
        </>
      ),
    },
    {
      title: "Suggested",
      dataIndex: "suggested",
      key: "suggested",
      render: (text, record, index) => {
        return (
          <Checkbox
            checked={record.suggested}
            onChange={(e) => {
              toggleSuggested(e.target.checked, index, record.id);
            }}
          />
        );
      },
    },
  ];

  const toggleSuggested = async (newValue, index, questionId) => {
    // TODO: Loading & contextual disabling
    try {
      await API.chatbot.editQuestion({
        data: {
          suggested: newValue,
        },
        questionId,
      });

      setChatQuestions((prev) => {
        const newChatQuestions = [...prev];
        newChatQuestions[index] = {
          ...newChatQuestions[index],
          suggested: newValue,
        };
        return newChatQuestions;
      });
    } catch (e) {
      console.log(e);
    }
  };

  return <Table columns={columns} dataSource={chatQuestions} />;
}
