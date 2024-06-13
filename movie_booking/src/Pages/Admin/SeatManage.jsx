import React, { useState, useEffect } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as seatService from "../../services/SeatService";
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

export const SeatManage = () => {
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showOptions, setShowOptions] = useState([]);
  const [editingSeat, setEditingSeat] = useState(null);

  const renderAction = (seatId) => (
    <div style={{ display: "flex", gap: "15px" }}>
      <EditOutlined
        style={{ fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleUpdateDetails(seatId)}
      />
      <DeleteOutlined
        style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleDelete(seatId)}
      />
    </div>
  );

  const columns = [
    {
      title: "Show",
      dataIndex: "show",
      render: (showId) => findShowName(showId),
    },
    { title: "Row", dataIndex: "row" },
    { title: "Number", dataIndex: "number" },
    { title: "Type", dataIndex: "type" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

  const findShowName = (showId) => {
    const show = showOptions.find((show) => show.value === showId);
    return show ? show.label : "N/A";
  };

  useEffect(() => {
    seatService
      .getAllSeats()
      .then((res) => {
        if (res.data) {
          setSeats(res.data);
        } else {
          notification.error({
            message: "Error",
            description: "Failed to fetch seats",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: `Failed to fetch seats: ${err.message}`,
        });
      });
  }, []);

  const data = seats.map((seat) => ({
    key: seat._id,
    show: seat.show,
    row: seat.row,
    number: seat.number,
    type: seat.type,
    status: seat.status,
  }));

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

  const handleAddSeat = () => {
    setEditingSeat(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);

    const seatData = {
      show: values.showId,
      row: values.row,
      number: values.number,
      type: values.type,
      status: values.status,
    };
    console.log("Submitting seat data:", seatData);
    const apiCall = editingSeat
      ? seatService.updateSeat(editingSeat._id, seatData)
      : seatService.createSeat(seatData);

    apiCall
      .then((res) => {
        const updatedSeats = editingSeat
          ? seats.map((seat) =>
              seat._id === editingSeat._id ? res.data : seat
            )
          : [...seats, res.data];

        setSeats(updatedSeats);
        setConfirmLoading(false);
        notification.success({
          message: "Success",
          description: editingSeat
            ? "Seat updated successfully"
            : "Seat added successfully",
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        setConfirmLoading(false);
        notification.error({
          message: err.status || "Failed",
          description: err.message || "Error adding seat",
        });
      });
  };

  const [form] = Form.useForm();

  const handleUpdateDetails = (seatId) => {
    const seat = seats.find((seat) => seat._id === seatId);
    setEditingSeat(seat);
    form.setFieldsValue({
      showId: seat.show,
      row: seat.row,
      number: seat.number,
      type: seat.type,
      status: seat.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (seatId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this seat?",
      onOk: () => {
        seatService
          .deleteSeat(seatId)
          .then(() => {
            setSeats(seats.filter((seat) => seat._id !== seatId));
            notification.success({
              message: "Success",
              description: "Seat deleted successfully",
            });
          })
          .catch((err) => {
            setError(`Error deleting seat: ${err.message}`);
            notification.error({
              message: "Failed",
              description: "Error deleting seat",
            });
          });
      },
      onCancel: () => setIsModalVisible(false),
    });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSeat}>
        Add Seat
      </Button>
      <TableComponent
        columns={columns}
        data={data}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Modal
        title={editingSeat ? "Update Seat" : "Add Seat"}
        visible={isModalVisible}
        onCancel={handleModalClose}
        confirmLoading={confirmLoading}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="showId"
            label="Show"
            rules={[{ required: true, message: "Please select a show!" }]}
          >
            <Select options={showOptions} showSearch />
          </Form.Item>
          <Form.Item
            name="row"
            label="Row"
            rules={[{ required: true, message: "Please input the row!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="number"
            label="Number"
            rules={[{ required: true, message: "Please input the number!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please input the type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Select.Option value="available">Available</Select.Option>
              <Select.Option value="reserved">Reserved</Select.Option>
              <Select.Option value="sold">Sold</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
