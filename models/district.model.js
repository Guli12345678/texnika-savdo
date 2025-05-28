const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");

const District = sequelize.define(
  "district",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
District.hasMany(Machine);
Machine.belongsTo(District);

module.exports = District;
