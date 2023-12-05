const express = require('express')
const ruta = express.Router()
const db = require('../db/models/index.js')

ruta.get('/all', async (req,res) => {
    let rpta = await db.persona.findAll( {} )
    res.json(rpta)
})
  
ruta.post('/registrar', async (req, res) => {
    let obj = req.body;

    // Verificar si ya existe un usuario con el mismo correo
    const usuarioExistente = await db.persona.findOne({
        where: {
            correo: obj.correo
        }
    });

    if (usuarioExistente) {
        console.log("El usuario ya existe");
        return res.status(409).json({ error: "El usuario ya existe" });
    }

    try {
        // Crear el nuevo usuario si no existe
        let rpta = await db.persona.create(obj);
        res.status(200).json(rpta);
    } catch (error) {
        console.error("Error al registrar el usuario en la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor al registrar el usuario", mensaje: error.message });
    }
});


module.exports = ruta