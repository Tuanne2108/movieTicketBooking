const UserService = require("../Services/UserService");

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
            message: "The passwords do not match"
        })
    }
    const response = await UserService.createUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
};
