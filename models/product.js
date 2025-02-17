const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true,
    unique: [true, 'product already exists'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
  },
  featured: {
    type: Boolean,
    defaul: false,
  },

  description: {
    type: String,
    required: true, 
    trim: true,
  },
  category: {
    type: String,
    required: true, 
    enum: ['Tshirts', 'Hoodies', 'Toys', 'Stickers', 'KeyChains'], // Restrict to predefined categories
  },
  stock: {
    type: Number,
    required: true, 
    min: 0,    
    max: 100,     
  },
  // add images field! 
  rating: {
    type: Number,
    default: 0,    
    min: 0,
    max: 5,
  },
  tags: {
    type: [String], // Array of strings to represent 
    default: [], 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
});

productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();   // Without calling next(), the save operation would hang indefinitely.
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

//products not user! ---
//price, rating, name, category, quantity. --> sorting, filtering, api level pagination.