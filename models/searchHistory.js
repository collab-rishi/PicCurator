// models/searchHistory.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/config.js");
// const user = require("./user");

module.exports = (sequelize, DataTypes) => {
const searchHistory = sequelize.define("searchHistory", {
  query: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: { model: "user", key: "id" },
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
return searchHistory;
};

// module.exports = searchHistory;
