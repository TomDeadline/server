const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    login: String,
    password: String,
    username: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;








