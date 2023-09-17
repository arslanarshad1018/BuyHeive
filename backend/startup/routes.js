const express = require("express")
const cors = require("cors")

const products = require("../routes/products")


module.exports = function(app) 
{
    app.use(cors({origin:"https://localhost:3000"}));
    app.use(express.json());
    app.use("/api/products", products)
}