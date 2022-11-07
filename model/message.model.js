const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
    staffId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
    },
}, {
    timestamps: true,
    collection: "messages",
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;