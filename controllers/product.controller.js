const Product = require('../models/product.model')
const upload = require('../middlewares/multer.middleware')
const createProduct = async(req,res)=>{
  try{
    const{name, description, price, category, quantity} = req.body;
   console.log(res.body)
   

    const product =  new Product({
      name: name,
      description: description,
      price: parseInt(price),
      imageUrl: req.file.filename,
      category: category,
      quantity: quantity
    });
    await product.save();
    res.status(201).json({message: "Product create Successfully"});
  
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:"Internal Server error"})
    
  }
}

const getAllProduct = async(req,res)=>{
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getProductById = async(req, res)=>{
  try{
     const product = await Product.findById(req.params.id);
     if(!product){
      return res.status(404).json(({message: "Product Not Found"}));
     }

     res.json(product);

  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Interal server error"});
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

const deleteProductById = async(req, res)=>{
  try{
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }
    req.json({message: "Product deleted Successfully", product: product});
  }
  catch(error){
    console.log(error)
    res.status(500).json({message: 'Internal server Error'});
  }
};

const satyam = async(req, res)=>{
  console.log(req.body)
  res.json({message:"product"})
}

module.exports={
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  satyam
};



