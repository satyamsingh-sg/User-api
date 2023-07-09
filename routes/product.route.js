const express = require("express");
const router = express.Router();
const {createProduct,getAllProduct,getProductById,updateProductById,deleteProductById,searchProducts,satyam} = require("../controllers/product.controller");
const upload = require('../middlewares/multer.middleware')
router.post('/product',upload, createProduct);
router.put('/product/:id',upload, updateProductById);
router.delete('/product/:id', deleteProductById);
router.get('/product/:id', getProductById);
router.get('/search', searchProducts);
router.get('/products',getAllProduct);
router.get('/satyam',satyam);

module.exports = router;
