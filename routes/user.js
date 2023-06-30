const userController = require('../controllers/user');
const userPassNameController = require('../controllers/userPassName');
const auth = require('../middleware/Auth');

const express = require('express');
var router = express.Router();

router.route('/:username')
    .get(auth, userController.getUser);
router.route('/')
    .post(userPassNameController.registerUser);

module.exports = router;