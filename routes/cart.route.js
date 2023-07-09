const express =  require('express');
const router = express.Router();

const {addToCard, removeFromCart, updateCart, getAllCartProducts} = require('../controllers/cart.controller');
router.post('/addToCard',authMiddleware, addToCard);
router.post('/removeFromCart', authMiddleware, removeFromCart);
router.post('/updateCart',authMiddleware, updateCart);
router.post('/getAllCartProducts',authMiddleware, getAllCartProducts);
