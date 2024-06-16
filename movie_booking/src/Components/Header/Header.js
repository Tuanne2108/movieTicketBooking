import React, { useEffect, useState } from "react";
import CNEMA from "../Assets/CNEMA.png";
import { useNavigate } from "react-router-dom";
import { Menu, Dropdown, Button, Input  } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined  } from "@ant-design/icons";
import "./styleHeader.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
    const handleSearch = (value) => {
        if (value.trim() !== "") {
            navigate(`/search?q=${value.trim()}`);
        }
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
                    <img src={CNEMA} alt="CNEMA Logo" onClick={handleClickLogo} />
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
                <div className="nav-search">
                    <Input
                        placeholder="Search movies"
                        prefix={<SearchOutlined />}
                        onPressEnter={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="nav-login-button">
                    {isAuthenticated ? (
                        <Dropdown overlay={menu}>
                            <Button
                                icon={<UserOutlined />}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "#333",
                                    border: "none",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                }}
                                className="ant-dropdown-link"
                            >
                                <span>Account</span> <DownOutlined />
                            </Button>
                        </Dropdown>
                    ) : (
                        <div className="loginNav">
                            <FontAwesomeIcon icon={faUser} />
                            <a href="/sign-in" className="login-link">Login</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
