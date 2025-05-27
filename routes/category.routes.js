const {
  addcategory,
  getAllcategorys,
  updateById,
  removeById,
} = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", addcategory);
router.patch("/:id", updateById);
router.get("/", getAllcategorys);
router.delete("/:id", removeById);

module.exports = router;
