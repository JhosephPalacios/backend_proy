
const express = require('express')
const ruta = express.Router()
const db = require('../db/models/index.js')

ruta.get('/personas', async (req, res) => {
  console.log('all invocada !')
  let rpta = await db.persona.findAll( {} )
  res.json(rpta);
});

ruta.get('/libros', async (req, res) => {
  let rpta = await db.libro.findAll( {} )
  res.json(rpta);
});

ruta.get('/reservas', async (req, res) => {
  let rpta = await db.reserva.findAll( {} )
  res.json(rpta);
});

ruta.get('/persona_a_libro', async (req, res) => {
  console.log("Entrando a /a1")
  let persona = await db.persona.findByPk( 3, {
      include : [
          {
              model: db.libro,
              through : 'reservas',
              as: 'reservacion',
              include: []
          }
      ]
    })

    if ( persona ) {
      persona.reservacion.forEach( p => {
            console.log(p.id, p.titulo)
        })
    }
    res.status(200).json(persona)
});

ruta.get('/libro_a_persona', async (req, res) => {
  console.log("Entrando a /a1")
  let libro = await db.libro.findByPk( 2, {
      include : [
          {
              model: db.persona,
              through : 'reservas',
              as: 'reservacion',
              include: []
          }
      ]
    })

    if ( libro ) {
      libro.reservacion.forEach( p => {
            console.log(p.id, p.nombres)
        })
    }
    res.status(200).json(libro)
});

ruta.get('/persona_a_reserva', async(req,res) => {
  let persona = await db.persona.findByPk( 2, {
      include : [ 'reservante']
  })
  if ( persona ) {
    persona.reservante.forEach( p => {
        console.log(p.fecha_inicio, " - ", p.fecha_final)
      })
  }
  res.status(200).json(persona)
});

ruta.get('/reserva_a_persona', async(req,res) => {
  let reserva = await db.reserva.findByPk( 2, {
      include : [ 'reservante']
  })
  if ( reserva ) {
    let p = reserva.reservante
    console.log(p.id, " - ", p.nombres)
  }
  res.status(200).json(reserva)
});

ruta.get('/libro_a_reserva', async(req,res) => {
  let libro = await db.libro.findByPk( 2, {
      include : [ 'reservado']
  })
  if ( libro ) {
    libro.reservado.forEach( p => {
        console.log(p.fecha_inicio, " - ", p.fecha_final)
      })
  }
  res.status(200).json(libro)
});

ruta.get('/reserva_a_libro', async(req,res) => {
  let reserva = await db.reserva.findByPk( 2, {
      include : [ 'reservado']
  })
  if ( reserva ) {
    let p = reserva.reservado
    console.log(p.id, " - ", p.titulo)
  }
  res.status(200).json(reserva)
});

ruta.post('/grabar', async(req, res) => {
  let obj = {
    titulo: "Maravillas",
    autor: "grupo5",
    isbn: "123456789",
    editorial: "Peru",
    topicos: "terror",
    tipo: "miedo",
    descripcion: "descripcion del libro",
    imagen: "http://dummyimage.com/128x128.png/5fa2dd/ffffff",
    contador: 0
  }
  let p = await db.libro.create( obj )
  res.status(200).json(p)
})


module.exports = ruta