import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Fetch the MongoDB URI from .env
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined');
    }

    // Connect to MongoDB without deprecated options
    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit if connection fails
  }
};

export default connectDB;
