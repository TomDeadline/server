
module.exports = function (app, db) {

    var User = require('../models/user.model');
    var Note = require('../models/note.model');

    app.post('/registration', (req, res) => {
        var user = new User({
            email: req.body.email,
            login: req.body.login,
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


    app.post('/login', (req, res) => {
        console.log(req.body);

        User.findOne({username: req.body.username}, function (err, obj) {
            //console.log(obj);
            if (obj=== null && req.body.password === obj.password) {
                res.send('pass corrected');

            } else {
                res.send('pass incorrected');
            }
        })
        res.send('boroda');
    })


    app.post('/todo', (req, res) => {
        console.log(req.body);

        Note.findOne({username: req.body.username}, function (err, obj) {
            console.log(obj.note);
        });
        res.send('arrayOfNotes');
    })

};


