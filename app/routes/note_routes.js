
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

//     app.post('/todo', (req, res) => {
//         console.log(req.user);
//         console.log(req.body.username);
//
//         Note.findOne({username: req.body.username}, function (err, obj) {
//         if (obj !== null) {
//             console.log(obj);
//         } else {
//             console.log('boroda');
//         }
//     })
//
//     res.send('Save complited');
// })


    app.post('/login',
        passport.authenticate('local'),
        (req, res) =>{
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.

            // console.log(req.user);
            //res.redirect('/todo');
        res.send('login');
        });

    app.get('/todo',authenticationMiddleware(), (req, res) => {
        // console.log( req.user)
        Note.findOne({username: req.user.username}, function (err, obj) {
            // console.log(req.user.username + " have a " + obj.note);
        });
        res.send('arrayOfNotes');
    })

    function authenticationMiddleware () {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next()
            }
            res.redirect('/')
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

    app.post('/addnote',authenticationMiddleware(), (req,res) => {
        Note.findOne({username: req.user.username}, function (err, obj) {
            obj.note.text.push(req.body.text);
            obj.note.isThrough.push(req.body.isThrough);
            obj.save(function (err) {
                if (err) return console.log(err);
                console.log("Сохранён объект", obj);
                res.send(obj.note);
            })
        })
    })


    app.post('/editnote',authenticationMiddleware(), (req,res) => {
        Note.findOne({username: req.user.username}, function (err, obj) {
            obj.note.text.splice(req.body.itemNumber,1,req.body.text);
            obj.save(function (err) {
                if (err) return console.log(err);
                console.log("Сохранён объект", obj);
                res.send(obj.note);
            })
        })
    })


    app.post('/turncheck',authenticationMiddleware(), (req,res) => {
        Note.findOne({username: req.user.username}, function (err, obj) {
            obj.note.isThrough.splice(req.body.itemNumber,1, !obj.note.isThrough[req.body.itemNumber]);
            obj.save(function (err) {
                if (err) return console.log(err);
                console.log("Сохранён объект", obj);
                res.send(obj.note);
            })
        })
    })
    app.post('/deletenote',authenticationMiddleware(), (req,res) => {
        Note.findOne({username: req.user.username}, function (err, obj) {
            obj.note.text.splice(req.body.itemNumber,1);
            obj.note.isThrough.splice(req.body.itemNumber,1);
            obj.save(function (err) {
                if (err) return console.log(err);
                console.log("Сохранён объект", obj);
                res.send(obj.note);
            })
        })
    })



    app.get('/logout', function(req, res){
        req.logout();
        // res.redirect('/');
        res.send('sdfsfgsg')
    });
};


