const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.schema");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Vijay",
    lastName: "Mishra",
    email: "vijay@gmail.com",
    gender: "Male",
    password: "12345678",
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.log("Some error occuring");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is stablised");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    res.status(400).send("Error saving the user",err.message);
  });

//module.exports = app;
