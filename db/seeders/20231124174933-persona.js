'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('personas', 
    
    [
      {
        tipo: "admin",
        nombres: "admin",
        apellidos: "administrador",
        tipo_documento: "dni",
        nro_documento: "77777777",
        correo: "admin",
        contrasenha: "admin",
        foto: "/raul.png",
        idioma: "Ingles",
        prefijo: "Sr",
        color: "#7785bb"
      },
      {
        tipo: "user",
        nombres: "Lionel Andres",
        apellidos: "Messi",
        tipo_documento: "dni",
        nro_documento: "77777777",
        correo: "user@ulima.edu.pe",
        contrasenha: "user",
        foto: "/messi.jpg"
      },
      {
        tipo: "user",
        nombres: "Ricardo",
        apellidos: "Gareca",
        tipo_documento: "dni",
        nro_documento: "88888888",
        correo: "user2@ulima.edu.pe",
        contrasenha: "user2",
        foto: "/gareca.png"
      },
      {
        tipo: "user",
        nombres: "Maria",
        apellidos: "Gomez",
        tipo_documento: "dni",
        nro_documento: "70293902",
        correo: "Maria_Gomez@hotmail.com",
        contrasenha: "maria123",
        foto: "/Maria.png"
      },
      {
        tipo: "user",
        nombres: "Jose",
        apellidos: "Mendoza",
        tipo_documento: "dni",
        nro_documento: "69482049",
        correo: "Jose-Mendoza@hotmail.com",
        contrasenha: "josemendoza",
        foto: "/Jose.png"
      }
    ]
    
    , {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
