const {
  addrole,
  findAllRoles,
  updateById,
  removeById,
} = require("../controllers/roles.controller");

const router = require("express").Router();

router.post("/", addrole);
router.patch("/:id", updateById);
router.get("/", findAllRoles);
router.delete("/:id", removeById);

module.exports = router;
