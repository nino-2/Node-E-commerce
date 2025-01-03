const express = require("express");
const app = express();
const PORT = 5002;
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const ejs = require("ejs");
const { type } = require("express/lib/response");
app.set("view engine", "ejs");
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
//schema

let userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: String, default: Date.now() },
});
let userModel = mongoose.model("user_data", userSchema);
app.get("/signup", (req, res) => {
  res.render("signup", { message });
  message = "";
});

app.post("/biodata", (req, res) => {
  console.log(req.body);
  let form = new userModel(req.body);
  form
    .save()
    .then(() => {
      console.log("it has saved");
      message = "registration  successfull";
      res.redirect("/product");
    })
    .catch((err) => {
      console.log(err, "it didnt save");
      message = "Please fill in all fields";
      res.redirect("/signup");
    });
});

let productSchema = mongoose.Schema({
  productname: { type: String, required: true },
  productcategory: { type: String, required: true },
  productprice: {
    type: Number,
    required: true,
  },
  productquantity: { type: Number, required: true },
  productimage: { type: String, required: true },
  productDate: { type: String, default: Date.now() },
});
let productModel = mongoose.model("product_collection", productSchema);
//Model

message = "";
app.get("/product", (req, res) => {
  res.render("product", { message });
  message = "";
});
app.get("/cart", (req, res) => {
  productModel.find().then((allProducts) => {
    console.log(allProducts);
    res.render("cart", { name: "Opeyemi", allProducts });
  });
});

app.post("/addup", (req, res) => {
  console.log(req.body);
  let form = new productModel(req.body);
  form
    .save()
    .then(() => {
      console.log("it has saved");
      message = "product added successfully";
      res.redirect("/product");
    })
    .catch((err) => {
      console.log(err, "it didnt save");
      message = "product could not be added, please try again";
      res.redirect("/product");
    });
});
app.post("/delete", (req, res) => {
  console.log(req.body.id);
  productModel
    .findByIdAndDelete(req.body.id)
    .then((response) => {
      console.log("deleted successfully");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/edit", (req, res) => {
  console.log(req.body);
  let {
    productname,
    productcategory,
    productquantity,
    productprice,
    productimage,
  } = req.body;
  productModel
    .findByIdAndUpdate(req.body.id, {
      productname,
      productcategory,
      productquantity,
      productprice,
      productimage,
    })
    .then(() => {
      console.log("updated successfully");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server did not start");
  } else {
    console.log("Server has started");
  }
});
