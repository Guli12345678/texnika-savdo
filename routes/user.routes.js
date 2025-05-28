const {
  adduser,
  findAllUser_locations,
  updateById,
  removeById,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", adduser);
router.patch("/:id", updateById);
router.get("/", findAllUser_locations);
router.delete("/:id", removeById);

module.exports = router;
