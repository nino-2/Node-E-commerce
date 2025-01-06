const express = require("express");
const app = express();
const PORT = 5002;
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const ejs = require("ejs");
const productModel = require("./models/product.model");
const userModel = require("./models/user.model");
app.set("view engine", "ejs");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
app.use("/prod", productRouter);
app.use("/user", userRouter);

let URI =
  "mongodb+srv://ayodeleopeyemi09:youngnino@cluster0.xat6w.mongodb.net/jumia_db?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(URI)
  .then(() => {
    console.log("mongodb has connected successfully");
  })
  .catch((err) => {
    console.log("an error occured", err);
  });

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server did not start");
  } else {
    console.log("Server has started");
  }
});
