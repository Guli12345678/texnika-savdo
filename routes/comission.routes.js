const {
  addcomission,
  getAllcomissions,
  updateById,
  removeById,
} = require("../controllers/comission.controller");

const router = require("express").Router();

router.post("/", addcomission);
router.patch("/:id", updateById);
router.get("/", getAllcomissions);
router.delete("/:id", removeById);

module.exports = router;
