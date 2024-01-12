const mongoose = require("mongoose");
const billModel = require("../models/billModel");

exports.createBill = async (req, res) => {
  try {
    if (!req.body.date || !req.body.bl_no) {
      return res.json({
        message: "date , company , bill_no and email is required fields",
        status: false,
      });
    }
    const foundBillNo = await billModel.findOne({ bl_no: req.body.bl_no });
    const foundInvoiceNumber = await billModel.findOne({
      invoice_number: req.body.invoice_number,
    });
    if (foundBillNo && foundInvoiceNumber) {
      return res.json({
        message:
          "This bill no && invoice number is already associated with another bill",
        status: false,
      });
    }

    const found = await billModel.findOne({
      vatNo: req.body.vatNo,
      company: { $ne: req.body.company },
    });
    if (found) {
      return res.json({
        message:
          "This vatNO is already assigned to some other company , You cannot use one vatNO for more than one company",
        status: false,
      });
    }

    const newBill = new billModel({
      ...req.body,
    });

    const result = await newBill.save();

    if (!result) {
      return res.json({
        message: "New Bill Could not be created",
        status: false,
      });
    } else {
      return res.json({
        message: "New Bill saved successfully",
        status: true,
        result: result,
      });
    }
  } catch (err) {
    res.json({
      message: "Error Occured",
      status: false,
      error: err.message,
    });
  }
};

exports.getAllBills = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    if (!page || !limit) {
      return res.json({
        message: "Page and limit must be specified",
        status: false,
      });
    }

    const result = await billModel
      .find()
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ $natural: -1 });

    if (!result) {
      return res.json({
        message: "Bills could not be fetched",
        status: false,
        result: null,
      });
    } else {
      // Update each result object to include total amount
      const updatedResult = result.map((bill) => {
        let totalAmount = 0;
        if (bill.fieldsData?.length > 0) {
          totalAmount = bill.fieldsData.reduce(
            (sum, field) => sum + parseInt(field.price),
            0
          );
        } else {
          totalAmount = 0;
        }

        return { ...bill.toObject(), totalAmount };
      });

      return res.json({
        message: "Bills fetched successfully",
        status: true,
        result: updatedResult,
      });
    }
  } catch (err) {
    res.json({
      message: "Error occurred",
      status: false,
      error: err.message,
    });
  }
};

exports.getAllBillsByCompanyName = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const companyName = req.query.companyName;

    if (!page || !limit || !companyName) {
      return res.json({
        message: "companyName ,Page and limit must be specified",
        status: false,
      });
    }
    const result = await billModel
      .find({ company: { $regex: companyName, $options: "i" } })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ $natural: -1 });

    if (!result) {
      return res.json({
        message: "Bills with companyName could not Fetched",
        status: false,
        result: null,
      });
    } else {
      const updatedResult = result.map((bill) => {
        let totalAmount = 0;
        if (bill.fieldsData?.length > 0) {
          totalAmount = bill.fieldsData.reduce(
            (sum, field) => sum + parseInt(field.price),
            0
          );
        } else {
          totalAmount = 0;
        }

        return { ...bill.toObject(), totalAmount };
      });

      return res.json({
        message: "Bills with companyName Fetched successfully",
        status: true,
        result: updatedResult,
      });
    }
  } catch (err) {
    res.json({
      message: "Error Occured",
      status: false,
      error: err.message,
    });
  }
};
exports.getAllBillsByInvoiceNumber = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const invoice_number = req.query.invoice_number;

    if (!page || !limit || !invoice_number) {
      return res.json({
        message: "invoice_number ,Page and limit must be specified",
        status: false,
      });
    }
    const result = await billModel
      .find({ invoice_number: { $regex: invoice_number, $options: "i" } })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ $natural: -1 });

    if (!result) {
      return res.json({
        message: "Bills with invoice_number could not Fetched",
        status: false,
        result: null,
      });
    } else {
      const updatedResult = result.map((bill) => {
        let totalAmount = 0;
        if (bill.fieldsData?.length > 0) {
          totalAmount = bill.fieldsData.reduce(
            (sum, field) => sum + parseInt(field.price),
            0
          );
        } else {
          totalAmount = 0;
        }

        return { ...bill.toObject(), totalAmount };
      });

      return res.json({
        message: "Bills with invoice_number Fetched successfully",
        status: true,
        result: updatedResult,
      });
    }
  } catch (err) {
    res.json({
      message: "Error Occured",
      status: false,
      error: err.message,
    });
  }
};

exports.getAllBillsByVatNo = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const vatNo = req.query.vatNo;

    if (!page || !limit || !vatNo) {
      return res.json({
        message: "vatNo ,Page and limit must be specified",
        status: false,
      });
    }
    const result = await billModel
      .find({ vatNo: vatNo })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ $natural: -1 });

    if (!result) {
      return res.json({
        message: "Bills with vatNO could not Fetched",
        status: false,
        result: null,
      });
    } else {
      const updatedResult = result.map((bill) => {
        let totalAmount = 0;
        if (bill.fieldsData?.length > 0) {
          totalAmount = bill.fieldsData.reduce(
            (sum, field) => sum + parseInt(field.price),
            0
          );
        } else {
          totalAmount = 0;
        }

        return { ...bill.toObject(), totalAmount };
      });

      return res.json({
        message: "Bills with vatNo Fetched successfully",
        status: true,
        result: updatedResult,
      });
    }
  } catch (err) {
    res.json({
      message: "Error Occured",
      status: false,
      error: err.message,
    });
  }
};

exports.updateBillPaidAmount = async (req, res) => {
  try {
    const bill_id = req.body.bill_id;
    const paidAmount = req.body.paidAmount;
    const name = req.body.name;
    const company = req.body.company;
    const vatNo = req.body.vatNo;
    const email = req.body.email;
    const invoice_number = req.body.invoice_number;
    const vatPercentage = req.body.vatPercentage;
    const extraChargeDescription = req.body.extraChargeDescription;
    const extraChargeData = req.body.extraChargeData;
    const fieldsData = req.body.fieldsData;
    const date = req.body.date;
    let paidStatus = false;

    if (parseInt(paidAmount) > 0) {
      paidStatus = true;
    }

    const result = await billModel.findOneAndUpdate(
      { _id: bill_id },
      {
        paidAmount: paidAmount,
        paidStatus: paidStatus,
        name: name,
        company: company,
        vatNo: vatNo,
        email: email,
        invoice_number: invoice_number,
        vatPercentage: vatPercentage,
        extraChargeDescription: extraChargeDescription,
        extraChargeData: extraChargeData,
        fieldsData: fieldsData,
        date: date,
      },
      { new: true }
    );

    if (!result) {
      return res.json({
        message: "Bill paid amount could not updated",
        status: false,
        result: null,
      });
    } else {
      return res.json({
        message: "Bill paidAmount updated successfully",
        status: true,
        result: result,
      });
    }
  } catch (err) {
    res.json({
      message: "Error Occured",
      status: false,
      error: err.message,
    });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const bill_id = req.query.bill_id;

    const result = await billModel.deleteOne({ _id: bill_id });
    if (result.deletedCount == 0) {
      return res.json({
        message: "Bill could not be deleted or with this id may not found",
        status: false,
        result: null,
      });
    } else {
      return res.json({
        message: "Bill paidAmount delted successfully",
        status: true,
        result: result,
      });
    }
  } catch (err) {
    res.json({
      message: "Error Occured",
      status: false,
      error: err.message,
    });
  }
};
