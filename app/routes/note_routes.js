
module.exports = function (app, db) {

    const User = require('../models/user.model');
    const Note = require('../models/note.model');
    const Init = require('../authenticate/init');
    const passport       = require('passport');

    const mongoose       = require('mongoose');


    app.use(require('express-session')({
        key: 'session',
        secret: 'SUPER SECRET SECRET',
        store: require('mongoose-session')(mongoose)
    }));


    app.use(passport.initialize());
    app.use(passport.session());



    app.post('/registration', (req, res) => {
        var user = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });
        var note = new Note({
            username: req.body.username
        });

        user.save(function (err) {
            if (err) return console.log(err);
            console.log("Сохранен объект", user);
        });
        note.save(function (err) {
            if (err) return console.log(err);
            console.log("Сохранён объект", note);

        });

        res.send('Registration complited');
    })

    // app.post('/login', (req, res) => {
        // console.log(req.body);
        //
        // User.findOne({username: req.body.username}, function (err, obj) {
        //     console.log(obj);
        //     if (obj !== null) {
        //         if (req.body.password === obj.password) {
        //             res.send('password correct');
        //             //res.redirect('./login/:id');
        //
        //         } else {
        //             res.send('password incorrect');
        //         }
        //     } else {
        //         res.send('login not found');
        //     }
        // })
    //
    // })


    app.post('/login',
        passport.authenticate('local'),
        (req, res) =>{
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            console.log(req.user)
            res.send('/users/' + req.user);
        });

    app.get('/todo',authenticationMiddleware(), (req, res) => {
        console.log(req.user);

        Note.findOne({username: req.user.username}, function (err, obj) {
            console.log('asdasd ' + obj.note);
        });
        res.send('arrayOfNotes');
    })

    function authenticationMiddleware () {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next()
            }
            res.redirect('/todo')
        }
    }

    app.get('/login/:id' ,(req,res) => {
        Note.findOne({username: req.params.id}, function (err, obj) {
            if (obj !== null) {
                console.log(obj);
            } else {
                console.log('boroda');
            }
        })
        res.send(req.params.id);


    })

};


