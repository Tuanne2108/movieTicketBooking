const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = newUser;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser) {
        reject({
          status: "Error",
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      if (createdUser) {
        resolve({
          status: "Success",
          message: "User created successfully",
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({ email: email });
      if (!checkUser) {
        reject({
          status: "Error",
          message: "The user does not exist",
        });
      }
      const comparePassword = await bcrypt.compare(
        password,
        checkUser.password
      );
      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      if (!comparePassword) {
        reject({
          status: "Error",
          message: "The email or password is incorrect",
        });
      } else {
        resolve({
          status: "Success",
          message: "Log in successfully",
          access_token,
          refresh_token,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (!checkUser) {
        reject({
          status: "Error",
          message: "The user does not exist",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "User deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      resolve({
        status: "Success",
        message: "User fetched successfully",
        data: user,
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
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
