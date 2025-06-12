# Week 2 Express.js Assignment

A comprehensive Express.js REST API demonstrating fundamental concepts including routing, middleware, validation, error handling, and CRUD operations.

## 🚀 Features

- **RESTful API Design**: Clean and intuitive API endpoints
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Input Validation**: Robust validation middleware for data integrity
- **Error Handling**: Comprehensive error handling with meaningful responses
- **Security**: Helmet.js for security headers
- **CORS**: Cross-Origin Resource Sharing enabled
- **Logging**: Request logging with Morgan
- **Environment Configuration**: Environment variables support
- **Health Check**: System health monitoring endpoint

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd week-2-express-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (already included):
```env
PORT=3000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

Or start the production server:
```bash
npm start
```

## 🛠️ API Endpoints

### Base URL
```
http://localhost:3000
```

### General Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message and API info |
| GET | `/health` | Health check endpoint |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

#### User Query Parameters
- `page`: Page number for pagination (default: 1)
- `limit`: Items per page (default: 10)
- `city`: Filter by city name
- `minAge`: Filter by minimum age

#### User Data Structure
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "city": "New York"
}
```

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

#### Product Query Parameters
- `category`: Filter by category
- `inStock`: Filter by stock status (true/false)
- `minPrice`: Filter by minimum price
- `maxPrice`: Filter by maximum price
- `sort`: Sort products (price-asc, price-desc, name-asc, name-desc)

#### Product Data Structure
```json
{
  "id": 1,
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics",
  "inStock": true,
  "description": "High-performance laptop for professionals"
}
```

## 🧪 Testing the API

### Using cURL

#### Get all users:
```bash
curl http://localhost:3000/api/users
```

#### Create a new user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 28,
    "city": "Boston"
  }'
```

#### Get all products with filtering:
```bash
curl "http://localhost:3000/api/products?category=Electronics&inStock=true&sort=price-asc"
```

#### Create a new product:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "price": 199.99,
    "category": "Electronics",
    "inStock": true,
    "description": "High-quality wireless headphones with noise cancellation"
  }'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint with appropriate request bodies

## 📁 Project Structure

```
├── server.js              # Main server file
├── routes/
│   ├── users.js           # User routes
│   └── products.js        # Product routes
├── middleware/
│   ├── validation.js      # Input validation middleware
│   ├── errorHandler.js    # Error handling middleware
│   └── notFound.js        # 404 handler
├── public/
│   └── index.html         # API documentation page
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔧 Middleware Used

- **Express.json()**: Parse JSON request bodies
- **Express.urlencoded()**: Parse URL-encoded request bodies
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logging
- **Custom Validation**: Input validation for users and products
- **Custom Error Handler**: Centralized error handling

## 🎯 Learning Objectives Covered

1. ✅ **Express.js Setup**: Server configuration and middleware setup
2. ✅ **Routing**: Organized route handlers with Express Router
3. ✅ **HTTP Methods**: GET, POST, PUT, DELETE operations
4. ✅ **Request/Response**: Handling request data and sending responses
5. ✅ **Middleware**: Custom and third-party middleware implementation
6. ✅ **Error Handling**: Comprehensive error handling strategy
7. ✅ **Validation**: Input validation and sanitization
8. ✅ **Query Parameters**: Filtering, pagination, and sorting
9. ✅ **Status Codes**: Appropriate HTTP status codes
10. ✅ **JSON APIs**: RESTful JSON API design

## 🚀 Next Steps

- Add database integration (MongoDB/PostgreSQL)
- Implement authentication and authorization
- Add unit and integration tests
- Deploy to cloud platform (Heroku, Vercel, etc.)
- Add API documentation with Swagger
- Implement rate limiting
- Add caching mechanisms

## 📝 License

This project is licensed under the MIT License.
