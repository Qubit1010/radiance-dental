import mongoose from "mongoose";

const connectDB = async () => {
  // mongoose.connection.on("connected", () => console.log("Database Connected"));
  // await mongoose.connect(
  //   "process.env.MONGODB_URI"
  // );

  // Use connect method to connect to the server
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  // console.log(process.env.MONGODB_URI);
};

export default connectDB;
