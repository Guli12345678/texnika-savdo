const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");

const Category = sequelize.define(
  "category",
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

Category.hasMany(Machine);
Machine.belongsTo(Category);

module.exports = Category;
