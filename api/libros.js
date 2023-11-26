const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');
const { Op } = require("sequelize");

// Ruta para realizar búsquedas avanzadas de libros con filtros y paginación
ruta.get('/busqueda', async (req, res) => {
    // Extraer parámetros de la consulta
    const { keyword = '', type = '', filters = [], page = '' } = req.query;
    const pageSize = 5;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // Realizar consulta a la base de datos con Sequelize
    const libros = await db.libro.findAll({
        order: [['id', 'ASC']],
        where: {
            // Condición OR: al menos una de las condiciones debe ser verdadera
            [Op.or]: {
                // Condición para el campo 'titulo'
                titulo: { [Op.iLike]: filters.includes('titulo') ? `%${keyword}%` : 'título_default' },
                // Condición para el campo 'autor'
                autor: { [Op.iLike]: filters.includes('autor') ? `%${keyword}%` : 'autor_default' },
                // Condición para el campo 'topicos'
                topicos: { [Op.iLike]: filters.includes('genero') ? `%${keyword}%` : 'género_default' },
                // Condición para el campo 'isbn'
                isbn: { [Op.iLike]: filters.includes('isbn') ? `%${keyword}%` : 'isbn_default' },
            },
            // Condición para el campo 'tipo'
            tipo: { [Op.iLike]: `%${type}%` }
        },
        include: {
            // Incluir información de reservas
            model: db.reserva,
            as: 'reservado',
            attributes: ['id', 'fecha_final'],
            order: [['id', 'DESC']]
        }
    });

    // Procesar los resultados y agregar información adicional
    const currentDate = new Date();
    const response = libros.map(libro => ({
        ...libro.get({ plain: true }),
        disponible: libro.reservado.some(reserva => new Date(reserva.fecha_final) > currentDate)
    })).slice(start, end);

    // Enviar respuesta JSON con la información paginada
    return res.status(200).json({
        page,
        totalPages: Math.ceil(response.length / pageSize),
        pageSize,
        totalItems: response.length,
        items: response
    });
});

// Ruta para obtener información detallada de un libro
ruta.get('/leer', async (req, res) => {
    // Extraer el ID del libro de la consulta
    const { id } = req.query;
    // Realizar consulta a la base de datos con Sequelize
    const libro = await db.libro.findByPk(id, {
        include: {
            model: db.reserva,
            as: 'reservado',
            attributes: ['id', 'fecha_final'],
            order: [['id', 'DESC']]
        }
    });

    // Procesar los resultados y agregar información adicional
    const currentDate = new Date();
    const response = {
        ...libro.get({ plain: true }),
        disponible: libro.reservado.some(reserva => new Date(reserva.fecha_final) > currentDate)
    };

    // Enviar respuesta JSON con la información del libro
    res.status(200).json(response);
});

// Ruta para agregar un nuevo libro a la base de datos
ruta.post('/agregar', async (req, res) => {
    // Crear un nuevo registro en la base de datos con Sequelize
    const response = await db.libro.create(req.body);
    // Enviar respuesta JSON con la información del nuevo libro
    res.status(200).json(response);
});

// Ruta para eliminar un libro de la base de datos
ruta.delete('/eliminar', async (req, res) => {
    // Extraer el ID del libro de la consulta y realizar la eliminación con Sequelize
    const { id } = req.query;
    const response = await db.libro.destroy({ where: { id } });

    // Enviar respuesta JSON con el resultado de la eliminación
    res.status(200).json(response);
});

// Ruta para modificar un libro en la base de datos
ruta.put('/modificar', async (req, res) => {
    // Extraer el ID del libro de la consulta y realizar la modificación con Sequelize
    const { id } = req.query;
    const libro = await db.libro.findByPk(id);
    await libro.update(req.body);
    // Enviar respuesta JSON con un mensaje de éxito
    res.json({ mensaje: 'Libro modificado correctamente' });
});

// Ruta para obtener los libros más pedidos con paginación
ruta.get('/MasPedidos', async (req, res) => {
    // Extraer el número de página de la consulta y configurar la paginación
    const { page } = req.query;
    const pageSize = 2;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // Realizar consulta a la base de datos con Sequelize
    const librosPopulares = await db.libro.findAll({
        where: { contador: { [Op.gt]: 0 } },
        order: [['contador', 'DESC']],
    });

    // Obtener los libros populares según la paginación
    const response = librosPopulares.slice(start, end);

    // Enviar respuesta JSON con la información paginada de los libros populares
    res.status(200).json({
        page,
        totalPages: Math.ceil(response.length / pageSize),
        pageSize,
        totalItems: response.length,
        items: response
    });
});

// Función auxiliar para obtener la fecha actual en el formato deseado
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Exportar la ruta para su uso en otras partes de la aplicación
module.exports = ruta;
