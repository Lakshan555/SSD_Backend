const Message = require("../model/message.model");


//add new message
exports.addMessage = async (req, res) => {
    const { staffId, message } = req.body;
    try {        
        const newMessage = new Message({staffId, message});
        newMessage.save()
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.getMessage = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
};