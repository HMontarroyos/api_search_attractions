import mongoose, { ConnectOptions } from "mongoose";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export async function connect() {
  const baseUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}/${process.env.MONGODB_DATABASE}`;
  try {
    const options: any = {};
    options.useNewUrlParser = true;
    options.useUnifiedTopology = true;
    await mongoose.connect(baseUrl, options);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
}

export async function closeDatabase() {
  await mongoose.connection.close();
}
