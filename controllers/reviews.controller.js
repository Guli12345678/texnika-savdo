const { sendErrorResponse } = require("../helpers/send_error_res");
const Machine = require("../models/machine.model");
const Review = require("../models/reviews.model");
const User = require("../models/user.model");
const addreview = async (req, res) => {
  try {
    const { rating, comment, machineId, userId } = req.body;
    const machine = Machine.findByPk(machineId);
    const user = User.findByPk(userId);
    if (!machine) {
      return sendErrorResponse(
        { message: "Bunday machine mavjud emas!" },
        res,
        400
      );
    }
    if (!user) {
      return sendErrorResponse(
        { message: "Bunday user mavjud emas!" },
        res,
        400
      );
    }
    const newReview = await Review.create({
      rating,
      comment,
      machineId,
      userId,
    });
    res.status(201).send({ message: "New review created!", newReview });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Machine,
        },
      ],
    });
    res.status(200).send({ message: "Reviews found!", reviews });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const updateById = async (req, res) => {
  try {
    const review = await User.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Review updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.destroy({ where: { id } });
    res.status(200).send({ message: "review deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { addreview, findAllReviews, updateById, removeById };
