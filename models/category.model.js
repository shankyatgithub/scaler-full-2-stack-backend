const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// create model using schema
const Category = mongoose.model("ecom-Category", categorySchema);

// export model
module.exports = Category;