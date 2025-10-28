# Food Ordering App Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- VS Code

## Setup Steps

### 1. Install MongoDB
- **Local**: Download and install MongoDB Community Server
- **Cloud**: Create a free MongoDB Atlas account and get connection string

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
MONGODB_URI=mongodb://localhost:27017/foodordering
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Seed Database
```bash
cd backend
npm run seed
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Test Credentials
- Admin: admin@foodapp.com / admin123
- Or create a new user account

## Features to Test
1. Browse menu items on home page
2. Sign up / Login
3. Add items to cart
4. Checkout and place order
5. View order history
6. Admin can add/edit menu items via API

## API Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/menu - Get all menu items
- POST /api/menu - Create menu item (admin)
- POST /api/orders - Place order
- GET /api/orders/my-orders - Get user orders

## Troubleshooting
- Ensure MongoDB is running
- Check that ports 3000 and 5000 are available
- Verify .env file configuration
- Check console for any error messages