import mongoose from "mongoose";
const connectToDB = async () => {
  const connectionURL =
    "mongodb+srv://wa254549:onBoard@cluster0.seydo.mongodb.net/";

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((e) => console.log(e));
};
export default connectToDB;
