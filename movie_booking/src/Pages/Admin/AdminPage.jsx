import React, { useState } from "react";
import { UserOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { UserManage } from "./UserManage";
import { MovieManage } from "./MovieManage";
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
];
const renderPage = (keySelected) => {
  switch (keySelected) {
    case "1":
      return <UserManage />;
    case "2":
      return <MovieManage />;
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
