const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    admin: boolean
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
