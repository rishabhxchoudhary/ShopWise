import mongoose from 'mongoose';

const uri = 'mongodb+srv://root:root@cluster0.smibz3t.mongodb.net/'; 

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;