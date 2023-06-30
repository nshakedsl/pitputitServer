const Chat = require('../models/chat');
const Message = require('../models/message');
const serviceMessage = require('./message');
const { getUserByName } = require('./user');
const userService = require('./user');

const getMessagesOfChat = async (id) => {
    const chat = await getChatById(id);
    if (!chat || !chat.messages) return null;
    return chat.messages;
};

const getLastMessage = async (id) => {
    const messages = await getMessagesOfChat(id);
    if (!messages || messages.length === 0) {
        return null;
    }
    const lastMsg = await Message.findOne({ _id: messages[messages.length - 1]._id });
    const lastMsgJson = {};
    lastMsgJson["id"] = lastMsg._id;
    lastMsgJson["created"] = lastMsg.created;
    lastMsgJson["content"] = lastMsg.content;
    return lastMsgJson;
}

const addMessage = async (id, sender, content) => {
    const chat = await getChatById(id);
    if (!chat || !chat.messages) return null;
    const message = await serviceMessage.createMessage(sender, content);
    await Chat.findOneAndUpdate(
        { _id: id },
        { $push: { messages: message } },
        { new: true }
    ).exec();
    return message;
};
const createChat = async (sender, reciever) => {
    let messages = [];
    const user1 = await getUserByName(sender);
    const user2 = await getUserByName(reciever);
    if (!user1 || !user2) {
        return null;
    }
    const users = [user1, user2];
    const chat = await Chat.create({ messages, users });
    return [chat, user1];
};
const getChatById = async (id) => {
    try {
        return await Chat.findById(id);

    } catch (err) {
        return null;
    }

};
const getChats = async () => { return await Chat.find({}); };


const deleteChatById = async (_id) => {
    try {
        const chat = await getChatById(_id);
        if (!chat) return null;
        await Promise.all(chat.messages.map(async (message) => {
            return await serviceMessage.deleteMessage(message._id);
        }
        ))
        await Chat.deleteOne({ _id }).exec();
        return chat;
    } catch (err) {
    }
};

const jsonifyForGetChat = async (chat) => {
    if (!chat) {
        return {};
    }
    const result = {};
    const users = [];
    result["id"] = chat._id;
    await Promise.all(chat.users.map(async (ref) => {
        let temp = await userService.jsonifyUser(ref);
        users.push(temp);
    }
    ))
    result["users"] = users;
    const messages = [];
    await Promise.all(chat.messages.map(async (ref) => {
        let temp = await serviceMessage.jsonifyMessage(ref);
        messages.unshift(temp);
    }
    ))

    result["messages"] = messages;

    return result;
};

const jsonifyForGetChatMessages = async (chat) => {
    if (!chat) {
        return {};
    }
    const messages = [];
    await Promise.all(chat.map(async (ref) => {
        let temp = await serviceMessage.jsonifyMessageForMessageOnly(ref);
        messages.unshift(temp);
    }
    ))
    const newMessages = await messages.sort(function (a, b) {
        let dateA = new Date(a.created);
        let dateB = new Date(b.created)
        if (dateA > dateB) {
            return -1;
        } else if (dateA < dateB) {
            return 1;
        }
        return 0;
    })
    return newMessages;
};

const amInChat = (id, chat) => {
    if (chat.users[0].equals(id)) {
        return true;
    }
    if (chat.users[1].equals(id)) {
        return true;
    }
    return false;
};

module.exports = {
    getMessagesOfChat, getChatById, getChats, deleteChatById, createChat, addMessage,
    amInChat, getLastMessage, jsonifyForGetChat, jsonifyForGetChatMessages
}
