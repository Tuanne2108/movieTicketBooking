import React, { useEffect, useState } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as showService from "../../services/ShowService";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  notification,
  Drawer,
  Space,
  TimePicker,
} from "antd";
import dayjs from "dayjs";

export const ShowManage = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  const renderAction = (showId) => (
    <div style={{ display: "flex", gap: "15px" }}>
      <EditOutlined
        style={{ fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleUpdateDetails(showId)}
      />
      <DeleteOutlined
        style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleDelete(showId)}
      />
    </div>
  );

  const columns = [
    { title: "Movie", dataIndex: "movie" },
    { title: "Theater", dataIndex: "theater" },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

  useEffect(() => {
    showService
      .getAllShows()
      .then((res) => {
        if (res.data) {
          setShows(res.data);
        } else {
          setError("Expected an object containing a data array");
        }
      })
      .catch((err) => setError(`Error fetching shows: ${err.message}`));
  }, []);

  const data = shows.map((show) => ({
    key: show._id,
    movie: show.movie.title,
    theater: show.theater.name,
    date: show.date,
    time: show.time,
    price: show.price,
  }));

  const handleAddShow = () => setIsModalVisible(true);
  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);
    const newShow = {
      movie: values.movie,
      theater: values.theater,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      time: values.time.format("HH:mm"),
      price: values.price,
    };

    showService
      .createShow(newShow)
      .then((res) => {
        setShows([...shows, res.data]);
        setConfirmLoading(false);
        notification.success({
          message: "Success",
          description: "Show added successfully",
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        setError(`Error adding show: ${err.message}`);
        setConfirmLoading(false);
        notification.error({
          message: "Failed",
          description: "Error adding show",
        });
      });
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    updateForm.resetFields();
  };

  const handleUpdateDetails = (showId) => {
    const show = shows.find((show) => show._id === showId);
    setCurrentShow(show);
    updateForm.setFieldsValue({
      movie: show.movie._id,
      theater: show.theater._id,
      date: dayjs(show.date, "YYYY-MM-DD"),
      time: dayjs(show.time, "HH:mm"),
      price: show.price,
    });
    showDrawer();
  };

  const handleUpdateFormSubmit = (values) => {
    const updatedShow = {
      movie: values.movie,
      theater: values.theater,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      time: values.time.format("HH:mm"),
      price: values.price,
    };

    showService
      .updateShow(currentShow._id, updatedShow)
      .then((res) => {
        setShows(
          shows.map((show) =>
            show._id === currentShow._id ? res.data : show
          )
        );
        notification.success({
          message: "Success",
          description: "Show updated successfully",
        });
        onClose();
      })
      .catch((err) => {
        setError(`Error updating show: ${err.message}`);
        notification.error({
          message: "Failed",
          description: "Error updating show",
        });
      });
  };

  const handleDelete = (showId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this show?",
      onOk: () => {
        showService
          .deleteShow(showId)
          .then(() => {
            setShows(shows.filter((show) => show._id !== showId));
            notification.success({
              message: "Success",
              description: "Show deleted successfully",
            });
          })
          .catch((err) => {
            setError(`Error deleting show: ${err.message}`);
            notification.error({
              message: "Failed",
              description: "Error deleting show",
            });
          });
      },
      onCancel: () => setIsModalVisible(false),
    });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddShow}>
        Add Show
      </Button>
      <TableComponent
        columns={columns}
        data={data}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Modal
        title="Add Show"
        visible={isModalVisible}
        onCancel={handleModalClose}
        confirmLoading={confirmLoading}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="movie"
            label="Movie"
            rules={[{ required: true, message: "Please select the movie!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="theater"
            label="Theater"
            rules={[{ required: true, message: "Please select the theater!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please select the time!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="Update Show"
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
            name="movie"
            label="Movie"
            rules={[{ required: true, message: "Please select the movie!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="theater"
            label="Theater"
            rules={[{ required: true, message: "Please select the theater!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please select the time!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
