const express = require("express")
const { getAllProducts_handler, createNewProduct_handler,getProductById_handler,getProductUsingFilter_handler } = require("../controllers/product.controller");

const productRouter = express.Router();
productRouter.get('/', getAllProducts_handler);
productRouter.post('/',createNewProduct_handler)
productRouter.get('/filter',getProductUsingFilter_handler)
productRouter.get('/:id',getProductById_handler)

module.exports = productRouter;