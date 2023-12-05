
const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js'); // Importa el modelo Sequelize

// Ruta para obtener la lista de las últimas reservas
ruta.get('/ultimasReservas', async (req, res) => {
  try {
    const libros = await Libro.findAll(); // Consulta todos los libros desde la base de datos
    res.json(libros);
  } catch (error) {
    console.error('Error al obtener la lista de las últimas reservas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener la lista de los libros más pedidos
ruta.get('/masPedidos', async (req, res) => {
  try {
    const libros = await Libro.findAll(); // Consulta todos los libros desde la base de datos
    res.json(libros);
  } catch (error) {
    console.error('Error al obtener la lista de los libros más pedidos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = ruta;
