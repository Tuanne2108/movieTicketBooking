const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  return access_token;
};
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );
  return refresh_token;
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "Error",
            message: "Unauthenticated",
          });
        }
        const { payload } = user;
        const access_token = await generalAccessToken({
          id: payload.id,
          isAdmin: payload.isAdmin,
        });
        resolve({
          status: "Success",
          message: "Successfully",
          access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwtService,
};
