const chatsController = require('../controllers/chat');

const express = require('express');
var router = express.Router();

router.route('/')
    .get(chatsController.getChats)
    .post(chatsController.createChat);


router.route('/:id')
    .get(chatsController.getChat)
    .delete(chatsController.deleteChat);

router.route('/:id/Messages')
    .get(chatsController.getChatMessages)
    .post(chatsController.addChatMessage);

module.exports = router;