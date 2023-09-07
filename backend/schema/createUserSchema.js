const mongoose = require("mongoose");
const { Schema } = mongoose;

const createUserModel = new Schema({
    name: { 
        type: String 
    },
    email: { type: String, unique: true },
    __isVerifiedEmail: {
        type: Boolean,
        default: false,
    },
    __password: { type: String, required: true  },
    neech: {
        type: String,
        required: true,
    },
    __access_token: {
        type: String,
        required: true
    },
    __email_access_token: {
        type: String,
        required: true
    }
});

const model = mongoose.model("createuser", createUserModel);

module.exports = model;
