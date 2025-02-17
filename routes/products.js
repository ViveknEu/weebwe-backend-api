const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');



// Routes
router.post('/products', createProduct); // Create a product
router.get('/products', getAllProducts); // Get all products
router.get('/products/:id', getProductById); // Get a product by ID
router.put('/products/:id', updateProduct); // Update a product by ID
router.delete('/products/:id', deleteProduct); // Delete a product by ID

module.exports = router;
