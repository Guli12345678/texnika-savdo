const {
  addMachine,
  getAllMachines,
  updateById,
  removeById,
} = require("../controllers/machine.controller");

const router = require("express").Router();

router.post("/", addMachine);
router.patch("/:id", updateById);
router.get("/", getAllMachines);
router.delete("/:id", removeById);

module.exports = router;
