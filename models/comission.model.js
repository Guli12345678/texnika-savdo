const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Comission = sequelize.define("comission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  percent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Comission;
