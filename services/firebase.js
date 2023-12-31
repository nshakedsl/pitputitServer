const Firebase = require('../models/firebase');



const saveToken = async (username, token) => {
    return await Firebase.create({ username, token });
};


const getToken = async (username) => {
    const user = await Firebase.findOne({ username });
    return user.token;
};
const getFirebaseByName = async (username) => {
    const firebase = await Firebase.findOne({ username });
    return firebase;
};
const deleteFirebase = async (username) => {
    try {
        await Firebase.findOneAndRemove({username });
    } catch (err) {
        console.log('err: !!!!!', err);

    }
};
module.exports = { saveToken, getToken,getFirebaseByName,deleteFirebase }