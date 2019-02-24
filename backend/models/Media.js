const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define collection and Schema

let Media = new Schema({
    media_name: {
        type: String, trim: true
    },
    media_format: {
        type: String, trim: true
    },
    media_location: {
        type: String, trim: true
    }
}, {
    collection: 'media'
});

module.exports = mongoose.model('Media', Media);