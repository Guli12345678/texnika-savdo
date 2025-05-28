const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      validate: {
        is: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    is_active: {
      type: DataTypes.STRING(50),
      defaultValue: false,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedToken: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Machine);
Machine.belongsTo(User);
  
module.exports = User;
