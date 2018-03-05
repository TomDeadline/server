module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        console.log(req.body)
    res.send('Hello')
});

//     app.post('/login', (req, res) => {
//         console.log(req.body)
//     res.send('Hello')
// });
//     app.post('/registration', (req, res) => {
//         console.log(req.body)
//     res.send('Hello')
// });


    app.get('/todo', (req, res) => {
        console.log(req.body)
//     user.find({}, (err, items) => {
//         if (err) {
//             res.send({'error':'An error has occurred'});
//         } else {
//             res.send(item);
// }
// });
    res.send('Hello')
});

//     app.get('/todo/:id', (req, res) => {
//         console.log('sdfsfsdfsdfsdfsff')
//     res.send('Hello')
// });
//
    app.post('/todo', (req, res) => {
        console.log('sdfsfsdfsdfsdfsff')
};