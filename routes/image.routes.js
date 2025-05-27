const {
  addimage,
  getAllimages,
  updateById,
  removeById,
} = require("../controllers/image.controller");

const router = require("express").Router();

router.post("/", addimage);
router.patch("/:id", updateById);
router.get("/", getAllimages);
router.delete("/:id", removeById);

module.exports = router;
