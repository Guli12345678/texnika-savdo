const {
  adduser,
  findAllUser_locations,
  updateById,
  removeById,
} = require("../controllers/users.controller");
const selfGuard = require("../middleware/guards/self.guard");

const router = require("express").Router();

router.post("/", adduser);
router.patch("/:id", updateById);
router.get("/:id", findAllUser_locations);
router.delete("/:id", removeById);

module.exports = router;
