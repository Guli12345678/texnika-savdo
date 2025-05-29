const sequelize = require("../config/db");
const Commission = require("../models/comission.model");
const { DataTypes } = require("sequelize");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(8, 2),
    },
    date: {
      type: DataTypes.DATE,
    },
    start_time: {
      type: DataTypes.TIME,
    },
    end_time: {
      type: DataTypes.TIME,
    },
    total_time: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
  }
);

Contract.hasMany(Commission);
Commission.hasMany(Contract);

module.exports = Contract;
