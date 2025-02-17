require("dotenv").config();
const express = require('express');
const connectDB = require("./db/connect");

const productRoutes = require('./routes/products');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

const start = async() => {
  try {
    console.log("connecting.. ");
    
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`connected`);
    });
    
  } catch (error) {
    console.log(error);
    
  }
}
// Use the product routes
app.use('/api', productRoutes);
start();
// Start the server

