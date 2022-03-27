require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const loginPage = require("./api/loginPage");
app.use("/api/loginPage", loginPage);

module.exports = app;
