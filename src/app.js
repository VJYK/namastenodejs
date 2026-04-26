const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.schema");
const app = express();

app.use(express.json());

// SignUp User
app.post("/signup", async (req, res) => {
  //Creating new instance of user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.log("Some error occuring");
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
app.get('/feed',async (req,res)=>{
  try{
    const users = await User.find({});
    if(users.length===0){
      res.status(400).send("User not found")
    }else{
      res.send(users);
    }
  }catch(err){
    res.status(404).send('Somthing went wrong')
  }
})

// Delete User by Id
app.delete("/users",async (req,res)=>{
  const id=  req.body._id
  try{
    const userId =  await User.findByIdAndDelete(id);
    res.status(200).send("User deleted successfully");
  }catch(err){
    res.status(404).send('Something went wrong')
  }
})

// Update User Data of user 

app.patch("/user",async (req,res)=>{
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({_id:userId},data);
    res.send(user)
  } catch (error) {
    res.status(404).send("Something went wrong ")
  }
})
connectDB()
  .then(() => {
    console.log("Database connection is stablised");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    res.status(400).send("Error saving the user", err.message);
  });

//module.exports = app;
