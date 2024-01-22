const express = require('express');
const router = express.Router();
const controller = require("../controllers/driverReportController");

router.post("/addDriverReport" , controller.addDriverReport);
router.get("/getDriverReportsNyName" , controller.getDriverReportsNyName);
router.get("/getAllDriverReports" , controller.getAllDriverReports);
router.delete("/deleteDriver" , controller.deleteDriver);
// router.get("getAllBillsByVatNo" , controller.getAllBillsByVatNo);

module.exports = router;