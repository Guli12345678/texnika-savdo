const {
  adddistrict,
  getAlldistricts,
  updateById,
  removeById,
} = require("../controllers/district.controller");

const router = require("express").Router();

router.post("/", adddistrict);
router.patch("/:id", updateById);
router.get("/", getAlldistricts);
router.delete("/:id", removeById);

module.exports = router;
