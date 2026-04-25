const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vijay:M12345678@cluster0.gwbixhq.mongodb.net/?appName=Cluster0/devmatcher",
  );
};

module.exports = connectDB;
