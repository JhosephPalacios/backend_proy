'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtén el ID del libro predefinido (asegúrate de que exista en la tabla libros)
    const libroId = 1; // Reemplaza con el ID del libro predefinido

    // Define los datos de la reserva predefinida
    const reservaPredefinida = {
      libroId: libroId,
      usuario: 'admin@admin.com', // Reemplaza con un correo válido
      fecha: new Date(),
      // Otros campos de reserva
    };

    // Inserta la reserva predefinida en la tabla reserva
    await queryInterface.bulkInsert('reserva', [reservaPredefinida], {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    // Elimina la reserva predefinida agregada en el método up
    await queryInterface.bulkDelete('reserva', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
