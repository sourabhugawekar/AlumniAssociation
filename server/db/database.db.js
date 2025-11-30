import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      dbName: "Alumni",
    })
    .then(() => {
      console.log("Database Connected Successfully ");
    })
    .catch((err) => console.log(err));
};
