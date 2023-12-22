// use the category model
const Category = require("../models/category.model")

// use crudFactory to get handlers
const { getAllObjects_Factory_Handler, createObject_Factory_Handler } = require("../utils/crudFactory");

// use crudFactory methods and pass the Category model
// to get all category, create category
/** Router Handler **/
const getAllCategory_handler = getAllObjects_Factory_Handler(Category)
const createNewCategory_handler = createObject_Factory_Handler(Category)

// exports the controllers handlers
module.exports = {
    getAllCategory_handler,
    createNewCategory_handler
}