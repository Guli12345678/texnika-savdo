const { sendErrorResponse } = require("../helpers/send_error_res");
const User = require("../models/user.model");
const Machine = require("../models/machine.model");
const Commission = require("../models/comission.model");
const Status = require("../models/status.model");
const Contract = require("../models/contract.model");
const addContract = async (req, res) => {
  try {
    const {
      total_price,
      date,
      start_time,
      end_time,
      total_time,
      comissionId,
      userId,
      statusId,
      machineId,
    } = req.body;
    const comission = await Commission.findByPk(comissionId);
    const user = await User.findByPk(userId);
    const status = await Status.findByPk(statusId);
    const machine = await Machine.findByPk(machineId);
    if (!machine) {
      sendErrorResponse({ message: "Bunday Machine mavjud emas" }, res, 400);
    }
    if (!user) {
      sendErrorResponse({ message: "Bunday user mavjud emas" }, res, 400);
    }
    if (!status) {
      sendErrorResponse({ message: "Bunday status mavjud emas" }, res, 400);
    }
    if (!comission) {
      sendErrorResponse({ message: "Bunday komissiya mavjud emas" }, res, 400);
    }
    const newcontract = await Contract.create({
      total_price,
      date,
      start_time,
      end_time,
      total_time,
      comissionId,
      userId,
      statusId,
      machineId,
    });
    res.status(201).send({ message: "New contract created!", newcontract });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const getAll = async (req, res) => {
  try {
    const cat = await Contract.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name"],
        },
        {
          model: Commission,
          attributes: ["percent"],
        },
        {
          model: User,
          attributes: ["full_name"],
        },
        {
          model: Status,
          attributes: ["status"],
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
    const contract = await Contract.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "contract updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const contract = await Machine.destroy({ where: { id } });
    res.status(200).send({ message: "contract deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addContract, getAll, updateById, removeById };
