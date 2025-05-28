const { sendErrorResponse } = require("../helpers/send_error_res");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const UserAddress = require("../models/user_location.model");
const Machine = require("../models/machine.model");
const adduser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } =
      req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse(
        { message: "Bunday foydalanuvchi mavjud" },
        res,
        400
      );
    }
    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas" }, res, 400);
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUsers = await User.create({
      full_name,
      phone,
      email,
      hashed_password,
    });
    res.status(201).send({ message: "New users created!", newUsers });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllUser_locations = async (req, res) => {
  try {
    const users = await User.findAll({
      // include: User
      include: [
        {
          model: UserAddress,
          attributes: ["name", "address"],
        },
        {
          model: Machine,
          attributes: ["name"],
        },
      ],
      attributes: ["full_name", "phone"],
    });
    res.status(200).send({ message: "Users found!", users });
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

module.exports = { adduser, findAllUser_locations, updateById, removeById };
