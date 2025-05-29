const { sendErrorResponse } = require("../helpers/send_error_res");
const Role = require("../models/roles.model");
const User = require("../models/user.model");
const addrole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const position = await Role.findOne({
      where: { name: name.toLowerCase() },
    });
    if (position) {
      return sendErrorResponse({ message: "Bunday role mavjud" }, res, 400);
    }
    const newRole = await Role.create({
      name,
      description,
    });
    res.status(201).send({ message: "New role created!", newRole });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll(
      // {
      // // include: [
      // //   {
      // //     model: User,
      // //   },
      // // ],
      // }
    );
    res.status(200).send({ message: "Roles found!", roles });
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

module.exports = { addrole, findAllRoles, updateById, removeById };
