const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String,required: true,unique: true},
    token: String,
    otpExpiry: Date
});

const User = mongoose.model("ecom-User", userSchema);

module.exports = User;