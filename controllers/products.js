const Product = require('../models/product');

// Create a new product
const  createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, rating, tags } = req.body;
    const newProduct = new Product({ name, price, description, category, stock, rating, tags });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const{name, category, sort, select } = req.query;
    const queryObject = {};

    if (name) {
      queryObject.name = { $regex: `${name.split('').join('.*')}`, $options: 'i' }; //Fuzzy Regex Matching
    }
    if(category){
      queryObject.category = { $regex: category, $options: "i"};
    }
    let apiData = Product.find(queryObject);

    if(sort){
      let sortFix = sort.split(",").join(" ");
      apidData = apiData.sort(sortFix);
    }

    if(select) {
      let selectFix = select.split(",").join(" ");
      apidData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1
  let limit = Number(req.query.limit) || 3

  let skip = (page -1 )* limit;
  apiData = apiData.skip(skip).limit(limit);
  console.log(queryObject);
    
  const products = await apiData;
    
  res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, rating, tags } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, stock, rating, tags },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct}