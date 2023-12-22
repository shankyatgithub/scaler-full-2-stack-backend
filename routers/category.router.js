const express = require("express")

// get handlers from category controller
const {getAllCategory_handler, createNewCategory_handler} = require('../controllers/category.controller')

// set router for category
const categoryRouter = express.Router()

// set the apis for category
categoryRouter.get('/',getAllCategory_handler)
categoryRouter.post('/',createNewCategory_handler)

// export the router
module.exports = categoryRouter;
