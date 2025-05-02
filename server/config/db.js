const mongoose = require('mongoose');
const url = process.env.MONGO_URI || "mongodb://root:password@mongodb:27017/";
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;