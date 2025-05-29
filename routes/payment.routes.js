const {
  addpayment,
  findAll,
  updateById,
  removeById,
} = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/", addpayment);
router.patch("/:id", updateById);
router.get("/", findAll);
router.delete("/:id", removeById);

module.exports = router;
