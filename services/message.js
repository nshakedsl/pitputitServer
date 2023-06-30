const Message = require('../models/message');
const User = require('../models/user');
const { jsonifyUser,jsonifyUserAsSender } = require('./user');

const createMessage = async (sender, content) => {
    const created = new Date().getTime();
    try {
        const message = await Message.create({ created, sender, content });
        return message;
    } catch (err) {
        console.log('err: ', err);
    }
};
const getMessageById = async (id) => { return await Message.findById(id); };
const deleteMessage = async (_id) => {
    const message = await getMessageById(_id);
    if (!message) return null;
    await Message.deleteOne({ _id }).exec();
    return message;
};

const jsonifyMessage = async (id) => {
    const msg = await Message.findOne({ _id: id });
    const msgJson = {};
    msgJson["id"] = msg._id;
    msgJson["created"] = msg.created;
    msgJson["sender"] = await jsonifyUser(msg.sender);
    msgJson["content"] = msg.content;
    return msgJson;
}
const jsonifyMessageForMessageOnly = async (id) => {
    const msg = await Message.findOne({ _id: id });
    const msgJson = {};
    msgJson["id"] = msg._id;
    msgJson["created"] = msg.created;
    msgJson["sender"] = await jsonifyUserAsSender(msg.sender);
    msgJson["content"] = msg.content;
    return msgJson;
}
module.exports = { getMessageById, deleteMessage, createMessage, jsonifyMessage, jsonifyMessageForMessageOnly }