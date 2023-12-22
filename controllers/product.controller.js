const Product = require("../models/product.model");
const { getAllObjects_Factory_Handler, createObject_Factory_Handler, getObjectById_Factory_Handler,getObjectsByFilter_Factory_Handler } = require("../utils/crudFactory");

const getAllProducts_handler = getAllObjects_Factory_Handler(Product)
const createNewProduct_handler = createObject_Factory_Handler(Product)
const getProductById_handler = getObjectById_Factory_Handler(Product)
const getProductUsingFilter_handler = getObjectsByFilter_Factory_Handler(Product)

module.exports = {
    getAllProducts_handler,
    createNewProduct_handler,
    getProductById_handler,
    getProductUsingFilter_handler
}