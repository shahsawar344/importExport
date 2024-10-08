const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  bl_no: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  company: {
    type: String,
    required: true,
  },
  vatNo: String,
  email: {
    type: String,
    // required : true,
  },
  invoice_number: {
      type: String,
    unique: true,
    required: true,
  },
  vatPercentage: Number,
  extraCharge: Number,
  paidStatus: {
    type: Boolean,
    default: false,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  creditAmount: {
    type: Number,
    default: 0,
  },
  extraChargeDescription: String,
  extraChargeData: [],
  description: String,
  fieldsData: [],
  date: {
    type: String,
    required: true,
  },
});

const billModel = mongoose.model("bill", billSchema);
module.exports = billModel;
