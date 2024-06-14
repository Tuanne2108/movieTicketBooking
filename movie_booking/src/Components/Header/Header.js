import React, { useEffect, useState } from "react";
import CNEMA from "../Assets/CNEMA.png";
import { useNavigate } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import "./styleHeader.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminStatus = localStorage.getItem("is_admin") === "true";
    
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
    }
  }, []);

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("is_admin");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  const menu = (
    <Menu>
      {isAdmin && (
        <Menu.Item key="1" onClick={() => navigate("/admin")}>
          System Management
        </Menu.Item>
      )}
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="nav-logo">
          <img src={CNEMA} alt="" onClick={handleClickLogo} />
        </div>
        <div className="nav-menu">
          <ul className="ul-nav-menu">
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Actors</a>
            </li>
            <li>
              <a href="#">More</a>
            </li>
          </ul>
        </div>
        <div className="nav-login-button">
          {isAuthenticated ? (
            <Dropdown overlay={menu}>
             <Button icon={<UserOutlined />} style={{ border: "none", color: "orange", fontSize: "20px" }}>
                <DownOutlined />
              </Button>
            </Dropdown>
          ) : (
            <button>
              <a href="/sign-in">Login</a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
