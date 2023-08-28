const mongoose = require('mongoose');  // here we can't use import outside a module
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user',UserSchema)
module.exports = User;