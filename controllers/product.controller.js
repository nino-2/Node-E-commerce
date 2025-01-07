const productModel = require("../models/product.model");
const nodemailer = require("nodemailer");
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
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  var mailOptions = {
    from: "ayodeleopeyemi09@gmail.com",
    to: "opeyemimorgan3@gmail.com",
    subject: `You have created a new product ${req.body.productname} `,
    html: "<h1 style='background-color: purple;'>Congratulations</h1>",
  };

  console.log(req.body);
  let form = new productModel(req.body);
  form
    .save()
    .then(() => {
      console.log("it has saved");
      message = "product added successfully";
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
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
