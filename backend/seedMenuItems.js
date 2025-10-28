const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const fs = require('fs');
require('dotenv').config();

async function seedMenuItems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    const hotelsData = JSON.parse(fs.readFileSync('complete_hotels_data.json', 'utf8'));
    const menuItems = [];

    hotelsData.forEach(hotel => {
      hotel.menuItems.forEach(item => {
        menuItems.push({
          name: item.itemName,
          description: item.itemDescription,
          price: item.itemPrice,
          category: item.itemCategory.toLowerCase(),
          image: item.itemImage,
          available: true
        });
      });
    });

    await MenuItem.insertMany(menuItems);
    console.log(`Successfully seeded ${menuItems.length} menu items`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedMenuItems();