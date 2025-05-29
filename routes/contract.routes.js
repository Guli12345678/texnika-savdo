const {
  addContract,
  getAll,
  updateById,
  removeById,
} = require("../controllers/contract.controller");

const router = require("express").Router();

router.post("/", addContract);
router.patch("/:id", updateById);
router.get("/", getAll);
router.delete("/:id", removeById);

module.exports = router;
