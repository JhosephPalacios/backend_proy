const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.get('/listar', async (req, res) => {
  try {
    const reservas = await db.reserva.findAll({
      include: [
        {
          model: db.persona,
          attributes: ['id', 'nombres', 'apellidos', 'correo'],
        },
        {
          model: db.libro,
          attributes: ['id', 'titulo', 'autor', 'portada'],
        },
      ],
    });

    return res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = ruta;
