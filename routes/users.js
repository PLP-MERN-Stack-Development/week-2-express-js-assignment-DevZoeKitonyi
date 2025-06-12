import express from 'express';
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

// In-memory storage for demonstration (in real app, use database)
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    city: 'New York'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    city: 'Los Angeles'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 35,
    city: 'Chicago'
  }
];

// GET /api/users - Get all users
router.get('/', (req, res) => {
  const { page = 1, limit = 10, city, minAge } = req.query;
  
  let filteredUsers = [...users];
  
  // Filter by city if provided
  if (city) {
    filteredUsers = filteredUsers.filter(user => 
      user.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  
  // Filter by minimum age if provided
  if (minAge) {
    filteredUsers = filteredUsers.filter(user => user.age >= parseInt(minAge));
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  res.json({
    users: paginatedUsers,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(filteredUsers.length / limit),
      totalUsers: filteredUsers.length,
      hasNext: endIndex < filteredUsers.length,
      hasPrev: startIndex > 0
    }
  });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: `User with ID ${userId} does not exist`
    });
  }
  
  res.json(user);
});

// POST /api/users - Create new user
router.post('/', validateUser, (req, res) => {
  const { name, email, age, city } = req.body;
  
  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      error: 'Email already exists',
      message: 'A user with this email already exists'
    });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    age: parseInt(age),
    city
  };
  
  users.push(newUser);
  
  res.status(201).json({
    message: 'User created successfully',
    user: newUser
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', validateUser, (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'User not found',
      message: `User with ID ${userId} does not exist`
    });
  }
  
  const { name, email, age, city } = req.body;
  
  // Check if email already exists (excluding current user)
  const existingUser = users.find(u => u.email === email && u.id !== userId);
  if (existingUser) {
    return res.status(400).json({
      error: 'Email already exists',
      message: 'Another user with this email already exists'
    });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    name,
    email,
    age: parseInt(age),
    city
  };
  
  res.json({
    message: 'User updated successfully',
    user: users[userIndex]
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'User not found',
      message: `User with ID ${userId} does not exist`
    });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({
    message: 'User deleted successfully',
    user: deletedUser
  });
});

export default router;