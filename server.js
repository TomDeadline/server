/*const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const mongoose = require('mongoose');

const port = 8000;
app.use(bodyParser());
require('./app/routes')(app, {});


// const db = require('./config/db');
// console.log(db);


mongoose.connect('mongodb:localhost/todo', function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

// const User = require('./app/models/user.model');

// var user = new User({
//     email: "blabla",
//     login: "Tom",
//     password: "user",
//     username: "Tom"
// });

// user.save(function (err) {
//     mongoose.disconnect();
//
//     if(err) return console.log(err);
//     console.log("Сохранен объект", user);
// });


app.listen(port, () => {
    console.log('We are live on ' + port);
});

*/

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const mongoose       = require('mongoose');
const passport       = require('passport');
var cors             = require('cors')
const mongoDB = 'mongodb://localhost/todo';
const port = 8000;

app.use(bodyParser());
app.use(cors());
require('./app/routes')(app, {});


mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});







app.listen(port, () => {
    console.log('We are live on ' + port);
});
