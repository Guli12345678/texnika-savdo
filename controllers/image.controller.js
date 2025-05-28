const { sendErrorResponse } = require("../helpers/send_error_res");
const Image = require("../models/image.model");
const Machine = require("../models/machine.model");
const addimage = async (req, res) => {
  try {
    const { image_url, uploaded_at, machineId } = req.body;
    const machine = Machine.findByPk(machineId);
    const newimage = await Image.create({ image_url, uploaded_at, machineId });
    res.status(201).send({ message: "Yangi image qoshildi", newimage });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getAllimages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).send(images);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const updateById = async (req, res) => {
  try {
    const image = await Image.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Image updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const image = await Image.destroy({ where: { id } });
    res.status(200).send({ message: "image deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addimage, getAllimages, updateById, removeById };
