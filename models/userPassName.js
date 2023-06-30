const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserPassName = new Schema({
    password: {
        type: String,
        nullable: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('userPassName', UserPassName);