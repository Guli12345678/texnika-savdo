const router = require("express").Router();
const categoryRouter = require("./category.routes");
const districtRouter = require("./district.routes");
const imageRouter = require("./image.routes");
const regionRouter = require("./region.route");
const comissionRouter = require("./comission.routes");
const statusRouter = require("./region.route");

router.use("/category", categoryRouter);
router.use("/district", districtRouter);
router.use("/image", imageRouter);
router.use("/region", regionRouter);
router.use("/status", statusRouter);
router.use("/comission", comissionRouter);

module.exports = router;
