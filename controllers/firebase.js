const firebaseService = require('../services/firebase');

const saveToken = async (req, res) => {

    try {

        await firebaseService.saveToken(req.body.username, req.body.token);
    }
    catch (err) {

    }

    res.json({});
};
module.exports = { saveToken };