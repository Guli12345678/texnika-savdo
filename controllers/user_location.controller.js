const { sendErrorResponse } = require("../helpers/send_error_res");
const User = require("../models/user.model");
const User_location = require("../models/user_location.model");
const adduser_location = async (req, res) => {
  try {
    const { name, address, userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      sendErrorResponse({ message: "Bunday usere mavjud emas" }, res, 400);
    }
    const newUser_locaition = await User_location.create({
      name,
      address,
      userId,
    });
    res.status(201).send({ message: "New users created!", newUser_locaition });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllUser_locations = async (req, res) => {
  try {
    const userAddress = await User_location.findAll({
      // include: User
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["name", "address"],
    });
    res.status(200).send({ message: "User locations found!", userAddress });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const user = await User_location.update(
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
    const user = await User_location.destroy({ where: { id } });
    res.status(200).send({ message: "user deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = {
  adduser_location,
  findAllUser_locations,
  updateById,
  removeById,
};
