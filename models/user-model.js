const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    socialId: String,
    username: String,
    email: String,
    provider: String,
    picURL: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;