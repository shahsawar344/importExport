const  mongoose = require('mongoose');

const driverReportSchema = new mongoose.Schema({
    containerNo : {
        type : String,
        required : true,
    },
    name : String,
    location : {
        type : String,
    },
    customerName : String,
    price : Number,
    fuel :Number,
    balance : Number,
    date : {
        type : Date,
    }

})

const driverReportModel = mongoose.model("driverReport" , driverReportSchema);
module.exports = driverReportModel;