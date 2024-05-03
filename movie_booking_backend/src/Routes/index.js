const userRouter = require("./UserRouter");
const movieRouter = require("./MovieRouter");
const bookingRouter = require("./BookingRouter");
const homeRouter = require("./HomeRouter")
const routes = (app) => {
  app.use("/api/movie", movieRouter);
  app.use("/api/user", userRouter);
  app.use("/api/booking", bookingRouter);
  app.use("/", homeRouter);
};

module.exports = routes;
