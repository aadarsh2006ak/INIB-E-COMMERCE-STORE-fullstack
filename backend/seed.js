import mongoose from "mongoose";
import "dotenv/config";
import productModel from "./models/productModel.js";

const sampleProducts = [
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, premium knitted pullover shirt with a round neckline and short sleeves, crafted from 100% breathable organic cotton.",
    price: 799,
    image: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestSeller: true,
    date: Date.now()
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "Classic fit essential t-shirt designed for everyday wear. Made with high-grade combed cotton fabric offering superior softness.",
    price: 699,
    image: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestSeller: true,
    date: Date.now()
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "Vibrant and soft cotton top for young girls. Hypoallergenic fabric designed for playful movement and easy wash care.",
    price: 499,
    image: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=80"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    bestSeller: true,
    date: Date.now()
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "Modern flat-front trousers with a refined tapered cut, dual side pockets, and flexible waist construction.",
    price: 1499,
    image: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false,
    date: Date.now()
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "Flowy wide-leg palazzo pants with stylish fabric belt, offering graceful movement and all-day comfort.",
    price: 1299,
    image: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false,
    date: Date.now()
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "Timeless trucker denim jacket crafted with heavy-duty cotton denim and branded metal buttons.",
    price: 2999,
    image: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false,
    date: Date.now()
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "Lightweight windproof bomber jacket with durable metal zipper and ribbed trim.",
    price: 2799,
    image: ["https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false,
    date: Date.now()
  },
  {
    name: "Kid Elastic Waist Slim Fit Joggers",
    description: "Stretchy knit joggers with adjustable drawstring waist and ribbed ankle cuffs.",
    price: 799,
    image: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false,
    date: Date.now()
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    const count = await productModel.countDocuments();
    if (count === 0) {
      await productModel.insertMany(sampleProducts);
      console.log(`Successfully seeded ${sampleProducts.length} sample products!`);
    } else {
      console.log(`Database already has ${count} products. Skipping seeding.`);
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

seedDB();
