require("dotenv").config();
const mongoString =
  "mongodb+srv://Kaula1:Andi2405@cluster0.aunlnzt.mongodb.net/test";
const mongoose = require("mongoose");

mongoose
  .connect(mongoString)
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
app.use(bodyParser.json());
require("dotenv").config();
const Model = require("./model/model");
const Model2 = require("./model/modelData.js");

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

app.get("/", (req, res) => {
  res.send("Hello Root!");
});

// query untuk menangkap params dari user
app.get("/hello", (req, res) => {
  console.log({ reqHello: req.query });
  res.send("Hello!");
});

app.post("/login", (req, res) => {
  console.log({ reqFromOutside: req.body });
  // console.log(req.body);
  const username = req.body.username;
  // if(username !== 'Andi'){
  //   res.status(400).send('Login Gagal')
  // }
  res.send("login berhasil!");
});

app.post("/sendData", async (req, res) => {
  console.log({ dataFromFromPostman: req.body });
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/sendData2", async (req, res) => {
  console.log({ dataFromFromPostman: req.body });

  try {
    if (typeof req.body.name == "string" && typeof req.body.age == "number") {
      const data = new Model2({
        name: req.body.name,
        age: req.body.age,
      });
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } else {
      res.status(400).json("erorrr harus dalam bentuk number agenya bos");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/username", (req, res) => {
  console.log({ reqData: req.body });
  res.send("update beerhasil!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
