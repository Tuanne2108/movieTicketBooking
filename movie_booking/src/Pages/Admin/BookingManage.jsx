import React, { useState, useEffect } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as bookingService from "../../services/BookingService";
import * as showService from "../../services/ShowService";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  InputNumber,
} from "antd";

export const BookingManage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showOptions, setShowOptions] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  const renderAction = (bookingId) => (
    <div style={{ display: "flex", gap: "15px" }}>
      <EditOutlined
        style={{ fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleUpdateDetails(bookingId)}
      />
      <DeleteOutlined
        style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleDelete(bookingId)}
      />
    </div>
  );

  const columns = [
    { title: "User ID", dataIndex: "user" },
    {
      title: "Show",
      dataIndex: "show",
      render: (showId) => findShowName(showId),
    },
    { title: "Seats Booked", dataIndex: "seats" },
    {
      title: "Total Price",
      dataIndex: "price",
      render: (price) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

  const findShowName = (showId) => {
    const showIdValue = showId._id; 
    const show = showOptions.find((show) => show.value === showIdValue);
    return show ? show.label : "N/A";
  };
  

  useEffect(() => {
    showService
      .getAllShows()
      .then((showsData) => {
        setShowOptions(
          showsData?.data.map((show) => ({
            value: show._id,
            label: show.movie.title,
          }))
        );
      })
      .catch((err) => setError(`Error fetching shows: ${err.message}`));
  }, []);

  useEffect(() => {
    bookingService
      .getAllBookings()
      .then((res) => {
        if (res.data) {
          setBookings(res.data);
        } else {
          notification.error({
            message: "Error",
            description: "Failed to fetch bookings",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: `Failed to fetch bookings: ${err.message}`,
        });
      });
  }, []);

  const data = bookings.map((booking) => ({
    key: booking._id,
    user: booking.user.email,
    show: booking.show,
    seats: booking.seats,
    price: booking.totalPrice,
    status: booking.status,
  }));
  console.log(bookings);
  const handleAddBooking = () => {
    setEditingBooking(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);

    const bookingData = {
      user: values.userId,
      show: values.showId,
      seatsBooked: values.seatsBooked,
      totalPrice: values.totalPrice,
      status: values.status,
    };

    const apiCall = editingBooking
      ? bookingService.updateBooking(editingBooking._id, bookingData)
      : bookingService.createBooking(bookingData);

    apiCall
      .then((res) => {
        const updatedBookings = editingBooking
          ? bookings.map((booking) =>
              booking._id === editingBooking._id ? res.data : booking
            )
          : [...bookings, res.data];

        setBookings(updatedBookings);
        setConfirmLoading(false);
        notification.success({
          message: "Success",
          description: editingBooking
            ? "Booking updated successfully"
            : "Booking added successfully",
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        setError(
          `Error ${editingBooking ? "updating" : "adding"} booking: ${
            err.message
          }`
        );
        setConfirmLoading(false);
        notification.error({
          message: "Failed",
          description: `Error ${
            editingBooking ? "updating" : "adding"
          } booking`,
        });
      });
  };

  const [form] = Form.useForm();

  const handleUpdateDetails = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    setEditingBooking(booking);
    form.setFieldsValue({
      userId: booking.userId,
      showId: booking.show,
      seatsBooked: booking.seats,
      totalPrice: booking.totalPrice,
      status: booking.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (bookingId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this booking?",
      onOk: () => {
        bookingService
          .deleteBooking(bookingId)
          .then(() => {
            setBookings(
              bookings.filter((booking) => booking._id !== bookingId)
            );
            notification.success({
              message: "Success",
              description: "Booking deleted successfully",
            });
          })
          .catch((err) => {
            setError(`Error deleting booking: ${err.message}`);
            notification.error({
              message: "Failed",
              description: "Error deleting booking",
            });
          });
      },
      onCancel: () => setIsModalVisible(false),
    });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBooking}>
        Add Booking
      </Button>
      <TableComponent
        columns={columns}
        data={data}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Modal
        title={editingBooking ? "Update Booking" : "Add Booking"}
        visible={isModalVisible}
        onCancel={handleModalClose}
        confirmLoading={confirmLoading}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="userId"
            label="User ID"
            rules={[{ required: true, message: "Please input the user ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="showId"
            label="Show"
            rules={[{ required: true, message: "Please select a show!" }]}
          >
            <Select options={showOptions} showSearch />
          </Form.Item>
          <Form.Item
            name="seatsBooked"
            label="Seats Booked"
            rules={[
              { required: true, message: "Please input the number of seats!" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="totalPrice"
            label="Total Price"
            rules={[
              { required: true, message: "Please input the total price!" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Complete">Complete</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
