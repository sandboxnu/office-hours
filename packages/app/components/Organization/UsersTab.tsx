import { SearchOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { OrganizationRole } from "@koh/common";
import {
  Card,
  Spin,
  Input,
  List,
  Avatar,
  Pagination,
  Button,
  Select,
} from "antd";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useProfile } from "../../hooks/useProfile";

const TableBackground = styled.div`
  background-color: white;
`;

interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  organizationRole: string;
}

export default function UsersTab({
  organizationId,
}: {
  organizationId: number;
}): ReactElement {
  const profile = useProfile();

  function RenderTable(): ReactElement {
    const [page, setPage] = useState(1);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    const handleInput = (event) => {
      event.preventDefault();
      setInput(event.target.value);
    };

    const handleSearch = (event) => {
      event.preventDefault();
      setSearch(event.target.value);
      setPage(1);
    };

    const { data } = useSWR(
      `${page}/${search}`,
      async () => await API.organizations.getUsers(organizationId, page, search)
    );

    if (!data) {
      return (
        <Spin
          tip="Loading..."
          style={{ margin: "0 auto", width: "100%", textAlign: "center" }}
          size="large"
        />
      );
    } else {
      return (
        <>
          <TableBackground>
            <Input
              placeholder="Search Users"
              prefix={<SearchOutlined />}
              value={input}
              onChange={handleInput}
              onPressEnter={handleSearch}
            />

            <List
              style={{ marginTop: 20 }}
              dataSource={data}
              renderItem={(item: UserData) => (
                <>
                  <List.Item
                    style={{ borderBottom: "1px solid #f0f0f0", padding: 10 }}
                    key={item.userId}
                    actions={[
                      <Select
                        key={item.userId}
                        defaultValue={item.organizationRole}
                        style={{ width: 100 }}
                        disabled={
                          item.userId === profile.id ||
                          item.organizationRole === OrganizationRole.ADMIN
                        }
                        options={Object.keys(OrganizationRole).map((role) => ({
                          label: role.toLowerCase(),
                          value: role.toLowerCase(),
                          disabled:
                            role.toLowerCase() ===
                            item.organizationRole.toLowerCase(),
                        }))}
                      />,
                      <Button
                        key=""
                        type="primary"
                        disabled={item.userId === profile.id}
                      >
                        Edit
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.photoUrl} />}
                      title={item.firstName + " " + item.lastName}
                      description={item.email}
                    />
                  </List.Item>
                </>
              )}
            />
          </TableBackground>
          {data.total > 50 && (
            <Pagination
              style={{ float: "right" }}
              current={page}
              pageSize={50}
              total={data.total}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
            />
          )}
        </>
      );
    }
  }

  return (
    <>
      <Card title="Users">
        <RenderTable />
      </Card>
    </>
  );
}
