import {
  Button,
  Checkbox,
  Form,
  Input,
  Pagination,
  Table,
  Tooltip,
} from "antd";
import { FormInstance } from "antd/es/form";
import { ColumnType, ColumnsType } from "antd/es/table";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { API } from "@koh/api-client";
import { useDebounce } from "../../hooks/useDebounce";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export interface ChatbotDocument {
  id: number;
  name: string;
  type: string;
  subDocumentIds: string[];
}

export interface ChatbotDocumentResponse {
  chatQuestions: ChatbotDocument[];
  total: number;
}

export default function ChatbotSettings(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;

  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce<string>(search, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [chatbotDocuments, setChatbotDocuments] = useState([
    {
      id: 1,
      name: "COSC 304 - Lecture 1",
      type: "PDF",
      subDocumentIds: ["1", "2", "3"],
    },
    {
      id: 1,
      name: "COSC 304 - Lecture 2",
      type: "PDF",
      subDocumentIds: ["4", "5", "6"],
    },
  ]);

  const columns: ColumnsType<ChatbotDocument> = [
    {
      title: "Document ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "",
      render: (text, record, index) => (
        <Button onClick={() => handleDeleteDocument(record)}>Delete</Button>
      ),
    },
  ];

  useEffect(() => {
    getDocuments();
  }, [currentPage, pageSize, debouncedValue]);

  const getDocuments = async () => {
    setLoading(true);
    try {
      const data: any = await API.chatbot.getDocuments(
        Number(cid),
        search,
        pageSize,
        currentPage
      );

      setChatbotDocuments(data.chatDocuments);
      setTotalDocuments(data.total);
    } catch (e) {
      setChatbotDocuments([]);
    }
    setLoading(false);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setFiles(_files);
    }
  };

  const uploadFiles = async () => {
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadedDocument = await fetch(`/chat/${cid}/document`, {
          method: "POST",
          body: formData,
        });

        const documentJSON = await uploadedDocument.json();

        const response = await API.chatbot.addDocument({
          data: {
            name: documentJSON.name,
            type: documentJSON.type,
            subDocumentIds: documentJSON.subDocumentIds,
          },
          courseId: Number(cid),
        });

        console.log("Uploaded");
        toast.success("File uploaded.");
      } catch (e) {
        toast.error("Failed to upload file.");
      }
    }
  };

  const handleFileUpload = async () => {
    await uploadFiles();

    console.log("Done");
    const fileInput = document.getElementById("files");
    if (fileInput) {
      fileInput.value = "";
    }
    getDocuments();
  };

  const handleDeleteDocument = async (document: ChatbotDocument) => {
    try {
      const res1 = await fetch(`/chat/${cid}/document`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subDocumentIds: document.subDocumentIds,
        }),
      });
      const res2 = await API.chatbot.deleteDocument({
        documentId: document.id,
      });
      toast.success("Document deleted.");
      getDocuments();
    } catch (e) {
      toast.error("Failed to delete document.");
    }
  };

  return (
    <div className="m-auto my-5 max-w-[800px]">
      <div className="flex w-full items-center justify-between">
        <div className="">
          <h3 className="m-0 p-0 text-4xl font-bold text-gray-900">
            Manage Chatbot Documents
          </h3>
          <p className="text-[16px] font-medium text-gray-600">
            Configure the documents that your chatbot will have access to
          </p>
        </div>
        <Button>Add Document</Button>
      </div>
      <hr className="my-5 w-full"></hr>
      <input
        type="file"
        name="file"
        id="files"
        multiple
        onChange={handleFileSelected}
      />
      <Button onClick={handleFileUpload}>Upload</Button>

      <Input
        placeholder={"Search document name..."}
        // prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
        onPressEnter={getDocuments}
      />
      <Table
        columns={columns}
        dataSource={chatbotDocuments}
        style={{ maxWidth: "800px" }}
        pagination={false}
      />
      <div className="my-1"></div>
      <Pagination
        style={{ float: "right" }}
        current={currentPage}
        pageSize={pageSize}
        total={totalDocuments}
        onChange={(page) => setCurrentPage(page)}
        pageSizeOptions={[10, 20, 30, 50]}
        showSizeChanger
        onShowSizeChange={(current, pageSize) => setPageSize(pageSize)}
      />
    </div>
  );
}
