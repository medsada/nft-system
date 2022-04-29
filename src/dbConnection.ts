import mongoose from "mongoose";

const uri: string = process.env.MONGO_URI || '';

async function connectDB () {
  try {
    const conn = await mongoose.connect(uri, {
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
