const sequelize = require("../config/db");
const Images = require("../models/image.model");
const { DataTypes } = require("sequelize");

const Machine = sequelize.define(
  "machine",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(8, 2),
    },
    description: {
      type: DataTypes.STRING(50),
    },
    is_available: {
      type: DataTypes.BOOLEAN,
    },
    min_hour: {
      type: DataTypes.INTEGER,
    },
    min_price: {
      type: DataTypes.DECIMAL(8, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
  }
);
Machine.hasMany(Images);
Images.belongsTo(Machine);

module.exports = Machine;
