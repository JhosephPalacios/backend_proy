'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here}
      this.hasMany(models.reserva, { as: 'reservado', foreignKey: 'libro_id' });
      this.belongsToMany(models.persona, { through: 'reservas', as: 'reservacion', foreignKey: 'libro_id' });
    }
  }
  libro.init({
    formato: DataTypes.STRING,
    autor: DataTypes.STRING,
    editorial: DataTypes.STRING,
    categoria: DataTypes.STRING,
    anio: DataTypes.STRING,
    idioma: DataTypes.STRING,
    nro_paginas: DataTypes.STRING,
    encuadernacion: DataTypes.STRING,
    isbn: DataTypes.STRING,
    isbn13: DataTypes.STRING,
    nro_edicion: DataTypes.STRING,
    imagen_portada_url: DataTypes.TEXT,
    titulo: DataTypes.STRING,
    dimensiones: DataTypes.STRING,
    url_compra: DataTypes.TEXT,
    tema: DataTypes.STRING,
    coleccion: DataTypes.STRING,
    peso: DataTypes.STRING,
    ilustracion: DataTypes.STRING,
    diponibilidad_libro: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'libro',
  });
  return libro;
};