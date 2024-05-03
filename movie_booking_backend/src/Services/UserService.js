const User = require("../Models/User");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmedPassword } = newUser;
    try {
      const createdUser = await User.create({
        name,
        email,
        password,
        confirmedPassword,
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
module.exports = {
  createUser,
};
