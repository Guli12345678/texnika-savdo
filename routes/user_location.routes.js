const {
  adduser_location,
  findAllUser_locations,
  updateById,
  removeById,
} = require("../controllers/user_location.controller");

const router = require("express").Router();

router.post("/", adduser_location);
router.patch("/:id", updateById);
router.get("/", findAllUser_locations);
router.delete("/:id", removeById);

module.exports = router;
