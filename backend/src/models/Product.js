const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    image: { type: String },
    sold: { type: Boolean, required: true },
    dateOfSale: { type: Date, required: true },
});

module.exports = mongoose.model("Product", productSchema);
