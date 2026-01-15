const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors=require('cors');
const connectToDb=require('./db/db');
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

connectToDb();

module.exports = app;
