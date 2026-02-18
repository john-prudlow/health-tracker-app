const mongoose = require('mongoose');

// Connect to MongoDB Atlas database
const connectDatabase = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    const connection = await mongoose.connect(connectionString);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
    console.log(`Database Name: ${connection.connection.name}`);

    return connection;
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;