import React, { ReactElement, useEffect, useRef, useState } from 'react'
type CourseRosterPageProps = { courseId: number }
import { API } from '@koh/api-client'
import { SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from 'antd'
import type { ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { questions } from '@koh/common'
import { pick } from 'lodash'
import styled from 'styled-components'

const CourseRosterPageComponent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`

const possibleStatus = [
  { value: 'CantFind' },
  { value: 'TADeleted' },
  { value: 'Resolved' },
  { value: 'ConfirmedDeleted' },
  { value: 'Stale' },
]
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {title === 'Status' ? <Select options={possibleStatus} /> : <Input />}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export default function AddStudentsToCourse({
  courseId,
}: CourseRosterPageProps): ReactElement {
  const [editingKey, setEditingKey] = useState(-1)
  const [data, setData] = useState<questions[]>()
  const [form] = Form.useForm()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const getData = async () => {
    return await API.questions.getAllQuestions(courseId)
  }
  useEffect(() => {
    getData().then((d) => {
      pick(d, [
        'id',
        'queueId',
        'text',
        'questionType',
        'createdAt',
        'status',
        'location',
      ])
      setData(d)
    })
  }, [])

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const save = async (id: number) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => id === item.id)
      await API.questions.update(newData[index].id, row)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey(-1)
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey(-1)
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const edit = (record: any) => {
    form.setFieldsValue({ name: '', status: '', text: '', ...record })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey(-1)
  }
  // const editQuestion =(id)=>{
  //   const newData= data.filter((item)=> item.id!==id);
  //   setData(newData);
  // }
  const isEditing = (record: questions) => record.id === editingKey
  //for search bars
  const getColumnSearchProps = (dataIndex: string): ColumnType<questions> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns = [
    {
      title: 'Asked by',
      dataIndex: 'creatorName',
      key: 'creatorName',
      sorter: (a, b) => a.creatorName.length - b.creatorName.length,
      width: '15%',
      editable: false,
      ...getColumnSearchProps('creatorName'),
    },
    {
      title: 'Helper',
      dataIndex: 'helpName',
      key: 'helpName',
      width: 150,
      editable: false,
      ...getColumnSearchProps('helpName'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      editable: false,
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Question Type',
      dataIndex: 'questionType',
      key: 'questionType',
      width: 150,
      editable: true,
      ...getColumnSearchProps('questionType'),
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      editable: false,
    },
    {
      title: 'text',
      dataIndex: 'text',
      key: 'text',
      ...getColumnSearchProps('text'),
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: 100,
      editable: false,
      // render: (_: any, record) =>
      //   <a onClick={() => editQuestion(record.id)}>Edit</a>
      render: (_: any, record: questions) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== -1}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: questions) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: String(col.title),
        editing: isEditing(record),
      }),
    }
  })
  return (
    <CourseRosterPageComponent>
      <Form form={form} component={false}>
        {/* prettier-ignore */}
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
    </CourseRosterPageComponent>
  )
}
