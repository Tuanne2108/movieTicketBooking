import React, { useState, useEffect } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as theaterService from "../../services/TheaterService";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, notification } from "antd";

export const TheaterManage = () => {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns = [
    { title: "Theater Name", dataIndex: "name" },
    { title: "Location", dataIndex: "location" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <EditOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleUpdateDetails(record.key)}
          />
          <DeleteOutlined
            style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    theaterService.getAllTheaters()
      .then((data) => setTheaters(data))
      .catch((err) => setError(`Error fetching theaters: ${err.message}`));
  }, []);

  const handleAddTheater = () => setIsModalVisible(true);
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
        setError(`Error adding theater: ${err.message}`);
        setConfirmLoading(false);
        notification.error({
          message: "Failed",
          description: "Error adding theater",
        });
      });
  };

  const [form] = Form.useForm();

  const handleUpdateDetails = (theaterId) => {
    const theater = theaters.find((theater) => theater._id === theaterId);
    // Pre-populate form with existing theater data (optional)
    setIsModalVisible(true);
  };

  const handleDelete = (theaterId) => {
    // Modal.confirm({
    //   title: "Confirm Deletion",
    //   content: "Are you sure you want to delete this theater?",
    //   onOk: () => {
    //     theaterService
    //       .deleteTheater(theaterId)
    //       .then(() => {
    //         setTheaters(theaters.filter((theater) => theater._id !== theaterId));
    //         notification.success({
    //           message: "Success",
    //           description: "Theater deleted successfully",
    //         });
    //       })
    //       .catch((err) => {
    //         setError(`Error deleting theater: ${err.message}`);
    //         notification.error({
    //           message: "Failed",
    //           description: "Error deleting theater",
    //         });
    //       });
    //   },
    //   onCancel: () => setIsModalVisible(false),
    // });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTheater}>
        Add Theater
      </Button>
      <TableComponent columns={columns} data={theaters} />
      <Modal
        title="Add Theater"
        visible={isModalVisible}
        onCancel={handleModalClose}
        confirmLoading={confirmLoading}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="name"
            label="Theater Name"
            rules={[{ required: true, message: "Please input the theater name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please input the theater location!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
