import React, { useState, useEffect } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as bookingService from "../../services/BookingService";
import * as showService from "../../services/ShowService";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
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

  const [shows, setShowOptions] = useState([]); // List of available shows for dropdown

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
    { title: "User ID", dataIndex: "userId" },
    { title: "Show", dataIndex: "showId", render: (showId) => findShowName(showId) },
    { title: "Seats Booked", dataIndex: "seatsBooked" },
    { title: "Total Price", dataIndex: "totalPrice" },
    { title: "Booking Date", dataIndex: "bookingDate", render: (date) => new Date(date).toLocaleDateString() },
    { title: "Action", dataIndex: "action", render: (text, record) => renderAction(record.key) },
  ];

  const findShowName = (showId) => {
    const show = shows.find((show) => show._id === showId);
    return show ? show.movieTitle : "N/A"; // Handle cases where show may not be found
  };

  useEffect(() => {
    Promise.all([bookingService.getAllBookings(), showService.getAllShows()]) // Fetch bookings and shows concurrently
      .then(([bookingsData, showsData]) => {
        setBookings(bookingsData);
        setShowOptions(showsData.map((show) => ({ value: show._id, label: show.movieTitle })));
      })
      .catch((err) => setError(`Error fetching data: ${err.message}`));
  }, []);

  const handleAddBooking = () => setIsModalVisible(true);
  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);
    const newBooking = {
      userId: values.userId,
      showId: values.showId,
      seatsBooked: values.seatsBooked,
      totalPrice: values.totalPrice,
    };

    bookingService
      .createBooking(newBooking)
      .then((res) => {
        setBookings([...bookings, res.data]);
        setConfirmLoading(false);
        notification.success({
          message: "Success",
          description: "Booking added successfully",
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        setError(`Error adding booking: ${err.message}`);
        setConfirmLoading(false);
        notification.error({
          message: "Failed",
          description: "Error adding booking",
        });
      });
  };

  const [form] = Form.useForm();

  const handleUpdateDetails = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    // Pre-populate form with existing booking data (optional)
    setIsModalVisible(true);
  };

  const handleDelete = (bookingId) => {
    // Modal.confirm({
    //   title: "Confirm Deletion",
    //   content: "Are you sure you want to delete this booking?",
    //   onOk: () => {
    //     bookingService
    //       .deleteBooking(bookingId)
    //       .then(() => {
    //         setBookings(bookings.filter((booking) => booking._id !== bookingId));
    //         notification.success({
    //           message: "Success",
    //           description: "Booking deleted successfully",
    //         });
    //       })
    //       .catch((err) => {
    //         setError(`Error deleting booking: ${err.message}`);
    //         notification.error({
    //           message: "Failed",
    //           description: "Error deleting booking",
    //         });
    //       });
    //   },
    //   onCancel: () => setIsModalVisible(false),
    // });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBooking}>
        Add Booking
      </Button>
      <TableComponent
        columns={columns}
        data={bookings}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Modal
        title="Add Booking"
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
            <Select options={shows} showSearch />
          </Form.Item>
          <Form.Item
            name="seatsBooked"
            label="Seats Booked"
            rules={[{ required: true, message: "Please input the number of seats!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="totalPrice"
            label="Total Price"
            rules={[{ required: true, message: "Please input the total price!" }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

