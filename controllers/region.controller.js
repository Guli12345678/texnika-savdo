const { sendErrorResponse } = require("../helpers/send_error_res");
const Region = require("../models/region.model");
const addregion = async (req, res) => {
  try {
    const { name } = req.body;
    const newregion = await Region.create({ name });
    res.status(201).send({ message: "Yangi region qoshildi", newregion });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getAllregions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    res.status(200).send(regions);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const updateById = async (req, res) => {
  try {
    const region = await Region.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Region updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const region = await Region.destroy({ where: { id } });
    res.status(200).send({ message: "region deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addregion, getAllregions, updateById, removeById };
