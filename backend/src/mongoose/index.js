import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function resolveMongoUri() {
  const dbLink = process.env.DB_LINK;
  if (!dbLink) {
    throw new Error("DB_LINK environment variable is missing.");
  }

  if (dbLink.startsWith("mongodb://") || dbLink.startsWith("mongodb+srv://")) {
    return dbLink;
  }

  return `mongodb+srv://${dbLink}?retryWrites=true&w=majority`;
}

export const dbConnect = async () => {
  try {
    const uri = resolveMongoUri();

    await mongoose.connect(uri, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
      console.log("DB connected successfully");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};
