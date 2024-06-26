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
import dayjs from "dayjs";
import { title } from "process";

export const MovieManage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  const renderAction = (movieId) => (
    <div style={{ display: "flex", gap: "15px" }}>
      <EditOutlined
        style={{ fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleUpdateDetails(movieId)}
      />
      <DeleteOutlined
        style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        onClick={() => handleDelete(movieId)}
      />
    </div>
  );

  const columns = [
    { title: "Title", dataIndex: "title" },
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
      title: "Genre",
      dataIndex: "typeOfMovie",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    { title: "Trailer URL", dataIndex: "trailerUrl" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record.key),
    },
  ];

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
      .catch((err) => setError(`Error fetching movies: ${err.message}`));
  }, []);

  const data = movies.map((movie) => ({
    key: movie._id,
    title: movie.title,
    director: movie.director,
    actors: movie.actors,
    releaseDate: movie.releaseDate,
    posterUrl: movie.posterUrl,
    duration: movie.duration,
    typeOfMovie: movie.typeOfMovie,
    country: movie.country,
    description: movie.description,
    trailerUrl: movie.trailerUrl,
  }));

  const handleAddMovie = () => setIsModalVisible(true);
  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setConfirmLoading(true);
    const newMovie = {
      title: values.title,
      actors: values.actors.split(", "),
      director: values.director,
      releaseDate: dayjs(values.releaseDate).format("YYYY-MM-DD"),
      posterUrl: values.posterUrl,
      duration: values.duration,
      typeOfMovie: values.typeOfMovie,
      country: values.country,
      description: values.description,
      trailerUrl: values.trailerUrl,
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

  const showDrawer = () => setOpen(true);
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
      director: movie.director,
      releaseDate: dayjs(movie.releaseDate, "YYYY-MM-DD"),
      posterUrl: movie.posterUrl,
      duration: movie.duration,
      typeOfMovie: movie.typeOfMovie,
      country: movie.country,
      description: movie.description,
      trailerUrl: movie.trailerUrl,
    });
    showDrawer();
  };

  const handleUpdateFormSubmit = (values) => {
    const updatedMovie = {
      title: values.title,
      actors: values.actors.split(", "),
      director: values.director,
      releaseDate: dayjs(values.releaseDate).format("YYYY-MM-DD"),
      posterUrl: values.posterUrl,
      duration: values.duration,
      typeOfMovie: values.typeOfMovie,
      country: values.country,
      description: values.description,
      trailerUrl: values.trailerUrl,
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
      onCancel: () => setIsModalVisible(false),
    });
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddMovie}>
        Add Movie
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="actors"
            label="Actors"
            rules={[{ required: true, message: "Please input the actors!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="director"
            label="Director"
            rules={[{ required: true, message: "Please input the director!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please input the country!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="typeOfMovie"
            label="Type of Movie"
            rules={[
              { required: true, message: "Please input the type of movie!" },
            ]}
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
            label="Duration"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber />
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
          <Form.Item
            name="trailerUrl"
            label="Trailer URL"
            rules={[
              { required: true, message: "Please input the trailer URL!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="Update Movie"
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="actors"
            label="Actors"
            rules={[{ required: true, message: "Please input the actors!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="director"
            label="Director"
            rules={[{ required: true, message: "Please input the director!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please input the country!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="typeOfMovie"
            label="Type of Movie"
            rules={[
              { required: true, message: "Please input the type of movie!" },
            ]}
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
            label="Duration"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber />
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
          <Form.Item
            name="trailerUrl"
            label="Trailer URL"
            rules={[
              { required: true, message: "Please input the trailer URL!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
