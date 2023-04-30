const mongoose = require("mongoose");
require("dotenv").config();


// database connection-
const dbConnection = mongoose.connect(`${process.env.mongoUrl}`)


// exports-
module.exports = dbConnection;