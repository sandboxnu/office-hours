import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
  Tooltip,
} from 'antd'
import { FormInstance } from 'antd/es/form'
import { ColumnType, ColumnsType } from 'antd/es/table'
import React, { ReactElement, useEffect, useState } from 'react'
import { API } from '@koh/api-client'
import { useDebounce } from '../../hooks/useDebounce'
import toast from 'react-hot-toast'

export interface ChatQuestion {
  id: string
  question: string
  answer: string
  user: string
  sourceDocuments: {
    name: string
    type: string
    parts: string[]
  }[]
  suggested: boolean
}

export interface ChatQuestionResponse {
  chatQuestions: ChatQuestion[]
  total: number
}

export default function ChatbotQuestions(): ReactElement {
  const [form] = Form.useForm()
  const [addModelOpen, setAddModelOpen] = useState(false)

  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce<string>(search, 500)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [chatQuestions, setChatQuestions] = useState([])

  const columns: ColumnsType<ChatQuestion> = [
    {
      title: 'Question ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: 'Asked By',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Source Documents',
      dataIndex: 'sourceDocuments',
      key: 'sourceDocuments',
      render: (_, { sourceDocuments }) => (
        <>
          {sourceDocuments && sourceDocuments.length > 0 ? (
            sourceDocuments.map((sourceDocument) => (
              // TODO: Create component and refactor into this one
              <p key={sourceDocument.name}>{sourceDocument.name}</p>
            ))
          ) : (
            <p>No Source Documents</p>
          )}
        </>
      ),
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
      dataIndex: 'suggested',
      key: 'suggested',
      render: (text, record, index) => {
        return (
          <Checkbox
            disabled={loading}
            checked={record.suggested}
            onChange={(e) => {
              toggleSuggested(e.target.checked, index, record.id)
            }}
          />
        )
      },
    },
  ]

  useEffect(() => {
    getQuestions()
  }, [currentPage, pageSize, debouncedValue])

  const toggleSuggested = async (newValue, index, questionId) => {
    // TODO: Loading & contextual disabling
    setLoading(true)
    try {
      await API.chatbot.editQuestion({
        data: {
          suggested: newValue,
        },
        questionId,
      })

      setChatQuestions((prev) => {
        const newChatQuestions = [...prev]
        newChatQuestions[index] = {
          ...newChatQuestions[index],
          suggested: newValue,
        }
        return newChatQuestions
      })
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const getQuestions = async () => {
    setLoading(true)
    try {
      const data: ChatQuestionResponse = await API.chatbot.getQuestions(
        search,
        pageSize,
        currentPage,
      )

      setChatQuestions(data.chatQuestions)
      setTotalQuestions(data.total)
    } catch (e) {
      setChatQuestions([])
    }
    setLoading(false)
  }

  const addQuestion = async () => {
    const formData = await form.validateFields()

    try {
      const question = await API.chatbot.createQuestion({
        questionText: formData.questionText,
        responseText: formData.responseText,
        suggested: formData.suggested,
      })

      getQuestions()
      setAddModelOpen(false)
      toast.success('Question added.')
    } catch (e) {
      toast.error('Failed to add question.')
    } finally {
      form.resetFields()
    }
  }

  return (
    <div className="m-auto my-5 max-w-[800px]">
      <Modal
        title="Create a new question for your students!"
        open={addModelOpen}
        onCancel={() => setAddModelOpen(false)}
        footer={[
          <Button key="ok" type="ghost" onClick={() => setAddModelOpen(false)}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={addQuestion}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="questionText"
            rules={[{ required: true, message: 'Please provide a question.' }]}
          >
            <Input placeholder="Question" />
          </Form.Item>
          <Form.Item
            name="responseText"
            rules={[{ required: true, message: 'Please provide an answer.' }]}
          >
            <Input placeholder="Answer" />
          </Form.Item>
          <Form.Item name="suggested" valuePropName="checked">
            <div className="flex gap-2">
              <input type="checkbox" />
              <p>Suggested</p>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex w-full items-center justify-between">
        <div className="">
          <h3 className="m-0 p-0 text-4xl font-bold text-gray-900">
            View Chatbot Questions
          </h3>
          <p className="text-[16px] font-medium text-gray-600">
            View and manage the questions being asked of your chatbot
          </p>
        </div>
        <Button onClick={() => setAddModelOpen(true)}>Add Question</Button>
      </div>
      <hr className="my-5 w-full"></hr>
      <Input
        placeholder={'Search question...'}
        // prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => {
          e.preventDefault()
          setSearch(e.target.value)
        }}
        onPressEnter={getQuestions}
      />
      <Table
        columns={columns}
        dataSource={chatQuestions}
        style={{ maxWidth: '800px' }}
        pagination={false}
      />
      <Pagination
        style={{ float: 'right' }}
        current={currentPage}
        pageSize={pageSize}
        total={totalQuestions}
        onChange={(page) => setCurrentPage(page)}
        pageSizeOptions={[10, 20, 30, 50]}
        showSizeChanger
        onShowSizeChange={(current, pageSize) => setPageSize(pageSize)}
      />
    </div>
  )
}
