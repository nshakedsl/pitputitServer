const chatService = require('../services/chat');
const userService = require('../services/user');
const JSONIFY = async (chat, me) => {
    if (!chat) {
        return {};
    }
    const result = {};
    const users = [];
    result["id"] = chat._id;
    await Promise.all(chat.users.map(async (ref) => {
        if (!ref.equals(me._id)) {
            let temp = await userService.jsonifyUser(ref);
            users.push(temp);
        }
    }
    ))
    if (users.length !== 0) {
        result["user"] = users[0];
    }
    const lastMsgId = await chatService.getLastMessage(chat);
    if (!lastMsgId || lastMsgId === {}) {
        result["lastMessage"] = null;
    }
    else {
        result["lastMessage"] = lastMsgId;
    }
    return result;
};
const getChats = async (req, res) => {
    if (!req.user || !req.user.username) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    const me = await userService.getUserByName(req.user.username)
    let chats = await chatService.getChats()
    if (chats) {
        chats = chats.filter(element => chatService.amInChat(me._id, element))
    } else {
        chats = []
    }
    jsonArr = [];
    await Promise.all(chats.map(async (ref) => {
        let temp = await JSONIFY(ref, me);
        jsonArr.push(temp);
    }
    ))
    res.json(jsonArr);
};
const addChatMessage = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ errors: ['Bad Request of Chat'] });
    }
    if (!req.body.msg || !req.body.msg === '') {
        return res.status(403).json({ errors: ['illegal msg'] });
    }
    if (!req.user || !req.user.username) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }

    const me = await userService.getUserByName(req.user.username);
    if (!me) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(404).json({ errors: ['Chat not found'] });
    }
    if (!chatService.amInChat(me._id, chat)) {
        return res.status(401).json({ errors: ['Unauthorized Request of Chat'] });
    }
    const sender = me;
    const result = await chatService.addMessage(req.params.id, sender, req.body.msg);
    if (!result) {
        return res.status(404).json({ errors: ['Chat not found'] });
    }
    return res.status(200).json({ id: result._id, created: result.created, content: result.content, sender });
};

const getChat = async (req, res) => {
    if (!req.user || !req.user || !req.user.username) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    const me = await userService.getUserByName(req.user.username);
    if (!me) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    if (!req.params.id) {
        return res.status(400).json({ errors: ['Bad Request of Chat'] });
    }
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(404).json({ errors: ['Chat not found'] });
    }
    if (!chatService.amInChat(me._id, chat)) {
        return res.status(401).json({ errors: ['Unauthorized Request of Chat'] });
    }
    const result = await chatService.jsonifyForGetChat(chat);
    res.json(result);
};
const getChatMessages = async (req, res) => {
    if (!req.user || !req.user || !req.user.username) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    const me = await userService.getUserByName(req.user.username);
    if (!me) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    if (!req.params.id) {
        return res.status(400).json({ errors: ['Bad Request of Chat'] });
    }
    const chat = await chatService.getChatById(req.params.id);
    if (chat) {
        if (!chatService.amInChat(me._id, chat)) {
            return res.status(401).json({ errors: ['Unauthorized Request'] });
        }
        const chatMessages = await chatService.getMessagesOfChat(req.params.id);
        if (!chatMessages) {
            return res.status(404).json({ errors: ['Chat Messages not found'] });
        }
        result = await chatService.jsonifyForGetChatMessages(chatMessages);
        return res.json(result);
    } else {
        return res.status(404).json({ errors: ['Chat not found'] });
    }
};
const deleteChat = async (req, res) => {
    if (!req.user || !req.user.username) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    if (!req.params.id) {
        return res.status(400).json({ errors: ['Bad Request of Chat'] });
    }
    const chat = await chatService.deleteChatById(req.params.id);
    if (!chat) {
        return res.status(404).json({ errors: ['Chat not found'] });
    }

    const me = await userService.getUserByName(req.user.username);
    if (!chatService.amInChat(me._id, chat)) {
        return res.status(401).json({ errors: ['Unauthorized Request'] });
    }
    res.status(200).json({})
};
const createChat = async (req, res) => {
    try {
        if (!req.user || !req.user.username) {
            return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
        }
        if (!req.body.username) {
            return res.status(402).json({ errors: ['username field is mandatory'] });
        }
        if (req.user.username === req.body.username) {
            return res.status(403).json({ errors: ['stop talking to yourself you wierdo'] });
        }
        const retVal = await userService.getUserByName(req.body.username);
        if (!retVal) {
            return res.status(400).json({ errors: ['User does not exists'] });
        }
        const chat = await chatService.createChat(req.body.username, req.user.username);

        if (!chat[0]) {
            return res.status(404).json({ errors: ['error when creating chat'] });
        }
        return res.status(200).json({
            id: chat[0]._id,
            user: chat[1]
        });
    } catch (err) {
        console.log('errrrrrrrrrr: ');


    }

};
module.exports = { addChatMessage, getChatMessages, createChat, getChats, getChat, deleteChat };