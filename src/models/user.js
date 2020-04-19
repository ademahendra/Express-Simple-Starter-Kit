'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    auth_key: DataTypes.STRING,
    confirmed_at: DataTypes.INTEGER,
    uncorfimed_email: DataTypes.STRING,
    blocked_at: DataTypes.INTEGER,
    registration_ip: DataTypes.STRING,
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER,
    flags: DataTypes.INTEGER,
    last_login_at: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    type_user: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored:true,
    freezeTableName:true,
    tableName:'user'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};