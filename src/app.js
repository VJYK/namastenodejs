const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.schema");
const { validateSignupData } = require("./utils/validation");
const app = express();

app.use(express.json());

// SignUp User
app.post("/signup", async (req, res) => {
  // Validation of Data
  validateSignupData(req);
  //Creating new instance of user model
  const { firstName, lastName, password } = req.body;
  const passwordHash = bcrypt(password, 10);
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    password: passwordHash,
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.log("Some error occuring");
  }
});

// Login User

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validate.isEmail(email)) {
      throw new Error("Enter valid email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      res.send("Login Successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(404).send("User not found");
  }
});

// Get User By name

app.get("/users", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// Get feed of user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("Somthing went wrong");
  }
});

// Delete User by Id
app.delete("/users", async (req, res) => {
  const id = req.body._id;
  try {
    const userId = await User.findByIdAndDelete(id);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// Update User Data of user

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
      returnDocument: true,
    });
    res.send(user);
  } catch (error) {
    res.status(404).send("Something went wrong ");
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
    console.log("Database connection failed", err.message);
  });

//module.exports = app;
