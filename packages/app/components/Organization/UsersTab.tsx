import { SearchOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { OrganizationRole, UserRole } from "@koh/common";
import {
  Card,
  Spin,
  Input,
  List,
  Avatar,
  Pagination,
  Button,
  Select,
  Modal,
  message,
} from "antd";
import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
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
  userRole: string;
  organizationRole: string;
}

export default function UsersTab({
  organizationId,
}: {
  organizationId: number;
}): ReactElement {
  const profile = useProfile();

  const [isRoleChangeModalVisible, setRoleChangeModalVisible] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<UserData | null>(
    null
  );
  const [updatedRole, setUpdatedRole] = useState<OrganizationRole>(
    OrganizationRole.MEMBER
  );
  const [shouldRenderTable, setShouldRenderTable] = useState(true);

  // Function to open and close the modal
  const toggleRoleChangeModal = (userData: UserData) => {
    setSelectedUserData(userData);
    setRoleChangeModalVisible(!isRoleChangeModalVisible);
  };

  const prepareAndShowConfirmationModal =
    (user: UserData) => async (newRole: string) => {
      setUpdatedRole(newRole as OrganizationRole);

      toggleRoleChangeModal(user);
    };

  const updateRole = async () => {
    const { userId } = selectedUserData;

    await API.organizations
      .updateOrganizationUserRole(organizationId, {
        userId,
        organizationRole: updatedRole,
      })
      .then(() => {
        setShouldRenderTable(!shouldRenderTable);
        message.success({
          content: "Successfully updated user role.",
          onClose: () => {
            toggleRoleChangeModal(selectedUserData);
          },
        });
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        message.error(errorMessage);
      });
  };

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

    useEffect(() => {
      return () => {
        // Clear the cache for the "UsersTab" component
        mutate(`users/${page}/${search}`);
      };
    }, [page, search]);

    const { data: users } = useSWR(
      `users/${page}/${search}`,
      async () => await API.organizations.getUsers(organizationId, page, search)
    );

    if (!users) {
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
              dataSource={users}
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
                        onChange={prepareAndShowConfirmationModal(item)}
                        disabled={
                          item.userId === profile.id ||
                          item.organizationRole.toLowerCase() ===
                            OrganizationRole.ADMIN.toLowerCase() ||
                          item.userRole.toLowerCase() ===
                            UserRole.ADMIN.toLowerCase()
                        }
                        options={Object.keys(OrganizationRole).map((role) => ({
                          label: role.toLowerCase(),
                          value: role.toLowerCase(),
                          disabled:
                            item.userId === profile.id ||
                            item.userRole.toLowerCase() ===
                              UserRole.ADMIN.toLowerCase() ||
                            role.toLowerCase() ===
                              item.organizationRole.toLowerCase(),
                        }))}
                      />,
                      <Button
                        key=""
                        type="primary"
                        disabled={
                          item.userId === profile.id ||
                          item.userRole.toLowerCase() ===
                            UserRole.ADMIN.toLowerCase() ||
                          item.organizationRole === OrganizationRole.ADMIN
                        }
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
          {users.total > 50 && (
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
        <RenderTable shouldRenderTable={shouldRenderTable} />
      </Card>

      {isRoleChangeModalVisible && (
        <Modal
          title="Confirm Role Change"
          open={isRoleChangeModalVisible}
          onCancel={toggleRoleChangeModal}
          onOk={updateRole}
        >
          {selectedUserData && (
            <>
              You are about to change the role of{" "}
              <strong>
                {selectedUserData.firstName} {selectedUserData.lastName}
              </strong>{" "}
              to <strong>{updatedRole}</strong>. <br />
              <br />
              Are you sure?
            </>
          )}
        </Modal>
      )}
    </>
  );
}
