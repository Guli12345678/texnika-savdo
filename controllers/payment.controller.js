const { sendErrorResponse } = require("../helpers/send_error_res");
const Contract = require("../models/contract.model");
const Payment = require("../models/payment.model");
const addpayment = async (req, res) => {
  try {
    const { payment_date, payment_status, amount, status, contractId } =
      req.body;
    const contract = await Contract.findByPk(contractId);
    if (!contract) {
      sendErrorResponse({ message: "Bunday kontrakt mavjud emas" }, res, 400);
    }
    const newPayment_locaition = await Payment.create({
      payment_date,
      payment_status,
      amount,
      status,
      contractId,
    });
    res
      .status(201)
      .send({ message: "New payments created!", newPayment_locaition });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAll = async (req, res) => {
  try {
    const payment = await Payment.findAll({
      // include: Payment
      include: [
        {
          model: Contract,
        },
      ],
      attributes: ["name", "address"],
    });
    res.status(200).send({ message: "Payment locations found!", paymentAddress });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const payment = await Payment.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Payment updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const payment = await Payment.destroy({ where: { id } });
    res.status(200).send({ message: "payment deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = {
  addpayment,
  findAll,
  updateById,
  removeById,
};
