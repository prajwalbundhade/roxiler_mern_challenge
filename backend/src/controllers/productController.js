const Product = require("../models/Product");
const fetchData = require("../utils/fetchData");

const seedDatabase = async (req, res) => {
    try {
        const data = await fetchData("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        await Product.deleteMany(); // Clear existing data
        await Product.insertMany(data); // Insert new data
        res.status(200).json({ message: "Database seeded successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error seeding database." });
    }
};

// API to list all transactions with search and pagination
const listTransactions = async (req, res) => {
    try {
        const { search = "", page = 1, perPage = 10 } = req.query;

        const query = search
            ? {
                  $or: [
                      { title: { $regex: search, $options: "i" } },
                      { description: { $regex: search, $options: "i" } },
                      { price: parseFloat(search) || 0 },
                  ],
              }
            : {};

        const pageNumber = parseInt(page) || 1;
        const itemsPerPage = parseInt(perPage) || 10;

        const transactions = await Product.find(query)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        const total = await Product.countDocuments(query);

        res.status(200).json({
            transactions,
            total,
            page: pageNumber,
            perPage: itemsPerPage,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching transactions." });
    }
};

// API for statistics
const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: "Month is required" });
        }

        const startDate = new Date(`2023-${new Date(`${month} 1`).getMonth() + 1}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(0);

        const statistics = await Product.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$price" },
                    totalSold: { $sum: { $cond: ["$sold", 1, 0] } },
                    totalNotSold: { $sum: { $cond: ["$sold", 0, 1] } },
                },
            },
        ]);

        res.status(200).json(statistics[0] || { totalSales: 0, totalSold: 0, totalNotSold: 0 });
    } catch (error) {
        res.status(500).json({ error: "Error fetching statistics." });
    }
};

// API for bar chart
const getBarChart = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: "Month is required" });
        }

        const startDate = new Date(`2023-${new Date(`${month} 1`).getMonth() + 1}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(0);

        const priceRanges = [
            { range: "0-100", min: 0, max: 100 },
            { range: "101-200", min: 101, max: 200 },
            { range: "201-300", min: 201, max: 300 },
            { range: "301-400", min: 301, max: 400 },
            { range: "401-500", min: 401, max: 500 },
            { range: "501-600", min: 501, max: 600 },
            { range: "601-700", min: 601, max: 700 },
            { range: "701-800", min: 701, max: 800 },
            { range: "801-900", min: 801, max: 900 },
            { range: "901-above", min: 901, max: Infinity },
        ];

        const barData = await Promise.all(
            priceRanges.map(async (range) => {
                const count = await Product.countDocuments({
                    dateOfSale: { $gte: startDate, $lte: endDate },
                    price: { $gte: range.min, $lte: range.max },
                });
                return { range: range.range, count };
            })
        );

        res.status(200).json(barData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching bar chart data." });
    }
};

// API for pie chart (Items by category)
const getPieChart = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: "Month is required" });
        }

        const startDate = new Date(`2023-${new Date(`${month} 1`).getMonth() + 1}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(0);

        const categories = await Product.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    _id: "$category", // Group by category
                    count: { $sum: 1 }, // Count the number of items in each category
                },
            },
            { $project: { category: "$_id", count: 1, _id: 0 } },
        ]);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching pie chart data." });
    }
};

module.exports = {listTransactions, getStatistics, getBarChart, seedDatabase,getPieChart };
