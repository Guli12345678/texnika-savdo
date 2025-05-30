const {
  adduser_location,
  findAllUser_locations,
  updateById,
  removeById,
} = require("../controllers/user_location.controller");
const authGuard = require("../middleware/guards/auth.guard");
const roleGuard = require("../middleware/guards/role.guard");

const router = require("express").Router();

router.post("/", adduser_location);
router.patch("/:id", updateById);
router.get("/", authGuard, roleGuard(["admin", "user"]), findAllUser_locations);
router.delete("/:id", removeById);

module.exports = router;
