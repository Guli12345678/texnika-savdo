const { sendErrorResponse } = require("../helpers/send_error_res");
const Status = require("../models/status.model");
const addstatus = async (req, res) => {
  try {
    const { name } = req.body;
    const newstatus = await Status.create({ name });
    res.status(201).send({ message: "Yangi status qoshildi", newstatus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getAllstatuss = async (req, res) => {
  try {
    const statuss = await Status.findAll();
    res.status(200).send(statuss);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const updateById = async (req, res) => {
  try {
    const status = await Status.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Status updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const status = await Status.destroy({ where: { id } });
    res.status(200).send({ message: "status deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addstatus, getAllstatuss, updateById, removeById };
