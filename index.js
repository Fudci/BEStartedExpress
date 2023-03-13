require("dotenv").config();
const mongoString =
  "mongodb+srv://Kaula1:Andi2405@cluster0.aunlnzt.mongodb.net/test";
const mongoose = require("mongoose");
mongoose
  .connect(mongoString)
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));
const UserRoute = require('./routes/userRoutes')

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
app.use(bodyParser.json());
require("dotenv").config();

// buat nangkep json raw
// app.use(express.json())

// buat nangkep url encode
// app.use(express.urlencoded())
app.use(upload.array());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(UserRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
