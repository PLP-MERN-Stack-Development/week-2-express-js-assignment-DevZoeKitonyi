import express from 'express';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

// In-memory storage for demonstration
let products = [
  {
    id: 1,
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true,
    description: 'High-performance laptop for professionals'
  },
  {
    id: 2,
    name: 'Coffee Mug',
    price: 15.99,
    category: 'Home & Kitchen',
    inStock: true,
    description: 'Ceramic coffee mug with ergonomic handle'
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 89.99,
    category: 'Sports',
    inStock: false,
    description: 'Lightweight running shoes for athletes'
  }
];

// GET /api/products - Get all products
router.get('/', (req, res) => {
  const { category, inStock, minPrice, maxPrice, sort } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Filter by stock status
  if (inStock !== undefined) {
    const stockFilter = inStock === 'true';
    filteredProducts = filteredProducts.filter(product => product.inStock === stockFilter);
  }
  
  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
  }
  
  // Sort products
  if (sort) {
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }
  
  res.json({
    products: filteredProducts,
    count: filteredProducts.length,
    filters: { category, inStock, minPrice, maxPrice, sort }
  });
});

// GET /api/products/:id - Get product by ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      error: 'Product not found',
      message: `Product with ID ${productId} does not exist`
    });
  }
  
  res.json(product);
});

// POST /api/products - Create new product
router.post('/', validateProduct, (req, res) => {
  const { name, price, category, inStock, description } = req.body;
  
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    price: parseFloat(price),
    category,
    inStock: Boolean(inStock),
    description
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct
  });
});

// PUT /api/products/:id - Update product
router.put('/:id', validateProduct, (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({
      error: 'Product not found',
      message: `Product with ID ${productId} does not exist`
    });
  }
  
  const { name, price, category, inStock, description } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name,
    price: parseFloat(price),
    category,
    inStock: Boolean(inStock),
    description
  };
  
  res.json({
    message: 'Product updated successfully',
    product: products[productIndex]
  });
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({
      error: 'Product not found',
      message: `Product with ID ${productId} does not exist`
    });
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  
  res.json({
    message: 'Product deleted successfully',
    product: deletedProduct
  });
});

export default router;