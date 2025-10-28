const mongoose = require('mongoose');
require('dotenv').config();

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true },
  deliveryTime: { type: String, required: true },
  menuItems: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true }
  }]
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

const hotelsData = [
  {
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    cuisine: "South Indian",
    rating: 4.5,
    deliveryTime: "25-30 mins",
    menuItems: [
      {
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato curry, served with coconut chutney and sambar.",
        price: 120,
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400"
      },
      {
        name: "Idli Sambar",
        description: "Steamed rice cakes served with lentil curry and coconut chutney.",
        price: 80,
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400"
      },
      {
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with tender chicken pieces and traditional spices.",
        price: 280,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400"
      },
      {
        name: "Filter Coffee",
        description: "Authentic South Indian coffee brewed with chicory and served with hot milk.",
        price: 50,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
      },
      {
        name: "Uttapam",
        description: "Thick pancake made from rice and lentil batter topped with vegetables.",
        price: 140,
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400"
      }
    ]
  },
  {
    name: "Punjabi Dhaba",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    cuisine: "North Indian",
    rating: 4.3,
    deliveryTime: "30-35 mins",
    menuItems: [
      {
        name: "Butter Chicken",
        description: "Tender chicken in rich, creamy tomato-based curry with aromatic spices.",
        price: 320,
        category: "dinner",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"
      },
      {
        name: "Dal Makhani",
        description: "Creamy black lentils slow-cooked with butter, cream and aromatic spices.",
        price: 180,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
      },
      {
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes in rich, creamy tomato gravy with butter and spices.",
        price: 240,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400"
      },
      {
        name: "Naan",
        description: "Soft, fluffy Indian bread baked in tandoor oven, perfect with curries.",
        price: 60,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400"
      },
      {
        name: "Lassi",
        description: "Traditional Punjabi yogurt drink, sweet or salty, served chilled.",
        price: 60,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400"
      }
    ]
  },
  {
    name: "Golden Dragon",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
    cuisine: "Chinese",
    rating: 4.2,
    deliveryTime: "20-25 mins",
    menuItems: [
      {
        name: "Hakka Noodles",
        description: "Stir-fried noodles with vegetables and soy sauce, Indo-Chinese style.",
        price: 140,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400"
      },
      {
        name: "Fried Rice",
        description: "Wok-fried rice with vegetables, eggs and soy sauce.",
        price: 120,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400"
      },
      {
        name: "Chilli Chicken",
        description: "Crispy chicken pieces tossed in spicy Indo-Chinese sauce.",
        price: 260,
        category: "dinner",
        image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400"
      },
      {
        name: "Momos",
        description: "Steamed dumplings filled with vegetables or meat, served with spicy chutney.",
        price: 100,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400"
      },
      {
        name: "Hot and Sour Soup",
        description: "Tangy and spicy soup with vegetables, tofu and mushrooms.",
        price: 90,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400"
      }
    ]
  },
  {
    name: "Mama Mia Pizzeria",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    cuisine: "Italian",
    rating: 4.4,
    deliveryTime: "25-30 mins",
    menuItems: [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella cheese and fresh basil.",
        price: 220,
        category: "dinner",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"
      },
      {
        name: "Spaghetti Carbonara",
        description: "Creamy pasta with eggs, cheese, pancetta and black pepper.",
        price: 280,
        category: "dinner",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400"
      },
      {
        name: "Chicken Alfredo",
        description: "Fettuccine pasta in creamy white sauce with grilled chicken.",
        price: 320,
        category: "dinner",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400"
      },
      {
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs, perfect appetizer.",
        price: 80,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400"
      },
      {
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.",
        price: 150,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400"
      }
    ]
  },
  {
    name: "Burger Junction",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
    cuisine: "Fast Food",
    rating: 4.1,
    deliveryTime: "15-20 mins",
    menuItems: [
      {
        name: "Chicken Burger",
        description: "Juicy grilled chicken patty with lettuce, tomato and mayo in sesame bun.",
        price: 180,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
      },
      {
        name: "French Fries",
        description: "Crispy golden potato fries seasoned with salt, perfect side dish.",
        price: 80,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
      },
      {
        name: "Chicken Wings",
        description: "Spicy buffalo chicken wings served with ranch dipping sauce.",
        price: 220,
        category: "dinner",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400"
      },
      {
        name: "Milkshake",
        description: "Thick, creamy milkshake available in chocolate, vanilla or strawberry.",
        price: 120,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400"
      },
      {
        name: "Onion Rings",
        description: "Crispy battered and fried onion rings, perfect appetizer or side.",
        price: 100,
        category: "lunch",
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400"
      }
    ]
  },
  {
    name: "Sweet Dreams Bakery",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400",
    cuisine: "Desserts & Bakery",
    rating: 4.6,
    deliveryTime: "20-25 mins",
    menuItems: [
      {
        name: "Chocolate Cake",
        description: "Rich, moist chocolate cake with chocolate frosting and ganache.",
        price: 180,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
      },
      {
        name: "Cheesecake",
        description: "Creamy New York style cheesecake with graham cracker crust.",
        price: 160,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400"
      },
      {
        name: "Apple Pie",
        description: "Classic American apple pie with cinnamon and flaky pastry crust.",
        price: 140,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400"
      },
      {
        name: "Brownie",
        description: "Fudgy chocolate brownie served warm with vanilla ice cream.",
        price: 100,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400"
      },
      {
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream topped with chocolate sauce, nuts and cherry.",
        price: 120,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400"
      }
    ]
  }
];

async function seedHotels() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Hotel.deleteMany({});
    console.log('Cleared existing hotels');

    await Hotel.insertMany(hotelsData);
    console.log(`Successfully seeded ${hotelsData.length} hotels`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedHotels();