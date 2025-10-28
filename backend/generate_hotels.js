const fs = require('fs');

const hotelCategories = [
  'South Indian', 'North Indian', 'Chinese', 'Italian', 'Fast Food',
  'Punjabi', 'Bengali', 'Gujarati', 'Rajasthani', 'Continental',
  'Mexican', 'Thai', 'Japanese', 'Mediterranean', 'Bakery',
  'Seafood', 'Vegetarian', 'Street Food', 'Desserts', 'Multi-Cuisine'
];

const hotelNames = [
  'Spice Garden Restaurant', 'Royal Palace Diner', 'Golden Dragon', 'Mama Mia Pizzeria', 'Burger Junction',
  'Punjab Grill', 'Calcutta Kitchen', 'Gujarat Thali House', 'Rajwada Restaurant', 'The Continental',
  'Amigos Mexican', 'Bangkok Bites', 'Sakura Sushi', 'Olive Garden', 'Sweet Dreams Bakery',
  'Ocean Pearl', 'Green Leaf Vegetarian', 'Chaat Corner', 'Dessert Paradise', 'Flavors Multi-Cuisine'
];

const addresses = [
  'Anna Nagar, Chennai', 'Connaught Place, Delhi', 'Park Street, Kolkata', 'Bandra West, Mumbai', 'MG Road, Bangalore',
  'Sector 17, Chandigarh', 'Salt Lake, Kolkata', 'Navrangpura, Ahmedabad', 'MI Road, Jaipur', 'Brigade Road, Bangalore',
  'Koregaon Park, Pune', 'Sukhumvit, Bangkok', 'Shibuya, Tokyo', 'Khan Market, Delhi', 'Commercial Street, Bangalore',
  'Marine Drive, Mumbai', 'Jayanagar, Bangalore', 'Chandni Chowk, Delhi', 'Park Street, Kolkata', 'Indiranagar, Bangalore'
];

const menuItemsByCategory = {
  'South Indian': [
    'Masala Dosa', 'Idli Sambar', 'Uttapam', 'Vada', 'Appam', 'Puttu', 'Rava Upma', 'Pongal', 'Paniyaram', 'Adai',
    'Chicken Biryani', 'Mutton Curry', 'Fish Fry', 'Prawn Curry', 'Chicken Chettinad', 'Fish Curry', 'Egg Curry', 'Chicken Curry',
    'Rasam', 'Sambar', 'Coconut Rice', 'Lemon Rice', 'Curd Rice', 'Tamarind Rice', 'Vegetable Biryani', 'Kootu',
    'Payasam', 'Mysore Pak', 'Kesari', 'Gulab Jamun', 'Rava Kesari', 'Double Ka Meetha',
    'Filter Coffee', 'Masala Tea', 'Buttermilk', 'Jigarthanda', 'Lime Juice', 'Badam Milk', 'Coconut Water'
  ],
  'North Indian': [
    'Butter Chicken', 'Dal Makhani', 'Paneer Butter Masala', 'Roti', 'Naan', 'Paratha', 'Rajma', 'Chole Bhature', 'Aloo Gobi', 'Palak Paneer',
    'Chicken Tikka Masala', 'Mutton Rogan Josh', 'Tandoori Chicken', 'Seekh Kebab', 'Biryani', 'Pulao', 'Korma', 'Vindaloo',
    'Jeera Rice', 'Basmati Rice', 'Mixed Vegetable Curry', 'Baingan Bharta', 'Bhindi Masala', 'Kadai Paneer', 'Malai Kofta',
    'Kulfi', 'Ras Malai', 'Kheer', 'Jalebi', 'Laddu', 'Barfi',
    'Lassi', 'Masala Chai', 'Nimbu Paani', 'Thandai', 'Sugarcane Juice', 'Mango Shake', 'Rose Milk'
  ],
  'Chinese': [
    'Hakka Noodles', 'Fried Rice', 'Chow Mein', 'Spring Rolls', 'Momos', 'Manchurian', 'Sweet and Sour', 'Szechuan', 'Kung Pao', 'Hot and Sour Soup',
    'Chicken Lollipop', 'Chilli Chicken', 'Honey Chicken', 'Prawn Toast', 'Fish in Black Bean', 'Beef Stir Fry', 'Pork Ribs', 'Duck Pancakes',
    'Wonton Soup', 'Tom Yum Soup', 'Corn Soup', 'Mushroom Soup', 'Chicken Soup', 'Vegetable Soup', 'Noodle Soup',
    'Date Pancakes', 'Sesame Balls', 'Fortune Cookies', 'Almond Tofu', 'Mango Pudding', 'Ice Cream',
    'Green Tea', 'Jasmine Tea', 'Chinese Beer', 'Lychee Juice', 'Orange Juice', 'Coconut Milk', 'Soy Milk'
  ]
};

function generateMenuItem(itemId, category, itemName, index) {
  const descriptions = [
    `Delicious ${itemName.toLowerCase()} prepared with authentic spices and traditional cooking methods.`,
    `Fresh ${itemName.toLowerCase()} made with premium ingredients and served hot.`,
    `Traditional ${itemName.toLowerCase()} recipe passed down through generations.`,
    `Aromatic ${itemName.toLowerCase()} cooked to perfection with special blend of spices.`,
    `Mouth-watering ${itemName.toLowerCase()} that will leave you craving for more.`
  ];

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Drinks', 'Dessert'];
  const prices = [80, 90, 100, 120, 140, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400, 450, 500];
  
  return {
    itemId: `M${String(index + 1).padStart(3, '0')}`,
    itemName: itemName,
    itemDescription: descriptions[index % descriptions.length],
    itemPrice: prices[index % prices.length],
    itemCategory: categories[index % categories.length],
    itemImage: `https://images.unsplash.com/photo-${1500000000000 + index}`
  };
}

function generateHotel(hotelIndex) {
  const category = hotelCategories[hotelIndex];
  const menuItems = [];
  
  // Get base items for this category
  const baseItems = menuItemsByCategory[category] || menuItemsByCategory['South Indian'];
  
  // Generate 50 unique items
  for (let i = 0; i < 50; i++) {
    const itemName = baseItems[i % baseItems.length] + (i >= baseItems.length ? ` Special ${Math.floor(i / baseItems.length) + 1}` : '');
    menuItems.push(generateMenuItem(hotelIndex * 50 + i, category, itemName, i));
  }

  return {
    hotelId: `H${String(hotelIndex + 1).padStart(3, '0')}`,
    hotelName: hotelNames[hotelIndex],
    hotelAddress: addresses[hotelIndex],
    hotelRating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    hotelImage: `https://images.unsplash.com/photo-${1517248135467 + hotelIndex}`,
    category: category,
    menuItems: menuItems
  };
}

// Generate all 20 hotels
const hotels = [];
for (let i = 0; i < 20; i++) {
  hotels.push(generateHotel(i));
}

// Write to file
fs.writeFileSync('complete_hotels_data.json', JSON.stringify(hotels, null, 2));
console.log('Generated 20 hotels with 1000 menu items total!');
console.log('File saved as: complete_hotels_data.json');