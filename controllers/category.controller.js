const { sendErrorResponse } = require("../helpers/send_error_res");
const Category = require("../models/category.model");
const Machine = require("../models/machine.model");
const addcategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newcategory = await Category.create({ name });
    res.status(201).send({ message: "Yangi kategory qoshildi", newcategory });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const getAllcategorys = async (req, res) => {
  try {
    const cat = await Category.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name"],
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
    const categories = await Category.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Category updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Category.destroy({ where: { id } });
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addcategory, getAllcategorys, updateById, removeById };
