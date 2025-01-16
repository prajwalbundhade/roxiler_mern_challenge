// controllers/transactionController.js
const Transaction = require('../models/Transaction');

// Existing function to get sales data by month
const getSalesByMonth = async (req, res) => {
  try {
    const { month } = req.params; // 'month' should be passed as a parameter, e.g., 'July'
    
    const startDate = new Date(`${month} 1, 2025`); // assuming current year for simplicity
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    
    // Fetch the transactions for the given month
    const transactions = await Transaction.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    });

    // You can aggregate data if necessary, for example: total sales, sold items, etc.
    const totalSales = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
    const totalSoldItems = transactions.filter(item => item.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.json({
      transactions,
      totalSales,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales data' });
  }
};

// New function to handle POST request and add a transaction
const addTransaction = async (req, res) => {
  try {
    const { title, price, description, sold, date } = req.body;

    // Create a new Transaction object
    const newTransaction = new Transaction({
      title,
      price,
      description,
      sold,
      date
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json({
      message: 'Transaction added successfully!',
      transaction: newTransaction
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding transaction',
      error: error.message
    });
  }
};

module.exports = { getSalesByMonth, addTransaction };
