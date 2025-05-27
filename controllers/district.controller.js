const { sendErrorResponse } = require("../helpers/send_error_res");
const District = require("../models/district.model");
const adddistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const newdistrict = await District.create({ name });
    res.status(201).send({ message: "Yangi district qoshildi", newdistrict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getAlldistricts = async (req, res) => {
  try {
    const districts = await District.findAll();
    res.status(200).send(districts);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const updateById = async (req, res) => {
  try {
    const district = await District.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "District updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const district = await District.destroy({ where: { id } });
    res.status(200).send({ message: "district deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { adddistrict, getAlldistricts, updateById, removeById };
