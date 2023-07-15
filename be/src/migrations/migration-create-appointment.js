"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Appointment",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        statusKey: {
          type: Sequelize.STRING,
        },
        doctorId: {
          type: Sequelize.INTEGER,
        },
        patientId: {
          type: Sequelize.INTEGER,
        },
        clinicId: {
          type: Sequelize.INTEGER,
        },
        patientId: {
          type: Sequelize.INTEGER,
        },
        date: {
          type: Sequelize.STRING,
        },
        time: {
          type: Sequelize.STRING,
        },
        timeSlot: {
          type: Sequelize.STRING,
        },
        resultFile: {
          type: Sequelize.STRING,
        },
        reason: {
          type: Sequelize.STRING,
        },
        bookingType: {
          type: Sequelize.STRING,
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
        // underscored: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("appointment");
  },
};
