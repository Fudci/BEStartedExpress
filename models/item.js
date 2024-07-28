const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photoProduct: [
        {
          fileName: String,
          filePath: String, // Store file path or URL
          // You can add more fields as needed, like file size, file type, etc.
        },
      ],
});

module.exports = mongoose.model('Item', itemSchema);
