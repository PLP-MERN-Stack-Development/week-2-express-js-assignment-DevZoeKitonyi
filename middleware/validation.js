// Validation middleware for user data
export const validateUser = (req, res, next) => {
  const { name, email, age, city } = req.body;
  const errors = [];
  
  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters long');
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Valid email is required');
  }
  
  // Validate age
  if (!age || isNaN(age) || parseInt(age) < 1 || parseInt(age) > 120) {
    errors.push('Age must be a number between 1 and 120');
  }
  
  // Validate city
  if (!city || typeof city !== 'string' || city.trim().length < 2) {
    errors.push('City is required and must be at least 2 characters long');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Please fix the following errors',
      errors
    });
  }
  
  next();
};

// Validation middleware for product data
export const validateProduct = (req, res, next) => {
  const { name, price, category, description } = req.body;
  const errors = [];
  
  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Product name is required and must be at least 2 characters long');
  }
  
  // Validate price
  if (!price || isNaN(price) || parseFloat(price) < 0) {
    errors.push('Price must be a positive number');
  }
  
  // Validate category
  if (!category || typeof category !== 'string' || category.trim().length < 2) {
    errors.push('Category is required and must be at least 2 characters long');
  }
  
  // Validate description
  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description is required and must be at least 10 characters long');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Please fix the following errors',
      errors
    });
  }
  
  next();
};
