const { addMessage, getMessage } = require("../controllers/message.controller");
const messageRouter = require("express").Router();

messageRouter.post('/', addMessage);

messageRouter.get('/', getMessage);

module.exports = messageRouter;
