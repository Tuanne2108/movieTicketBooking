import React, { useEffect, useState } from "react";
import { TableComponent } from "../../Components/Table/TableComponent";
import * as movieService from "../../services/MovieService";
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
  Row,
  Col,
} from "antd";
import moment from "moment";

export const MovieManage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  const renderAction = (movieId) => {
    return (
      <div style={{ display: "flex", gap: "15px" }}>
        <EditOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => handleUpdateDetails(movieId)}
        />
        <DeleteOutlined
          style={{
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => handleDelete(movieId)}
        />
      </div>
    );
  };

  // Define columns for the table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Actors",
      dataIndex: "actors",
      render: (actors) => actors.join(", "),
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Poster URL",
      dataIndex: "posterUrl",
      render: (url) => <img src={url} alt="Poster" style={{ width: 50 }} />,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (duration) => `${duration} mins`,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

  // Fetch data from API
  useEffect(() => {
    movieService
      .getAllMovies()
      .then((res) => {
        if (res.data) {
          setMovies(res.data);
        } else {
          setError("Expected an object containing a data array");
        }
      })
      .catch((err) => {
        setError(`Error fetching movies: ${err.message}`);
      });
  }, []);

  // Define data for the table
  const data = movies.map((movie) => ({
    key: movie._id,
    title: movie.title,
    actors: movie.actors,
    releaseDate: movie.releaseDate,
    posterUrl: movie.posterUrl,
    duration: movie.duration,
    description: movie.description,
  }));

  // CRUD operations
  const handleAddMovie = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);
    const newMovie = {
      title: values.title,
      actors: values.actors.split(", "),
      releaseDate: values.releaseDate.format("YYYY-MM-DD"),
      posterUrl: values.posterUrl,
      duration: values.duration,
      description: values.description,
    };

    movieService
      .createMovie(newMovie)
      .then((res) => {
        setMovies([...movies, res.data]);
        setConfirmLoading(false);
        notification.success({
          message: "Success",
          description: "Movie added successfully",
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        setError(`Error adding movie: ${err.message}`);
        setConfirmLoading(false);
        notification.error({
          message: "Failed",
          description: "Error adding movie",
        });
      });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    updateForm.resetFields();
  };

  const handleUpdateDetails = (movieId) => {
    const movie = movies.find((movie) => movie._id === movieId);
    setCurrentMovie(movie);
    updateForm.setFieldsValue({
      title: movie.title,
      actors: movie.actors.join(", "),
      releaseDate: moment(movie.releaseDate, "YYYY-MM-DD"),
      posterUrl: movie.posterUrl,
      duration: movie.duration,
      description: movie.description,
    });
    showDrawer();
  };

  const handleUpdateFormSubmit = (values) => {
    const updatedMovie = {
      title: values.title,
      actors: values.actors.split(", "),
      releaseDate: values.releaseDate.format("YYYY-MM-DD"),
      posterUrl: values.posterUrl,
      duration: values.duration,
      description: values.description,
    };

    movieService
      .updateMovie(currentMovie._id, updatedMovie)
      .then((res) => {
        setMovies(
          movies.map((movie) =>
            movie._id === currentMovie._id ? res.data : movie
          )
        );
        notification.success({
          message: "Success",
          description: "Movie updated successfully",
        });
        onClose();
      })
      .catch((err) => {
        setError(`Error updating movie: ${err.message}`);
        notification.error({
          message: "Failed",
          description: "Error updating movie",
        });
      });
  };

  // Delete by ID
  const handleDelete = (movieId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this movie?",
      onOk: () => {
        movieService
          .deleteMovie(movieId)
          .then(() => {
            setMovies(movies.filter((movie) => movie._id !== movieId));
            notification.success({
              message: "Success",
              description: "Movie deleted successfully",
            });
          })
          .catch((err) => {
            setError(`Error deleting movie: ${err.message}`);
            notification.error({
              message: "Failed",
              description: "Error deleting movie",
            });
          });
      },
      onCancel: () => {
        setIsModalVisible(false);
      },
    });
  };

  // Delete Many
  const handleConfirmedDeleteMany = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete the selected movies?",
      onOk: () => {
        movieService
          .deleteAllMovies(selectedRowKeys)
          .then(() => {
            const updatedMovies = movies.filter(
              (movie) => !selectedRowKeys.includes(movie._id)
            );
            setMovies(updatedMovies);
            notification.success({
              message: "Success",
              description: "Selected movies deleted successfully",
            });
            setSelectedRowKeys([]);
          })
          .catch((err) => {
            setError(`Error deleting movies: ${err.message}`);
            notification.error({
              message: "Failed",
              description: "Error deleting movies",
            });
          });
      },
      onCancel: () => {
        setIsModalVisible(false);
      },
    });
  };
  
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  // Render Page
  return (
    <>
      <h2>Movie management</h2>
      <div>
        <Button
          onClick={handleAddMovie}
          style={{
            width: "100px",
            height: "100px",
            margin: "10px",
            background: "#a0a0a0",
          }}
          type="primary"
        >
          <PlusOutlined style={{ fontSize: "50px" }} />
        </Button>
      </div>
      <div>
        {hasSelected && (
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <Button
              danger
              type="primary"
              onClick={handleConfirmedDeleteMany}
              disabled={!hasSelected}
            >
              Delete
            </Button>
            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        )}
        <div>
          <TableComponent
            columns={columns}
            dataSource={data}
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
          />
        </div>
      </div>
      {/* Modal for adding new movie */}
      <Modal
        title="Add New Movie"
        open={isModalVisible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleModalClose}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="actors"
            label="Actors (comma separated)"
            rules={[{ required: true, message: "Please input the actors!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="releaseDate"
            label="Release Date"
            rules={[
              { required: true, message: "Please select the release date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="posterUrl"
            label="Poster URL"
            rules={[
              { required: true, message: "Please input the poster URL!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration (minutes)"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber addonAfter="mins" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      {/* Drawer for updating movie details */}
      <Drawer
        title="Update Movie Details"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={updateForm.submit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={updateForm}
          onFinish={handleUpdateFormSubmit}
          layout="vertical"
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="posterUrl"
                label="Poster Url"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="actors"
                label="Actors"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="releaseDate"
                label="Release Date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
