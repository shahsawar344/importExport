
const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
require("dotenv").config();

const cors = require('cors');
mongoose.set('strictQuery', true);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin : "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('dotenv').config()


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());


//Routes

app.use("/bill" , require("./routes/billRoute.js"));
app.use("/driverReport" , require("./routes/driverReportRoute.js"));





app.listen(process.env.PORT, () => console.log(`Running server on port: ${process.env.PORT}`));