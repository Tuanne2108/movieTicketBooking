const UserService = require("../Services/UserService");
const JwtService = require("../Services/JwtService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmedPassword } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailChecked = reg.test(email);
    if (!name || !email || !password || !confirmedPassword) {
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
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailChecked = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "Error",
        message: "The input is required",
      });
    } else if (!emailChecked) {
      return res.status(200).json({
        status: "Error",
        message: "The email is invalid",
      });
    }
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
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
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
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
const getRefreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if(!token) {
      return res.status(200).json({
        status: "Error",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getRefreshToken,
};
