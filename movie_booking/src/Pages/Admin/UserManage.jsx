import React, { useState, useEffect } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as userService from "../../services/UserService";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Checkbox, notification } from "antd";

export const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const renderAction = (userId) => (
    <div style={{ display: "flex", gap: "15px" }}>
      <EditOutlined
        style={{ fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleUpdateDetails(userId)}
      />
    </div>
  );

  const columns = [
    { title: "Email", dataIndex: "email" },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (isAdmin) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

  useEffect(() => {
    userService
      .getAllUsers()
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          notification.error({
            message: "Error",
            description: "Failed to fetch users",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: `Failed to fetch users: ${err.message}`,
        });
      });
  }, []);

  const data = users.map((user) => ({
    key: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  }));

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);

    const userData = {
      email: values.email,
      password: values.password,
      confirmedPassword: values.confirmedPassword,
      isAdmin: values.isAdmin,
    };

    const apiCall = editingUser
      ? userService.updateUser(editingUser._id, userData)
      : userService.signUpUser(userData);

    apiCall
      .then((res) => {
        const updatedUsers = editingUser
          ? users.map((user) =>
              user._id === editingUser._id ? res.data : user
            )
          : [...users, res.data];

        setUsers(updatedUsers);
        setConfirmLoading(false);
        notification.success({
          message: "Success",
          description: editingUser
            ? "User updated successfully"
            : "User added successfully",
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        setConfirmLoading(false);
        notification.error({
          message: err.status || "Failed",
          description: err.message || "Error adding user",
        });
      });
  };

  const [form] = Form.useForm();

  const handleUpdateDetails = (userId) => {
    const user = users.find((user) => user._id === userId);
    setEditingUser(user);
    form.setFieldsValue({
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setIsModalVisible(true);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
        Add User
      </Button>
      <TableComponent
        columns={columns}
        data={data}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Modal
        title={editingUser ? "Update User" : "Add User"}
        visible={isModalVisible}
        onCancel={handleModalClose}
        confirmLoading={confirmLoading}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item name="isAdmin" label="Admin" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          )}
          {!editingUser && (
            <Form.Item
              name="confirmedPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please input the confirm password!" },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};
