'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtén IDs de algunos libros (deben existir en la tabla libros)
    const libro1Id = 1; // Reemplaza con el ID del primer libro
    const libro2Id = 2; // Reemplaza con el ID del segundo libro

    // Define los datos de las reservas
    const reservas = [
      {
        usuario: 'admin@admin.com', // Reemplaza con un correo válido
        libroId: libro1Id,
        fecha: new Date(),
        // Otros campos de reserva
      },
      // Puedes agregar más reservas si es necesario
    ];

    // Inserta las reservas en la tabla reserva
    await queryInterface.bulkInsert('reserva', reservas, {});

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
    // Elimina todas las reservas agregadas en el método up
    await queryInterface.bulkDelete('reserva', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
