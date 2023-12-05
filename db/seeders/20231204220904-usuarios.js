'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('personas', [
      {
        tipo: "admin",
        nombres: "admin",
        apellidos: "administrador",
        tipo_documento: "dni",
        nro_documento: "77777777",
        correo: "admin@admin.com",
        contrasenha: "admin",
        foto: "",
        idioma: "Ingles",
        prefijo: "Sr",
        color: "#7785bb",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Añade el código para revertir el seed aquí si es necesario
  }
};
