import { Checkbox, Form, Input, Pagination, Table, Tooltip } from "antd";
import { FormInstance } from "antd/es/form";
import { ColumnType, ColumnsType } from "antd/es/table";
import React, { ReactElement, useEffect, useState } from "react";
import { API } from "@koh/api-client";
import { useDebounce } from "../../hooks/useDebounce";

export interface ChatQuestion {
  id: string;
  question: string;
  answer: string;
  user: string;
  sourceDocuments: {
    name: string;
    type: string;
    parts: string[];
  }[];
  suggested: boolean;
}

export interface ChatQuestionResponse {
  chatQuestions: ChatQuestion[];
  total: number;
}

export default function ChatbotQuestions(): ReactElement {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce<string>(search, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [chatQuestions, setChatQuestions] = useState([]);

  const columns: ColumnsType<ChatQuestion> = [
    {
      title: "Question ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question"
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer"
    },
    {
      title: "Asked By",
      dataIndex: "user",
      key: "user"
    },
    {
      title: "Source Documents",
      dataIndex: "sourceDocuments",
      key: "sourceDocuments",
      render: (_, { sourceDocuments }) => (
        <>
          {sourceDocuments && sourceDocuments.length > 0 ? (
            sourceDocuments.map(sourceDocument => (
              // TODO: Create component and refactor into this one
              <p key={sourceDocument.name}>{sourceDocument.name}</p>
            ))
          ) : (
            <p>No Source Documents</p>
          )}
        </>
      )
    },
    {
      title: () => (
        <>
          <Tooltip
            title="Suggest this question to students when they initially start with the chatbot."
            trigger="click"
            defaultOpen
          >
            <p>Suggested</p>
          </Tooltip>
        </>
      ),
      dataIndex: "suggested",
      key: "suggested",
      render: (text, record, index) => {
        return (
          <Checkbox
            disabled={loading}
            checked={record.suggested}
            onChange={e => {
              toggleSuggested(e.target.checked, index, record.id);
            }}
          />
        );
      }
    }
  ];

  useEffect(() => {
    getQuestions();
  }, [currentPage, pageSize, debouncedValue]);

  const toggleSuggested = async (newValue, index, questionId) => {
    // TODO: Loading & contextual disabling
    setLoading(true);
    try {
      await API.chatbot.editQuestion({
        data: {
          suggested: newValue
        },
        questionId
      });

      setChatQuestions(prev => {
        const newChatQuestions = [...prev];
        newChatQuestions[index] = {
          ...newChatQuestions[index],
          suggested: newValue
        };
        return newChatQuestions;
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getQuestions = async () => {
    setLoading(true);
    try {
      const data: ChatQuestionResponse = await API.chatbot.getQuestions(
        search,
        pageSize,
        currentPage
      );

      console.log(data);
      setChatQuestions(data.chatQuestions);
      setTotalQuestions(data.total);
    } catch (e) {
      setChatQuestions([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[800px] m-auto">
      <Input
        placeholder={"Search question..."}
        // prefix={<SearchOutlined />}
        value={search}
        onChange={e => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
        onPressEnter={getQuestions}
      />
      <Table
        columns={columns}
        dataSource={chatQuestions}
        style={{ maxWidth: "800px" }}
        pagination={false}
      />
      <Pagination
        style={{ float: "right" }}
        current={currentPage}
        pageSize={pageSize}
        total={totalQuestions}
        onChange={page => setCurrentPage(page)}
        pageSizeOptions={[10, 20, 30, 50]}
        showSizeChanger
        onShowSizeChange={(current, pageSize) => setPageSize(pageSize)}
      />
    </div>
  );
}
