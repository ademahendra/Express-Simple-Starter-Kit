'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      auth_key: {
        type: Sequelize.STRING
      },
      confirmed_at: {
        type: Sequelize.INTEGER
      },
      uncorfimed_email: {
        type: Sequelize.STRING
      },
      blocked_at: {
        type: Sequelize.INTEGER
      },
      registration_api: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.INTEGER
      },
      updated_at: {
        type: Sequelize.INTEGER
      },
      flags: {
        type: Sequelize.INTEGER
      },
      last_login_at: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      type_user: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};