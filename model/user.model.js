const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    NIC: {
        type: String,
    },
    staffId: {
        type: String,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
    },
    password: {
        type: String,
    }
}, {
    timestamps: true,
    collection: "users",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;