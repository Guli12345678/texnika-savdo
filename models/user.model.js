const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");
const Review = require("./reviews.model");
const Role = require("./roles.model");
const Contract = require("./contract.model");

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
      type: DataTypes.STRING,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedToken: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Machine);
Machine.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Contract);
Contract.belongsTo(User);

User.belongsToMany(Role, { through: "UserRole" });
Role.belongsToMany(User, { through: "UserRole" });

module.exports = User;
