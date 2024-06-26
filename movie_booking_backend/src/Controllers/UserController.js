const UserService = require("../Services/UserService");
const { refreshTokenJwtService } = require("../Services/JwtService");

const createUser = async (req, res) => {
  try {
    const { email, password, confirmedPassword } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailChecked = reg.test(email);
    console.log('emailChecked', email)
    console.log('password', password)
    console.log('confirmedPassword', confirmedPassword)
    if (!email || !password || !confirmedPassword) {
      return res.status(200).json({
        status: "Error",
        message: "The input is required",
      });
    } else if (!emailChecked) {
      return res.status(200).json({
        status: "Error",
        message: "The email is invalid",
      });
    } else if (password !== confirmedPassword) {
      return res.status(200).json({
        status: "Error",
        message: "The passwords do not match",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isCheckedMail = mailformat.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckedMail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is invalid",
      });
    }
    const response = await UserService.logInUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
    });
    return res.status(200).json(newResponse);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const logOutUser = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await UserService.getUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "Error",
        message: "The token is required",
      });
    }
    const response = await refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};


module.exports = {
  createUser,
  updateUser,
  getUser,
  logInUser,
  getAllUsers,
  refreshToken,
  logOutUser,
};
