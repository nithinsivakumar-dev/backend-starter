import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let url = process.env.MONGO_URL;

    if (!url) {
      console.log(
        `Invalid/empty database url found. Kindly update the url in .env`
      );
      process.exit(1);
    }

    await mongoose.connect(url);
    console.log(`Server is connected to the database!`);
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
    process.exit(1);
  }
};

export { connectDB };
