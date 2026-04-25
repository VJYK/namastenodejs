const express = require("express");

const app = express();
const { adminAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  try {
    res.send("All Data sent");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/admin/deleteuser", (req, res) => {
  res.send("User Deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;