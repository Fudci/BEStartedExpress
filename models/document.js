const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // Field to store file data
  files: [
    {
      fileName: String,
      filePath: String, // Store file path or URL
      // You can add more fields as needed, like file size, file type, etc.
    },
  ],
});

module.exports = mongoose.model("Document", UserSchema);
