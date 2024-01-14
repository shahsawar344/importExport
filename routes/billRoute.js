const express = require('express');
const router = express.Router();
const controller = require("../controllers/billController");

router.post("/create-bill" , controller.createBill);
router.get("/getAllBills" , controller.getAllBills);
router.get("/getAllBillsByCompanyName" , controller.getAllBillsByCompanyName);
router.get("/getAllBillsByInvoiceNumber" , controller.getAllBillsByInvoiceNumber);
router.get("/getAllBillsByVatNo" , controller.getAllBillsByVatNo);
router.put("/updatePaidAmount" , controller.updateBillPaidAmount);
router.put("/updateBillCreditAmount" , controller.updateBillCreditAmount);
router.delete("/deleteBill" , controller.deleteBill);



module.exports = router;