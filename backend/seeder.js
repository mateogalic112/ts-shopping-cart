const dotenv = require("dotenv");
const products = require("./data/products.js");
const Product = require("./models/Product.js");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    console.log("cleared Database ✅");

    console.log("insert Products...");
    await Product.insertMany(products);
    console.log("created Products ✅");

    process.exit();
  } catch (error) {
    console.error(`oh no -> ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("cleared Database 🧨✅");
    process.exit();
  } catch (error) {
    console.error(`oh no -> ${error}`);
    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();
