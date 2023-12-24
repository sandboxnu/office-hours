import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
  Tooltip,
  Upload,
  UploadProps,
  message,
} from 'antd'
import { FormInstance } from 'antd/es/form'
import { ColumnType, ColumnsType } from 'antd/es/table'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { API } from '@koh/api-client'
import { useDebounce } from '../../hooks/useDebounce'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import {
  FileAddOutlined,
  GithubOutlined,
  InboxOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload'
import Dragger from 'antd/lib/upload/Dragger'
import { Github } from 'lucide-react'

export interface ChatbotDocument {
  id: number
  name: string
  type: string
  subDocumentIds: string[]
}

export interface ChatbotDocumentResponse {
  chatQuestions: ChatbotDocument[]
  total: number
}

export default function ChatbotSettings(): ReactElement {
  const [form] = Form.useForm()
  const router = useRouter()
  const { cid } = router.query

  const [addDocumentModalOpen, setAddDocumentModalOpen] = useState(false)
  const [documentType, setDocumentType] = useState('FILE')
  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce<string>(search, 500)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [chatbotDocuments, setChatbotDocuments] = useState()

  const columns: ColumnsType<ChatbotDocument> = [
    {
      title: 'Document ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '',
      render: (text, record, index) => (
        <Button
          disabled={loading}
          onClick={() => handleDeleteDocument(record)}
          danger
        >
          Delete
        </Button>
      ),
    },
  ]

  useEffect(() => {
    getDocuments()
  }, [currentPage, pageSize, debouncedValue])

  const getDocuments = async () => {
    setLoading(true)
    try {
      const data: any = await API.chatbot.getDocuments(
        Number(cid),
        search,
        pageSize,
        currentPage,
      )

      setChatbotDocuments(data.chatDocuments)
      setTotalDocuments(data.total)
    } catch (e) {
      setChatbotDocuments([])
    }
    setLoading(false)
  }

  const addUrl = async (url: string) => {
    setLoading(true)
    try {
      const data = {
        url: url,
      }

      const uploadedDocument = await fetch(`/chat/${cid}/document/url/github`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const documentJSON = await uploadedDocument.json()

      const response = await API.chatbot.addDocument({
        data: {
          name: documentJSON.name,
          type: documentJSON.type,
          subDocumentIds: documentJSON.ids,
        },
        courseId: Number(cid),
      })

      toast.success('File uploaded.')
    } catch (e) {
      toast.error('Failed to upload file.')
    } finally {
      setLoading(false)
    }

    getDocuments()
  }

  const uploadFiles = async (files: RcFile[], source: string) => {
    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        // Create a JSON object and convert it to a string
        const jsonData = {
          source: source,
        }
        formData.append(
          'source',
          new Blob([JSON.stringify(jsonData)], { type: 'application/json' }),
        )

        const uploadedDocument = await fetch(`/chat/${cid}/document`, {
          method: 'POST',
          body: formData,
        })

        const documentJSON = await uploadedDocument.json()

        const response = await API.chatbot.addDocument({
          data: {
            name: documentJSON.name,
            type: documentJSON.type,
            subDocumentIds: documentJSON.ids,
          },
          courseId: Number(cid),
        })

        toast.success('File uploaded.')
      } catch (e) {
        toast.error('Failed to upload file.')
      }
    }
  }

  const handleDeleteDocument = async (document: ChatbotDocument) => {
    setLoading(true)
    try {
      const res1 = await fetch(`/chat/${cid}/document`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subDocumentIds: document.subDocumentIds }),
      })
      const res2 = await API.chatbot.deleteDocument({ documentId: document.id })
      toast.success('Document deleted.')
      getDocuments()
    } catch (e) {
      toast.error('Failed to delete document.')
    } finally {
      setLoading(false)
    }
  }

  const addDocument = async () => {
    setLoading(true)
    try {
      const formData = await form.validateFields()

      if (documentType === 'URL') {
        await addUrl(formData.url)
      }

      if (documentType === 'FILE') {
        const files = formData.files.fileList.map((file) => file.originFileObj)
        await uploadFiles(files, formData.source)
      }

      setAddDocumentModalOpen(false)
      setLoading(false)
      form.resetFields()
      getDocuments()
    } finally {
      setLoading(false)
    }
  }

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    accept: '.pdf',
  }

  return (
    <div className="m-auto my-5 max-w-[800px]">
      <Modal
        title="Add a new document for your chatbot to use."
        open={addDocumentModalOpen}
        onCancel={() => setAddDocumentModalOpen(false)}
        footer={[
          <Button
            key="ok"
            type="ghost"
            onClick={() => setAddDocumentModalOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={addDocument}
            disabled={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <>
          <div className="mb-2 flex h-fit w-full items-center justify-center gap-2">
            <div
              className={`${
                documentType == 'FILE'
                  ? 'border-blue-300 text-black'
                  : 'border-blue-100 text-gray-600'
              } flex flex-grow cursor-pointer items-center justify-center gap-2 rounded-lg  border-2 p-5 hover:bg-blue-50`}
              onClick={() => setDocumentType('FILE')}
            >
              <FileAddOutlined />
              <p className="text-md font-semibold">Upload Files</p>
            </div>
            <div
              className={`${
                documentType == 'URL'
                  ? 'border-blue-300 text-black'
                  : 'border-blue-100 text-gray-600'
              } flex flex-grow cursor-pointer items-center  justify-center gap-2 rounded-lg border-2  p-5 hover:bg-blue-50`}
              onClick={() => setDocumentType('URL')}
            >
              <GithubOutlined />
              <p className="text-md font-semibold">GitHub File</p>
            </div>
          </div>
          <Form form={form}>
            {documentType === 'URL' && (
              <Form.Item
                name="url"
                rules={[
                  { required: true, message: 'Please provide a document URL.' },
                ]}
              >
                <Input placeholder="Enter URL..." />
              </Form.Item>
            )}
            {documentType === 'FILE' && (
              <>
                <Form.Item
                  name="files"
                  rules={[
                    {
                      required: true,
                      message: 'Please provide document files.',
                    },
                  ]}
                >
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </Dragger>
                </Form.Item>
                <Tooltip
                  title={
                    'This preview URL will be used to redirect your students to view this file.'
                  }
                >
                  <p>
                    Preview URL{' '}
                    <span>
                      <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
                    </span>{' '}
                  </p>
                </Tooltip>
                <Form.Item
                  name="source"
                  rules={[
                    {
                      required: true,
                      message: 'Please provide a document preview URL.',
                    },
                  ]}
                >
                  <Input placeholder="Enter document preview URL..." />
                </Form.Item>
              </>
            )}
          </Form>
        </>
      </Modal>
      <div className="flex w-full items-center justify-between">
        <div className="">
          <h3 className="m-0 p-0 text-4xl font-bold text-gray-900">
            Manage Chatbot Documents
          </h3>
          <p className="text-[16px] font-medium text-gray-600">
            Configure the documents that your chatbot will have access to
          </p>
        </div>
        <Button onClick={() => setAddDocumentModalOpen(true)}>
          Add Document
        </Button>
      </div>
      <hr className="my-5 w-full"></hr>

      <Input
        placeholder={'Search document name...'}
        // prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => {
          e.preventDefault()
          setSearch(e.target.value)
        }}
        onPressEnter={getDocuments}
      />
      <Table
        columns={columns}
        dataSource={chatbotDocuments}
        style={{ maxWidth: '800px' }}
        pagination={false}
      />
      <div className="my-1"></div>
      <Pagination
        style={{ float: 'right' }}
        current={currentPage}
        pageSize={pageSize}
        total={totalDocuments}
        onChange={(page) => setCurrentPage(page)}
        pageSizeOptions={[10, 20, 30, 50]}
        showSizeChanger
        onShowSizeChange={(current, pageSize) => setPageSize(pageSize)}
      />
    </div>
  )
}
