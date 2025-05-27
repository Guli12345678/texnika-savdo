const { sendErrorResponse } = require("../helpers/send_error_res");
const Comission = require("../models/comission.model");
const addcomission = async (req, res) => {
  try {
    const { percent } = req.body;
    const newcomission = await Comission.create({ percent });
    res.status(201).send({ message: "Yangi comission qoshildi", newcomission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getAllcomissions = async (req, res) => {
  try {
    const comissions = await Comission.findAll();
    res.status(200).send(comissions);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const updateById = async (req, res) => {
  try {
    const categories = await Comission.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Comission updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const categories = await Comission.destroy({ where: { id } });
    res.status(200).send({ message: "Comission deleted successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addcomission, getAllcomissions, updateById, removeById };
