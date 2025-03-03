// models/photo.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/config.js");
// const user = require("./user");

module.exports = (sequelize, DataTypes) => {
const photo = sequelize.define("photo", {
  imageUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  altDescription: DataTypes.STRING,
  dateSaved: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: "user", key: "id" },
  },
});

photo.associate = (models) => {
  photo.hasMany(models.tag, {
      foreignKey: "photoId"
  });
};


return photo;
};

// module.exports = photo;
