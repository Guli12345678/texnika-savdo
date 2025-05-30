const {
  findMachinesInsideThedate,
  getMachines,
  getMachinesWithImages,
  getRejectedContracts,
} = require("../controllers/aqqliSorov.controller");

const router = require("express").Router();

router.post("/", findMachinesInsideThedate);
router.post("/get", getMachines);
router.get("/", getMachinesWithImages);
router.post("/contracts", getRejectedContracts);

module.exports = router;
