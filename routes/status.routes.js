const {
  addstatus,
  getAllstatuss,
  updateById,
  removeById,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", addstatus);
router.patch("/:id", updateById);
router.get("/", getAllstatuss);
router.delete("/:id", removeById);

module.exports = router;
