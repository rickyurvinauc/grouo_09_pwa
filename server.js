const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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