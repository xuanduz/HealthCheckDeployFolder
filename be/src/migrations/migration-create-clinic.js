"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Clinic",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        image: {
          type: Sequelize.TEXT,
        },
        name: {
          type: Sequelize.STRING,
        },
        descriptionHTML: {
          type: Sequelize.TEXT,
        },
        describe: {
          type: Sequelize.STRING,
        },
        provinceKey: {
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
    await queryInterface.dropTable("clinic");
  },
};
