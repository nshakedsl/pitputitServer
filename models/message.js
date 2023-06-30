const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;
const Message = new Schema({
    created: {
        type: Date
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        nullable: true
    }
});
module.exports = mongoose.model('message', Message);