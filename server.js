const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/shop'; // Adjust as needed

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected to shop database'))
    .catch(err => console.log(err));

// Define a schema and model
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String
});

const Product = mongoose.model('Product', productSchema);

// Test endpoint
app.get('/api/test', (req, res) => {
    res.send('Test endpoint working!');
});

// Products endpoint
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
