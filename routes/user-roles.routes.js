const {
  addUserRole,
  findAllUserRoles,
  updateById,
  removeById,
} = require("../controllers/user-role.controller");

const router = require("express").Router();

router.post("/", addUserRole);
router.patch("/:id", updateById);
router.get("/", findAllUserRoles);
router.delete("/:id", removeById);

module.exports = router;
