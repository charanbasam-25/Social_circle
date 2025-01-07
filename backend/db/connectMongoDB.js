import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongogDB connected")
  } catch (error) {
    console.log(error, "error connecting to mongo db");
    process.exit();
  }
};
export default connectMongoDB;