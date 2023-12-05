'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const reservaTableDescription = await queryInterface.describeTable('reservas');

      if (!reservaTableDescription.persona_id) {
        await queryInterface.addColumn('reservas', 'persona_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'personas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        });
      }

      if (!reservaTableDescription.libro_id) {
        await queryInterface.addColumn('reservas', 'libro_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'libros',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        });
      }

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Puedes agregar el código necesario para revertir los cambios si es necesario
    // await queryInterface.removeColumn('reservas', 'persona_id');
    // await queryInterface.removeColumn('reservas', 'libro_id');
  }
};
