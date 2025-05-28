const {
  addregion,
  getAllregions,
  updateById,
  removeById,
} = require("../controllers/region.controller");

const router = require("express").Router();

router.post("/", addregion);
router.patch("/:id", updateById);
router.get("/", getAllregions);
router.delete("/:id", removeById);

module.exports = router;
