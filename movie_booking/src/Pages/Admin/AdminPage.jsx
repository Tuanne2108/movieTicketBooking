import React, { useState } from "react";
import { UserOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { UserManage } from "./UserManage";
import { MovieManage } from "./MovieManage";
import { TheaterManage } from "./TheaterManage";
import { ShowManage } from "./ShowManage";
import { BookingManage } from "./BookingManage";
import { SeatManage } from "./SeatManage";

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "User",
  },
  {
    type: "divider",
  },
  {
    key: "2",
    icon: <AppstoreAddOutlined />,
    label: "Movie",
  },
  {
    type: "divider",
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "Theater",
  },
  {
    type: "divider",
  },
  {
    key: "4",
    icon: <AppstoreAddOutlined />,
    label: "Show",
  },
  {
    type: "divider",
  },
  {
    key: "5",
    icon: <UserOutlined />,
    label: "Booking",
  },
  {
    type: "divider",
  },
  {
    key: "6",
    icon: <AppstoreAddOutlined />,
    label: "Seat",
  },
];
const renderPage = (keySelected) => {
  switch (keySelected) {
    case "1":
      return <UserManage />;
    case "2":
      return <MovieManage />;
    case "3":
      return <TheaterManage />;
    case "4":
      return <ShowManage />;
    case "5":
      return <BookingManage />;
    case "6":
      return <SeatManage />;
    default:
      return <div></div>;
  }
};
export const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");
  const optionClicked = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <div style={{ display: "flex" }}>
      <Menu
        onClick={optionClicked}
        style={{
          fontSize: "20px",
          width: 300,
          height: "100vh",
        }}
        theme="dark"
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <div style={{ padding: "20px" }}>{renderPage(keySelected)}</div>
    </div>
  );
};
