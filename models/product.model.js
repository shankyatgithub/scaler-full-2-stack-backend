const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false},
    price: {type: Number, required: true},
    category: {
        type: [mongoose.Types.ObjectId],
        ref: "Category"
        },
    stock: {
        type: Number,
        default: 0
    },
    brand: String
})

const Product = mongoose.model("ecom-Product",productSchema)

module.exports = Product