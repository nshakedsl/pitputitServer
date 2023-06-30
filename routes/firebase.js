const firebaseController = require('../controllers/firebase');

const express = require('express');
var router = express.Router();

router.route('/')
    .post(firebaseController.saveToken);



module.exports = router;