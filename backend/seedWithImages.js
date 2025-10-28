const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const menuItemsWithImages = [
  // South Indian
  { name: "Masala Dosa", description: "Crispy rice crepe filled with spiced potato curry, served with coconut chutney and sambar.", price: 120, category: "breakfast", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
  { name: "Idli Sambar", description: "Steamed rice cakes served with lentil curry and coconut chutney.", price: 80, category: "breakfast", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" },
  { name: "Chicken Biryani", description: "Aromatic basmati rice cooked with tender chicken pieces and traditional spices.", price: 280, category: "lunch", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400" },
  { name: "Uttapam", description: "Thick pancake made from rice and lentil batter topped with vegetables.", price: 140, category: "breakfast", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400" },
  { name: "Filter Coffee", description: "Authentic South Indian coffee brewed with chicory and served with hot milk.", price: 50, category: "drinks", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" },

  // North Indian
  { name: "Butter Chicken", description: "Tender chicken in rich, creamy tomato-based curry with aromatic spices.", price: 320, category: "dinner", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
  { name: "Dal Makhani", description: "Creamy black lentils slow-cooked with butter, cream and aromatic spices.", price: 180, category: "lunch", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
  { name: "Paneer Butter Masala", description: "Cottage cheese cubes in rich, creamy tomato gravy with butter and spices.", price: 240, category: "lunch", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400" },
  { name: "Naan", description: "Soft, fluffy Indian bread baked in tandoor oven, perfect with curries.", price: 60, category: "lunch", image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400" },
  { name: "Chole Bhature", description: "Spicy chickpea curry served with deep-fried bread, a popular North Indian dish.", price: 160, category: "lunch", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400" },

  // Chinese
  { name: "Hakka Noodles", description: "Stir-fried noodles with vegetables and soy sauce, Indo-Chinese style.", price: 140, category: "lunch", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400" },
  { name: "Fried Rice", description: "Wok-fried rice with vegetables, eggs and soy sauce.", price: 120, category: "lunch", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400" },
  { name: "Chilli Chicken", description: "Crispy chicken pieces tossed in spicy Indo-Chinese sauce.", price: 260, category: "dinner", image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400" },
  { name: "Momos", description: "Steamed dumplings filled with vegetables or meat, served with spicy chutney.", price: 100, category: "lunch", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400" },
  { name: "Hot and Sour Soup", description: "Tangy and spicy soup with vegetables, tofu and mushrooms.", price: 90, category: "lunch", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },

  // Italian
  { name: "Margherita Pizza", description: "Classic pizza with tomato sauce, mozzarella cheese and fresh basil.", price: 220, category: "dinner", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
  { name: "Spaghetti Carbonara", description: "Creamy pasta with eggs, cheese, pancetta and black pepper.", price: 280, category: "dinner", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400" },
  { name: "Chicken Alfredo", description: "Fettuccine pasta in creamy white sauce with grilled chicken.", price: 320, category: "dinner", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400" },
  { name: "Garlic Bread", description: "Toasted bread with garlic butter and herbs, perfect appetizer.", price: 80, category: "lunch", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400" },
  { name: "Tiramisu", description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.", price: 150, category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },

  // Fast Food
  { name: "Chicken Burger", description: "Juicy grilled chicken patty with lettuce, tomato and mayo in sesame bun.", price: 180, category: "lunch", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
  { name: "French Fries", description: "Crispy golden potato fries seasoned with salt, perfect side dish.", price: 80, category: "lunch", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
  { name: "Chicken Wings", description: "Spicy buffalo chicken wings served with ranch dipping sauce.", price: 220, category: "dinner", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400" },
  { name: "Milkshake", description: "Thick, creamy milkshake available in chocolate, vanilla or strawberry.", price: 120, category: "drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400" },
  { name: "Onion Rings", description: "Crispy battered and fried onion rings, perfect appetizer or side.", price: 100, category: "lunch", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400" },

  // Punjabi
  { name: "Sarson Ka Saag", description: "Traditional Punjabi mustard greens curry served with makki ki roti.", price: 160, category: "lunch", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
  { name: "Makki Ki Roti", description: "Corn flour flatbread, traditional accompaniment to sarson ka saag.", price: 40, category: "lunch", image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400" },
  { name: "Amritsari Kulcha", description: "Stuffed bread from Amritsar, crispy outside and soft inside.", price: 120, category: "lunch", image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400" },
  { name: "Lassi", description: "Traditional Punjabi yogurt drink, sweet or salty, served chilled.", price: 60, category: "drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400" },
  { name: "Rajma", description: "Red kidney beans cooked in thick tomato-based curry with spices.", price: 140, category: "lunch", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },

  // Bengali
  { name: "Fish Curry", description: "Traditional Bengali fish curry cooked in mustard oil with spices.", price: 280, category: "lunch", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400" },
  { name: "Mishti Doi", description: "Sweet yogurt dessert, a Bengali specialty served chilled.", price: 80, category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },
  { name: "Kosha Mangsho", description: "Slow-cooked mutton curry with rich spices, Bengali style.", price: 350, category: "dinner", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400" },
  { name: "Luchi", description: "Deep-fried puffed bread, lighter version of puri, Bengali specialty.", price: 50, category: "lunch", image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400" },
  { name: "Rasgulla", description: "Spongy cottage cheese balls in sugar syrup, famous Bengali sweet.", price: 100, category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },

  // Gujarati
  { name: "Dhokla", description: "Steamed savory cake made from fermented rice and chickpea batter.", price: 80, category: "breakfast", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400" },
  { name: "Gujarati Thali", description: "Complete meal with variety of vegetables, dal, rice, roti and sweets.", price: 200, category: "lunch", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400" },
  { name: "Khandvi", description: "Rolled gram flour snack seasoned with mustard seeds and coriander.", price: 90, category: "breakfast", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400" },
  { name: "Fafda", description: "Crispy fried snack made from gram flour, popular Gujarati breakfast.", price: 60, category: "breakfast", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400" },
  { name: "Shrikhand", description: "Sweet dessert made from strained yogurt with cardamom and saffron.", price: 120, category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },

  // Mexican
  { name: "Chicken Tacos", description: "Soft tortillas filled with seasoned chicken, lettuce, tomato and cheese.", price: 180, category: "lunch", image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=400" },
  { name: "Burrito", description: "Large flour tortilla wrapped with rice, beans, meat and vegetables.", price: 220, category: "lunch", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400" },
  { name: "Nachos", description: "Tortilla chips topped with cheese, jalapeños, salsa and sour cream.", price: 160, category: "lunch", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400" },
  { name: "Quesadilla", description: "Grilled tortilla filled with cheese and your choice of meat or vegetables.", price: 140, category: "lunch", image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400" },
  { name: "Guacamole", description: "Fresh avocado dip with lime, cilantro and spices, served with chips.", price: 120, category: "lunch", image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400" },

  // Thai
  { name: "Pad Thai", description: "Stir-fried rice noodles with shrimp, tofu, eggs and tamarind sauce.", price: 200, category: "lunch", image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400" },
  { name: "Tom Yum Soup", description: "Spicy and sour Thai soup with shrimp, mushrooms and herbs.", price: 150, category: "lunch", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },
  { name: "Green Curry", description: "Creamy coconut curry with green chilies, basil and your choice of meat.", price: 240, category: "dinner", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400" },
  { name: "Mango Sticky Rice", description: "Sweet dessert with coconut sticky rice topped with fresh mango slices.", price: 130, category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },
  { name: "Thai Iced Tea", description: "Sweet and creamy iced tea with condensed milk, orange in color.", price: 80, category: "drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400" },

  // Japanese
  { name: "Chicken Teriyaki", description: "Grilled chicken glazed with sweet and savory teriyaki sauce.", price: 280, category: "dinner", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
  { name: "Vegetable Sushi", description: "Fresh vegetables wrapped in seasoned rice and nori seaweed.", price: 200, category: "lunch", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400" },
  { name: "Miso Soup", description: "Traditional Japanese soup made with fermented soybean paste.", price: 80, category: "lunch", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },
  { name: "Chicken Ramen", description: "Japanese noodle soup with rich broth, chicken and vegetables.", price: 220, category: "dinner", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400" },
  { name: "Green Tea", description: "Traditional Japanese green tea, served hot, rich in antioxidants.", price: 50, category: "drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400" },

  // Desserts
  { name: "Chocolate Cake", description: "Rich, moist chocolate cake with chocolate frosting and ganache.", price: 180, category: "dessert", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { name: "Ice Cream Sundae", description: "Vanilla ice cream topped with chocolate sauce, nuts and cherry.", price: 120, category: "dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400" },
  { name: "Cheesecake", description: "Creamy New York style cheesecake with graham cracker crust.", price: 160, category: "dessert", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400" },
  { name: "Apple Pie", description: "Classic American apple pie with cinnamon and flaky pastry crust.", price: 140, category: "dessert", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400" },
  { name: "Brownie", description: "Fudgy chocolate brownie served warm with vanilla ice cream.", price: 100, category: "dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" }
];

async function seedWithImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Add more items to reach 100+ items
    const expandedItems = [];
    
    // Add base items
    menuItemsWithImages.forEach(item => {
      expandedItems.push({ ...item, available: true });
    });

    // Create variations of popular items
    const variations = [
      { suffix: " Special", priceAdd: 50 },
      { suffix: " Deluxe", priceAdd: 80 },
      { suffix: " Family Pack", priceAdd: 120 },
      { suffix: " Mini", priceAdd: -30 }
    ];

    menuItemsWithImages.slice(0, 20).forEach(baseItem => {
      variations.forEach(variation => {
        expandedItems.push({
          ...baseItem,
          name: baseItem.name + variation.suffix,
          price: Math.max(50, baseItem.price + variation.priceAdd),
          available: true
        });
      });
    });

    await MenuItem.insertMany(expandedItems);
    console.log(`Successfully seeded ${expandedItems.length} menu items with real images`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedWithImages();