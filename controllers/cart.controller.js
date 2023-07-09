const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.userId;
    
    // Check if product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already has the product in the cart
    const existingCart = await Cart.findOne({ userId, productId });
    if (existingCart) {
      // If product already exists in the cart, update its quantity
      existingCart.quantity += quantity;
      await existingCart.save();
      return res.json({ message: 'Product quantity updated in cart' });
    }

    // If product doesn't exist in the cart, create a new cart item
    const cartItem = new Cart({
      userId,
      productId,
      quantity
    });

    // Save the cart item to the database
    await cartItem.save();

    // Send success response
    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;
    
    // Check if product exists in the cart
    const existingCart = await Cart.findOne({ userId, productId });
    if (!existingCart) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the cart item from the database
    await existingCart.remove();

    // Send success response
    res.json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update product quantity in cart
const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.userId;
    
    // Check if product exists in the cart
    const existingCart = await Cart.findOne({ userId, productId });
    if (!existingCart) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the cart item's quantity in the database
    existingCart.quantity = quantity;
    await existingCart.save();

    // Send success response
    res.json({ message: 'Product quantity updated in cart successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all products in cart for a user
const getAllCartProducts = async (req, res) => {
  try {
    const userId = req.userId;

    // Get all cart items for the user
    const cartItems = await Cart.find({ userId }).populate('productId');

    // Send success response with cart items
    res.json({ cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToCart, removeFromCart, updateCart, getAllCartProducts };
