const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Firebase = new Schema({
    token: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true

    },
});
module.exports = mongoose.model('firebase', Firebase);