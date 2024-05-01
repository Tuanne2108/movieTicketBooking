const MovieRouter = require("../Routes/MovieRouter");

const routes = (app) => {
  app.use("/api/movie", MovieRouter);
};

module.exports = routes;
