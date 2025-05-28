const { sendErrorResponse } = require("../helpers/send_error_res");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");
const adddistrict = async (req, res) => {
  try {
    const { name, regionId } = req.body;
    const region = Region.findByPk(regionId);
    const newregion = await District.create({
      name,
      regionId,
    });
    res.status(201).send({ message: "New district created!", newregion });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const getAlldistricts = async (req, res) => {
  try {
    const cat = await District.findAll({
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
