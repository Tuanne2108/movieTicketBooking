const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./Routes");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const viewEngine = require("./Config/viewEngine");
const cookieParser = require('cookie-parser')
const port = process.env.PORT

app.use(express.json());
app.use(cors());

app.use(morgan("combined"));
app.use(cookieParser())
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
routes(app);

//Database connection
mongoose
  .connect(
    `${process.env.DB_URL}`
  )
  .then(() => {
    console.log("Connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//API creation

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error", error);
  }
});
