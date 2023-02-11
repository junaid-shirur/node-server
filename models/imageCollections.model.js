const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    user_id: {
        type: String,
        required: true,
        sparse:true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    favourite: {
        type: Boolean,
    },
}, {
    timestamps: true
})

const Images = mongoose.model('images', imageSchema);

module.exports = Images