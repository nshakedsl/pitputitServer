const tokenController = require('../controllers/tokens');

const express = require('express');
var router = express.Router();

router.route('/')
    .post(tokenController.login);


module.exports = router;