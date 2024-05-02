const express = require('express');
const path = require('path');
const app = express();

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Define una ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define una ruta para la página 'new_event'
app.get('/new_event', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new_event.html'));
});

// Configura Express para que escuche en el puerto 8080
app.listen(3000, () => console.log('Server listening on port 8080'));