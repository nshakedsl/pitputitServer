const userPassName = require('../models/userPassName');
const userUtils = require('./user');
const createUserPassName = async (senderName, password, displayName, profilePic) => {
    const user = await userUtils.createUser(senderName, displayName, profilePic);
    if (!user) {
        return null;
    }
    userPassName.create({ password, user });
    return true;
};

module.exports = { createUserPassName }