const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');

// require
const test = require('./api/test')
const personas = require('./api/personas')
const libros = require('./api/libros')
const reservas = require('./api/reservas')
// -----

const app = express()
const port = 3080

//Esta es la parte del Middleware
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json({limit: '50mb'}));

// use
app.use('/api/test',test)
app.use('/api/personas',personas)
app.use('/api/libros',libros)
app.use('/api/reservas',reservas)
//-----

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
    console.log(`Server escuchando en el port::${port}`);
});