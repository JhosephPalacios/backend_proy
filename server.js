const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');

// require
const register = require('./api/register')
const login= require('./api/login')
const reserva= require('./api/reserva')
const libros= require('./api/libros')
// -----

const app = express()
const port = 3080

//Esta es la parte del Middleware
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json({limit: '50mb'}));

// use
app.use('/api/register' , register);
app.use('/api/login' , login);
app.use('/api/reserva', reserva);
app.use('/api/libros', libros);
//-----

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
    console.log(`Server escuchando en el port::${port}`);
});