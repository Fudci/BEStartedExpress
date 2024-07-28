const mongoose = require("mongoose");

const User = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: [
    {
      fileName: String,
      filePath: String, // Store file path or URL
      // You can add more fields as needed, like file size, file type, etc.
    },
  ],
});

module.exports = mongoose.model("Users", User);
