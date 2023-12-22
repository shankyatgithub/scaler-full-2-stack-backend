const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())
app.use( (req,res,next) => {
    console.log("middleware");
    next()
})

/** mongo db connection */
mongoose
    .connect(process.env.MONGODB_URL)
    .then((connection) => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err}`);
    });

/** Routes */
const userRouter = require("./routers/user.router");
app.use("/api/users", userRouter);

const productRouter = require("./routers/product.router")
app.use('/api/products', productRouter);

const categoryRouter = require("./routers/category.router")
app.use('/api/categories', categoryRouter);

let port = process.env.PORT || 3001;
app.listen(process.env.PORT, () => console.log(`Listening on ${port}`))
