const driverReportModel = require("../models/driverReportModel");

exports.addDriverReport = async (req, res) => {
  try {
    if (!req.body.containerNo || !req.body.name || !req.body.customerName) {
      return res.json({
        message: "containerNo , name and customerName are required",
        status: false,
      });
    }
    const newReport = new driverReportModel({
      ...req.body,
    });

    const result = await newReport.save();

    if (result) {
      res.json({
        message: "Driver report saved successfully",
        status: true,
        result: result,
      });
    } else {
      res.json({
        message: "Could not save driver report",
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error adding driver report",
      status: false,
      error: err.message,
    });
  }
};

exports.getDriverReportsNyName = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const name = req.query.name;

    if (!page || !limit || !name) {
      return res.json({
        message: "name, Page and limit must be specified",
        status: false,
      });
    }
    const result = await driverReportModel
      .find({ name: name })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ $natural: -1 });

    if (!result) {
      return res.json({
        message: "Driver reports could not Fetched",
        status: false,
        result: null,
      });
    } else {
      return res.json({
        message: "Driver Reports Fetched successfully",
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

exports.getAllDriverReports = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    if (!page || !limit) {
      return res.json({
        message: "Page and limit must be specified",
        status: false,
      });
    }
    const result = await driverReportModel
      .find()
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ $natural: -1 });
    if (!result) {
      return res.json({
        message: "Driver reports could not Fetched",
        status: false,
        result: null,
      });
    } else {
      return res.json({
        message: "Driver Reports Fetched successfully",
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

exports.deleteDriver = async (req, res) => {
  try {
    const bill_id = req.query.bill_id;

    const result = await driverReportModel.deleteOne({ _id: bill_id });
    if (result.deletedCount == 0) {
      return res.json({
        message: "Driver could not be deleted or with this id may not found",
        status: false,
        result: null,
      });
    } else {
      return res.json({
        message: "Driver  deleted successfully",
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
