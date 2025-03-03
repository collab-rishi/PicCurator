// models/user.js
// const { DataTypes } = require('sequelize');
// const sequelize = require("../config/config.js");

module.exports = (sequelize, DataTypes) => {
const user = sequelize.define('user', {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
});
return user;
};

// module.exports = user;
