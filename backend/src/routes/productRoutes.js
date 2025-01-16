const express = require("express");
const { listTransactions, getStatistics, getBarChart,seedDatabase ,getPieChart} = require("../controllers/productController");

const router = express.Router();

// Seed database
router.get("/seed", seedDatabase);

// List transactions with search and pagination
router.get("/transactions", listTransactions);
// Statistics API
router.get("/statistics", getStatistics);
// Bar chart API
router.get("/bar-chart", getBarChart);
// Pie chart API (new route for Pie chart)
router.get("/pie-chart", getPieChart);
module.exports = router;
