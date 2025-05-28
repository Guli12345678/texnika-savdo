const sequelize = require("../config/db");
const District = require("../models/district.model");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");

const Region = sequelize.define(
  "region",
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
Region.hasMany(District);
Region.hasMany(Machine);
District.belongsTo(Region);
Machine.belongsTo(Region);

module.exports = Region;
