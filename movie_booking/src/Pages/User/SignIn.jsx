import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import * as UserService from "../../services/UserService";

export const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignInPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: "Signed in successfully",
      });
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
    }
  }, [isSuccess]);


  const handleSignIn = async () => {
    setIsPending(true);
    try {
      const res = await UserService.signInUser({ email, password });
      setData(res);
      setIsSuccess(true);
      setIsError(false);
    } catch (error) {
      console.error("Error signing in:", error);
      notification.error({
        message: "Error",
        description:
          "Failed to sign in. Please check your credentials and try again.",
      });
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="signIn">
      <div className="wrapper">
        <div className="form-box login">
          <h2>Login</h2>
          <div className="input-box">
            <span>
              <box-icon color="#cc6600" type="solid" name="envelope"></box-icon>
            </span>
            <input
              type="email"
              value={email}
              onChange={handleSignInEmailChange}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleSignInPasswordChange}
            />
            <label>Password</label>
            <span
              className="toggle-password"
              onClick={handleTogglePassword}
              id="visible-toggle"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          <div className="remember-me">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <div className="btn-sign-in">
            <Button type="submit" onClick={handleSignIn} disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </Button>
          </div>
          <div className="login-register">
            <span>Do not have an account?</span>
            <a href="/sign-up" className="register-link">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
