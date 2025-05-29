const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Role = require("./roles.model");
const User = require("./user.model");

const UserRole = sequelize.define(
  "user_role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
  }
);

User.belongsToMany(Role, { through: "UserRole" });
Role.belongsToMany(User, { through: "UserRole" });

UserRole.belongsTo(Role);

UserRole.belongsTo(User);
User.hasMany(UserRole);

module.exports = UserRole;
