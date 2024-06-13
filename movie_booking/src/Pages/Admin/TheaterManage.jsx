import React, { useEffect, useState } from "react";
import * as theaterService from "../../services/TheaterService";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, notification, Drawer, Space } from "antd";
import { TableComponent } from "../../Components/Table/TableComponent";

export const TheaterManage = () => {
  const [theaters, setTheaters] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [currentTheater, setCurrentTheater] = useState(null);

  const renderAction = (theaterId) => (
    <div style={{ display: "flex", gap: "15px" }}>
      <EditOutlined
        style={{ fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleUpdateDetails(theaterId)}
      />
      <DeleteOutlined
        style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleDelete(theaterId)}
      />
    </div>
  );

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Location", dataIndex: "location" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

  useEffect(() => {
    theaterService
      .getAllTheaters()
      .then((res) => {
        if (res.data) {
          setTheaters(res.data);
        } else {
          notification.error({
            message: "Error",
            description: "Failed to fetch theaters",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: `Failed to fetch theaters: ${err.message}`,
        });
      });
  }, []);

  const data = theaters.map((theater) => ({
    key: theater._id,
    name: theater.name,
    location: theater.location,
  }));

  const handleAddTheater = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);
    const newTheater = {
      name: values.name,
      location: values.location,
    };

    theaterService
      .createTheater(newTheater)
      .then((res) => {
        setTheaters([...theaters, res.data]);
        setConfirmLoading(false);
        notification.success({
          message: "Success",
          description: "Theater added successfully",
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        setConfirmLoading(false);
        notification.error({
          message: "Failed",
          description: `Error adding theater: ${err.message}`,
        });
      });
  };
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    updateForm.resetFields();
  };

  const handleUpdateDetails = (theaterId) => {
    const theater = theaters.find((theater) => theater._id === theaterId);
    setCurrentTheater(theater);
    updateForm.setFieldsValue({
      name: theater.name,
      location: theater.location,
    });
    showDrawer();
  };

  const handleUpdateFormSubmit = (values) => {
    const updatedTheater = {
      name: values.name,
      location: values.location,
    };

    theaterService
      .updateTheater(currentTheater._id, updatedTheater)
      .then((res) => {
        setTheaters(
          theaters.map((theater) =>
            theater._id === currentTheater._id ? res.data : theater
          )
        );
        notification.success({
          message: "Success",
          description: "Theater updated successfully",
        });
        onClose();
      })
      .catch((err) => {
        notification.error({
          message: "Failed",
          description: `Error updating theater: ${err.message}`,
        });
      });
  };

  const handleDelete = (theaterId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this theater?",
      onOk: () => {
        theaterService
          .deleteTheater(theaterId)
          .then(() => {
            setTheaters(
              theaters.filter((theater) => theater._id !== theaterId)
            );
            notification.success({
              message: "Success",
              description: "Theater deleted successfully",
            });
          })
          .catch((err) => {
            notification.error({
              message: "Failed",
              description: `Error deleting theater: ${err.message}`,
            });
          });
      },
      onCancel: () => setIsModalVisible(false),
    });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTheater}>
        Add Theater
      </Button>
      <TableComponent
        columns={columns}
        data={data}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />

      <Modal
        title="Add Movie"
        visible={isModalVisible}
        onCancel={handleModalClose}
        confirmLoading={confirmLoading}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Update theater info  */}
      <Drawer
        title="Update Theater"
        visible={open}
        onClose={onClose}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={() => updateForm.submit()}>
              Update
            </Button>
          </Space>
        }
      >
        <Form form={updateForm} onFinish={handleUpdateFormSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
