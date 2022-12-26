const mongoose = require("mongoose");

const messageschema = new mongoose.Schema({
    sender:{
        type: String,
        required: true
    },
    reciever:{
        type: String,
        required:true
    },
    message:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model("aryanandajay",messageschema);