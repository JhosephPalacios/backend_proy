const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.post('/validar', async (req, res) => {
    try {
      const { usuario, contrasena } = req.body;
  
      // Buscar en la base de datos si existe un usuario con el correo y contraseña proporcionados
      const usuarioEncontrado = await db.persona.findOne({
        where: {
          correo: usuario,
          contrasenha: contrasena,
        },
      });
  
      if (usuarioEncontrado) {
        // Loguea los datos del usuario en la consola del servidor
        console.log("Usuario Logueado:", usuarioEncontrado.toJSON());
  
        // Verificar si el usuario es administrador
        const esAdmin = usuarioEncontrado.tipo === 'admin';
  
        // Redirigir a la página correspondiente
        if (esAdmin) {
          return res.status(200).json({ tipo: 'admin', correo: usuario });
        } else {
          return res.status(200).json({ tipo: 'alumno', correo: usuario });
        }
      } else {
        // No se encontró el usuario en la base de datos
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error("Error al validar el inicio de sesión:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  ruta.get('/obtener-administrador', async (req, res) => {
    try {
      const { correo } = req.query;
  
      // Buscar en la base de datos si existe un administrador con el correo proporcionado
      const adminEncontrado = await db.administrador.findOne({
        where: {
          correo: correo,
        },
      });
  
      if (adminEncontrado) {
        // Devolver los datos del administrador en formato JSON
        return res.status(200).json(adminEncontrado.toJSON());
      } else {
        // No se encontró el administrador en la base de datos
        return res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (error) {
      console.error("Error al obtener datos del administrador:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  
  module.exports = ruta;