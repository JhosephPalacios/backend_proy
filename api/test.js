const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.get('/personas', async (req, res) => res.json(await db.persona.findAll()));

ruta.get('/libros', async (req, res) => res.json(await db.libro.findAll()));

ruta.get('/reservas', async (req, res) => res.json(await db.reserva.findAll()));

const getPersonaWithRelationship = async (id, includeModel) => {
    let entity = await db.persona.findByPk(id, {
        include: [{
            model: includeModel,
            through: 'reservas',
            as: 'reservacion',
            include: []
        }]
    });

    if (entity) {
        entity.reservacion.forEach(p => console.log(p.id, p.titulo || p.nombres, p.fecha_inicio, " - ", p.fecha_final));
    }
    return entity;
};

ruta.get('/persona_a_libro', async (req, res) => res.status(200).json(await getPersonaWithRelationship(3, db.libro)));

ruta.get('/libro_a_persona', async (req, res) => res.status(200).json(await getPersonaWithRelationship(2, db.persona)));

ruta.get('/persona_a_reserva', async (req, res) => res.status(200).json(await getPersonaWithRelationship(2, 'reservante')));

ruta.get('/reserva_a_persona', async (req, res) => {
    let reserva = await db.reserva.findByPk(2, {
        include: ['reservante']
    });
    if (reserva) {
        let p = reserva.reservante;
        console.log(p.id, " - ", p.nombres);
    }
    res.status(200).json(reserva);
});

const getEntityWithRelationship = async (id, includeModel) => {
    let entity = await includeModel.findByPk(id, {
        include: ['reservado']
    });

    if (entity) {
        entity.reservado.forEach(p => console.log(p.fecha_inicio, " - ", p.fecha_final));
    }
    return entity;
};

ruta.get('/libro_a_reserva', async (req, res) => res.status(200).json(await getEntityWithRelationship(2, db.libro)));

ruta.get('/reserva_a_libro', async (req, res) => res.status(200).json(await getEntityWithRelationship(2, db.reserva)));

ruta.post('/grabar', async (req, res) => res.status(200).json(await db.libro.create({
    titulo: "Maravillas",
    autor: "grupo5",
    isbn: "123456789",
    editorial: "Peru",
    topicos: "terror",
    tipo: "miedo",
    descripcion: "descripcion del libro",
    imagen: "http://dummyimage.com/128x128.png/5fa2dd/ffffff",
    contador: 0
})));

module.exports = ruta;