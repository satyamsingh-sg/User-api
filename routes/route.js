const express = require("express");
const router = express.Router();
const productRoute = require("./product.route")
const userRoute = require("./user.route") 

router.use("/user", userRoute)
router.use("/product", productRoute)

module.exports =  router;