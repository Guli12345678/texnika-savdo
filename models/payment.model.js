const sequelize = require("../config/db");
const Contract = require("../models/contract.model");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = Payment;
