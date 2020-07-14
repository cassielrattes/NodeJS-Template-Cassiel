require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const Enum = require("./enum");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: Enum.pwdSecret,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(morgan("combined"));
app.use(cookieParser());

app.use("/users", require("../routes/users"));

module.exports = app;
