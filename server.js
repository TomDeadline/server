const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const mongoose = require('mongoose');

const port = 8000;
app.use(bodyParser());
require('./app/routes')(app, {});


var userSchema = mongoose.Schema({
    email: String,
    login: String,
    password: String,
    username: String
});


mongoose.connect('mongodb://localhost/todo', function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});


var User = mongoose.model('User', userSchema);
var user = new User({
    email: "blabla",
    login: "Tom",
    password: "user",
    username: "Tom"
});

user.save(function (err) {
    mongoose.disconnect();

    if(err) return console.log(err);
    console.log("Сохранен объект", user);
});


app.listen(port, () => {
    console.log('We are live on ' + port);
});





