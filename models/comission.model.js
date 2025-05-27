const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Comission = sequelize.define(
  "comission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    percent: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Comission;
