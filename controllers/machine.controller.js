const { sendErrorResponse } = require("../helpers/send_error_res");
const District = require("../models/district.model");
const Region = require("../models/region.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");
const Machine = require("../models/machine.model");
const Images = require("../models/image.model");
const addMachine = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      min_hour,
      min_price,
      categoryId,
      userId,
      regionId,
      districtId,
    } = req.body;
    const cat = await Category.findByPk(categoryId);
    const owner = await User.findByPk(userId);
    const district = await District.findByPk(districtId);
    const region = await Region.findByPk(regionId);
    if (!region) {
      sendErrorResponse({ message: "Bunday Machine mavjud emas" }, res, 400);
    }
    if (!cat) {
      sendErrorResponse({ message: "Bunday Machine mavjud emas" }, res, 400);
    }
    if (!owner) {
      sendErrorResponse({ message: "Bunday Machine mavjud emas" }, res, 400);
    }
    if (!district) {
      sendErrorResponse({ message: "Bunday Machine mavjud emas" }, res, 400);
    }
    const newregion = await Machine.create({
      name,
      categoryId,
      userId,
      regionId,
      districtId,
      price_per_hour,
      description,
      is_available,
      min_hour,
      min_price,
    });
    res.status(201).send({ message: "New region created!", newregion });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const getAllMachines = async (req, res) => {
  try {
    const cat = await Machine.findAll({
      include: [
        {
          model: Images,
        },
      ],
    });
    res.status(200).send(cat);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const updateById = async (req, res) => {
  try {
    const district = await Machine.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Machine updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const machine = await Machine.destroy({ where: { id } });
    res.status(200).send({ message: "Machine deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addMachine, getAllMachines, updateById, removeById };
