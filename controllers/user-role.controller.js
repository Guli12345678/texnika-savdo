const { sendErrorResponse } = require("../helpers/send_error_res");
const Role = require("../models/roles.model");
const User = require("../models/user.model");
const userRole = require("../models/user-role.model");
const addUserRole = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const roleId = parseInt(req.body.roleId, 10);
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    console.log(user, role);
    if (!user) {
      return sendErrorResponse(
        { message: "Bunday user mavjud emas!" },
        res,
        400
      );
    }
    if (!role) {
      return sendErrorResponse(
        { message: "Bunday role mavjud emas!" },
        res,
        400
      );
    }
    const newUserRole = await userRole.create({
      userId,
      roleId,
    });
    res.status(201).send({ message: "New role added to user!", newUserRole });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllUserRoles = async (req, res) => {
  try {
    const userRoles = await userRole.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Role,
        },
      ],
    });
    res.status(200).send({ message: "Roles found!", userRoles });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const updateById = async (req, res) => {
  try {
    const user = await User.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.destroy({ where: { id } });
    res.status(200).send({ message: "user deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addUserRole, findAllUserRoles, updateById, removeById };
