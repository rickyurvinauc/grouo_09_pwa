const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

console.log(process.env.API_KEY)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

var subscribers = []

var FCM = require('fcm-node');
var serverKey = 'eFa4DixsQfI:APA91bHjKjIz8ZAYQmQtI6gLXULVhZFVZA91Lo7p9teAUb_-6COFd3PQ8dIaojeDexv20CoRBAE-rHR8WlfFC8hs474IoLIXQAiW-_tHPFd-cahckL8yKr7s5TS1zbBMg8iC2SeHtOtl';
var fcm = new FCM(serverKey);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    var message = {
        // for multiple recipients
        registration_ids: subscribers,
        // for single recipient
        // to: subscribers[0],
        collapse_key: 'your_collapse_key',
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
            console.log(err)
        } else {
            console.log("Successfully sent with response: ",
                response);
        }
    });
    res.sendStatus(200)
});

app.get('/new_event', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/new_event.html'));
});

app.get('/event', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/event_page.html'));
});

app.get('/edit-transaction', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/edit_transaction.html'));
});

app.get('/edit-event', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/edit_event.html'));
});

app.listen(8080, () => console.log('Server listening on port 8080'));