const User = require("../Models/User");
const bcrypt = require("bcrypt");
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
      if (!comparePassword) {
        reject({
          status: "Error",
          message: "The email or password is incorrect",
        });
      } else {
        resolve({
          status: "Success",
          message: "Log in successfully",
          data: checkUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createUser,
  loginUser,
};
