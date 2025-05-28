const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const User_location = sequelize.define(
  "user_location",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    address: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(User_location);
User_location.belongsTo(User);

module.exports = User_location;
