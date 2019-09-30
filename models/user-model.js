const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    socialId: String,
    username: String,
    provider: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;