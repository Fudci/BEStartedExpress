const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

//arti "Save itu adalah tempat folder di mongo db"
module.exports = mongoose.model('Save', dataSchema)