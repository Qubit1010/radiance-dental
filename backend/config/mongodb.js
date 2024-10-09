import mongoose from "mongoose";


const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  await mongoose.connect(
    "mongodb+srv://rait:triangg@cluster0.hjyco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  // try {
  //   await mongoose.connect(`${process.env.MONGODB_URI}`);
  // } catch (error) {
  //   console.log(error)
  // }
 
  //  await mongoose.connect(
  //     process.env.MONGODB_URL,
  //     (err) => {
  //      if(err) console.log(err)
  //      else console.log("mongdb is connected");
  //     }
  //   );

  // console.log(process.env.MONGODB_URI);
};

export default connectDB;
