// models/tag.js
// const { DataTypes } = require('sequelize');
// const sequelize = require("../config/config.js");
// const photo = require("./photo");

module.exports = (sequelize, DataTypes) => {
const tag = sequelize.define('tag', {
  name: DataTypes.STRING,
  photoId: {
    type: DataTypes.INTEGER,
    references: { model: 'photo', key: 'id' }
  }
});

tag.associate = (models) => {
  tag.belongsTo(models.photo, {
      foreignKey: "photoId"
  });
};


return tag;
};

// module.exports = tag;