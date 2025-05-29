const {
  addreview,
  findAllReviews,
  updateById,
  removeById,
} = require("../controllers/reviews.controller");

const router = require("express").Router();

router.post("/", addreview);
router.patch("/:id", updateById);
router.get("/", findAllReviews);
router.delete("/:id", removeById);

module.exports = router;
