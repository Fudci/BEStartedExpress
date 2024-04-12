require("dotenv").config();

const mongoString = process.env.MONGO;

const port = process.env.PORT;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(mongoString)
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));

const UserRoute = require("./routes/userRoutes");
const DocumentRoutes = require("./routes/documentRoutes");

const bodyParser = require("body-parser");


app.use(bodyParser.json());

// buat nangkep json raw
// app.use(express.json())

// buat nangkep url encode
// app.use(express.urlencoded())

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(UserRoute);
app.use(DocumentRoutes);

var multer = require("multer");
const upload = multer({ dest: "uploads/" });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
