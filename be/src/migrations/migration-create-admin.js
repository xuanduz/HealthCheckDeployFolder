"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Admin",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
        },
        fullName: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        gender: {
          type: Sequelize.BOOLEAN,
        },
        phoneNumber: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },

        accessToken: {
          type: Sequelize.STRING,
        },
        refreshToken: {
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
    await queryInterface.dropTable("admin");
  },
};
