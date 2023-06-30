const admin = require('firebase-admin');

const serviceAccount = require('./pitputitandroid-firebase.json'); // Replace with the path to your Firebase service account key JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
