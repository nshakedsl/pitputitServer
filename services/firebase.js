const Firebase = require('../models/firebase');



const saveToken = async (username, token) => {
    return await Firebase.create({ username, token });
};


const getToken = async (username) => {
    const user = await Firebase.findOne({ username });
    return user.token;
};

module.exports = { saveToken, getToken }