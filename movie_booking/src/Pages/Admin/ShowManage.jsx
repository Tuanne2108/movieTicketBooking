import React, { useState, useEffect } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as showService from "../../services/ShowService";
import * as movieService from "../../services/MovieService"; // For fetching movie titles
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
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

export const ShowManage = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [movies, setMovies] = useState([]); // List of available movies for dropdown

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
    {
      title: "Movie",
      dataIndex: "movieId",
      render: (movieId) => findMovieTitle(movieId),
    },
    {
      title: "Show Date",
      dataIndex: "showDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    { title: "Show Time", dataIndex: "showTime" },
    { title: "Tickets Available", dataIndex: "ticketsAvailable" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

  const findMovieTitle = (movieId) => {
    const movie = movies.find((movie) => movie._id === movieId);
    return movie ? movie.title : "N/A"; // Handle cases where movie may not be found
  };

  useEffect(() => {
    Promise.all([showService.getAllShows(), movieService.getAllMovies()]) // Fetch shows and movies concurrently
      .then(([showsData, moviesData]) => {
        setShows(showsData);
        setMovies(
          moviesData.map((movie) => ({ value: movie._id, label: movie.title }))
        );
      })
      .catch((err) => setError(`Error fetching data: ${err.message}`));
  }, []);

  const handleAddShow = () => setIsModalVisible(true);
  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);
    const newShow = {
      movieId: values.movieId,
      showDate: values.showDate.format("YYYY-MM-DD"), // Ensure proper date format for backend
      showTime: values.showTime,
      ticketsAvailable: values.ticketsAvailable,
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

  const [form] = Form.useForm();

  const handleUpdateDetails = (showId) => {
    const show = shows.find((show) => show._id === showId);
    // Pre-populate form with existing show data (optional)
    setIsModalVisible(true);
  };

  const handleDelete = (showId) => {
    // Modal.confirm({
    //   title: "Confirm Deletion",
    //   content: "Are you sure you want to delete this show?",
    //   onOk: () => {
    //     showService
    //       .deleteShow(showId)
    //       .then(() => {
    //         setShows(shows.filter((show) => show._id !== showId));
    //         notification.success({
    //           message: "Success",
    //           description: "Show deleted successfully",
    //         });
    //       })
    //       .catch((err) => {
    //         setError(`Error deleting show: ${err.message}`);
    //         notification.error({
    //           message: "Failed",
    //           description: "Error deleting show",
    //         });
    //       });
    //   },
    //   onCancel: () => setIsModalVisible(false),
    // });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddShow}>
        Add Show
      </Button>
      <TableComponent
        columns={columns}
        data={shows}
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
            name="movieId"
            label="Movie"
            rules={[{ required: true, message: "Please select a movie!" }]}
          >
            <Select options={movies} showSearch />
          </Form.Item>
          <Form.Item
            name="showDate"
            label="Show Date"
            rules={[
              { required: true, message: "Please select the show date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="showTime"
            label="Show Time"
            rules={[{ required: true, message: "Please input the show time!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ticketsAvailable"
            label="Tickets Available"
            rules={[
              {
                required: true,
                message: "Please input the number of tickets available!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
