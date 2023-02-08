const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
    },
    year: {
        type: String, 
    },
    imdbID: {
        type: String,
    },
    type: {
        type: String,
    },
    poster: {
        type: String,
    },
    
}, {
    timestamps: true
})


const Movies = mongoose.model('movies', MovieSchema);

module.exports = Movies