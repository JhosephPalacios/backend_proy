// Importar el framework Express y el objeto Router
const express = require('express');
const ruta = express.Router();

// Importar los modelos de la base de datos desde '../db/models/index.js'
const db = require('../db/models/index.js');

// Rutas para obtener datos de personas, libros y reservas
ruta.get('/personas', async (req, res) => res.json(await db.persona.findAll()));
ruta.get('/libros', async (req, res) => res.json(await db.libro.findAll()));
ruta.get('/reservas', async (req, res) => res.json(await db.reserva.findAll()));

// Función para obtener una persona con sus relaciones
const getPersonaWithRelationship = async (id, includeModel) => {
    let entity = await db.persona.findByPk(id, {
        include: [{
            model: includeModel,
            through: 'reservas', // Relación a través de la tabla 'reservas'
            as: 'reservacion',
            include: [] // No se incluyen más relaciones en este nivel
        }]
    });

    if (entity) {
        // Imprimir información de las reservaciones de la persona
        entity.reservacion.forEach(p => console.log(p.id, p.titulo || p.nombres, p.fecha_inicio, " - ", p.fecha_final));
    }
    return entity;
};

// Rutas para obtener relaciones entre persona y libro
ruta.get('/persona_a_libro', async (req, res) => res.status(200).json(await getPersonaWithRelationship(3, db.libro)));
ruta.get('/libro_a_persona', async (req, res) => res.status(200).json(await getPersonaWithRelationship(2, db.persona)));

// Rutas para obtener relaciones entre persona y reserva
ruta.get('/persona_a_reserva', async (req, res) => res.status(200).json(await getPersonaWithRelationship(2, 'reservante')));

// Ruta para obtener información de una reserva con la persona que la reservó
ruta.get('/reserva_a_persona', async (req, res) => {
    let reserva = await db.reserva.findByPk(2, {
        include: ['reservante'] // Incluir información del reservante en la respuesta
    });

    if (reserva) {
        let p = reserva.reservante;
        console.log(p.id, " - ", p.nombres);
    }
    res.status(200).json(reserva);
});

// Función para obtener una entidad con sus relaciones
const getEntityWithRelationship = async (id, includeModel) => {
    let entity = await includeModel.findByPk(id, {
        include: ['reservado'] // Incluir información de lo reservado en la entidad
    });

    if (entity) {
        // Imprimir información de las reservas relacionadas con la entidad
        entity.reservado.forEach(p => console.log(p.fecha_inicio, " - ", p.fecha_final));
    }
    return entity;
};

// Rutas para obtener relaciones entre libro y reserva
ruta.get('/libro_a_reserva', async (req, res) => res.status(200).json(await getEntityWithRelationship(2, db.libro)));
ruta.get('/reserva_a_libro', async (req, res) => res.status(200).json(await getEntityWithRelationship(2, db.reserva)));

// Ruta para insertar un nuevo libro en la base de datos
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

// Exportar la ruta para su uso en otras partes de la aplicación
module.exports = ruta;
