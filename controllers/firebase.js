const firebaseService = require('../services/firebase');
const Firebase = require('../models/firebase');

const saveToken = async (req, res) => {

    try {

        await firebaseService.saveToken(req.body.username, req.body.token);
    }
    catch (err) {

    }

    res.json({});
};

const deleteToken = async (req, res) => {

    try {
        if (!req || !req.body || !req.body.username) {
            return res.status(400).json({ errors: ['illegal request'] });
        }
        const name = req.body.username
        if (!name) {
            return res.status(404).json({ errors: ['username not found'] });
        }
        try {
            await firebaseService.deleteFirebase(name)
            return res.status(200).json({});
        } catch (errr) {
            console.log('errr: ', errr);
        }
    }
    catch (err) {

    }

    res.json({});
};
module.exports = { saveToken, deleteToken };