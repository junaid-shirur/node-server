const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String || Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema);

module.exports = User