// routes/transactionRoutes.js
const express = require('express');
const { getSalesByMonth ,addTransaction} = require('../controllers/transactionController');
const router = express.Router();

// API endpoint to get sales data by month (e.g., "/sales/july")
router.get('/sales/:month', getSalesByMonth);
router.post('/transactions', addTransaction);
module.exports = router;
