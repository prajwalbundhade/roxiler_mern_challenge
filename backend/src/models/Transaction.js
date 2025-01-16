// models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  sold: Boolean,
  date: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
