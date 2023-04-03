const express = require("express");
const router = express.Router();
const {createProduct,getAllProduct,getProductById,updateProductById,deleteProductById,satyam} = require("../controllers/product.controller");
router.post('/product',createProduct);
router.put('/product/:id', updateProductById);
router.delete('/product/:id', deleteProductById);
router.get('/product/:id', getProductById);
router.get('/products',getAllProduct);
router.get('/satyam',satyam)

module.exports = router;
