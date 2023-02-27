const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },createdAt:{
        type:Date
    }
})

//arti "Save itu adalah tempat folder di mongo db"
module.exports = mongoose.model('Save', dataSchema)