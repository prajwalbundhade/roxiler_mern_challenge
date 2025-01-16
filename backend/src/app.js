const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use("/api/products", productRoutes);
// Use routes
app.use('/api', transactionRoutes);
module.exports = app;
