const productModel = require("../models/product.model");
message = "";
const displayProduct = (req, res) => {
  res.render("product", { message });
  message = "";
};
const displayCart = (req, res) => {
  productModel.find().then((allProducts) => {
    console.log(allProducts);
    res.render("cart", { name: "Opeyemi", allProducts });
  });
};
const displayAddup = (req, res) => {
  console.log(req.body);
  let form = new productModel(req.body);
  form
    .save()
    .then(() => {
      console.log("it has saved");
      message = "product added successfully";
      res.redirect("/prod/product");
    })
    .catch((err) => {
      console.log(err, "it didnt save");
      message = "product could not be added, please try again";
      res.redirect("/prod/product");
    });
};
const displayDelete = (req, res) => {
  console.log(req.body.id);
  productModel
    .findByIdAndDelete(req.body.id)
    .then((response) => {
      console.log("deleted successfully");
      res.redirect("/prod/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
const displayEdit = (req, res) => {
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
      res.redirect("/prod/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  displayProduct,
  displayCart,
  displayAddup,
  displayDelete,
  displayEdit,
};
