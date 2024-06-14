const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const createUser = async (newUser) => {
  const { email, password } = newUser;
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
    });
    if (createdUser) {
      return {
        status: "Success",
        message: "User created successfully",
        data: createdUser,
      };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw {
      status: "Error",
      message: error.message || "An error occurred while creating the user",
    };
  }
};
let logInUser = (userLoggedIn) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLoggedIn;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null)
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "Password or username is incorrect!",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
          refresh_token,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const logOutUser = async (req, res) => {
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

let updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
      try {
          const checkUser = await User.findOne({
              _id: id,
          });
          if (checkUser === null)
              resolve({
                  status: "OK",
                  message: "The user is not defined",
              });
          const updatedUser = await User.findByIdAndUpdate(id, data, {
              new: true,
          });
          resolve({
              status: "OK",
              message: "SUCCESS",
              data: updatedUser,
          });
      } catch (error) {
          reject(error);
      }
  });
};
const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();
      resolve({
        status: "Success",
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  logInUser,
  updateUser,
  getAllUsers,
  logOutUser,
};
