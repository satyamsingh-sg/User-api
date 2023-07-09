const Product = require('../models/product.model')
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;
    const product = new Product({
      name: name,
      description: description,
      price: Number(price),
      imageUrl: 'D:\\Node\\user\\' + req.file.path,
      category: category,
      quantity: Number(quantity)
    });
    await product.save();
    res.status(201).json({ message: "Product create Successfully" });

  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server error" })

  }
}

const getAllProduct = async (req, res) => {
  try {
    const { page = 10, limit = 10 } = req.query;
    const count = await Product.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const offset = (page - 1) * limit;
    const products = await Product.find()
      .skip(offset)
      .limit(limit);
    res.json({
      page,
      limit,
      totalPages,
      totalItems: count,
      items: products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json(({ message: "Product Not Found" }));
    }

    res.json(product);

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Interal server error" });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, category, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        imageUrl,
        category,
        quantity,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    req.json({ message: "Product deleted Successfully", product: product });
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server Error' });
  }
};

const searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(10)


    if (products.length === 0) {
      // If no products found based on exact match
      const regexQuery = new RegExp(`${query}`, 'i');
      const similarProducts = await Product.find({
        $or: [
          { name: regexQuery },
          { description: regexQuery }
        ]
      });
      return res.json({ products: similarProducts });
    }

    return res.json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const satyam = async (req, res) => {
  console.log(req.body)
  res.json({ message: "product" })
}

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
  satyam
};



