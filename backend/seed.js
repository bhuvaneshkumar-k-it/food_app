const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodordering');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@foodapp.com',
      password: 'admin123',
      isAdmin: true
    });
    await admin.save();

    // Create sample menu items
    const menuItems = [
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 12.99,
        category: 'Pizza',
        image: 'https://via.placeholder.com/300x200?text=Margherita+Pizza'
      },
      {
        name: 'Chicken Burger',
        description: 'Grilled chicken breast with lettuce, tomato, and mayo',
        price: 9.99,
        category: 'Burgers',
        image: 'https://via.placeholder.com/300x200?text=Chicken+Burger'
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing and croutons',
        price: 8.99,
        category: 'Salads',
        image: 'https://via.placeholder.com/300x200?text=Caesar+Salad'
      },
      {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
        price: 14.99,
        category: 'Pasta',
        image: 'https://via.placeholder.com/300x200?text=Pasta+Carbonara'
      },
      {
        name: 'Fish Tacos',
        description: 'Grilled fish with cabbage slaw and chipotle sauce',
        price: 11.99,
        category: 'Mexican',
        image: 'https://via.placeholder.com/300x200?text=Fish+Tacos'
      }
    ];

    await MenuItem.insertMany(menuItems);
    console.log('Sample data seeded successfully!');
    console.log('Admin credentials: admin@foodapp.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

connectDB().then(seedData);